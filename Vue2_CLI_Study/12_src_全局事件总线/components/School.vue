<template>
    <div class="school">
        <h2>学校名称:{{ name }}</h2>
        <h2>学校地址:{{ address }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'School',
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
        },
        mounted(){
            this.$bus.$on('hello',(data)=>{
                console.log('我是School组件，我收到了:',data);
            })
        },
        beforeDestroy(){
            this.$off('hello')  //用完傀儡一定要将傀儡解绑自定义事件
        }
    };
</script>

<style>
    .school{
        background-color: #ccc;
        padding: 5px;
        margin: 5px 0px;
    }
</style>