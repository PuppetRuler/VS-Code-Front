<template name="skeleton">
    <view class="sk-container">
        <view class="viewport">
            <view class="search">
                <view class="input">
                    <text
                        class="icon-search sk-transparent sk-text-14-2857-170 sk-text sk-pseudo sk-pseudo-circle"
                        >女靴</text
                    >
                </view>
            </view>
            <view class="categories">
                <scroll-view :scroll-y="true" class="primary">
                    <view class="item active sk-pseudo sk-pseudo-circle">
                        <text class="name sk-transparent sk-text-14-2857-820 sk-text">居家</text>
                    </view>
                    <view class="item sk-pseudo sk-pseudo-circle">
                        <text class="name sk-transparent sk-text-14-2857-198 sk-text">美食</text>
                    </view>
                    <view class="item sk-pseudo sk-pseudo-circle">
                        <text class="name sk-transparent sk-text-14-2857-883 sk-text">服饰</text>
                    </view>
                    <view class="item sk-pseudo sk-pseudo-circle">
                        <text class="name sk-transparent sk-text-14-2857-109 sk-text">母婴</text>
                    </view>
                    <view class="item sk-pseudo sk-pseudo-circle">
                        <text class="name sk-transparent sk-text-14-2857-431 sk-text">个护</text>
                    </view>
                    <view class="item sk-pseudo sk-pseudo-circle">
                        <text class="name sk-transparent sk-text-14-2857-692 sk-text">严选</text>
                    </view>
                    <view class="item sk-pseudo sk-pseudo-circle">
                        <text class="name sk-transparent sk-text-14-2857-334 sk-text">数码</text>
                    </view>
                    <view class="item sk-pseudo sk-pseudo-circle">
                        <text class="name sk-transparent sk-text-14-2857-366 sk-text">运动</text>
                    </view>
                    <view class="item sk-pseudo sk-pseudo-circle">
                        <text class="name sk-transparent sk-text-14-2857-111 sk-text">杂项</text>
                    </view>
                </scroll-view>
                <scroll-view :scroll-y="true" class="secondary">
                    <view is="components/XtxSwiper" class="banner">
                        <view class="carousel XtxSwiper--carousel">
                            <swiper
                                :circular="true"
                                :interval="3000"
                                :current="0"
                                :autoplay="false"
                            >
                                <swiper-item
                                    style="
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        transform: translate(0%, 0px) translateZ(0px);
                                    "
                                >
                                    <navigator
                                        class="navigator XtxSwiper--navigator"
                                        hover-class="none"
                                    >
                                        <image
                                            class="image XtxSwiper--image sk-image"
                                            mode="aspectFill"
                                        ></image>
                                    </navigator>
                                </swiper-item>
                                <swiper-item
                                    style="
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        transform: translate(100%, 0px) translateZ(0px);
                                    "
                                >
                                    <navigator
                                        class="navigator XtxSwiper--navigator"
                                        hover-class="none"
                                    >
                                        <image
                                            class="image XtxSwiper--image sk-image"
                                            mode="aspectFill"
                                        ></image>
                                    </navigator>
                                </swiper-item>
                                <swiper-item
                                    style="
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        transform: translate(-200%, 0px) translateZ(0px);
                                    "
                                >
                                    <navigator
                                        class="navigator XtxSwiper--navigator"
                                        hover-class="none"
                                    >
                                        <image
                                            class="image XtxSwiper--image sk-image"
                                            mode="aspectFill"
                                        ></image>
                                    </navigator>
                                </swiper-item>
                                <swiper-item
                                    style="
                                        position: absolute;
                                        width: 100%;
                                        height: 100%;
                                        transform: translate(-100%, 0px) translateZ(0px);
                                    "
                                >
                                    <navigator
                                        class="navigator XtxSwiper--navigator"
                                        hover-class="none"
                                    >
                                        <image
                                            class="image XtxSwiper--image sk-image"
                                            mode="aspectFill"
                                        ></image>
                                    </navigator>
                                </swiper-item>
                            </swiper>
                            <view class="indicator XtxSwiper--indicator">
                                <text class="dot XtxSwiper--dot active XtxSwiper--active"></text>
                                <text class="dot XtxSwiper--dot"></text>
                                <text class="dot XtxSwiper--dot"></text>
                                <text class="dot XtxSwiper--dot"></text>
                                <text class="dot XtxSwiper--dot"></text>
                            </view>
                        </view>
                    </view>
                    <view class="panel">
                        <view class="title">
                            <text class="name sk-transparent sk-text-26-6667-363 sk-text"
                                >居家生活用品</text
                            >
                            <navigator
                                class="more sk-transparent sk-text-30-0000-852 sk-text sk-pseudo sk-pseudo-circle"
                                hover-class="none"
                                >全部</navigator
                            >
                        </view>
                        <view class="section">
                            <navigator class="goods" hover-class="none">
                                <image class="image sk-image"></image>
                                <view
                                    class="name ellipsis sk-transparent sk-text-14-2857-87 sk-text"
                                    >梅乃宿梅酒720毫升</view
                                >
                                <view class="price">
                                    <text class="symbol sk-transparent sk-opacity">¥</text>
                                    <text class="number sk-transparent sk-text-14-2857-903 sk-text"
                                        >168.00</text
                                    >
                                </view>
                            </navigator>
                            <navigator class="goods" hover-class="none">
                                <image class="image sk-image"></image>
                                <view
                                    class="name ellipsis sk-transparent sk-text-14-2857-264 sk-text"
                                    >法国年份雅文邑700毫升</view
                                >
                                <view class="price">
                                    <text class="symbol sk-transparent sk-opacity">¥</text>
                                    <text class="number sk-transparent sk-text-14-2857-51 sk-text"
                                        >1480.00</text
                                    >
                                </view>
                            </navigator>
                            <navigator class="goods" hover-class="none">
                                <image class="image sk-image"></image>
                                <view
                                    class="name ellipsis sk-transparent sk-text-14-2857-849 sk-text"
                                    >多米尼加陈年朗姆酒700毫升</view
                                >
                                <view class="price">
                                    <text class="symbol sk-transparent sk-opacity">¥</text>
                                    <text class="number sk-transparent sk-text-14-2857-729 sk-text"
                                        >238.00</text
                                    >
                                </view>
                            </navigator>
                            <navigator class="goods" hover-class="none">
                                <image class="image sk-image"></image>
                                <view
                                    class="name ellipsis sk-transparent sk-text-14-2857-189 sk-text"
                                    >川味牛肉辣椒酱190克</view
                                >
                                <view class="price">
                                    <text class="symbol sk-transparent sk-opacity">¥</text>
                                    <text class="number sk-transparent sk-text-14-2857-548 sk-text"
                                        >38.00</text
                                    >
                                </view>
                            </navigator>
                            <navigator class="goods" hover-class="none">
                                <image class="image sk-image"></image>
                                <view
                                    class="name ellipsis sk-transparent sk-text-14-2857-555 sk-text"
                                    >全新升级，四川酸辣粉195克*6杯</view
                                >
                                <view class="price">
                                    <text class="symbol sk-transparent sk-opacity">¥</text>
                                    <text class="number sk-transparent sk-text-14-2857-905 sk-text"
                                        >69.00</text
                                    >
                                </view>
                            </navigator>
                            <navigator class="goods" hover-class="none">
                                <image class="image sk-image"></image>
                                <view
                                    class="name ellipsis sk-transparent sk-text-14-2857-375 sk-text"
                                    >极光限定 珠光蓝珐琅锅</view
                                >
                                <view class="price">
                                    <text class="symbol sk-transparent sk-opacity">¥</text>
                                    <text class="number sk-transparent sk-text-14-2857-580 sk-text"
                                        >199.00</text
                                    >
                                </view>
                            </navigator>
                            <navigator class="goods" hover-class="none">
                                <image class="image sk-image"></image>
                                <view
                                    class="name ellipsis sk-transparent sk-text-14-2857-386 sk-text"
                                    >钻石陶瓷涂层多用锅18cm 小奶锅</view
                                >
                            </navigator>
                            <navigator class="goods" hover-class="none">
                                <image class="image sk-image"></image>
                                <view
                                    class="name ellipsis sk-transparent sk-text-14-2857-91 sk-text"
                                    >智利老牌名庄，梅洛干红750毫升</view
                                >
                            </navigator>
                            <navigator class="goods" hover-class="none">
                                <image class="image sk-image"></image>
                                <view
                                    class="name ellipsis sk-transparent sk-text-14-2857-221 sk-text"
                                    >红小豆450克*3袋</view
                                >
                            </navigator>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<style>
    .sk-transparent {
        color: transparent !important;
    }
    .sk-text-14-2857-170 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 39.2rpx;
        position: relative !important;
    }
    .sk-text {
        background-origin: content-box !important;
        background-clip: content-box !important;
        background-color: transparent !important;
        color: transparent !important;
        background-repeat: repeat-y !important;
    }
    .sk-text-14-2857-820 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 36.4rpx;
        position: relative !important;
    }
    .sk-text-14-2857-198 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 36.4rpx;
        position: relative !important;
    }
    .sk-text-14-2857-883 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 36.4rpx;
        position: relative !important;
    }
    .sk-text-14-2857-109 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 36.4rpx;
        position: relative !important;
    }
    .sk-text-14-2857-431 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 36.4rpx;
        position: relative !important;
    }
    .sk-text-14-2857-692 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 36.4rpx;
        position: relative !important;
    }
    .sk-text-14-2857-334 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 36.4rpx;
        position: relative !important;
    }
    .sk-text-14-2857-366 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 36.4rpx;
        position: relative !important;
    }
    .sk-text-14-2857-111 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 36.4rpx;
        position: relative !important;
    }
    .sk-text-26-6667-363 {
        background-image: linear-gradient(
            transparent 26.6667%,
            #eeeeee 0%,
            #eeeeee 73.3333%,
            transparent 0%
        ) !important;
        background-size: 100% 60rpx;
        position: relative !important;
    }
    .sk-text-30-0000-852 {
        background-image: linear-gradient(
            transparent 30%,
            #eeeeee 0%,
            #eeeeee 70%,
            transparent 0%
        ) !important;
        background-size: 100% 60rpx;
        position: relative !important;
    }
    .sk-text-14-2857-87 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 30.8rpx;
        position: relative !important;
    }
    .sk-opacity {
        opacity: 0 !important;
    }
    .sk-text-14-2857-903 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 33.6rpx;
        position: relative !important;
    }
    .sk-text-14-2857-264 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 30.8rpx;
        position: relative !important;
    }
    .sk-text-14-2857-51 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 33.6rpx;
        position: relative !important;
    }
    .sk-text-14-2857-849 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 30.8rpx;
        position: relative !important;
    }
    .sk-text-14-2857-729 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 33.6rpx;
        position: relative !important;
    }
    .sk-text-14-2857-189 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 30.8rpx;
        position: relative !important;
    }
    .sk-text-14-2857-548 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 33.6rpx;
        position: relative !important;
    }
    .sk-text-14-2857-555 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 30.8rpx;
        position: relative !important;
    }
    .sk-text-14-2857-905 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 33.6rpx;
        position: relative !important;
    }
    .sk-text-14-2857-375 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 30.8rpx;
        position: relative !important;
    }
    .sk-text-14-2857-580 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 33.6rpx;
        position: relative !important;
    }
    .sk-text-14-2857-386 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 30.8rpx;
        position: relative !important;
    }
    .sk-text-14-2857-91 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 30.8rpx;
        position: relative !important;
    }
    .sk-text-14-2857-221 {
        background-image: linear-gradient(
            transparent 14.2857%,
            #eeeeee 0%,
            #eeeeee 85.7143%,
            transparent 0%
        ) !important;
        background-size: 100% 30.8rpx;
        position: relative !important;
    }
    .sk-image {
        background: #efefef !important;
    }
    .sk-pseudo::before,
    .sk-pseudo::after {
        background: #efefef !important;
        background-image: none !important;
        color: transparent !important;
        border-color: transparent !important;
    }
    .sk-pseudo-rect::before,
    .sk-pseudo-rect::after {
        border-radius: 0 !important;
    }
    .sk-pseudo-circle::before,
    .sk-pseudo-circle::after {
        border-radius: 50% !important;
    }
    .sk-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: transparent;
    }
</style>
