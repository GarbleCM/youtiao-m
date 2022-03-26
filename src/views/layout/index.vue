<template>
  <div class="layout-container">
      <!-- 子路由出口 -->
      <router-view/>

      <!-- 标签栏导航 tabbar -->
      <!--
        注意：当van-tabbar设置了route后active不起作用了，
              高亮选中状态由路径来控制激活状态
       -->
      <van-tabbar
      class="layout-tabbar"
      route
      >
        <van-tabbar-item replace to="/">
            <span class="text">首页</span><!--  -->
            <template #icon>
              <i class="iconfont icon-shouye"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/qa">
            <span class="text">问答</span>
            <template #icon>
              <i class="iconfont icon-wenda"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/video">
            <span class="text">视频</span>
            <template #icon>
              <i class="iconfont icon-shipin"></i>
            </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/mine">
            <span class="text">{{user? '我的':'未登录'}}</span>
            <template #icon>
              <i class="iconfont icon-wode"></i>
            </template>
        </van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.layout-container {
    .layout-tabbar {
        .iconfont {
            font-size: 40px;
        }
        .text {
            font-size: 20px;
        }
    }
}
</style>
