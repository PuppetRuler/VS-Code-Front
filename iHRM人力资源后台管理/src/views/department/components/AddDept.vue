<template>
    <el-dialog
        title="增加项目"
        :visible="showDialog"
        @close="close"
    >
        <!-- 弹层内容 -->
        <el-form label-width="120px" :model="formData" :rules="rules">
            <el-form-item prop="name" label="部门名称" size="mini">
                <el-input
                    v-model="formData.name"
                    style="width: 80%"
                    placeholder="2-10个字符"
                />
            </el-form-item>
            <el-form-item prop="code" label="部门编码" size="mini">
                <el-input
                    v-model="formData.code"
                    style="width: 80%"
                    placeholder="2-10个字符"
                />
            </el-form-item>
            <el-form-item prop="managerId" label="部门负责人" size="mini">
                <el-select
                    v-model="formData.managerId"
                    style="width: 80%"
                    placeholder="请选择负责人"
                >
                <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
            </el-select>
            </el-form-item>
            <el-form-item prop="introduce" label="部门介绍" size="mini">
                <el-input
                    type="textarea"
                    :rows="8"
                    v-model="formData.introduce"
                    placeholder="1-100个字符"
                    style="width: 80%"
                />
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item size="small">
                <el-row type="flex" justify="center" style="width: 80%;">
                    <el-col :span="12">
                        <el-row type="flex" justify="space-between">
                            <el-button type="primary" size="small" round>确定</el-button>
                            <el-button size="small" round>取消</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { getDepartmentListAPI, getDeptManagerListAPI } from '@/api/department';

export default {
    name: "AddDept",
    props: {
        showDialog: {
            type: Boolean,
            default: true,
        },
        currentId: {
            type: Number,
            default: null,
        }
    },
    data() {
        return {
            // 表单数据
            formData: {
                code: "",
                introduce: "",
                managerId: "",
                name: "",
                pid: "",
            },
            managerList:[],
            // 校验规则
            rules: {
                code: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "部门编码不能为空",
                    },
                    {
                        min: 2,
                        max: 10,
                        message: "部门编码为2-10个字符"
                    },
                    // 业务校验
                    {
                        trigger: "blur",
                        // 自定义校验模式
                        validator:async (rule,value,callback)=>{
                            // value 就是输入的编码
                            const result = await getDepartmentListAPI()
                            if(result.some(item=>item.code === value)){
                                callback(new Error("已存在该部门编码"))
                            }else{
                                callback()
                            }
                        }
                    }
                ],
                introduce: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "部门介绍不能为空",
                    },
                    {
                        min: 1,
                        max: 100,
                        message: "部门介绍为1-100个字符"
                    }
                ],
                managerId: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "部门负责人不能为空",
                    },
                ],
                name: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "部门名称不能为空",
                    },
                    {
                    min: 2,
                        max: 10,
                        message: "部门名称为2-10个字符"
                    },
                    {
                        trigger: "blur",
                        // 自定义校验模式
                        validator:async (rule,value,callback)=>{
                            // value 就是输入的编码
                            const result = await getDepartmentListAPI()
                            if(result.some(item=>item.name === value)){
                                callback(new Error("已存在该部门名称"))
                            }else{
                                callback()
                            }
                        }
                    }
                ],
            },
        };
    },
    methods: {
        close() {
            // 修改父组件的值    子传父
            this.$emit("update:showDialog", false);
        },
    },
    async created(){
        this.managerList = await getDeptManagerListAPI()
    }
};
</script>
