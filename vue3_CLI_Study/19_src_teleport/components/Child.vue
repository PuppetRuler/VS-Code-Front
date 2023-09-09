<template>
    <div class="child">
      <h3>我是Child组件(子)</h3>
      <Son></Son>
    </div>
</template>

<script>
    import Son from './Son.vue'
    export default {
        name:'App',
        components:{Son},
        setup(){

          return {

          }
        }
    }
</script>

<style>
    .child {
      background-color: skyblue;
      padding: 10px;
    }
</style>