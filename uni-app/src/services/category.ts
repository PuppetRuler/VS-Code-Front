import type { CategoryTopItem } from '@/types/category'
import { request } from '@/utils/request'

/** 分类列表-小程序 */
export const getCategoryTopApi = async () => {
    return await request<CategoryTopItem[]>({
        method: 'GET',
        url: '/category/top',
    })
}
