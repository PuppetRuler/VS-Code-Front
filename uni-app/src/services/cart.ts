import type { CartItem } from '@/types/cart'
import { request } from '@/utils/request'

/**
 * 加入购物车
 * @param data 请求参数
 */
export const postMemberCartApi = (data: { skuId: string; count: number }) => {
    return request({
        method: 'POST',
        url: '/member/cart',
        data,
    })
}

/**
 * 获取购物车
 */
export const getMemberCartApi = () => {
    return request<CartItem[]>({
        method: 'GET',
        url: '/member/cart',
    })
}

/**
 * 删除/清空购物车单品
 * @param data ids SKUId[]
 */
export const deleteMemberCartApi = (data: { ids: string[] }) => {
    return request<CartItem[]>({
        method: 'DELETE',
        url: '/member/cart',
        data,
    })
}

/**
 * 修改购物车单品
 * @param skuId SKUId
 * @param data selected 选中状态 count 商品数量
 */
export const putMemberCartByIdApi = (
    skuId: string,
    data: { selected?: boolean; count?: number },
) => {
    return request({
        method: 'PUT',
        url: `/member/cart/${skuId}`,
        data,
    })
}

/**
 * 购物车全选/取消全选
 * @param selected 是否全选
 */
export const putMemberCartSelectedApi = (data: { selected: boolean }) => {
    return request({
        method: 'PUT',
        url: '/member/cart/selected',
        data,
    })
}
