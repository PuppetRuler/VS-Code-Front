// 导入样式
import './index'

const style = {
    color:'red',
    fontSize:'50px'
}

function App() {

    return (
        <div className="App">
            {/* 行内样式控制 */}
            <span style={style}>this is span</span>
            {/* 通过class类名控制 */}
            <span className='foo'>this is span</span>
        </div>
    );
}

export default App;
