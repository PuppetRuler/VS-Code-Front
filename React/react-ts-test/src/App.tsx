import { useState } from "react";

type User = {
  name: string;
  age: number;
};
function App() {
  // 1.限制初始值的类型
  // const [user,setUser] = useState<User>({
  //   name:'jack',
  //   age:18
  // })
  // const [user,setUser] = useState<User>(() => (
  //   {
  //     name:'jack',
  //     age:18
  //   }
  // ))

  const [user, setUser] = useState<User>({
    name: "jack",
    age: 18,
  });

  const changeUser = () => {
    setUser({
      name:'mike',
      age:19
    })
  }

  return (
    <>
      <div>this is app</div>
    </>
  );
}

export default App;
