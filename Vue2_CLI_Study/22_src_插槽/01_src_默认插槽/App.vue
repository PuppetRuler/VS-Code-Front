<template>
    <div class="container">
        <!-- 在App里解析之后再放到slot插槽内 -->
        <Cotegory title="美食">
            <img src="https://upload.wikimedia.org/wikipedia/zh/e/ea/The_Journey_of_Elaina_01.jpg" alt="临时追加的图片">
        </Cotegory>
        <Cotegory title="游戏">
            <ul>
                <li v-for="(g, index) in games" :key="index">{{ g }}</li>
            </ul>
        </Cotegory>
        <Cotegory title="电影">
            <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
        </Cotegory>
    </div>
</template>

<script>
    import Cotegory from './components/Category.vue';
    export default {
        name: 'App',
        components: { Cotegory },
        data() {
            return {
                foods: ['火锅', '烧烤', '小龙虾', '牛排'],
                games: ['红色警戒', '穿越火线', '劲舞团', '超级玛丽'],
                films: ['《教父》', '《拆弹专家》', '《你好，李焕英》', '《尚硅谷》']
            };
        }
    };
</script>

<style scoped>
    .container {
        display: flex;
        justify-content: space-around;
    }
    img {
        width: 100%;
    }
    video{
        width: 100%;
    }
</style>