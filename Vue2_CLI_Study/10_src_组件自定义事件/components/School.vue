<template>
    <div class="school">
        <h2>学校名称:{{ name }}</h2>
        <h2>学校地址:{{ address }}</h2>
        <button @click="sendSchoolName">点我把学校name给App</button>
    </div>
</template>

<script>
    export default {
        name: 'School',
        props:['getSchoolName'],
        data() {
            return {
                name: '尚硅谷',
                address: '北京'
            };
        },
        methods:{
            sendSchoolName(){
                this.getSchoolName(this.name)
            }
        }
    };
</script>

<style>
    .school{
        background-color: #ccc;
        padding: 5px;
        margin: 5px;
    }
</style>