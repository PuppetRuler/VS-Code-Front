<template>
    <div>
        <h1 class="title">{{ msg }}</h1>
        <School></School>
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
        },
        data() {
            return {
                msg: '你好啊',
                studentName: ''
            };
        },
    };
</script>

<style lang="css" scoped>
    .title {
        color: red;
    }
</style>