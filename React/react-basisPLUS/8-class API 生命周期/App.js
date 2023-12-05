// class API 生命周期
import { Component, useState } from 'react';

class Son extends Component {
    // 生命周期函数
    // 组件渲染完成执行一次  发送网络请求
    componentDidMount() {
        console.log('组件渲染完毕了，请求发送');
        // 开启定时器
        this.timer = setInterval(() => {
            console.log('定时器启动中');
        }, 1000);
    }

    // 组件卸载的时候自动执行  副作用清除的工作  清除定时器  清除事件绑定
    componentWillUnmount() {
        console.log('组件son被修改了');
        // 清除定时器
        clearInterval(this.timer);
    }
    render() {
        return <div>I am Son</div>;
    }
}

function App() {
    const [show, setShow] = useState(true);
    return (
        <div>
            {show && <Son />}
            <button onClick={()=>setShow(false)}>change show</button>
        </div>
    );
}

export default App;