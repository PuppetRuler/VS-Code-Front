// 组件通信-父传子
// 1. 父组件传递数据子组件标签身上绑定属性
// 2. 子组件接收数据 props的参数

const Son = (props) => {
    // props:对象里面包含了父组件传递过来的所有的数据
    // {"name":"父组件中的数据"}
    return (
        <div>
            <div>{props.name}</div>
            <div>this is son</div>
        </div>
    );
};

const App = () => {
    const name = 'this is app name';
    return (
        <div>
            <Son 
            name={name}
            age={18}
            isTrue={false}
            list={['vue', 'react']}
            obj={{ name: 'jack' }}
            cb={() => console.log(123)}
            child={<span>this is span</span>}
            ></Son>
        </div>
    );
};

export default App;