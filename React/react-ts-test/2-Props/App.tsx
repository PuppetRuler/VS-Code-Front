
type Props = {
  className: string;
};
function Son(props:Props){
  const {className} = props
  return (
    <input type="text" className={className} />
  )
}
function App() {

  return (
    <>
      <div>this is app</div>
      <Son className="test" />
    </>
  );
}

export default App;
