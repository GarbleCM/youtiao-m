<template>
  <div class="home-container">
    <div class="header">
      <!-- 导航栏 -->
      <van-nav-bar  class="page-nav-bar" fixed>
        <template #title>
          <van-button
          type="info"
          size="mini"
          round
          icon="search"
          class="search-btn"
          to="/search"
          >
            搜索
          </van-button>
        </template>
      </van-nav-bar>
      <!-- /导航栏 -->
      <!-- 频道列表 -->
      <div class="main">
        <!--
          van-tabs
          animated - 打开转场时的切换动画
          swipeable - 启动滑动切换标签页
         -->
        <van-tabs
        class="channel-tabs"
        v-model="active"
        animated swipeable
        >
          <van-tab
            v-for="obj in channelsList"
            :key="obj.id"
            :title="obj.name"
          >
          <!-- 文章列表 -->
          <ArticleList :channel="obj"></ArticleList>
          </van-tab>
          <div slot="nav-right" class="placeholder"></div>
          <div slot="nav-right" class="hamburger-btn">
            <i class="iconfont icon-gengduo" @click="channelEditPopup"></i>
          </div>
        </van-tabs>
      </div>
      <van-popup
        v-model="isChannelEditShow"
        closeable
        position="bottom"
        :style="{ height: '100%' }"
        round
        close-icon-position="top-left"
      >
        <ChannelEdit
         :myChannels="channelsList"
         :active="active"
          @update-active="onUpdateActive"
        >
        </ChannelEdit>
      </van-popup>
      <!-- /频道列表 -->

    </div>
  </div>
</template>

<script>
import { getUserChannelAPI } from '@/api'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channelsList: [],
      isChannelEditShow: false // 控制频道编辑器的展示状态
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadUserChannel () {
      try {
        let channels = []
        // 已登录 获取用户频道列表
        if (this.user) {
          const { data } = await getUserChannelAPI()
          channels = data.data.channels
        } else {
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            channels = localChannels
          } else {
            const { data } = await getUserChannelAPI()
            channels = data.data.channels
          }
        }
        this.channelsList = channels
        // console.log(data);
        // 未登录 获取本地频道列表 || 获取默认推荐列表
      } catch (err) {
        this.$toast('获取频道失败')
        console.log('获取频道失败')
      }
    },
    channelEditPopup () {
      this.isChannelEditShow = true
    },
    // ES6传参 形参 = 值
    // 如果有值传过来 形参就接收传过来的值
    // 如果没有值传过来就默认为设的值 - true
    onUpdateActive (index, isChannelEditShow = true) {
      console.log(index)
      // 关闭频道编辑面板
      this.isChannelEditShow = isChannelEditShow
      // 更新激活的频道项
      this.active = index
    }
  },
  created () {
    this.loadUserChannel()
    // console.log(Date.now());
  }
}
</script>

<style lang="less" scoped>
.home-container{
    padding: 174px 0px 98px;
    .search-btn{
      font-size: 28px;
      width: 555px;
      height: 64px;
      background: #5babfb;
      border: none;
    }
    .main{
      /deep/.channel-tabs{
        .van-tabs__wrap{
          height: 80px;
          position: fixed;
          top: 92px;
          z-index: 1;
          left: 0;
          right: 0;
        }
        .van-tab--active{
            color: #333333 !important;
        }
        .van-tab{
          width: 200px;
          border-right:1px solid #edeff3;
          // border-bottom:1px solid #edeff3;
          font-size: 30px;
          color: #777777;
        }
        .van-tabs__line{
          width: 31px !important;
          height: 6px;
          background-color: #3296fa !important;
          // margin-bottom: 9px;
          bottom: 8px;
        }
        // 由于原vant组件 van-tabs 有个默认padding-bottom
        // 会影响激活光条的 定位bottom，所以将其padding-bottom：0
        .van-tabs__nav{
          padding: 0;
        }
        .hamburger-btn{
          width: 66px;
          height: 82px;
          background-color: #fff;
          opacity: 0.902;
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          right: 0px;
          top: 92px;
          .icon-gengduo{
            font-size: 33px;
            // text-align: center;
          }
          &:before{
            content: "";
            position: absolute;
            left: 0;
            width: 2px;
            height: 100%;
            background-image: url("~@/assets/gradient-gray-line.png");
            background-size: contain;
          }
        }
        .placeholder{
          flex-shrink: 0;
          width: 66px;
          height: 82px;
        }
      }
    }
}
</style>
