// 核心：在子组件中调用父组件中的函数并传递实参
import { useState } from "react";


const Son = ({getMsg}) => {
    const msg = 'this is son msg'
    return (
        <div>
            <div>this is son</div>
            <button onClick={()=>getMsg(msg)}> 点击获取子组件数据</button>
        </div>
    )
}

const App = () => {
    const [msg,setMsg] = useState('')
    const onGetMsg = (msg) => {
        setMsg(msg)
    }
    return (
        <div>
            <Son getMsg={onGetMsg}></Son>
            <div>子组件Msg: {msg}</div>
        </div>
    );
};

export default App;