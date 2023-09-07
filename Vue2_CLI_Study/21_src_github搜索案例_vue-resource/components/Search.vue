<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div>
            <input type="text" placeholder="enter the name you search" v-model="keyWord" />
            &nbsp;
            <button @click="searchUsers">Search</button>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                keyWord:''
            };
        },
        methods:{
            searchUsers(){
                //请求前更新List数据
                this.$bus.$emit('updateListData',{isFirst:false,isLoading:true,error:'',users:[]})

                this.$http.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
                    response => {
                        //请求成功后更新List数据
                        console.log('请求成功了');
                        this.$bus.$emit('updateListData',{isLoading:false,error:'',users:response.data.items})
                    },
                    error => {
                        //请求失败后更新List数据
                        this.$bus.$emit('updateListData',{isLoading:false,error:error.message,users:response.data.items})
                    }
                )
            }
        }
    };
</script>

<style></style>