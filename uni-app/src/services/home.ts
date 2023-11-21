import type { PageParams, PageResult } from '@/types/global'
import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/types/home'
import { request } from '@/utils/request'
/* 
    首页-广告区域-小程序
    @param distributionSite 广告区域展示位置 1 为首页（默认值） 2 为商品分类页
*/
export const getHomeBannerApi = (distributionSite = 1) => {
    return request<BannerItem[]>({
        method: 'GET',
        url: '/home/banner',
        data: {
            distributionSite,
        },
    })
}

/* 
    首页-前台分类-小程序
*/
export const getHomeCategoryApi = () => {
    return request<CategoryItem[]>({
        method: 'GET',
        url: '/home/category/mutli',
    })
}

/* 
    首页-热门推荐-小程序
*/
export const getHomeHotApi = () => {
    return request<HotItem[]>({
        method: 'GET',
        url: '/home/hot/mutli',
    })
}

/* 猜你喜欢-小程序
GET
 */
export const getHomeGoodsGuessLikeApi = (data?: PageParams) => {
    return request<PageResult<GuessItem>>({
        method: 'GET',
        url: '/home/goods/guessLike',
        data,
    })
}
