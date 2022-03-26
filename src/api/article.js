import request from '@/utils/request'
// 获取用户频道列表
export const getArticleDetails = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}

// 获取文章详情
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

// 收藏文章
export const collectArticles = artId => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: artId
    }
  })
}

// 取消收藏文章
export const delCollectArticles = artId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${artId}`
  })
}

// 点赞文章
export const addlikeArticles = artId => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: artId
    }
  })
}

// 取消点赞文章
export const dellikeArticles = artId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${artId}`
  })
}
