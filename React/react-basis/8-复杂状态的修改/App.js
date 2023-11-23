// useState实现一个计数器按钮
import {useState} from 'react'

function App() {
    // 1. 调用useState添加一个状态变量
    // count 状态变量
    // setCount 修改状态变量的方法
    const [count,setCount] = useState(0)

    // 2. 点击事件回调
    const handleClick = () => {
        // 作用：1.用传入的新值修改count
        //       2.重新使用新的count渲染UI
        setCount(count+1)
    }

    const [form, setForm] = useState({name:'jack'})

    const changeForm = () => {
        // 错误写法
        // form.name = 'john'
        // 正确写法：setFrom传入一个全新的对象
        setForm({
            ...form,
            name:'john'
        })
    }

    return (
        <div className="App">
            <button onClick={handleClick}>{count}</button>
            <button onClick={changeForm}>form状态: {form.name}</button>
        </div>
    );
}

export default App;
