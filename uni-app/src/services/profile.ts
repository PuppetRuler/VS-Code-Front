import type { ProfileDetail, ProfileParams } from '@/types/member'
import { request } from '@/utils/request'

/** 获取个人信息 */
export const getMemberProfileApi = () => {
    return request<ProfileDetail>({
        method: 'GET',
        url: '/member/profile',
    })
}

/**
 * 更新表单信息
 * @param data 请求参数
 */
export const putMemberProfileApi = (data: ProfileParams) => {
    return request<ProfileDetail>({
        method: 'PUT',
        url: '/member/profile',
        data,
    })
}
