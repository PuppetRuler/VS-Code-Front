
function App() {
    // 基础绑定
    // function handleClick() {
    //     console.log('Click被点击了');
    // }

    // 事件参数e
    // function handleClick(e) {
    //     console.log('Click被点击了',e);
    // }

    // 自定义参数
    // function handleClick(name) {
    //     console.log('Click被点击了',name);
    // }

    // 既要传递自定义参数 而且还要事件对象e
    function handleClick(name,e) {
        console.log('Click被点击了',name);
    }

    return (
        <div className="App">
            <button onClick={(e)=>handleClick('Jack',e)}>点击我</button>
        </div>
    );
}

export default App;
