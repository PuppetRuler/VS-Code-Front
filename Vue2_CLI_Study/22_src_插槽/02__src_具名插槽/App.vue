<template>
    <div class="container">
        <!-- 在App里解析之后再放到slot插槽内 -->
        <Cotegory title="美食">
            <img slot="center" src="https://upload.wikimedia.org/wikipedia/zh/e/ea/The_Journey_of_Elaina_01.jpg" alt="临时追加的图片">
            <a slot="footer" href="javascript:;">更多美食</a>
        </Cotegory>
        <Cotegory title="游戏">
            <ul slot="center">
                <li v-for="(g, index) in games" :key="index">{{ g }}</li>
            </ul>
            <div class="foot" slot="footer">
                <a href="javascript:;">单机游戏</a>
                <a href="javascript:;">网络游戏</a>
            </div>
        </Cotegory>
        <Cotegory title="电影">
            <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
            <template v-slot:footer>
                <div class="foot">
                    <a href="javascript:;">经典</a>
                    <a href="javascript:;">热门</a>
                    <a href="javascript:;">推荐</a>
                </div>
                <h4>欢迎前来观影</h4>
            </template>
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
    .container,
    .foot {
        display: flex;
        justify-content: space-around;
    }
    img {
        width: 100%;
    }
    video {
        width: 100%;
    }
    h4 {
        text-align: center;
    }
</style>