// 该文件专门用于创建整个应用的路由器
import { createRouter, createWebHistory } from 'vue-router';
//引入组件
const Home = () => import('../views/Home');
const About = () => import('../views/About');

//创建并暴露一个路由器
export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: Home
        },
        {
            path: '/about',
            component: About
        },
    ]
});