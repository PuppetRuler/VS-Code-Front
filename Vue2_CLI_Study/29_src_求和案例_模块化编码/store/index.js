// 该文件用于创建Vuex中最为核心的store

//引入vue
import Vue from 'vue';
// 引入Vuex
import Vuex from 'vuex';
//使用vuex
Vue.use(Vuex);
//引入Count
import countOptions from './Count';
//引入Person
import personOptions from './Person';

//创建并暴露store
export default new Vuex.Store({
    modules:{
        countAbout:countOptions,
        personAbout:personOptions,
    }
});