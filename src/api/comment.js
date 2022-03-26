import request from '@/utils/request'

// 获取评论或评论回复
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    // headers是发送请求头的固定key后面是一个对象
    params
  })
}

// 对评论或评论回复点赞
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    // headers是发送请求头的固定key后面是一个对象
    data: {
      target
    }
  })
}

// 对评论或评论回复点赞
export const delCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
    // headers是发送请求头的固定key后面是一个对象
  })
}

// 添加评论
export const postComment = data => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
