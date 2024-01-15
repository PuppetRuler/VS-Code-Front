<template>
    <div class="dashboard-container">
        <div class="dashboard-text">name: {{ name }}</div>
        <!-- 使用svg-icon图表 -->
        <!-- 配置iconClass属性:文件名(无后缀) -->
        <svg-icon icon-class="dashboard" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Dashboard",
    computed: {
        ...mapGetters(["name"]),
    },
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
