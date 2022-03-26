<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { postCommentAPI } from '@/api'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true, // 是否禁用点击背景
        duration: 0 // 提示展示时间默认为2000ms，若设置为0则持续展示直至下个提示组件被调用
      })
      try {
        const { data } = await postCommentAPI({
          target: this.target.toString(),
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId
        })
        // console.log(data);
        // 清空文本框
        this.message = ''
        // 发布成功后 - 清空输入框 - 最新内容置顶
        this.$emit('post-success', data.data)
        this.$toast.success('评论发布成功!')
      } catch (err) {
        this.$toast('操作失败，请重试！')
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
