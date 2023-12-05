const isLoading = false

function App() {
    return (
        <div className="App">
            {/* 逻辑与 && */}
            {isLoading && <span>Loading...</span>}
            {/* 三元运算符 */}
            {isLoading?<span>Loading</span> : <span>Success Login</span>}
        </div>
    );
}

export default App;
