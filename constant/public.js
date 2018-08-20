// const BASE_URL = 'https://local.sapi.s-cout.com/'
const BASE_URL = 'http://192.168.0.99:8080/'
// const BASE_URL = 'http://192.168.1.107:8080/'
// const AVATAR = require('@img/avatar.jpg')
const AVATAR = 'http://g.hiphotos.baidu.com/image/pic/item/0824ab18972bd4074b98befd70899e510fb30956.jpg'
export default {
  BASE_URL,
  BASE_URL_CAPTCHA: BASE_URL + 'jobuser/getVerifyCode',
  BAIDU_MAP_KEY: 'lFHuTGOo6EQ23oLo0KTckFWmKy2yxbLx',
  BAIDU_MAP_POSITION_ICON: {
    url: 'https://api.map.baidu.com/images/marker_red_sprite.png',
    size: { width: 19, height: 25 }
  },
  BAIDU_MAP_POSITION_ICON_OFFSET: { width: 0, height: -12.5 },
  AMAP_KEY: '03a6222c19d8060ba22a05ce69160263',
  SMS_COUNTDOWN: 5,
  MAX_IMAGES_UPLOAD: 5,
  CUSTOM_SERVICE_TEL: '028-12121212',
  DATA_PICKER_MIN_DATE: '1949-10-01',
  DATA_PICKER_MAX_DATE: new Date().toISOString().substr(0, 10),
  DEFAULT_PAGESIZE: {
    pagesize: 20,
    pageindex: 1
  },
  DEFAULT_PAGE_SIZE: 10,
  AVATAR,
  TEAM_CREATE_MIN_MEMBER: 2
}
