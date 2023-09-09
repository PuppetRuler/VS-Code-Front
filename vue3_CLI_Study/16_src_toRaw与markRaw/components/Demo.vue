<template>
    <h4>当前求和为:{{ sum }}</h4>
    <button @click="sum++">点我+1</button>
    <hr>
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <h2>薪资:{{ job.j1.salary }}K</h2>
    <h2 v-show="person.car">汽车:{{ person.car }}</h2>
    <button @click="name+='~'">修改姓名</button>
    <button @click="age++">修改年龄</button>
    <button @click="job.j1.salary++">修改薪资</button>
    <button @click="showRawPerson">输出最原始的person</button>
    <button @click="addCar">给人添加一台车</button>
    <button @click="person.car.name+='!'">换车名</button>
    <button @click="changePrice">换价格</button>
</template>

<script>
  import { ref,reactive,toRefs,toRaw,markRaw } from 'vue';
    export default {
        name: 'Demo',
        setup() {
            //数据
            let sum = ref(0)
            // let person = shallowReactive({  //只考虑第一层的响应式
            let person = reactive({
                name:'张三',
                age:18,
                job:{
                    j1:{
                        salary:20
                    }
                }
            })

            function showRawPerson(){
                const p = toRaw(person)
                console.log(p);
            }

            function addCar(){
                let car = {name:'奔驰',price:40}
                person.car = markRaw(car)
            }
            function changePrice(){
                person.car.price++
                console.log(person.car.price);
            }

            return {
                sum,
                person,
                ...toRefs(person),
                showRawPerson,
                addCar,
                changePrice,
            };
        }
    }
</script>

<style></style>