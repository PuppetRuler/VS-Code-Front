import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false

import {mixin, mixin2} from './mixin'

Vue.mixin(mixin,mixin2)

new Vue({
    el: '#app',
    render: h => h(App)
});