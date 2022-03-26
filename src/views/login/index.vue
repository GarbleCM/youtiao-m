<template>
  <div class="login-contain">
    <!-- 导航栏 -->
    <van-nav-bar
    title="登录"
    class="page-nav-bar"
    fixed
    left-arrow
    @click-left="$router.back()"
    />
    <!--
      表单验证：
        1、给van-field 组件配置 rules 验证规则
        2、当表单提交的时候会自动触发表单验证
           如果验证通过， 会触发submit事件
           如果验证失败， 不会触发submit事件
     -->
    <van-form @submit="onSubmit" ref="loginForm">
        <van-field
          name="mobile"
          placeholder="请输入手机号"
          v-model="user.mobile"
           :rules="userFormRules.mobile"
          type="number"
          maxlength="11"
        >
          <template v-slot:left-icon>
            <i class="iconfont icon-shouji"></i>
          </template>
        </van-field>
        <van-field
          v-model="user.code"
          name="code"
          type="number"
          maxlength="6"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
        >
          <template v-slot:left-icon>
            <i class="iconfont icon-yanzhengma"></i>
          </template>
          <!--
            把验证码按钮的native-type设为button不然会触发表单提交事件
           -->
          <template #button>
            <van-count-down
            :time="time"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
            />
            <van-button
            v-else
            native-type="button"
            size="small"
            type="default"
            class="send-sms-btn"
            round
            @click="onSendSms"
            >发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
        </div>
    </van-form>
      <!-- 验证表单 -->

  </div>
</template>

<script>
import { sendSmsAPI, loginAPI } from '@/api'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /1[3|5|7|8]\d{9}/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      time: 60 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    // 提交表单事件函数
    async onSubmit () {
      // 1. 获取表单数据

      // 2. 表单验证
      // 点击登录后出现 登录中 并禁止点击背景
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 是否禁用点击背景
        duration: 0 // 提示展示时间默认为2000ms，若设置为0则持续展示直至下个提示组件被调用
      })
      // 3. 提交表单请求登录
      try {
        const value = this.user
        // console.log(value);
        const { data: { data } } = await loginAPI(value)
        console.log(data)
        // console.log('登录成功',data);
        this.$toast.success('登录成功')
        this.$store.commit('setUser', data)
        // 登录成功后 - 跳转到原来页面
        this.$router.back()
      } catch (err) {
        console.log(err)
        if (err.response.status === 400) {
          // console.log('手机或验证码错误');
          this.$toast.fail('手机或验证码错误')
        } else {
          // console.log('登陆失败，请稍后重试',err);
          this.$toast.fail('登陆失败，请稍后重试')
        }
      }
      // 4. 根据请求响应结果处理后续操作
    },
    // 发送验证码事件函数
    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证成功')
      } catch (err) { // 若验证失败让代码停止往下执行
        return console.log('验证失败', err)
      }
      // 2. 手机号验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSmsAPI(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败时 让倒计时隐藏
        this.isCountDownShow = false
        if (err.response.status === 404) {
          this.$toast('手机号不正确')
        } else if (err.response.status === 429) {
          this.$toast('验证码发送频繁，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-contain{
    padding-top: 90px;
    .iconfont{
      font-size: 37px;
    }
    .send-sms-btn{
      background-color: #ededed;
      // width: 152px;
      height: 46px;
      line-height: 46px;
      font-size: 22px;
      color: #666666;
    }
    .login-btn-wrap{
      padding: 53px 33px;
      .login-btn{
        background-color: #6db4fb;
        border: none;
      }
    }
}
</style>
