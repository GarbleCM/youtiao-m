<template>
  <div class="search-suggestion">
    <van-cell
     icon="search"
     v-for="(text, index) in suggestionList"
     :key="index"
     @click="$emit('search', text)"
    >
      <!--
        注意：{{ }} 双花括号绑定会直接输出纯文本内容
        So：使用v-html 指令可以绑定渲染带有 HTML 标签的字符串
        -->
      <div slot="title" v-html="highlight(text)"></div>

    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    SearchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestionList: []
    }
  },
  computed: {
  },
  watch: {
    SearchText: {
      // 当SearchText 发生改变时就调用handler函数 -- 发请求 获取联想建议
      // 注意：val是监测改变的最新值
      /* handler(val){
        console.log(val);
        this.loadSearchSuggestions(val)
      }, */

      // debounce 函数(防抖)
      // 参数1：一个函数, 参数为监听的值
      // 参数2：延迟时间 - 单位是毫秒
      // 返回值：防抖之后的函数，即过了n毫秒后执行函数
      handler: debounce(function (val) {
        this.loadSearchSuggestions(val)
      }, 200),

      // 由于search-suggestion出现的条件是用v-if格式的，是从新加载的
      // 那么当用户输入第一个字符时当前组件才被加载
      // 这意味正常情况下着第一次被加载时第一个字符无法被侦听，只有第二个字符开始才能侦听
      // 所以需要 immediate来开启立即侦听
      immediate: true // 为true时即handler回调从侦听开始立即执行
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestionsAPI(q)
        console.log(data)
        this.suggestionList = data.data.options
      } catch (err) {
        console.log('加载联想建议失败', err)
      }
    },
    highlight (text) {
      // 正则表达式 杠杠 - // 中间的内容都会当做匹配字符来使用，而不是数据变量，所以正常无法在//中写变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegEXP()
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串 - //包裹的字符串，它会根据这个数据变量解析出来的字符串创建正则表达式
      //    参数2：匹配模式， 要写到字符串中，g - 全局匹配  i - 忽略大小写
      const highlightStr = `<span class='active'>${this.SearchText}</span>`
      const reg = new RegExp(this.SearchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion{
  /deep/span.active{
    color: #3296fa;
  }
}
</style>
