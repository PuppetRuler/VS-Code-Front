// forwardRef
import { forwardRef, useRef } from 'react'

// 子组件
const Input = forwardRef((props, ref)=> {
  return <input type="text" ref={ref} />
}, [])

// 父组件
function App() {
  const sonRef = useRef()

  const focusHandle = () => {
    sonRef.current.focus()
  }

  return (
    <div>
      <Input ref={sonRef} />
      <button onClick={focusHandle}>focus</button>
    </div>
  )
}

export default App