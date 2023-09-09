<template>
    <h4>当前求和为:{{ sum }}</h4>
    <button @click="sum++">点我+1</button>
    <hr>
    <h2>姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <h2>薪资:{{ job.j1.salary }}K</h2>
    <button @click="name+='~'">修改姓名</button>
    <button @click="age++">修改年龄</button>
    <button @click="job.j1.salary++">修改薪资</button>
</template>

<script>
  import { ref,reactive,toRefs,shallowReactive,shallowRef,readonly,shallowReadonly } from 'vue';
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

            // person = readonly(person)
            // person = shallowReadonly(person)
            // sum = readonly(sum)
            // sum = shallowReadonly(sum)


            return {
                sum,
                person,
                ...toRefs(person)
            };
        }
    }
</script>

<style></style>