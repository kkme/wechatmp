export default {
  // BASE_URL: 'https://local.sapi.s-cout.com/job-api/',
  BASE_URL: 'http://192.168.0.100:8080/',
  // BASE_URL: 'http://192.168.1.107:8080/',
  BAIDU_MAP_KEY: 'lFHuTGOo6EQ23oLo0KTckFWmKy2yxbLx',
  SMS_COUNTDOWN: 5,
  MAX_IMAGES_UPLOAD: 5,
  CUSTOM_SERVICE_TEL: '028-12121212',
  DATA_PICKER_MIN_DATE: '1949-10-01',
  DATA_PICKER_MAX_DATE: new Date().toISOString().substr(0, 10),
  DEFAULT_PAGESIZE: {
    pagesize: 20,
    pageindex: 1
  }
}
