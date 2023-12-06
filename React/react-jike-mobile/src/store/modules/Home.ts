import { create } from 'zustand'

const createHomeStore = create((set) => ({
  index: "0",
  changeIndex: (index:string)=>{set(()=>({index}))}
}))

export default createHomeStore