<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
    >
        <van-icon
         slot="left"
         name="cross"
         @click="$emit('close')"
        />
    </van-nav-bar>
    <div class="scroll-warp">
      <CommentItem :comment="comment">
      </CommentItem>
      <!-- 评论的回复列表 -->
      <van-cell title="全部回复" />
      <CommentList
        :sourceId="comment.com_id"
        type="c"
        :list="commentList"
      ></CommentList>
      <!-- /评论的回复列表 -->
    </div>
    <!-- 发布评论按钮 -->
    <div class="post-wrap">
      <van-button
       size="small"
       class="post-btn"
       round
       @click="isPostShow = true"
      >
        回复评论
      </van-button>
    </div>
    <!-- /发布评论 -->
    <!-- 发布评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <CommentPost
       :target="comment.com_id"
       @post-success="onPostSuccess"
      >
      </CommentPost>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import CommentList from './comment-list.vue'
import CommentItem from './comment-item.vue'
import CommentPost from './comment-post.vue'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess (data) {
      // console.log(data);
      // 增加评论回复列表数量
      this.comment.reply_count++
      // 关闭回复弹出层
      this.isPostShow = false
      // 将最新评论回复置顶
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
// 评论回复列表的滚动容器
.scroll-warp{
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap{
  height: 88px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #d8d8d8;
  .post-btn{
    background: #fff;
    width: 60%;
  }
}
</style>
