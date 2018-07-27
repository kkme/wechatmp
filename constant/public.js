export default {
  BASE_URL: 'https://local.sapi.s-cout.com/job-api/',
  // BASE_URL: 'http://192.168.0.108:8080/job-api/',
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
