// useImperativeHandle
import { forwardRef, useImperativeHandle, useRef } from 'react'

// 子组件
const MyInput = forwardRef(function Input(props, ref) {
  // 实现内部的聚焦逻辑
  const inputRef = useRef(null)
  const focusHandler = () => inputRef.current.focus()

  // 暴露子组件内部的聚焦方法
  useImperativeHandle(ref, () => {
    return {
        // 暴露方法
        focusHandler,
    }
  })

  return <input ref={inputRef} type="text" />
})
// 父组件
function App() {
  const sonRef = useRef(null)

  const focusHandle = () => sonRef.current.focusHandler()

  return (
    <div>
      <MyInput ref={sonRef} />
      <button onClick={focusHandle}>focus</button>
    </div>
  )
}

export default App