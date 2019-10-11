// h5页面路由--刘备钱包
const NotFindPage = () => import(/* webpackChunkName: "home" */ '../components/home/404Page.vue');   //404页面

// 测试，可删除
const Test = ()=>import(/* webpackChunkName: "test" */ "../components/test/test.vue");  //列表
const Test2 = ()=>import(/* webpackChunkName: "test" */ "../components/test/testPage2.vue");  //列表

// 固定路由配置
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