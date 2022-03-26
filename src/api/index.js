import { login, sendSms, reToken } from '@/api/login'
import {
  getUserInfoT,
  focusUser,
  delfocusUser,
  getUserProfile,
  patchUserProfile
} from '@/api/mine'
import { getSearchSuggestions, getSearchResults } from '@/api/search'
import {
  getUserChannel,
  getAllChannels,
  addUserChannels,
  deleteUserChannels
} from '@/api/home'
import {
  getArticleDetails,
  getArticles,
  collectArticles,
  delCollectArticles,
  addlikeArticles,
  dellikeArticles
} from '@/api/article'
import {
  getComments,
  addCommentLike,
  delCommentLike,
  postComment
} from '@/api/comment'

/* login.js */
export const loginAPI = login // 获取登录权限(token)
export const sendSmsAPI = sendSms // 发送验证码
export const reTokenAPI = reToken // 刷新token

/* mine.js */
export const getUserInfoAPI = getUserInfoT // 获取用户自己的信息
export const focusUserAPI = focusUser // 关注用户
export const delfocusUserAPI = delfocusUser // 取消关注用户
export const getUserProfileAPI = getUserProfile // 获取用户个人资料 -- 编辑资料
export const patchUserProfileAPI = patchUserProfile // 编辑用户昵称

/* home.js */
export const getUserChannelAPI = getUserChannel // 获取用户频道列表
export const getAllChannelsAPI = getAllChannels // 获取所有频道列表
export const addUserChannelsAPI = addUserChannels // 添加用户频道
export const deleteUserChannelsAPI = deleteUserChannels // 删除用户频道

/* search.js */
export const getSearchSuggestionsAPI = getSearchSuggestions // 获取联想建议
export const getSearchResultsAPI = getSearchResults // 获取搜索结果

/* article.js */
export const getArticleDetailsAPI = getArticleDetails // 获取文章详情
export const getArticlesAPI = getArticles // 获取新闻列表
export const collectArticlesAPI = collectArticles // 收藏文章
export const delCollectArticlesAPI = delCollectArticles // 取消收藏文章
export const addlikeArticlesAPI = addlikeArticles // 点赞文章
export const dellikeArticlesAPI = dellikeArticles // 取消点赞文章

/* comment.js */
export const getCommentsAPI = getComments // 取消点赞文章
export const addCommentLikeAPI = addCommentLike // 点赞文章评论
export const delCommentLikeAPI = delCommentLike // 取消点赞文章评论
export const postCommentAPI = postComment // 添加文章/评论回复
