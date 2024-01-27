<template>
    <div class="container" v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0.5)">
        <div class="app-container">
            <el-tree :data="dept" :props="defaultProps" default-expand-all >
                <!-- 节点结构 -->
                <!-- 自定义树形节点：需要用v-slot绑定数据，使得每一个节点具有唯一性 -->
                <template v-slot="{ data }">
                    <el-row style="width: 100%;height: 40px;" type="flex" justify="space-between" align="middle">
                    <el-col>{{ data.name }}</el-col>
                    <el-col :span="4" :pull="1">
                        <span class="tree-control">{{ data.managerName }}</span>
                        <el-dropdown>
                            <!-- 显示区域内容 -->
                            <span class="el-dropdown-link">
                                操作<i class="el-icon-arrow-down el-icon--right" />
                            </span>
                            <!-- 下拉菜单选项 -->
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>添加子部门</el-dropdown-item>
                                <el-dropdown-item>编辑子部门</el-dropdown-item>
                                <el-dropdown-item>删除子部门</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
                </template>
            </el-tree>
        </div>
    </div>
</template>

<script>
import { getDepartmentListAPI } from '@/api/department';
import { transListToTreeData } from '@/utils';

    export default {
        data() {
            return {
                dept: [], // 数据属性
                defaultProps: [{
                    label: 'name', // 要显示的字段的名字
                    children: 'children' // 读取字节点的字段名
                }],
                isLoading: false
            }
        },
        created() {
            this.getDepartment()
        },
        methods: {
            async getDepartment() {
                this.isLoading = true
                const result = await getDepartmentListAPI()
                this.dept = transListToTreeData(result, 0)
                this.isLoading = false
            }
        },
    }
</script>

<style lang="scss" scoped>
    .app-container {
        padding: 30px 140px;
        font-size: 14px;
    }
    .tree-control {
        display: inline-block;
        margin: 10px;
    }
</style>
