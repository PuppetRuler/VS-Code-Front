<template>
    <div>
        <h1 class="title">{{ msg }},学生姓名是{{ studentName }}</h1>

        <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
        <School :getSchoolName="getSchoolName"></School>
        <hr>

        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第一种写法，使用@或v-on) -->
        <!-- <Student v-on:atguigu="getStudentName"></Student> -->

        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第二种写法，使用ref,可操作性更强) -->
        <Student ref="student" @demo="m1" @click.native="show"></Student>
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
        methods: {
            getSchoolName(name) {
                console.log('App收到了学校名：', name);
            },
            getStudentName(name, ...params) {
                console.log('App收到了学生名：', name, params);
                this.studentName = name;
            },
            m1() {
                console.log('demo被触发了!');
            },
            show() {
                alert(123);
            }
        },
        mounted() {
            // this.$refs.student.$once('atguigu',this.getStudentName)  //绑定自定义事件（一次性）
            this.$refs.student.$on('atguigu', this.getStudentName);

            // setTimeout(() => {
            //     this.$refs.student.$on('atguigu',this.getStudentName)
            // }, 3000);
        }
    };
</script>

<style lang="css" scoped>
    .title {
        color: red;
    }
</style>