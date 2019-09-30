import Vue from 'vue'

import { toCurrency } from './toCurrency'
import { dateFormat } from './dateFormat'

Vue.filter('toCurrency', toCurrency)
Vue.filter('dateFormat', dateFormat)
