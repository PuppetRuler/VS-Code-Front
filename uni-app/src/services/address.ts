import type { AddressItem, AddressParams } from '@/types/address'
import { request } from '@/utils/request'
/**
 * 会员中心-地址管理
 * @param data 收货地址参数
 */
export const postMemberAddressApi = (data: AddressParams) => {
    return request({
        method: 'POST',
        url: '/member/address',
        data,
    })
}

/** 获取收货地址列表 */
export const getMemberAddressApi = () => {
    return request<AddressItem[]>({
        method: 'GET',
        url: '/member/address',
    })
}

/**
 * 获取收货地址详情
 * @param id 地址id
 */
export const getMemberAddressByIdApi = (id: string) => {
    return request<AddressItem>({
        method: 'GET',
        url: `/member/address/${id}`,
    })
}

/**
 * 修改收货地址
 * @param id 地址id
 * @param data 收货地址项
 */
export const putMemberAddressByIdApi = (id: string, data: AddressParams) => {
    return request({
        method: 'PUT',
        url: `/member/address/${id}`,
        data,
    })
}

/**
 * 删除收货地址
 * @param id 地址id
 */
export const deleteMemberAddressByIdApi = (id: string) => {
    return request({
        method: 'DELETE',
        url: `/member/address/${id}`,
    })
}
