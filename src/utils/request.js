import axios from 'axios'
import store from '@/store'
// import JSONBig from 'json-bigint'
const requset = axios.create({
  // 基础路径
  baseURL: 'http://toutiao.itheima.net'

  // 该API 用来 自定义后端返回的原始数据
  // data：后端返回的原始数据 -- JSON 格式的字符串(或不规范的数据)
  /* transformRequest: [function (data, headers) {
        try {
            // 转对象
            return JSONBig.parse(data)
        } catch(err){
            // 发生错误就原地返回原始data -- 用原生js JSON.parse()处理的数据
            return data
        }
    }], */
})

// JSONbigint --
//
// JSONBig.parse() - 把 JSON 格式的字符串转为(与JSON.parse()差不多)
// JSONBig.stringify() - 把js对象转为 JSON 格式的字符串(与JSON.stringify()差不多)
// JSONBig于JSON的区别是：可以处理数据中 超出 JS 安全整数范围的问题
//
// 使用方法:
//  1. JSONBig.parse('要转换的字符串') -- 得到一个加密的BigNumber类型的数据
//  2. 通过toString 将该类型的数据转换为 字符串 -- 正常的数据
// JSONbigint --

// 请求拦截器
// Add a request interceptor
requset.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config：本次请求的请求配置对象
  // config里面有一个属性 headers
  // console.log(config);
  // console.log(store.state );
  const { user } = store.state
  if (user && user.token) {
    // 注意：该接口需要授权才能访问
    //      token的数据格式：Bearer token数据
    //      Bearer后面有个空格
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意：在对config进行加工后一定要将其返回，不然请求就会卡在这里出不去
  return config
}, function (error) {
  // 如果请求出错了（还没有发出去）会进入这里
  // 这里一般不用修改
  return Promise.reject(error)
})
// 响应拦截器

export default requset
