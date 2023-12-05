// React中获取DOM
import { useRef } from 'react';

// 1. useRef:生成ref对象绑定到dom标签身上

// 2. dom可用时，ref.current获取dom
// 渲染完毕之后dom生成之后才可用

const App = () => {
    const inputRef = useRef(null)

    const showDOM = () => {
        console.dir(inputRef.current);
    }
    return (
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={showDOM}>点击获取DOM</button>
        </div>
    );
};

export default App;