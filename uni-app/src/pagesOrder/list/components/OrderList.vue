<template>
    <!-- 订单列表 -->
    <scroll-view
        scroll-y
        class="orders"
        @scrolltolower="onScrolltolower"
        refresher-enabled
        @refresherrefresh="onRefresherrefresh"
        :refresher-triggered="isTriggered"
    >
        <view class="card" v-for="item in orderList" :key="item.id">
            <!-- 订单信息 -->
            <view class="status">
                <text class="date">{{ item.createTime }}</text>
                <!-- 订单状态文字 -->
                <text>{{ orderStateList[item.orderState].text }}</text>
                <!-- 待评价/已完成/已取消 状态: 展示删除订单 -->
                <text class="icon-delete"></text>
            </view>
            <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
            <navigator
                v-for="sku in item.skus"
                :key="sku.id"
                class="goods"
                :url="`/pagesOrder/detail/detail?id=${item.id}`"
                hover-class="none"
            >
                <view class="cover">
                    <image mode="aspectFit" :src="sku.image"></image>
                </view>
                <view class="meta">
                    <view class="name ellipsis">{{ sku.name }}</view>
                    <view class="type">{{ sku.attrsText }}</view>
                </view>
            </navigator>
            <!-- 支付信息 -->
            <view class="payment">
                <text class="quantity">共{{ item.totalNum }}件商品</text>
                <text>实付</text>
                <text class="amount"> <text class="symbol">¥</text>{{ item.totalMoney }}</text>
            </view>
            <!-- 订单操作按钮 -->
            <view class="action">
                <!-- 待付款状态：显示去支付按钮 -->
                <template v-if="item.orderState === OrderState.DaiFuKuan">
                    <view class="button primary" @tap="onOrderPay(item.id)">去支付</view>
                </template>
                <template v-else>
                    <navigator
                        class="button secondary"
                        :url="`/pagesOrder/order/order?orderId=${item.id}`"
                        hover-class="none"
                    >
                        再次购买
                    </navigator>
                    <!-- 待收货状态: 展示确认收货 -->
                    <view v-if="item.orderState === OrderState.DaiShouHuo" class="button primary"
                        >确认收货</view
                    >
                </template>
            </view>
        </view>
        <!-- 底部提示文字 -->
        <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
            {{ finish ? '没有更多数据~' : '正在加载...' }}
        </view>
    </scroll-view>
</template>

<script setup lang="ts">
    import {
        getMemberOrderApi,
        getPayMockApi,
        getPayWxPayMiniPayApi,
    } from '../../../services/order'
    import { ref, onMounted } from 'vue'
    import type { OrderItem } from '@/types/order'
    import type { OrderListParams } from '@/types/order'
    import { OrderState } from '../../../services/constants'
    import { orderStateList } from '../../../services/constants'
    // 获取屏幕边界到安全区域距离
    const { safeAreaInsets } = uni.getSystemInfoSync()
    // 页面参数
    const props = defineProps<{
        orderState: number
    }>()

    // 分页参数
    const page = ref(1)

    // 请求参数
    const queryParams: Required<OrderListParams> = {
        page: page.value,
        pageSize: 5,
        orderState: props.orderState,
    }

    // 已结束标记
    const finish = ref(false)
    // 获取订单列表
    const orderList = ref<OrderItem[]>([])
    const getMemberOrderData = async () => {
        // 页数已满，停止加载
        if (finish.value === true) {
            return uni.showToast({ icon: 'none', title: '已经没有更多数据了' })
        }
        // 发送请求
        const res = await getMemberOrderApi(queryParams)
        // 数组追加
        orderList.value.push(...res.result.items)
        // 分页条件
        if (queryParams.page < res.result.pages) {
            // 页码累加
            page.value++
            queryParams.page = page.value
        } else {
            finish.value = true
        }
    }

    // 触底分页
    const onScrolltolower = () => {
        getMemberOrderData()
    }

    const resetOrderData = () => {
        page.value = 1
        queryParams.page = page.value
        finish.value = false
        orderList.value = []
    }

    // 当前下拉刷新状态
    const isTriggered = ref(false)
    // 自定义下拉刷新
    const onRefresherrefresh = async () => {
        // 开启动画
        isTriggered.value = true
        // 重置猜你喜欢组件数据
        resetOrderData()
        await getMemberOrderData()
        // 关闭动画
        isTriggered.value = false
    }

    // 组件挂载
    onMounted(() => {
        getMemberOrderData()
    })

    // 订单支付
    // #ifdef MP-WEIXIN
    const onOrderPay = async (id: string) => {
        // 支付订单
        if (import.meta.env.DEV) {
            // 开发环境: 模拟支付-更新订单支付状态
            await getPayMockApi({ orderId: id })
        } else {
            // 生成环境:根据订单号获取为微信支付所需参数
            const res = await getPayWxPayMiniPayApi({ orderId: id })
            // 发起微信支付
            await wx.requestPayment(res.result)
        }
        // 支付成功，关闭当前页面，跳转到支付页
        uni.showToast({ title: '支付成功' })
        // 更新订单状态
        const order = orderList.value.find((v) => v.id === id)
        order!.orderState = OrderState.DaiFaHuo
    }
    // #endif
