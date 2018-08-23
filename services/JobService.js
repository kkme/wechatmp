import axios from 'axios'
import constant from '@const/public'
const DEFAULT_PAGESIZE = constant.DEFAULT_PAGESIZE

export default {
  // 获取工作列表
  fetchJobs: (data = DEFAULT_PAGESIZE) => axios.post('job/search', data),
  fetchJob: data => axios.post('job/detail', data),
  addToJobCollection: data => axios.post('job/collection', data),
  addToCorpCollection: data => axios.post('job/company/toCollection', data),
  fetchRecommendJobs: data => axios.post('job/sameJob', data),
  fetchCompanyInfo: data => axios.post('job/companyInfo', data),
  applyJob: data => axios.post('parttimeApply/add', data),
  fetchHotKeywords: () => axios.post('job/search/hot'),
  fetchSearchHistory: () => axios.post('job/search/history'),
  fetchPackageJobs: data => axios.post('customize/findJob', data)
}
