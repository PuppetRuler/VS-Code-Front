<template>
    <div>
        <h2>学生姓名:{{ name }}</h2>
        <h2>学生年龄:{{ age }}</h2>
        <input type="text" v-fbind:value="name">
    </div>
</template>

<script>
    export default {
        name:'Student',
        data(){
            return{
                name:'张三',
                age:19,
                x:666
            }
        },
    }
</script>