</script>

<style lang="scss">
    // 订单列表
    .orders {
        .card {
            min-height: 100rpx;
            padding: 20rpx;
            margin: 20rpx 20rpx 0;
            border-radius: 10rpx;
            background-color: #fff;

            &:last-child {
                padding-bottom: 40rpx;
            }
        }

        .status {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 28rpx;
            color: #999;
            margin-bottom: 15rpx;

            .date {
                color: #666;
                flex: 1;
            }

            .primary {
                color: #ff9240;
            }

            .icon-delete {
                line-height: 1;
                margin-left: 10rpx;
                padding-left: 10rpx;
                border-left: 1rpx solid #e3e3e3;
            }
        }

        .goods {
            display: flex;
            margin-bottom: 20rpx;

            .cover {
                width: 170rpx;
                height: 170rpx;
                margin-right: 20rpx;
                border-radius: 10rpx;
                overflow: hidden;
                position: relative;
            }

            .quantity {
                position: absolute;
                bottom: 0;
                right: 0;
                line-height: 1;
                padding: 6rpx 4rpx 6rpx 8rpx;
                font-size: 24rpx;
                color: #fff;
                border-radius: 10rpx 0 0 0;
                background-color: rgba(0, 0, 0, 0.6);
            }

            .meta {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            .name {
                height: 80rpx;
                font-size: 26rpx;
                color: #444;
            }

            .type {
                line-height: 1.8;
                padding: 0 15rpx;
                margin-top: 10rpx;
                font-size: 24rpx;
                align-self: flex-start;
                border-radius: 4rpx;
                color: #888;
                background-color: #f7f7f8;
            }

            .more {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22rpx;
                color: #333;
            }
        }

        .payment {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            line-height: 1;
            padding: 20rpx 0;
            text-align: right;
            color: #999;
            font-size: 28rpx;
            border-bottom: 1rpx solid #eee;

            .quantity {
                font-size: 24rpx;
                margin-right: 16rpx;
            }

            .amount {
                color: #444;
                margin-left: 6rpx;
            }

            .symbol {
                font-size: 20rpx;
            }
        }

        .action {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-top: 20rpx;

            .button {
                width: 180rpx;
                height: 60rpx;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 20rpx;
                border-radius: 60rpx;
                border: 1rpx solid #ccc;
                font-size: 26rpx;
                color: #444;
            }

            .secondary {
                color: #27ba9b;
                border-color: #27ba9b;
            }

            .primary {
                color: #fff;
                background-color: #27ba9b;
            }
        }

        .loading-text {
            text-align: center;
            font-size: 28rpx;
            color: #666;
            padding: 20rpx 0;
        }
    }
</style>
