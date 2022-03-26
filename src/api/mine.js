import request from '@/utils/request'

// 获取用户自己的信息
export const getUserInfoT = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers是发送请求头的固定key后面是一个对象
  })
}

// 关注用户
export const focusUser = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
    // headers是发送请求头的固定key后面是一个对象
  })
}

// 取消关注用户
export const delfocusUser = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
    // headers是发送请求头的固定key后面是一个对象
  })
}

// 获取用户个人资料 -- 编辑资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
    // headers是发送请求头的固定key后面是一个对象
  })
}

// 编辑用户昵称
export const patchUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
