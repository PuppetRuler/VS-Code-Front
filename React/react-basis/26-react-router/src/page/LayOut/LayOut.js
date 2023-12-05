import { Link, Outlet } from "react-router-dom";

export default function LayOut(){
    return (
        <div>
        一级路由
        <Link to={'/'}>面板</Link>
        <Link to={'/about'}>关于</Link>

        {/* 二级路由配置 */}
        <Outlet></Outlet>
        </div>
    )
}