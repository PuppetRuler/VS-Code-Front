<template>
    <div class="student">
        <h2>学生姓名:{{ name }}</h2>
        <h2>学生年龄:{{ age }}</h2>
        <button @click="sendStudentName">发送name给School组件</button>
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
        mounted(){
            console.log('Student',this.x);
        },
        methods:{
            sendStudentName(){
                this.$bus.$emit('hello',this.name)
            }
        }
    }
</script>

<style>
    .student{
        background-color: skyblue;
        padding: 5px;
    }
</style>