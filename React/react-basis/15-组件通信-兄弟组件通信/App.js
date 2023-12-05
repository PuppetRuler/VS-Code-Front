// 使用状态提升实现兄弟组件通信
//  1. A组件先通过子传父的方式把数据传给父组件App
//  2. App拿到数据后通过父传子的方式再传递给B组件
import { useState } from "react";

const A = ({getMsg}) => {
    const msg = 'this is A msg'
    return (
        <div>
            <span>A components</span>
            <button onClick={()=>getMsg(msg)}>将数据传递给B组件</button>
        </div>
    )
}

const B = ({msg}) => {
    return (
        <div>B接收到的数据:{msg}</div>
    )
}

const App = () => {
    const [msg,setMsg] = useState('')
    const onGetMsg = (msg) => {
        setMsg(msg)
    }
    return (
        <div>
            <span>this is App</span>
            <A getMsg={onGetMsg}></A>
            <B msg={msg}></B>
        </div>
    );
};

export default App;