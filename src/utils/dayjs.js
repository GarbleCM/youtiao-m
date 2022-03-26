import Vue from 'vue'
import dayjs from 'dayjs'
// dayjs默认语言是英文，我们这里配置为中文
// 所以要加载中文包
import 'dayjs/locale/zh-cn'

// 使用ES6 默认导入
// var relativeTime = require('dayjs/plugin/relativeTime')
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用相对时间的插件
dayjs.extend(relativeTime)

// 全局使用dayjs
dayjs.locale('zh-cn')

// 定义一个全局过滤器，然后就可以在任何组件的模板(template包裹的代码)中使用了
// 其实过滤器就相当于一个全局可用的方法
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
