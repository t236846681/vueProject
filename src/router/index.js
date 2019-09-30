import VueRouter from 'vue-router'
import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'// nprogress样式文件

Vue.use(VueRouter);

// h5页面路由--刘备钱包
const NotFindPage = () => import(/* webpackChunkName: "home" */ '../components/home/404Page.vue')   //404页面

// 测试，可删除
const Test = ()=>import(/* webpackChunkName: "test" */ "../components/test/test.vue");  //列表
const Test2 = ()=>import(/* webpackChunkName: "test" */ "../components/test/testPage2.vue");  //列表

const routes = [
    {
        path: '*',
        component: NotFindPage
    },
    {
        path: '/spa/test',
        component: Test
    },
    {
        path: '/spa/test2',
        component: Test2
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});
router.beforeEach(function (to, from, next) {
    // 开启进度条
    NProgress.start();
    next();
});
router.afterEach(function (to, from, next) {
    // 关闭进度条
    NProgress.done()
});
export default router
