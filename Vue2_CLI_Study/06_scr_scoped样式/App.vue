<template>
    <div>
        <h1 class="title">当App组件加了scoped，***样式只能渲染在App里的***里，组件无法使用</h1>
        <School></School>
        <hr>
        <Student></Student>
    </div>
</template>

<script>
    import School from './components/School.vue';
    import Student from './components/Student.vue';
    export default {
        name: 'App',
        components: {
            School,
            Student
        }
    };
</script>

<style lang="css" scoped>
    .title{
        color: red;
    }
</style>