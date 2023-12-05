import { useEffect, useState } from "react";

const Son = () => {
    // 1. 渲染时开启一个定时器
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('定时器执行中...');
        }, 1000);

        return () => {
            // 清除副作用(组件卸载时)
            clearInterval(timer);
        };
    });

    return (
        <div>this is Son</div>
    );
};

const App = () => {
    // 通过条件渲染模拟组件卸载
    const [show, setShow] = useState(true);

    return (
        <div>
            <span>this is App</span>
            <button onClick={()=>setShow(false)}>isShowChild</button>
            {show && <Son />}
        </div>
    );
};

export default App;