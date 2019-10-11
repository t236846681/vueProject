import axios from 'axios';
import qs from  'qs';

// 默认的全局配置
// 默认超时时间
axios.defaults.timeout = 10000;

// 请求发送之前拦截，进行处理（根据业务需求进行拦截处理）
axios.interceptors.request.use(success => {
    return success;
}, error => {
    return reject(error);
});
// then,catch处理之前，进行拦截处理（根据业务需求进行拦截处理）
axios.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});
export default {
    post(url, data, withBaseParams = false) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: url,
                data: qs.stringify(data),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(res => this.successHandle(res, resolve))
                .catch(err => this.successHandle(err, reject))
        })
    },
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params,
                headers: {}
            }).then(res => this.errorHandle(res, resolve))
                .catch(err => this.errorHandle(err, reject))
        })
    },
    // then处理执行了successHandle
    successHandle(res, resolve) {
        if (res.data && res.data.code && res.data.code === '10000') {
            resolve(res)
        }
        else {
            // debugger;
            console.log(res.msg);
            // this.$toast(res.msg, {location: 'center'});
        }
    },
    // catch处理执行了errorHandle
    errorHandle(err, reject) {
        reject(err);
    }

}