
const Son = (props) => {
    return (
        <div>
            <div>this is son</div>
            <div>{props.children}</div>
        </div>
    )
}

const App = () => {
    return (
        <div>
            <Son>
                <span>this is span</span>
            </Son>
        </div>
    );
};

export default App;