import { request } from "@/utils";
/**
 * 发表文章相关的请求
 */
export const getChannelApi = () => {
    return request({
        method:'GET',
        url:'/channels',
    })
}
/**
 * 发送文章表单
 * @param {*} data 请求参数
 */
export const createArticleApi = (data) => {
    return request({
        method:'POST',
        url:'/mp/articles?draft=false',
        data
    })
}
/**
 * 获取文章列表
 * @param {*} params 请求参数
 */
export const getArticleListApi = (params) => {
    return request({
        method:'GET',
        url:'/mp/articles',
        params
    })
}
/**
 * 删除文章
 * @param {*} id 
 */
export const deleteArticleApi = (id) => {
    return request({
        method:'DELETE',
        url:`/mp/articles/${id}`,
    })
}
/**
 * 获取-文章详情
 * @param {*} id 文章id
 */
export const getArticleByIdApi = (id) => {
    return request({
        method:'GET',
        url:`/mp/articles/${id}`
    })
}

/**
 * 编辑-文章
 * @param {*} data 请求参数
 */
export const upDateArticleApi = (data) => {
    return request({
        method:'PUT',
        url:`/mp/articles/${data.id}}?draft=false`,
        data
    })
}