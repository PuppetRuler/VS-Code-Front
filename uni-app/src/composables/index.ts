import type { XtxGuessInstance } from '@/types/component'
import { ref } from 'vue'

export const useGuessList = () => {
    // 获取猜你喜欢组件实例
    const guessRef = ref<XtxGuessInstance>()
    // 滚动触底事件
    const onScrolltolower = () => {
        // 触底获取分页数据
        guessRef.value?.getMore()
    }
    // 返回ref和封装的函数
    return {
        guessRef,
        onScrolltolower,
    }
}
