<template>
    <div>
        <h1>{{ msg }}</h1>
        <h2>学生姓名:{{ name }}</h2>
        <h2>学生年龄:{{ myAge+1 }}</h2>
        <button @click="updateAge">点我改变年龄</button>
    </div>
</template>

<script>
    export default {
        name:'Student',
        data(){
            return{
                msg:'我是尚硅谷的一个学生',
                myAge:this.age
            }
        },
        methods:{
            updateAge(){
                this.myAge++
            }
        },
        //简单声明接收
        props:['name','age']

        //接收的同时对数据进行类型限制
        /* props:{
            name:String,
            age:Number
        } */

        //接收的同时:对数据进行类型限制+默认值的指定+必要值的限制
        /* props:{
            name:{
                type:String,
                required:true  //是否是必要数据
            },
            age:{
                type:Number,
                default:99  //默认值
            }
        } */
    }
</script>