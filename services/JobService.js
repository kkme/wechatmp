import Api from '@/services/Api'
import constant from '@const/public'
const DEFAULT_PAGESIZE = constant.DEFAULT_PAGESIZE

export default {
  // 获取工作列表
  fetchJobs: (data = DEFAULT_PAGESIZE) => Api.post('job/search', data),
  fetchJob: data => Api.post('job/detail', data),
  addToJobCollection: data => Api.post('job/collection', data),
  addToCorpCollection: data => Api.post('job/company/toCollection', data),
  fetchRecommendJobs: data => Api.post('job/sameJob', data),
  fetchCompanyInfo: data => Api.post('job/companyInfo', data),
  applyJob: data => Api.post('parttimeApply/add', data)
}
