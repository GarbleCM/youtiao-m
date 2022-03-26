<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click="$router.back()"
    >

    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div
       class="loading-wrap"
       v-if="loading"
      >
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail " v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate | relativeTime}}</div>
          <!--
            模板中的 $event 是事件参数
            当我们传递给子组件的数据既要使用还要修改的时候可以使用v-model
             传递：props - value
                :is_followed="article.is_followed"
             修改：自定义事件 - v-model的输入框的 input事件
            简写方式：在组件上使用 v-model - v-model="article.is_followed"
              子组件中props接收的value变量与父组件的变量is_followed绑定

           -->
          <FollowUser
           v-model="article.is_followed"
           class="follow-btn"
           :userId="article.aut_id"
          >
          </FollowUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" ref="article-content" v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <CommentList
         :sourceId="article.art_id"
         :list="commentList"
         @onReply="onReplyClick"
         @success-load="totalCommentCount = $event.total_count"
        ></CommentList>
        <!-- 底部区域 加载完成才显示-->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :badge="totalCommentCount"
            color="#777"
          />
          <!-- <van-icon
            color="#777"
            name="star-o"
          /> -->
          <CollectArticle
            v-model="article.is_collected"
            :art_id="article.art_id"
          ></CollectArticle>
          <LikeArticle
            v-model="article.attitude"
            :art_id="article.art_id"
          ></LikeArticle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论的弹出层 -->
        <van-popup
         v-model="isPostShow"
         position="bottom"
        >
          <CommentPost
           @post-success="onPostSuccess"
           :target="article.art_id"
          ></CommentPost>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404" >
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticles">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <!--
      弹出层是懒渲染的：
        只有在第一次展示的时候才会渲染里面的内容，
        之后的展示只是在显示和隐藏
        在隐藏后其数据并不会销毁
     -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      style="height: 100%;"
    >
      <CommentReply
        :comment="currentComment"
        @close="isReplyShow = false"
        v-if="isReplyShow"
      >

      </CommentReply>
    </van-popup>
    <!-- /评论回复 -->

  </div>
</template>

<script>
import { getArticleDetailsAPI } from '@/api'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  // 给所有的后代提供数据
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 控制加载图标的显示
      errStatus: 0,
      totalCommentCount: 0,
      isPostShow: false, // 控制 发布评论的弹出层
      commentList: [],
      isReplyShow: false, // 控制 评论回复的弹出层
      currentComment: {} // 当前点击的评论回复
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    async loadArticles () {
      this.loading = true
      try {
        // 测试 点击重试失败错误
        /* if(Math.random() > 0.5){
                JSON.parse('aadadasd')
            } */
        const { data } = await getArticleDetailsAPI(this.articleId)
        // console.log(data);
        this.article = data.data

        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log('获取文章详情失败')
      }
      this.loading = false
    },
    previewImage () {
      // 得到内容所有节点
      const articleContent = this.$refs['article-content']
      // 获取 图片dom
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      // console.log(images);
      imgs.forEach((img, index) => {
        images.push(img)
        // 为所有图片节点绑定点击事件
        img.onclick = () => {
          // 初始化图片预览
          ImagePreview({
            images, // 所有图片节点数组
            startPosition: index // 开始预览图片索引
          })
        }
      })
    },
    onPostSuccess (data) {
      // 关闭评论弹窗
      this.isPostShow = false
      // this.loadArticles()
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
    },
    onReplyClick (comment) {
      // console.log(comment);
      this.currentComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
