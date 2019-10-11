import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
import services from '../services/index.js';

import UserInfo from './modules/userInfo.js'

Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {
//     userToken: 'empty',
//     userId: ''
//   },
//   mutations: {
//     setUserToken(state, data) {
//       state.userToken = data;
//     },
//     setUserId(state, data) {
//       state.userId = data;
//     }
//   },
//   actions: {
//     setUserToken({ commit }, params) {
//       return new Promise((resolve, reject) => {
//         services.post('https://www.fastmock.site/mock/1f56cc1958dacdd14b13ead9139567cd/vueTest/getUserToken').then(
//           response => {
//             commit('setUserToken', response.data.data.token);
//             resolve(response.data);
//           }
//         ).catch(
//           reason => {
//             reject(reason);
//           }
//         );
//         // Vue.$http.post('', 'https://www.fastmock.site/mock/1f56cc1958dacdd14b13ead9139567cd/vueTest/getUserToken',)
//       })
//     }
//   },
//   getters: {
//     getUserToken: state => state.userToken
//   }
// });


export default new Vuex.Store({
  modules: {
    userInfo: UserInfo
  }
})
