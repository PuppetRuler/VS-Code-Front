import { useSelector,useDispatch } from "react-redux";
// 导入actionCreater
import { increment,decrement } from "./store/modules/counterStore";

function App() {
    const { count } = useSelector(store=>store.counter)
    const dispatch = useDispatch()
    return (
        <div className="App">
            <button onClick={()=>dispatch(decrement())}>-</button>
            {count}
            <button onClick={()=>dispatch(increment())}>+</button>
        </div>
    );
}

export default App;