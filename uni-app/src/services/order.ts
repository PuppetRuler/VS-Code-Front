import type {
    OrderCreateParams,
    OrderListParams,
    OrderListResult,
    OrderLogisticResult,
    OrderPreResult,
    OrderResult,
} from '@/types/order'
import { request } from '@/utils/request'
/**
 * 填写订单-获取预付订单
 * @param id 请求参数
 */
export const getMemberOrderPreApi = () => {
    return request<OrderPreResult>({
        method: 'GET',
        url: `/member/order/pre`,
    })
}

/**
 * 填写订单-获取立即购买订单
 * @param data 请求参数
 */
export const getMemberOrderPreNowApi = (data: {
    skuId: string
    count: string
    addressId?: string
}) => {
    return request<OrderPreResult>({
        method: 'GET',
        url: `/member/order/pre/now`,
        data,
    })
}

/**
 * 提交订单
 * @param data 请求参数
 */
export const postMemberOrderApi = (data: OrderCreateParams) => {
    return request<{ id: string }>({
        method: 'POST',
        url: '/member/order',
        data,
    })
}

/**
 * 获取订单详情
 * @param id 请求参数
 */
export const getMemberOrderByIdApi = (id: string) => {
    return request<OrderResult>({
        method: 'GET',
        url: `/member/order/${id}`,
    })
}

/**
 * 填写订单-再次购买
 * @param id 订单id
 */
export const getMemberOrderRepurchaseByIdApi = (id: string) => {
    return request<OrderPreResult>({
        method: 'GET',
        url: `/member/order/repurchase/${id}`,
    })
}

/**
 * 获取微信支付参数
 * @param data 订单id
 */
export const getPayWxPayMiniPayApi = (data: { orderId: string }) => {
    return request<WechatMiniprogram.RequestPaymentOption>({
        method: 'GET',
        url: '/pay/wxPay/miniPay',
        data,
    })
}

/**
 * 模拟支付-内测版
 * @param data 订单id
 */
export const getPayMockApi = (data: { orderId: string }) => {
    return request({
        method: 'GET',
        url: '/pay/mock',
        data,
    })
}

/**
 * 模拟发货-内测版
 * @param id 订单id
 */
export const getMemberOrderConsignmentByIdApi = (id: string) => {
    return request({
        method: 'GET',
        url: `/member/order/consignment/${id}`,
    })
}

/**
 * 确认收货
 * @param id 订单id
 */
export const putMemberOrderIdReceiptApi = (id: string) => {
    return request<OrderResult>({
        method: 'PUT',
        url: `/member/order/${id}/receipt`,
    })
}

/**
 * 获取订单物流
 * @description 仅在订单状态为待收货，待评价，已完成时，可获取物流信息。
 * @param id 订单id
 */
export const getMemberOrderLogisticsByIdApi = (id: string) => {
    return request<OrderLogisticResult>({
        method: 'GET',
        url: `/member/order/${id}/logistics`,
    })
}

/**
 * 删除订单
 * @description 仅在订单状态为待评价，已完成，已取消时，可删除订单。
 * @param data ids 订单集合
 */
export const deleteMemberOrderApi = (data: { ids: string[] }) => {
    return request({
        method: 'DELETE',
        url: `/member/order`,
        data,
    })
}

/**
 * 获取订单列表
 * @param data orderState 订单状态
 */
export const getMemberOrderApi = (data: OrderListParams) => {
    return request<OrderListResult>({
        method: 'GET',
        url: `/member/order`,
        data,
    })
}
