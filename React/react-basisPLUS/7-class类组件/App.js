// class API
import { Component } from 'react';

class Counter extends Component {
    // 编写组件的逻辑代码
    // 1.状态变量  2.事件回调  3.UI(JSX)
    // 状态变量
    state = {
        count: 0,
    };

    // 事件回调
    clickHandler = () => {
        // 修改状态变量 触发UI组件渲染
        this.setState({
            count: this.state.count + 1,
        });
    };

    // UI模版
    render() {
        return <button onClick={this.clickHandler}>+{this.state.count}</button>;
    }
}

function App() {
    return (
        <div>
            <Counter />
        </div>
    );
}

export default App;