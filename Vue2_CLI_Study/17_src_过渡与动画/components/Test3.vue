<template>
    <div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <transition-group 
            name="animate__animated animate__bounce" 
            appear
            enter-active-class="animate__swing"
            leave-active-class="animate__backOutUp"
        >
            <h1 v-show="isShow" class="come" key="1">你好啊</h1>
            <h1 v-show="!isShow" class="come" key="2">尚硅谷</h1>
        </transition-group>
    </div>
</template>

<script>
    import 'animate.css'
    export default {
        name:'Test3',
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
</style>