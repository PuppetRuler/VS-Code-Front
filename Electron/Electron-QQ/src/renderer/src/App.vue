<template>
    <div class="page-layout">
        <div class="layout-sidebar">
            <div class="user-profile">
                <img class="avatar" src="./assets/avatar.jpg" alt="" />
                <span class="status"></span>
            </div>
            <div class="menu-list">
                <a class="menu active" href="javascript:;">
                    <span class="iconfont icon-message"></span>
                </a>
                <a class="menu" href="javascript:;">
                    <span class="iconfont icon-user"></span>
                </a>
            </div>
        </div>
        <div class="layout-workbench">
            <div class="dragable layout-workbench-titlebar">
                <input class="input" type="text" />
                <span class="iconfont icon-plus"></span>
            </div>
            <div class="history-message">
                <div class="user-info">
                    <img class="avatar" src="./assets/avatar.jpg" alt="" />
                    <div class="extra">
                        <span class="nickname">lotjol</span>
                        <span class="message">hello everyone!</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="resize-line"></div>
        <div class="layout-main">
            <div class="dragable layout-main-titlebar">
                <span class="nickname">lotjol</span>
            </div>
            <div class="layout-main-messages">
                <div :class="['message', msg.role]" v-for="msg in messages" :key="msg.id">
                    <img class="avatar" :src="msg.avatar" />
                    <div class="text">{{ msg.text }}</div>
                </div>
            </div>
            <div class="layout-main-toolkit">
                <textarea
                    v-model.trim="text"
                    class="textarea"
                    @keyup.enter="sendMessage"
                ></textarea>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref } from 'vue'
    import myAvatar from './assets/avatar.jpg?asset'
    import youAvatar from './assets/avatar_2.webp?asset'

    // 初始消息数据
    const messages = reactive([
        {
            id: '6796796786',
            role: 'me',
            avatar: myAvatar,
            text: 'hello everyone!',
        },
        {
            id: '967778786896',
            role: 'you',
            avatar: youAvatar,
            text: 'nice to meet you!',
        },
    ])

    const text = ref('')

    const sendMessage = () => {
        messages.push({
            id: Date.now(),
            role: messages.length % 2 === 0 ? 'me' : 'you',
            avatar: messages.length % 2 === 0 ? myAvatar : youAvatar,
            text: text.value,
        })
        // 清空输入
        text.value = ''
    }
</script>

<style lang="less">
    @import './styles.less';
</style>
