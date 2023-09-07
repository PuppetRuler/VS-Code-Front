<template>
    <div class="demo">
        <h2>学生姓名:{{ name }}</h2>
        <h2 class="atguigu">学生年龄:{{ age }}</h2>
    </div>
</template>

<script>
    export default {
        name:'Student',
        data(){
            return{
                name:'张三',
                age:19,
            }
        },
    }
</script>

<style scoped lang="less">
    .demo{
        background-color: orange;
        .atguigu{
            font-size: 60px;
        }
    }
</style>