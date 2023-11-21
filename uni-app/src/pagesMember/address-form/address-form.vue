<script setup lang="ts">
    import { ref } from 'vue'
    import {
        getMemberAddressByIdApi,
        postMemberAddressApi,
        putMemberAddressByIdApi,
    } from '../../services/address'
    import { onLoad } from '@dcloudio/uni-app'
    import type { UniFormsInstance } from '@uni-helper/uni-ui-types'

    // 表单数据
    const form = ref({
        receiver: '', // 收货人
        contact: '', // 联系方式
        fullLocation: '', // 省市区(前端展示)
        provinceCode: '', // 省份编码(后端参数)
        cityCode: '', // 城市编码(后端参数)
        countyCode: '', // 区/县编码(后端参数)
        address: '', // 详细地址
        isDefault: 0, // 默认地址，1为是，0为否
    })

    const query = defineProps<{
        id: string
    }>()

    uni.setNavigationBarTitle({ title: query.id ? '修改地址' : '新增地址' })

    // 根据id获取收货地址详情
    const getMemberAddressByIdData = async () => {
        if (query.id) {
            // 发送请求
            const res = await getMemberAddressByIdApi(query.id)
            // 合并到表单数据中
            Object.assign(form.value, res.result)
        }
    }

    // 页面加载时
    onLoad(() => {
        getMemberAddressByIdData()
    })

    // 获取省市区
    const onRegionChange: UniHelper.RegionPickerOnChange = (event) => {
        // 省市区(前端展示)
        form.value.fullLocation = event.detail.value.join(' ')
        // 后端参数
        const [provinceCode, cityCode, countyCode] = event.detail.code!
        Object.assign(form.value, { provinceCode, cityCode, countyCode })
    }

    // 是否设为默认地址
    const onSwitchChange: UniHelper.SwitchOnChange = (event) => {
        form.value.isDefault = event.detail.value ? 1 : 0
    }

    // 定义规则
    const rules: UniHelper.UniFormsRules = {
        receiver: {
            rules: [{ required: true, errorMessage: '请填入收货人' }],
        },
        contact: {
            rules: [
                { required: true, errorMessage: '请填入联系方式' },
                { pattern: /^1[3-9]\d{9}$/, errorMessage: '请填入联系方式' },
            ],
        },
        fullLocation: {
            rules: [{ required: true, errorMessage: '请填入收货地址' }],
        },
        address: {
            rules: [{ required: true, errorMessage: '请填入详细地址' }],
        },
    }

    // 表单组件实例
    const formRef = ref<UniFormsInstance>()

    // 提交表单
    const onSubmit = async () => {
        try {
            // 表单校验
            await formRef.value?.validate?.()
            // 校验通过，发送请求
            if (query.id) {
                await putMemberAddressByIdApi(query.id, form.value)
            } else {
                // 发送请求
                await postMemberAddressApi(form.value)
            }
            // 提示成功
            uni.showToast({ icon: 'success', title: query.id ? '修改成功' : '新建成功' })
            setTimeout(() => {
                // 返回上一页
                uni.navigateBack()
            }, 300)
        } catch (error) {
            // 校验失败，提示用户
            uni.showToast({ icon: 'fail', title: '校验错误' })
        }
    }
</script>

<template>
    <view class="content">
        <uni-forms ref="formRef" :rules="rules" :model="form">
            <!-- 表单内容 -->
            <uni-forms-item name="receiver" class="form-item">
                <text class="label">收货人</text>
                <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
            </uni-forms-item>
            <uni-forms-item name="contact" class="form-item">
                <text class="label">手机号码</text>
                <input class="input" placeholder="请填写收货人手机号码" v-model="form.contact" />
            </uni-forms-item>
            <uni-forms-item name="fullLocation" class="form-item">
                <text class="label">所在地区</text>
                <picker
                    @change="onRegionChange"
                    class="picker"
                    mode="region"
                    :value="form.fullLocation.split(' ')"
                >
                    <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
                    <view v-else class="placeholder">请选择省/市/区(县)</view>
                </picker>
            </uni-forms-item>
            <uni-forms-item name="address" class="form-item">
                <text class="label">详细地址</text>
                <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
            </uni-forms-item>
            <view class="form-item">
                <label class="label">设为默认地址</label>
                <switch
                    @change="onSwitchChange"
                    class="switch"
                    color="#27ba9b"
                    :checked="form.isDefault === 1"
                />
            </view>
        </uni-forms>
    </view>
    <!-- 提交按钮 -->
    <button @tap="onSubmit" class="button">保存并使用</button>
    <view>{{ form }}</view>
</template>

<style lang="scss">
    page {
        background-color: #f4f4f4;
    }

    .content {
        margin: 20rpx 20rpx 0;
        padding: 0 20rpx;
        border-radius: 10rpx;
        background-color: #fff;

        .form-item,
        .uni-forms-item {
            display: flex;
            align-items: center;
            min-height: 96rpx;
            padding: 25rpx 10rpx 40rpx;
            background-color: #fff;
            font-size: 28rpx;
            border-bottom: 1rpx solid #ddd;
            position: relative;
            margin-bottom: 0;

            // 调整 uni-forms 样式
            .uni-forms-item__content {
                display: flex;
            }

            .uni-forms-item__error {
                margin-left: 200rpx;
            }

            &:last-child {
                border: none;
            }

            .label {
                width: 200rpx;
                color: #333;
            }

            .input {
                flex: 1;
                display: block;
                height: 46rpx;
            }

            .switch {
                position: absolute;
                right: -20rpx;
                transform: scale(0.8);
            }

            .picker {
                flex: 1;
            }

            .placeholder {
                color: #808080;
            }
        }
    }

    .button {
        height: 80rpx;
        margin: 30rpx 20rpx;
        color: #fff;
        border-radius: 80rpx;
        font-size: 30rpx;
        background-color: #27ba9b;
    }
</style>
../../services/address
