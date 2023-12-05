// App -> A -> B

import { createContext, useContext } from "react";

// 1. createContext方法创建一个上下文对象
const ctx = createContext()

// 2. 在顶层组件通过Provider组件提供数据

// 3. 在底层组件通过useContext:钩子函数使用数据

const A = () => {
    return (
        <div>
            <span>A components</span>
            <B></B>
        </div>
    )
}

const B = () => {
    const msg = useContext(ctx)
    return (
        <div>
            <span>B components,msg:{msg}</span>
        </div>
    )
}

const App = () => {
    const msg = 'this is App msg'
    return (
        <ctx.Provider value={msg}>
            <div>
                <span>this is App</span>
                <A></A>
            </div>
        </ctx.Provider>
    );
};

export default App;