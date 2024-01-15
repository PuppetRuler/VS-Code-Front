import router from "./router";
import nProgress from "nprogress";
import 'nprogress/nprogress.css';
import store from "@/store";

const whiteList = ['/login', '/404'];

/**
 * 前置路由守卫
 */
router.beforeEach(async (to, from, next) => {
    nProgress.start();
    if (store.getters.token) {
        // 有token
        if (to.path === '/login') {
            // 跳转到主页
            next('/'); // 中转到主页
            // next(地址)并没有执行路由守卫
            nProgress.done();
        } else {
            if (!store.getters.userId) {
                await store.dispatch('user/getUserInfo');
            }
            next();
        }
    } else {
        // 没有token
        if (whiteList.includes(to.path)) {
            next();
        } else {
            next('/login');
            nProgress.done();
        }
    }
});

/**
 * 后置路由守卫
 */
router.afterEach(() => {
    nProgress.done();
});
