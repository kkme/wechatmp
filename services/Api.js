import axios from 'axios'
import config from '@const/public'
// import store from '@/store'
// import data from '@/mockdata/scoreTags';
let instance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    user_author:
      'OPl8wAyWVffMg3acs9uITHEvE2r+Hf0cDqy4ad1uiZs2sk6II3wHNp/C+gRXkxtsjPOkwrck6nuG2iPDy2M+TA==',
    'x-requested-with': 'WX_APPLETS_JOBUSER',
    'content-type': 'application/json'
  },
  timeout: 1000
})
instance.interceptors.response.use(
  response => {
    // TODO: some auth stuff
    let data = response.data.data
    if (data) {
      return data
    } else {
      return response.data
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
