import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
import services from '../../services/index.js'

Vue.use(Vuex);

const State = {
    userToken: '',
    userId: '',
    userName: '',
    userRole: ''
};
const MutAtions = {
    setUserToken(state, data) {
        state.userToken = data;
    },
    setUserInfo(state, data) {
        state.userId = data.id;
        state.userName = data.name;
        state.userRole = data.role;
    }
};
const Actions = {
    login({ commit }, params) {
        return new Promise((resolve, reject) => {
            services.post('/api/login', params).then(
                response => {
                    commit('setUserToken', response.data.data.token);
                    resolve(response)
                }
            ).catch(
                reason => {
                    reject(reason);
                }
            );
        });
    },
    getUserInfo({ commit }, params) {
        return new Promise((resolve, reject) => {
            services.post('/api/getUserInfo', params).then(
                response => {
                    commit('setUserInfo', response.data.data);
                    resolve(response)
                }
            ).catch(
                reason => {
                    reject(reason);
                }
            );
        });
    }
};

const Getters = {
    getUserToken: state => state.userToken,
    getUserInfo: state => state
};

export default {
    state: State,
    getters: Getters,
    mutations: MutAtions,
    actions: Actions
}