// 路由模式：history模式和hash模式
import { createBrowserRouter,createHashRouter } from "react-router-dom";
import Login from '../page/Login/Login';
import Article from "../page/Article/Article";
import LayOut from "../page/LayOut/LayOut";
import About from "../page/About/About";
import Board from "../page/Board/Board";
import Notfound from "../page/Notfound/Notfound";

export const router = createBrowserRouter([
    // 二级路由配置
    {
        path: '/',
        element: <LayOut></LayOut>,
        children: [{
            // 设置为默认二级路由  一级路由访问的时候，它也能得到渲染
            index:true,
            element: <Board></Board>
        }, 
        {
            path: 'about',
            element: <About></About>
        }]
    },
    // 路由传参配置
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/article/:id/:name',
        element: <Article></Article>
    },
    {
        path:'*',
        element: <Notfound></Notfound>
    }
]);