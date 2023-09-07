<template>
        <li>
            <label>
                <input type="checkbox" :checked="todoObj.done" @change="handleCheck(todoObj.id)" />
                <!-- 如下代码也能实现功能，但是不太推荐，因为有点违反原则，因为修改了props -->
                <!-- <input type="checkbox" v-model='todoObj.done' /> -->
                <span v-show="!todoObj.isEdit">{{ todoObj.title }}</span>
                <input type="text" 
                v-show="todoObj.isEdit" 
                :value="todoObj.title" 
                @blur="handleBlur(todoObj,$event)"
                ref="inputTitle">
            </label>
            <button class="btn btn-danger" @click="handelDelete(todoObj.id)">删除</button>
            <button class="btn btn-edit" v-show="!todoObj.isEdit" @click="handelEdit(todoObj)">编辑</button>
        </li>
</template>

<script>
    import pubsub from 'pubsub-js';
    export default {
        name: 'MyItem',
        //声明接收todoObj对象
        props: ['todoObj'],
        methods: {
            //勾选or取消勾选
            handleCheck(id) {
                //通知App组件将对应的todo对象的done值取反
                this.$bus.$emit('checkTodo', id);

                //自己弄的这个也一样，违反了原则，修改了props!
                // todoObj.done = !todoObj.done
            },
            //删除
            handelDelete(id) {
                if (confirm('确认要删除吗？')) {
                    pubsub.publish('deleteTodo', id);
                }
            },
            //编辑
            handelEdit(todo) {
                if (todo.hasOwnProperty('isEdit')) {
                    todo.isEdit = true;
                } else {
                    this.$set(todo, 'isEdit', true);
                }
                //文本框自动获取焦点
                this.$nextTick(function(){
                    this.$refs.inputTitle.focus()
                })
            },
            //失去焦点回调（真正执行修改逻辑）
            handleBlur(todo,e) {
                todo.isEdit = false;
                if(!e.target.value.trim()) return alert('输入不能为空~')
                this.$bus.$emit('updateTodo',this.todoObj.id,e.target.value)
            }
        },
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