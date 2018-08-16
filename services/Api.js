import axios from 'axios'
import config from '@const/public'
// import store from '@/store'
// import data from '@/mockdata/scoreTags';
let instance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'x-requested-with': 'WX_APPLETS_JOBUSER',
    'content-type': 'application/json'
  },
  timeout: 100000
})
instance.interceptors.response.use(
  response => {
    // TODO: some auth stuff
    if (response.data.code !== 1) return Promise.reject(response.data)

    let data = response.data.data
    if (data || data === '') {
      return data
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    // store.dispatch('showSnackbar', '网络似乎出现了问题，请稍后再试。')
    // return {
    //   content: data
    // };
    return Promise.reject(error)
  }
)

export default instance
