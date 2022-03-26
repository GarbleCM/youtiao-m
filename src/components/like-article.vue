<template>
    <van-button
        :border="false"
        :class="{liked :value === 1 }"
        :icon="value === 1 ? 'good-job': 'good-job-o'"
        class="like-article"
        @click="onLike"
        :loading="likeLoading"
    />
</template>

<script>
import {
  addlikeArticlesAPI,
  dellikeArticlesAPI
} from '@/api'
export default {
  name: 'likeArticleIndex',
  props: {
    value: {
      type: Number,
      required: true
    },
    art_id: {
      type: [Number, Object, String],
      required: true
    }
  },
  data () {
    return {
      likeLoading: false
    }
  },
  methods: {
    async onLike () {
      this.likeLoading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞
          const res = await dellikeArticlesAPI(this.art_id)
          console.log(res)
        } else {
          // 未点赞
          const { data } = await addlikeArticlesAPI(this.art_id)
          console.log(data)
          status = 1
        }
        this.$emit('input', status)
        this.likeLoading = false
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.likeLoading = false
        let message = '操作失败，请重试！'
        //  console.log(err);
        if (err.response && err.response.status === 400) {
          message = '点赞失败'
        }
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.liked{
    .van-icon{
        color: #ffa500;
        font-size: 40px;
    }
}
.like-article{
    border: unset;
    padding: unset;
}
.van-icon{
    font-size: 40px;
}
</style>
