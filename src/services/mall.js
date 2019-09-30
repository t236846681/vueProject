import axios from 'axios'
import { BaseService } from './base.js'


const urls = Object.freeze({
    getDetail: '/lbqb/tk/product/detail', //商品详情
    getInfoDetail: '/lbqb/tk/info/detail' //商品详情
})

class AppService extends BaseService {
    getDetail (options) {
        return this.post(urls.getDetail, options).then(response => response)
    }
    getInfoDetail (options) {
        return this.post(urls.getInfoDetail, options).then(response => response)
    }
}

export default new AppService(axios)