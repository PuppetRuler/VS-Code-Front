import type { LoginResult } from '@/types/member'
import { request } from '@/utils/request'

export type LoginParams = {
    code: string
    encryptedData: string
    iv: string
}

/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinApi = async (data: LoginParams) => {
    return await request<LoginResult>({
        method: 'POST',
        url: '/login/wxMin',
        data,
    })
}

/**
 * 小程序登录-内测版
 * @param phoneNumber 手机号码
 */
export const postLoginWxMinSimpleApi = async (phoneNumber: string) => {
    return await request<LoginResult>({
        method: 'POST',
        url: '/login/wxMin/simple',
        data: {
            phoneNumber,
        },
    })
}
