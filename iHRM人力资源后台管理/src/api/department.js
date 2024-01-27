import request from "@/utils/request";

export function getDepartmentListAPI() {
    return request({
        url: '/company/department',
        method: 'GET'
    })
}
