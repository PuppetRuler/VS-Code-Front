<template>
    <div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <transition-group name="atguigu" appear>
            <h1 v-show="isShow" class="come" key="1">你好啊</h1>
            <h1 v-show="!isShow" class="come" key="2">尚硅谷</h1>
        </transition-group>
    </div>
</template>

<script>
    export default {
        name:'Test2',
        data(){
            return{
                isShow:true
            }
        },
    }
</script>

<style scope>
    h1{
        background-color: orange;
    }
    /* 进入的起点、离开的终点 */
    .atguigu-enter,.atguigu-leave-to{
        transform: translateX(-100%);
    }
    .atguigu-enter-active,.atguigu-leave-active{
        transition: 0.5s linear;
    }
    /* 进入的终点、离开的起点 */
    .atguigu-enter-to,.atguigu-leave{
        transform: translateX(0);
    }
</style>