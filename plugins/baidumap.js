import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import constant from '@const/public'

Vue.use(BaiduMap, {
  ak: constant.BAIDU_MAP_KEY
})
