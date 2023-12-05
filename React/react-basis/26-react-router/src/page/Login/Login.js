import { Link, useNavigate } from "react-router-dom";
export default function Article() {

    const navigate = useNavigate()

    return (
        <div>
            登录页
            {/* 声明式路由导航 */}
            <Link to={'/article'}>前往文章页</Link>
            {/* 编程式路由导航 */}
            {/* <button onClick={()=>navigate('/article?id=1001&name=jack')}>前往文章页</button> */}
            <button onClick={()=>navigate('/article/1001/jack')}>前往文章页</button>
        </div>
    );
}
