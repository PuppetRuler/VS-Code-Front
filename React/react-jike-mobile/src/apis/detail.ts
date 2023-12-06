import { request } from "@/utils";
import { ResType } from "./response";
/**
 * 响应数据
 */
export type DetailData = {
    /**
     * 文章频道id
     */
    channel_id: number;
    /**
     * 文章内容
     */
    content: string;
    /**
     * 文章封面对象
     */
    cover: Cover;
    /**
     * 文章id
     */
    id: string;
    /**
     * 文章发布时间
     */
    pub_date: string;
    /**
     * 文章标题
     */
    title: string;
}

/**
 * 文章封面对象
 */
export type Cover = {
    /**
     * 文章封面图片数组
     */
    images: string[];
    /**
     * 文章封面类型，封面类型 -1:自动，0-无图，1-1张，3-3张
     */
    type: number;
}

export function getDetailApi(id:string) {
    return request.request<ResType<DetailData>>({
        url:`articles/${id}`
    })
}