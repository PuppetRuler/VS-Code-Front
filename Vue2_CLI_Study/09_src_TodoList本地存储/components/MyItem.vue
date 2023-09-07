<template>
    <li>
        <label>
            <input type="checkbox" :checked="todoObj.done" @change="handleCheck(todoObj)" />
            <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
            <!-- <input type="checkbox" v-model='todoObj.done' /> -->
            <span>{{ todoObj.title }}</span>
        </label>
        <button class="btn btn-danger" @click="handelDelete(todoObj)">删除</button>
    </li>
</template>

<script>
    export default {
        name: 'MyItem',
        //声明接收todoObj对象
        props: ['todoObj', 'checkTodo','deleteTodo'],
        methods: {
            //勾选or取消勾选
            handleCheck(todoObj) {
                //通知App组件将对应的todo对象的done值取反
                this.checkTodo(todoObj.id);

                //自己弄的这个也一样，违反了原则，修改了props!
                // todoObj.done = !todoObj.done
            },
            handelDelete(todoObj) {
                if(confirm('确认要删除吗？')){
                    this.deleteTodo(todoObj.id)
                }
            },
        }
    };
</script>

<style scoped>
    /*item*/
    li {
        list-style: none;
        height: 36px;
        line-height: 36px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }
    li label {
        float: left;
        cursor: pointer;
    }
    li label li input {
        vertical-align: middle;
        margin-right: 6px;
        position: relative;
        top: -1px;
    }
    li button {
        float: right;
        display: none;
        margin-top: 3px;
    }
    li:before {
        content: initial;
    }
    li:last-child {
        border-bottom: none;
    }
    li:hover {
        background-color: #ccc;
    }
    li:hover button {
        display: inline-block;
    }
</style>