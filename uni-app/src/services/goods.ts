import type { GoodsResult } from '@/types/goods'
import { request } from '@/utils/request'

/**
 * 商品详情
 * @param id 商品id
 */
export function getGoodsByIdApi(id: string) {
    return request<GoodsResult>({
        method: 'GET',
        url: '/goods',
        data: { id },
    })
}
