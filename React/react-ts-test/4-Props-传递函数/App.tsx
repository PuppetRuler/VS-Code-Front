
type Props = {
  onGetMsg?:(msg:string)=>void
};
function Son(props:Props){
  const {onGetMsg} = props
  const clickHandler = () => {
    onGetMsg?.('this is msg')
  }
  return (
    <>
    <button onClick={clickHandler}>send Msg</button>
    </>
  )
}
function App() {
  const getMsgHandler = (msg:string) => {
      console.log(msg);
  }

  return (
    <>
      <Son onGetMsg={getMsgHandler}></Son>
    </>
  );
}

export default App;
