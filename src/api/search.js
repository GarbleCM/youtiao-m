import request from '@/utils/request'
// 获取联想建议
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: `/v1_0/suggestion?q=${q}`
  })
}
// 获取搜索结果
export const getSearchResults = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
