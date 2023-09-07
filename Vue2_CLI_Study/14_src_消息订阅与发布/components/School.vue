<template>
    <div class="school">
        <h2>学校名称:{{ name }}</h2>
        <h2>学校地址:{{ address }}</h2>
    </div>
</template>

<script>
    import pubsub from 'pubsub-js'
    export default {
        name: 'School',
        data() {
            return {
                name: '尚硅谷',
                address: '北京'
            };
        },
        methods:{
            demo(msgName,data){
                console.log('有人发布了hello消息，hello消息的回调执行了',msgName,data,this);
            }
        },
        mounted(){
            // this.pubID = pubsub.subscribe('hello',(msgName,data)=>{
            //     console.log('有人发布了hello消息，hello消息的回调执行了',msgName,data);
            // })
            this.pubID = pubsub.subscribe('hello',this.demo)
        },
        beforeDestroy(){
            pubsub.unsubscript('this.pubID')
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