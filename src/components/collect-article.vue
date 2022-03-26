<template>
    <van-button
        :border="false"
        :class="{collected :value}"
        :icon="value? 'star': 'star-o'"
        class="collect"
        @click="onCollected"
        :loading="collectLoading"
    />
</template>

<script>
import { collectArticlesAPI, delCollectArticlesAPI } from '@/api'
export default {
  name: 'CollectArticleIndex',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    art_id: {
      type: [Number, Object, String],
      required: true
    }
  },
  data () {
    return {
      collectLoading: false
    }
  },
  methods: {
    async onCollected () {
      this.collectLoading = true
      try {
        if (this.value) {
          // 已收藏
          const res = await delCollectArticlesAPI(this.art_id)
          console.log(res)
        } else {
          // 未收藏
          const { data } = await collectArticlesAPI(this.art_id)
          console.log(data)
        }
        this.collectLoading = false
        this.$emit('input', !this.value)
        this.$toast.success(this.value ? '取消收藏' : '收藏成功')
      } catch (err) {
        this.collectLoading = false
        let message = '操作失败，请重试！'
        //  console.log(err);
        if (err.response && err.response.status === 400) {
          message = '收藏失败'
        }
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.collected{
    .van-icon{
        color: #ffa500;
        font-size: 40px;
    }
}
.collect{
    border: unset;
    padding: unset;
}
.van-icon{
    font-size: 40px;
}
</style>
