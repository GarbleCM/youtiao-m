<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('closeUpdateName')"
      @click-right="patchUserName"
    />
    <!-- /导航栏 -->
    <!-- 输入框 -->
    <div class="field-wrap">
        <van-field
            v-model.trim="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
            round
        />
    </div>
    <!-- /输入框 -->
  </div>
</template>

<script>
import { patchUserProfileAPI } from '@/api'
export default {
  name: 'UpdateName',
  data () {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async patchUserName () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示直到保存成功
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await patchUserProfileAPI({
          name: localName
        })
        this.$emit('input', this.localName)
        this.$emit('closeUpdateName')
        // console.log(data);
        this.$toast('昵称修改成功!')
      } catch (err) {
        this.$toast('操作失败，请重试！', err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.field-wrap{
    padding: 15px;
}
</style>
