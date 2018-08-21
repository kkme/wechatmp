import axios from 'axios'
import config from '@const/public'

export default ({ app, store, router, redirect }) => {
  axios.defaults.baseURL = config.BASE_URL
  axios.defaults.timeout = 30 * 1000
  axios.defaults.headers.common['x-requested-with'] = 'WX_APPLETS_JOBUSER'
  axios.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      console.log(axios.interceptors.request)

      console.log(config)
      return config
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error)
    }
  )
  axios.interceptors.response.use(
    response => {
      // TODO: some auth stuff

      let code = +response.data.code

      if (code === 4000009) {
        store.dispatch('sys/showSnackbar', response.data.msg)
        return Promise.reject(response.data)
      }
      if (code !== 1) {
        store.dispatch('sys/showSnackbar', { msg: response.data.msg || '出错了', color: 'error' })
        return Promise.reject(response.data)
      }
      let data = response.data.data
      let msg = response.config.msg
      if (msg) {
        store.dispatch('sys/showSnackbar', { msg, color: 'primary' })
      }
      return data
    },
    error => {
      store().dispatch('sys/showSnackbar', {
        msg: '网络似乎出现了问题，请稍后再试。',
        color: 'error'
      })
      return Promise.reject(error)
    }
  )
}
