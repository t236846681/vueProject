import './assets/common.less'
import Vue from 'vue'

import App from './app.vue'
import router from './router/index.js'
import store from './vuex/store.js'

import {Toast} from 'wc-messagebox'
import 'wc-messagebox/style.css'

import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Mock from './mock/mock.js';

Vue.use(VueCookies);
Vue.use(ElementUI);
// Vue.use(Element, { size: 'small', zIndex: 3000 });
Vue.use(Toast, {duration: 4000});



//相关公共组件
import './shared/components'
// 引入全局过滤器
import './shared/filters'

Vue.config.debug = false;
window.onload = function () {
    new Vue({
        el: '#app',
        store,
        template: '<App/>',
        router: router,
        components: {App}
    })
};
