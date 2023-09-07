<template>
    <div>
        <h2>我是About的内容</h2>
    </div>
</template>

<script>
    export default {
        name:'About',
        data(){
            return{
                
            }
        },
        mounted(){
            console.log('About挂载完毕了')
            window.aboutRoute = this.$route
            window.aboutRouter = this.$router
        }
    }
</script>