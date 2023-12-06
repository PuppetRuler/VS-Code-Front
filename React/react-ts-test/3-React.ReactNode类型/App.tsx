
type Props = {
  className: string;
  children:React.ReactNode
};
function Son(props:Props){
  const {className,children} = props
  return (
    <>
      <input type="text" className={className} />
      {children}
    </>
  )
}
function App() {

  return (
    <>
      <div>this is app</div>
      <Son className="test" >this is children</Son>
    </>
  );
}

export default App;
