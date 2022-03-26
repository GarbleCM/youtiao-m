<template>
  <div class="update-gender">
    <van-picker
        title="修改性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="$emit('close')"
        :default-index="value"
    />
  </div>
</template>

<script>
import { patchUserProfileAPI } from '@/api'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    // 点击完成按钮触发
    async onConfirm (gender, index) {
      try {
        this.$emit('updateGender', index)
        this.$emit('close')
        await patchUserProfileAPI({
          gender: index
        })
        // console.log(data);
        this.$toast.success('更新性别成功')
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
      }
    }
  }
}
</script>

<style>

</style>
