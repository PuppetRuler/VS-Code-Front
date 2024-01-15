// zustand 异步操作
import { useEffect } from "react";
import { create } from "zustand";

// 1. 创建store
// 语法容易出错
// 1. 函数参数必须返回一个对象 对象内部编写状态数据和方法
// 2. set用来修改数据的专门方法必须调用它来修改数据
// 语法1： 参数是函数 需要用到老数据的场景
// 语法2： 参数直接是一个对象  set({count:100})

// 拆分子模块 再组合起来

const createCounterStore = (set) => {
    return {
        // 状态数据
        count: 0,
        // 修改状态数据的方法
        inc: () => {
            set((state) => ({ count: state.count + 1 }));
        },
    }
}

const createChannelStore = (set) => {
    return {
        channelList: [],
        getChannelList: async () => {
            const res = await fetch('http://geek.itheima.net/v1_0/channels');
            const jsonRes = await res.json();
            set(() => ({
                channelList: jsonRes.data.channels
            }));
        }
    }
}

const useStore = create((...a) => {
    return {
        ...createCounterStore(...a),
        ...createChannelStore(...a)
    };
});

function App() {
    const { count, channelList, inc, getChannelList } = useStore();
    useEffect(() => {
        getChannelList()
    },[getChannelList])
    return (
        <div>
            <button onClick={inc}>{count}</button>
            <ul>
                {channelList.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    );
}

export default App;