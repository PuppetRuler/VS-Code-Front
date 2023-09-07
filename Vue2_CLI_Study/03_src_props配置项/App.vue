<template>
    <div>
        <Student name="李四" :age='20'></Student>
    </div>
</template>

<script>
    import Student from './components/Student.vue';
    export default {
        name: 'App',
        components: {
            Student
        }
    };
</script>