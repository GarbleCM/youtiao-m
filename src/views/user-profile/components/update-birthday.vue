<template>
  <div class="update-birthhday">
    <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { patchUserProfileAPI } from '@/api'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 10, 1),
      // currentDate 需要的是对象字符串 通过new Date转换
      currentDate: new Date(this.value)
    }
  },
  methods: {
    // 点击完成按钮触发
    async onConfirm (birthday) {
      try {
        // console.log(birthday);
        // 将对象格式的日期 通过dayjs方式转换为 字符串格式日期
        const currentDate = dayjs(birthday).format('YYYY-MM-DD')
        // console.log(currentDate);
        this.$emit('updateBirthday', currentDate)
        this.$emit('close')
        await patchUserProfileAPI({
          birthday: currentDate
        })
        this.$toast.success('更新生日成功')
      } catch (err) {
        this.$toast.fail('操作失败，请重试！')
      }
    }
  }
}
</script>

<style>

</style>
