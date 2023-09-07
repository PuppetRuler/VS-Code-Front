<template>
    <div class="student">
        <h2>学生姓名:{{ name }}</h2>
        <h2>学生年龄:{{ age }}</h2>
        <h2>计算得到的和是{{ number }}</h2>
        <button @click="add">点我+1</button>
        <button @click="sendStudentName">点我把学生name给App</button>
        <button @click="unbind">解绑atguigu事件</button>
        <button @click="death">点击摧毁当前student的实例对象</button>
    </div>
</template>

<script>
    export default {
        name:'Student',
        data(){
            return{
                name:'张三',
                age:19,
                number:0
            }
        },
        methods:{
            add(){
                console.log('add被调用了');
                this.number++
            },
            sendStudentName(){
                //触发了student组件实例对象身上的atguigu事件
                this.$emit('atguigu',this.name,666,888,777)
                // this.$emit('demo')
            },
            unbind(){
                this.$off('atguigu')  //解绑单个自定义事件
                // this.$off(['atguigu','demo'])  //解绑多个自定义事件
                // this.$off()  //解绑所有的自定义事件
            },
            death(){
                this.$destroy()  //销毁了当前Student的组件实例,销毁后所有Student实例的自定义事件全都不奏效。
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