import request from '@/utils/request'
// 获取用户频道列表
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 添加用户频道(部分覆盖)
export const addUserChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除用户频道
export const deleteUserChannels = id => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`,
    params: {
      target: id
    }
  })
}
