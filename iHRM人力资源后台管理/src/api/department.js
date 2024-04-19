import request from "@/utils/request";

/**
 * 获取部门列表
 */
export function getDepartmentListAPI() {
    return request({
        url: '/company/department',
        method: 'GET'
    })
}

/**
 * 获取部门负责人的列表
 */
export function getDeptManagerListAPI(){
    return request({
        url: '/sys/user/simple',
        method: 'GET'
    })
}
