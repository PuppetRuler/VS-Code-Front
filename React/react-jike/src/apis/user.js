// 用户相关请求
import { request } from "@/utils";

export const loginApi = (loginForm) => {
    return request({
        method:'POST',
        url:'/authorizations',
        data:loginForm
    })
}

export const getUserProfileApi = () => {
    return request({
        method:'GET',
        url:'/user/profile',
    })
}