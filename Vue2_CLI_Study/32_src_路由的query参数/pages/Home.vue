<template>
    <div>
        <div>
            <h2>Home组件内容</h2>
            <div>
                <ul class="nav nav-tabs">
                    <li>
                        <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
                    </li>
                    <li>
                        <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
                    </li>
                </ul>
                <ul>
                    <router-view></router-view>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {

            };
        },
        mounted() {
            console.log('Home挂载完毕了');
            window.homeRoute = this.$route;
            window.homeRouter = this.$router;
        }
    };
</script>