import { request } from "@/utils"
import { ResType } from "./response"

// 2. 定义具体接口类型
export type ChannelItem = {
    id:number,
    name:string
}

type ChannelRes = {
    channels:ChannelItem[]
}

/**
 * 请求频道列表
 */
export function getChannelApi(){
    return request.request<ResType<ChannelRes>>({
        url:'/channels'
    })
}

type articleListItem = {
    art_id:string,
    title:string,
    aut_id:string,
    comm_count:number,
    pubdate:string,
    aut_name:string,
    is_top:number,
    cover:{
        type:number,
        images:string[],
    }
}

export type articleList = {
    results:articleListItem[],
    pre_timestamp:string,
}

type reqParams = {
    channel_id:string,
    timestamp:string,
}

/**
 * 请求文章列表
 * @param params 请求参数 
 */
export function getArticleListApi(params:reqParams) {
    return request.request<ResType<articleList>>({
        url:'/articles',
        params
    })
}