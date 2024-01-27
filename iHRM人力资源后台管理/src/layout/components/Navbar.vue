<template>
    <div class="navbar">
        <hamburger
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
        />

        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <!-- 头像 -->
                    <img v-if="avatar" :src="avatar" class="user-avatar" />
                    <span v-else class="username">{{ name?.charAt(0) }}</span>
                    <!-- 用户名称 -->
                    <span class="name">{{ name }}</span>
                    <!-- 图标 -->
                    <i class="el-icon-setting" />
                </div>
                <el-dropdown-menu slot="dropdown" class="user-dropdown">
                    <router-link to="/">
                        <el-dropdown-item> 首页 </el-dropdown-item>
                    </router-link>
                    <a
                        target="_blank"
                        href="https://github.com/PuppetRuler/VS-Code-Front"
                    >
                        <el-dropdown-item>项目地址</el-dropdown-item>
                    </a>
                    <a target="_blank" @click.prevent="updatePassword">
                        <el-dropdown-item>修改密码</el-dropdown-item>
                    </a>
                    <!-- native修饰符 -->
                    <!-- 注册组件的根元素的原生事件 -->
                    <el-dropdown-item @click.native="logout">
                        <span style="display: block">登出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 放置dialog -->
        <!-- sync --- 可以传递子组件传递过来的事件和值 -->
        <el-dialog center width="400px" title="修改密码" :visible.sync="showDialog" :append-to-body="true" @close="btnCancel" >
            <!-- 放置表单 -->
            <el-form ref="passForm" label-width="auto" :model="passForm" :rules="rules">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input show-password v-model="passForm.oldPassword" placeholder="请输入" size="small" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input show-password v-model="passForm.newPassword" placeholder="请输入" size="small" />
                </el-form-item>
                <el-form-item label="重复密码" prop="confirmPassword">
                    <el-input show-password v-model="passForm.confirmPassword" placeholder="请输入" size="small" />
                </el-form-item>
                <div class="submit" style="display: flex; justify-content: space-evenly;">
                    <el-button @click="btnOK" size="mini" type="primary" >确认密码</el-button>
                    <el-button @click="btnCancel" size="mini" >取消</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { updatePassword } from '@/api/user'

export default {
    components: {
        Breadcrumb,
        Hamburger,
    },
    data() {
        return {
            showDialog: false, // 控制是否弹层
            passForm: {
                oldPassword: '', // 旧密码
                newPassword: '', // 新密码
                confirmPassword: '' // 确认密码
            },
            rules: {
                oldPassword: [{
                    required: true,
                    message: '请输入旧密码',
                    trigger: 'blur'
            }], // 旧密码
                newPassword: [{
                    required: true,
                    message: '请输入新密码',
                    trigger: 'blur'
            }, {
                trigger: 'blur',
                min: 6,
                max: 16,
                message: '新密码长度在6-16位之间'
            }], // 新密码
                confirmPassword: [{
                    required: true,
                    message: '请确认密码',
                    trigger: 'blur'
            }, {
                trigger: 'blur',
                validator: (rule, value, callback) => {
                    if (value === this.passForm.newPassword) {
                       callback()
                    } else {
                        callback(new Error('两次输入的密码不一致'))
                    }
                }
            }] // 确认密码
            },
        };
    },
    computed: {
        ...mapGetters(["sidebar", "avatar", "name"]),
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch("app/toggleSideBar");
        },
        async logout() {
            // 调用退出登录的action
            await this.$store.dispatch("user/logout");
            this.$router.replace("/login");
        },
        updatePassword() {
            // 弹出弹层
            this.showDialog = true;
        },
        btnOK() {
            this.$refs.passForm.validate(async isOK => {
                if (isOK) {
                    // 调用接口
                    await updatePassword(this.passForm)
                    // 重置表单
                    // 关闭弹窗
                    this.btnCancel()
                    // 轻提示
                    this.$message.success('密码修改成功')
                }
            })
        },
        btnCancel() {
            // 重置表单
            this.$refs.passForm.resetFields()
            // 关闭弹窗
            this.showDialog = false
        }
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;
                display: flex;
                align-items: center;

                .name {
                    font-size: 16px;
                    margin-right: 16px;
                }

                .username {
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background-color: #04c9be;
                    color: #fff;
                    border-radius: 50%;
                }

                .user-avatar {
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    border-radius: 50px;
                }

                .el-icon-setting {
                    cursor: pointer;
                    font-size: 20px;
                }
            }
        }
    }
}
</style>
