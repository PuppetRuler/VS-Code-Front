<script setup lang="ts">
    import { getMemberProfileApi } from '@/services/profile'
    import type { ProfileDetail } from '../../types/member'
    import { ref } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    import { putMemberProfileApi } from '../../services/profile'
    import { useMemberStore } from '@/stores'
    import type { Gender } from '@/types/member'

    // 获取屏幕边界到安全区域距离
    const { safeAreaInsets } = uni.getSystemInfoSync()

    // 获取Store
    const memberStore = useMemberStore()
    // 获取个人信息
    const profile = ref({} as ProfileDetail)
    const getMemberProfileData = async () => {
        const res = await getMemberProfileApi()
        profile.value = res.result
    }

    // 更新用户头像
    const onAvatarChange = () => {
        // #ifdef MP-WEIXIN
        // 调用拍照/选择图片
        uni.chooseMedia({
            // 文件个数
            count: 1,
            // 文件类型
            mediaType: ['image'],
            success: (res) => {
                // 图片的本地文件路径
                const { tempFilePath } = res.tempFiles[0]
                // 上传文件
                uploadFile(tempFilePath)
            },
        })
        // #endif

        // #ifdef APP-PLUS || H5
        uni.chooseImage({
            count: 1,
            success: (success) => {
                uploadFile(success.tempFilePaths[0])
            },
        })
        // #endif
    }

    // 上传文件  封装
    const uploadFile = (tempFilePath: string) => {
        // 上传文件
        uni.uploadFile({
            url: '/member/profile/avatar', //接口地址
            name: 'file', // 接口参数
            filePath: tempFilePath, //文件路径
            success(res) {
                if (res.statusCode === 200) {
                    // 更新头像
                    profile.value!.avatar = JSON.parse(res.data).result.avatar
                    uni.showToast({
                        icon: 'success',
                        title: '更新成功',
                    })
                    memberStore.profile!.avatar = profile.value.avatar
                } else {
                    uni.showToast({
                        icon: 'error',
                        title: '更新失败',
                    })
                }
            },
        })
    }

    // 更新性别
    const onGenderChange: UniHelper.RadioGroupOnChange = (event) => {
        profile.value.gender = event.detail.value as Gender
    }

    // 更新生日
    const onBirthdayChange: UniHelper.DatePickerOnChange = (event) => {
        profile.value.birthday = event.detail.value
    }

    let fullLocationCode: [string, string, string] = ['', '', '']
    // 更新城市
    // #ifdef MP-WEIXIN
    const onRegionChange: UniHelper.RegionPickerOnChange = (event) => {
        // 前端数据更新
        profile.value.fullLocation = event.detail.code?.join(' ')
        // 后端数据更新
        fullLocationCode = event.detail.code!
    }
    // #endif
    // #ifdef H5 || APP-PLUS
    const onCityChange: UniHelper.UniDataPickerOnChange = (event) => {
        // 前端数据更新
        profile.value.fullLocation = event.detail.value.map((v) => v.text).join(' ')
        // 后端数据更新
        fullLocationCode = event.detail.value.map((v) => v.value) as [string, string, string]
    }
    // #endif

    // 点击保存提交表单
    const onSubmit = async () => {
        // 修改个人数据
        const { nickname, gender, birthday } = profile.value
        const res = await putMemberProfileApi({
            nickname,
            gender,
            birthday,
            provinceCode: fullLocationCode[0],
            cityCode: fullLocationCode[1],
            countyCode: fullLocationCode[2],
            profession: profile.value.profession,
        })
        memberStore.profile!.nickname = res.result.nickname

        // 弹出提示
        uni.showToast({ title: '保存成功', icon: 'success' })
        // 返回上一页
        setTimeout(() => {
            uni.navigateBack()
        }, 300)
    }

    onLoad(() => {
        getMemberProfileData()
    })
</script>

