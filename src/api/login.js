// 封装 登录/注册请求函数
import requset from '@/utils/request'
import { getItem } from '@/utils/storage'
export const login = data => {
  return requset({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
/*
发送验证码
注意：每个手机号每分钟只能发送一次
*/
// export const sendSms = mobile =>{
//     return requset({
//         method: 'GET',
//         url: `/v1_0/sms/codes/${mobile}`,
//     })
// }
export const sendSms = mobile => {
  return requset({
    method: 'GET',
    url: `v1_0/sms/codes/${mobile}`
  })
}

// 刷新用户token
export const reToken = (key) => {
  return requset({
    method: 'PUT',
    url: '/v1_0/authorizations',
    data: {
      Authorization: getItem(key).refresh_token
    }
  })
}
