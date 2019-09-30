// 数据缓存服务
class CacheService {
    constructor(httpClient) {
        this.$http = httpClient
        this.__map = new Map()
    }

    defaultSuccessChecker(data) {
        return data.code === 0
    }

    post(key, url, options, token, successChecker) {
        if (this.__map.has(key)) {
            return Promise.resolve(this.__map.get(key))
        } else {
            return this.$http.post(url, options, token).then(response => response.data).then(data => {
                successChecker = successChecker || this.defaultSuccessChecker
                if (successChecker(data)) {
                    this.__map.set(key, data)
                }
                return Promise.resolve(data)
            })
        }
    }

    get(key, url, options, successChecker) {
        if (this.__map.has(key)) {
            return Promise.resolve(this.__map.get(key))
        } else {
            return this.$http.get(url, options).then(response => response.data).then(data => {
                successChecker = successChecker || this.defaultSuccessChecker
                if (successChecker(data)) {
                    this.__map.set(key, data)
                }
                return Promise.resolve(data)
            })
        }
    }

    delete(key) {
        return this.__map.delete(key)
    }

    clear() {
        return this.__map.clear()
    }
}

// 服务基类
export class BaseService {
    constructor(axios) {
        this.$http = axios
        this.$cache = new CacheService(axios)
    }

    cache(key, url, options, successChecker, appCode) {
        return this.$cache.post(key, url, options, {
            headers: {
                token: this.getToken(),
                appCode: this.getAppCode(appCode)
            }
        }, successChecker)
    }

    cache2(key, url, options, headers, successChecker, appCode) {
        let headerNew = Object.assign(headers, {
            appCode: this.getAppCode(appCode)
        })
        return this.$cache.post(key, url, options, {
            headers: headerNew
        }, successChecker)
    }

    deleteCache(key) {
        return this.$cache.delete(key)
    }

    clearCache() {
        this.$cache.clear()
    }

    postPlat(url, options, appCode, plat) {
        return this.$http.post(url, options, {
            headers: {
                token: this.getToken(),
                appCode: this.getAppCode(appCode),
                plat: plat
            }
        }).then(response => response.data).then(data => {
            return Promise.resolve(data)
        })
    }

    postPlatToken(url, options, appCode, plat, token) {
        return this.$http.post(url, options, {
            headers: {
                appCode: this.getAppCode(appCode),
                plat: plat,
                token: token
            }
        }).then(response => response.data).then(data => {
            return Promise.resolve(data)
        })
    }

    normalPost(url, options, appCode) {
        return this.$http.post(url, options, {
            headers: {
                appCode: this.getAppCode(appCode)
            }
        }).then(response => response).then(data => {
            return Promise.resolve(data)
        })
    }

    post(url, options, appCode) {
        return this.$http.post(url, options, {
            headers: {
                token: this.getToken(),
                appCode: this.getAppCode(appCode)
            }
        }).then(response => response.data).then(data => {
            return Promise.resolve(data)
        })
    }

    postWithToken(url, options, appCode, token) {
        return this.$http.post(url, options, {
            headers: {
                token: token,
                appCode: this.getAppCode(appCode)
            }
        }).then(response => response.data).then(data => {
            return Promise.resolve(data)
        })
    }

    getToken() {  //页面token
        if (window.android && typeof (window.android.getToken) === 'function') {
            return window.android.getToken()
        } else if (typeof (jchx_token) != 'undefined') {
            return jchx_token
        }
        return ''
    }

    getAppCode(appCode) {
        if (appCode) {
            return appCode
        }
        return 'LBQB'
    }
}