<template>
    <view class="viewport">
        <!-- 导航栏 -->
        <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
            <navigator
                open-type="navigateBack"
                class="back icon-left"
                hover-class="none"
            ></navigator>
            <view class="title">个人信息</view>
        </view>
        <!-- 头像 -->
        <view class="avatar" @tap="onAvatarChange">
            <view class="avatar-content">
                <image class="image" :src="profile?.avatar" mode="aspectFill" />
                <text class="text">点击修改头像</text>
            </view>
        </view>
        <!-- 表单 -->
        <view class="form">
            <!-- 表单内容 -->
            <view class="form-content">
                <view class="form-item">
                    <text class="label">账号</text>
                    <text class="account">{{ profile?.account }}</text>
                </view>
                <view class="form-item">
                    <text class="label">昵称</text>
                    <input
                        class="input"
                        type="text"
                        placeholder="请填写昵称"
                        v-model="profile.nickname"
                    />
                </view>
                <view class="form-item">
                    <text class="label">性别</text>
                    <radio-group @change="onGenderChange">
                        <label class="radio">
                            <radio value="男" color="#27ba9b" :checked="profile?.gender === '男'" />
                            男
                        </label>
                        <label class="radio">
                            <radio value="女" color="#27ba9b" :checked="profile?.gender === '女'" />
                            女
                        </label>
                    </radio-group>
                </view>
                <view class="form-item">
                    <text class="label">生日</text>
                    <picker
                        class="picker"
                        mode="date"
                        start="1900-01-01"
                        :end="new Date()"
                        :value="profile?.birthday"
                        @change="onBirthdayChange"
                    >
                        <view v-if="profile">{{ profile?.birthday }}</view>
                        <view class="placeholder" v-else>请选择日期</view>
                    </picker>
                </view>
                <view class="form-item">
                    <text class="label">城市</text>
                    <!-- #ifdef MP-WEIXIN -->
                    <picker
                        class="picker"
                        mode="region"
                        :value="profile?.fullLocation?.split(' ')"
                        @change="onRegionChange"
                    >
                        <view v-if="profile">{{ profile?.fullLocation }}</view>
                        <view class="placeholder" v-else>请选择城市</view>
                    </picker>
                    <!-- #endif -->
                    <!-- #ifdef H5 || APP-PLUS -->
                    <uni-data-picker
                        placeholder="请选择地址"
                        popup-title="请选择城市"
                        collection="opendb-city-china"
                        field="code as value, name as text"
                        orderby="value asc"
                        :step-searh="true"
                        self-field="code"
                        parent-field="parent_code"
                        :clear-icon="false"
                        @change="onCityChange"
                    >
                        <view v-if="profile">{{ profile?.fullLocation }}</view>
                        <view class="placeholder" v-else>请选择城市</view>
                    </uni-data-picker>
                    <!-- #endif -->
                </view>
                <view class="form-item">
                    <text class="label">职业</text>
                    <input
                        class="input"
                        type="text"
                        placeholder="请填写职业"
                        v-model="profile.profession"
                    />
                </view>
            </view>
            <!-- 提交按钮 -->
            <button class="form-button" @tap="onSubmit">保 存</button>
        </view>
    </view>
</template>

<style lang="scss">
    /* #ifdef H5 || APP-PLUS */
    :deep(.selected-area) {
        height: auto;
        flex: 0 1 auto;
    }
    /* #endif */
    page {
        background-color: #f4f4f4;
    }

    .viewport {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
        background-size: auto 420rpx;
        background-repeat: no-repeat;
    }

    // 导航栏
    .navbar {
        position: relative;

        .title {
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            color: #fff;
        }

        .back {
            position: absolute;
            height: 40px;
            width: 40px;
            left: 0;
            font-size: 20px;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    // 头像
    .avatar {
        text-align: center;
        width: 100%;
        height: 260rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .image {
            width: 160rpx;
            height: 160rpx;
            border-radius: 50%;
            background-color: #eee;
        }

        .text {
            display: block;
            padding-top: 20rpx;
            line-height: 1;
            font-size: 26rpx;
            color: #fff;
        }
    }

    // 表单
    .form {
        background-color: #f4f4f4;

        &-content {
            margin: 20rpx 20rpx 0;
            padding: 0 20rpx;
            border-radius: 10rpx;
            background-color: #fff;
        }

        &-item {
            display: flex;
            height: 96rpx;
            line-height: 46rpx;
            padding: 25rpx 10rpx;
            background-color: #fff;
            font-size: 28rpx;
            border-bottom: 1rpx solid #ddd;

            &:last-child {
                border: none;
            }

            .label {
                width: 180rpx;
                color: #333;
            }

            .account {
                color: #666;
            }

            .input {
                flex: 1;
                display: block;
                height: 46rpx;
            }

            .radio {
                margin-right: 20rpx;
            }

            .picker {
                flex: 1;
            }
            .placeholder {
                color: #808080;
            }
        }

        &-button {
            height: 80rpx;
            text-align: center;
            line-height: 80rpx;
            margin: 30rpx 20rpx;
            color: #fff;
            border-radius: 80rpx;
            font-size: 30rpx;
            background-color: #27ba9b;
        }
    }
</style>
