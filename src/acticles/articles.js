import request from '../utils/request'
import { API_CHANNELS, API_ARTICLES, API_COLLECT, API_AUTHORIZATIONS, API_STATUS, API_PHOTO, API_USER } from '../constant/api'
export function getchannels () { // 获取频道
  return request({
    url: API_CHANNELS
  })
}
export function getarticles (articleId, formData, judge) { // 新建或修改文章
  return request({
    url: articleId ? `${API_ARTICLES}/${articleId}` : API_ARTICLES,
    method: articleId ? 'put' : 'post',
    data: formData,
    params: { draft: judge }
  })
}
export function getarticlesid (articleId) { // 获取指定文章
  return request({
    url: `${API_ARTICLES}/${articleId}`
  })
}
export function getcollect (id, iscollected) { // 收藏图片
  return request({
    url: `${API_COLLECT}/${id}`,
    method: 'put',
    data: {
      collect: !iscollected
    }
  })
}
export function getdelete (id) { // 删除图片
  return request({
    url: `${API_COLLECT}/${id}`,
    method: 'delete'
  })
}
export function getpicture (from) { // 上传图片
  return request({
    url: API_COLLECT,
    method: 'post',
    data: from
  })
}
export function getimg (mold, currentPage, pageSize) { // 获取图片
  return request({
    url: API_COLLECT,
    params: {
      collect: mold === 'collect',
      page: currentPage,
      per_page: pageSize
    }
  })
}
export function getregister (phone, auth) { // 登录
  return request({
    url: API_AUTHORIZATIONS,
    method: 'post',
    data: {
      mobile: phone,
      code: auth
    }
  })
}
export function getamend (id) { // 修改内容
  return request({
    url: `${API_ARTICLES}/${id}`,
    method: 'delete'
  })
}
export function getdata (params) { // 获取文章
  return request({
    url: API_ARTICLES,
    params
  })
}
export function getstate (pagesizes, currentpage) { // 获取评论 分页页面
  return request({
    url: API_ARTICLES,
    params: { response_type: 'comment', per_page: pagesizes, page: currentpage }
  })
}
export function getstatus (id, commentstatus) { // 状态
  return request({
    url: API_STATUS,
    method: 'put',
    params: {
      article_id: id
    },
    data: {
      allow_comment: !commentstatus
    }
  })
}
export function getphoto (data) { // 上传图像
  return request({
    url: API_PHOTO,
    method: 'patch',
    data: data
  })
}
export function getuser (formData) { // 更该用户信息
  return request({
    url: API_USER,
    method: 'patch',
    data: formData
  })
}
export function getusers () {
  return request({
    url: API_USER
  })
}
