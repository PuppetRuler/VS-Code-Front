<template>
  <Demo @hello="showHelloMsg" msg="你好啊" school="尚硅谷">
    <template v-slot:qwe>
      <span>尚硅谷</span>
    </template>
  </Demo>
</template>

<script>
  import Demo from './components/Demo';
  export default {
    name: 'App',
    components: { Demo },
    setup() {
      function showHelloMsg(value) {
        alert(`你触发了hello事件,我收到了参数:${value}`);
      }
      return {
        showHelloMsg
      };
    }
  };
</script>

