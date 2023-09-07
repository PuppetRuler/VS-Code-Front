<template>
    <div class="container">
        <Cotegory title="电影">
            <template scope={films}>
                <ul>
                    <li v-for="(f, index) in films" :key="index">{{ f }}</li>
                </ul>
            </template>
        </Cotegory>
        <Cotegory title="电影">
            <template scope={films}>
                <ol>
                    <li style="color:red;" v-for="(f, index) in films" :key="index">{{ f }}</li>
                </ol>
            </template>

        </Cotegory>
        <Cotegory title="电影">
            <template slot-scope={films}>
                <h4 v-for="(f, index) in films" :key="index">{{ f }}</h4>
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