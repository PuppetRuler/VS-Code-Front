<template>
    <div class="category">
        <h3>{{title}}</h3>
        <!-- 定义一个插槽（挖个坑，等着组件的使用者进行填充） -->
        <slot>我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
    </div>
</template>

<script>
    export default {
        name: 'Category',
        props:['title'],
        data() {
            return {

            };
        },
    };
</script>

<style>
    .category {
        background-color: skyblue;
        width: 200px;
        height: 400px;
    }
    h3 {
        text-align: center;
        background-color: orange;
    }
</style>