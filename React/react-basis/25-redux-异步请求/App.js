import { useSelector,useDispatch } from "react-redux";
// 导入actionCreater
import { increment,decrement,addToNum } from "./store/modules/counterStore";
import { useEffect } from "react";
import { fetchChannelList } from "./store/modules/channelStore";

function App() {
    const { count } = useSelector(store=>store.counter)
    const {channelList} = useSelector(store=>store.channel)
    const dispatch = useDispatch()
    // 使用useEffect触发异步请求的执行
    useEffect(() => {
            dispatch(fetchChannelList())  //这个地方识别到了fetchChannelList里return的dispatch
    },[dispatch])
    return (
        <div className="App">
            <button onClick={()=>dispatch(decrement())}>-</button>
            {count}
            <button onClick={()=>dispatch(increment())}>+</button>
            <button onClick={()=>{dispatch(addToNum(10))}}>add to 10</button>
            <button onClick={()=>{dispatch(addToNum(20))}}>add to 20</button>
            <ul>
            {channelList.map(item=> <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    );
}

export default App;