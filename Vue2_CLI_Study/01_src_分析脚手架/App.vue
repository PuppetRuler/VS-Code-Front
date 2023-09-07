<template>
    <div>
        <School></School>
        <Student></Student>
        <img src="./assets/logo.png" alt="图标">
    </div>
</template>

<script>
    //引入组件
    import School from './components/School';
    import Student from './components/Student';

    export default {
        name: 'App',
        components: {
            School,
            Student
        }
    };
</script>

<style></style>