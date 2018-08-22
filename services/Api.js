import axios from 'axios'
import config from '@const/public'
import store from '@/store'
// import router from '~router'
// import data from '@/mockdata/scoreTags';
let instance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'x-requested-with': 'WX_APPLETS_JOBUSER',
    'content-type': 'application/json'
  },
  timeout: 100000
})
instance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // console.log(config)
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
instance.interceptors.response.use(
  response => {
    // TODO: some auth stuff
    let code = +response.data.code
    // console.log(router)

    if (code === 4000009) {
      store().dispatch('sys/showSnackbar', response.data.msg)
      return Promise.reject(response.data)
    }
    if (code !== 1) {
      store().dispatch('sys/showSnackbar', { msg: response.data.msg || '出错了', color: 'error' })
      return response.data
    }
    return response.data.data
  },
  error => {
    store().dispatch('sys/showSnackbar', {
      msg: '网络似乎出现了问题，请稍后再试。',
      color: 'error'
    })
    return Promise.reject(error)
  }
)

export default instance
