//引入Vue
import Vue from 'vue';
//引入App组件
import App from './App.vue';
//引入vue-router
import VueRouter from 'vue-router'
//引入路由器
import router from './router/index'

Vue.config.productionTip = false
//使用插件
Vue.use(VueRouter)

new Vue({
    el: '#app',
    render: h => h(App),
    router:router
});