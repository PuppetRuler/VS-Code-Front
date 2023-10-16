<template>
    <h1 class="title">hello vue-cli</h1>
    <el-button type="primary">element按钮</el-button>
    <ul>
        <li>
            <router-link to="/home">Home</router-link>
        </li>
        <li>
            <router-link to="/about">About</router-link>
        </li>
    </ul>

    <router-view></router-view>
</template>

<script>
    import {ElButton} from 'element-plus'
    export default {
        name:'App',
        components:{
            ElButton,
        }
    }
</script>

<style>
    .title {
        color:skyblue
    }
</style>
