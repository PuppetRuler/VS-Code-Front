<template>
    <div class="child">
      <h3>我是Child组件(子)</h3>
      <h3>{{ sum }}</h3>
    </div>
</template>

<script>
  import { ref } from 'vue';
    export default {
        name:'Child',
        async setup(){
          let sum = ref(0)
          let p = new Promise((resolve,reject) => {
            setTimeout(() => {
              resolve({sum})
            },3000)
          })
          return await p
        }
    }
</script>

<style>
    .child {
      background-color: skyblue;
      padding: 10px;
    }
</style>