<template>
    <van-button
      round
      size="small"
      v-if="isFollowed"
      @click="onFollow"
      :loading="followLoading"
    >
      已关注
    </van-button>
    <van-button
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      v-else
      @click="onFollow"
      :loading="followLoading"
    >
      关注
    </van-button>
</template>

<script>
import { focusUserAPI, delfocusUserAPI } from '@/api'
export default {
  name: 'FollowUserIndex',
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      followLoading: false //  控制点击关注按钮的loading状态
    }
  },
  methods: {
    async onFollow () {
      this.followLoading = true
      try {
        if (this.isFollowed) {
          // 已关注
          const res = await delfocusUserAPI(this.userId)
          console.log(res)
        } else {
          // 未关注
          const { data } = await focusUserAPI(this.userId)
          console.log(data)
        }
        this.followLoading = false
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        this.followLoading = false
        let message = '操作失败，请重试！'
        console.log(err)
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
