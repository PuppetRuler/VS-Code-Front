<template>
    <div>
        <button @click="isShow = !isShow">显示/隐藏</button>
        <transition name="hello" appear>
            <h1 v-show="isShow" class="come">大家好！</h1>
        </transition>
    </div>
</template>

<script>
    export default {
        name:'Test',
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
    .hello-enter-active{
        animation: 0.5s atguigu;
    }
    .hello-leave-active{
        animation: 0.5s atguigu reverse;
    }

    @keyframes atguigu {
        from{
            transform: translateX(-100%);
        }
        to{
            transform: translateX(0px);
        }
    }
</style>