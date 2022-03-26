<template>
  <div class="mine-container">
      <!-- 已登录 - 我的 -->
      <div v-if="user" class="header user-info">
        <div class="base-info">
          <div class="left">
            <van-image
              class="avatar"
              round
              fit="cover"
              :src="userInfo.photo"
            />
            <span class="username">{{userInfo.name}}</span>
          </div>
          <div class="right">
            <van-button
            size="mini"
            round
            to="/user/profile"
            >
            编辑资料
            </van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{ userInfo.art_count }}</span>
              <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.follow_count }}</span>
            <span class="text" >关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text" >粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text" >获赞</span>
          </div>
        </div>
      </div>
      <!-- 未登录 - 我的 -->
      <div v-else class="header not-login">
        <div class="login-btn" @click="$router.push('/login')">
          <img class="mobile-img" src="~@/assets/mobile.png" alt="">
          <span class="text">登录 / 注册</span>
        </div>
      </div>

      <!-- 宫格导航 -->
      <van-grid :column-num="2" class="grid-nav" clickable>
        <van-grid-item class="grid-item">
          <template #icon>
            <i class="iconfont icon-shoucang"></i>
          </template>
          <template #text>
            <span class="text">收藏</span>
          </template>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <template #icon>
            <i class="iconfont icon-lishi"></i>
          </template>
          <template #text>
            <span class="text">历史</span>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- /宫格导航 -->
      <!-- 消息通知 - 小智同学 - 退出登录 -->
      <van-cell-group class="lgout-group">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </van-cell-group>
      <van-cell clickable @click="onLonOut" v-if="user" title="退出登录" class="lgout-cell"/>
      <!-- /消息通知 - 小智同学 - 退出登录 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfoAPI } from '@/api/index.js'
export default {
  name: 'MineIndex',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    onLonOut () {
      // 方法调用要使用 this.$
      this.$dialog.confirm({
        // 提示标题
        title: '退出提示',
        message: '确认退出吗'
      }) // 确认提示后 调用vuex中的setUser方法把user为null
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('点击了取消按钮')
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfoAPI()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
        console.log(err)
      }
    }
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  }

}
</script>

<style lang="less" scoped>
.mine-container{
  .header{
    background: url('~@/assets/banner.png');
    background-size: cover;
    height: 361px;
  }
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img{
        width: 132px;
        height: 132px;
      }
      .text{
        font-size: 28px;
        color: #fff;
        margin-top: 15px;
      }
    }
  }
  .user-info{
    padding: 0 32px;
    .base-info{
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding-top: 76px;
      padding-bottom: 23px;
      height: 231px;
      // background-color: pink;
      .left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .avatar{
          border: 5px solid #fff;
          width: 132px;
          height: 132px;
        }
        .username{
          font-size: 30px;
          color: #fff;
          margin-left: 23px;
        }
      }
    }
    .data-stats{
      display: flex;
      align-items: center;
      // background-color: skyblue;
        .data-item{
          height: 130px;
          flex: 1;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          .count{
            font-size: 36px;
            color: #fff;
            margin-bottom: 3px;
          }
          .text{
            font-size: 23px;
            color: #fff;
          }
        }
    }
  }
  .grid-nav{
    .grid-item{
      height: 141px;
      i.iconfont{
        font-size: 45px;
      }
      i.icon-shoucang{
        color: #eb5253;
      }
      i.icon-lishi{
        color: #ff9d1d;
      }
      span.text{
        font-size: 28px;
        margin-top: 10px;
      }
    }
  }
  .lgout-group{
    margin: 9px 0;
  }
  .lgout-cell{
    text-align: center;
    color: #d86262;
    font-size: 30px;
  }
}
</style>
