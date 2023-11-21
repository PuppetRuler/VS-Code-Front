import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { request } from '@/utils/request'

type HotParams = PageParams & { subType?: string }

/**
 * @param url 请求路径
 * @param data 请求参数
 */
export const getHotRecommendApi = (url: string, data?: HotParams) => {
    return request<HotResult>({
        method: 'GET',
        url,
        data,
    })
}
