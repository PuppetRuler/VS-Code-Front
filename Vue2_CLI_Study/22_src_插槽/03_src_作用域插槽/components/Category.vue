<template>
    <div class="category">
        <h3>{{ title }}分类</h3>
        <slot :films="films"></slot>
    </div>
</template>

<script>
    export default {
        name: 'Category',
        props: ['title'],
        data() {
            return {
                films: ['《教父》', '《拆弹专家》', '《你好，李焕英》', '《尚硅谷》']
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