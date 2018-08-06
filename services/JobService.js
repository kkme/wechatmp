import Api from '@/services/Api'
import constant from '@const/public'
const DEFAULT_PAGESIZE = constant.DEFAULT_PAGESIZE

export default {
  // 获取工作列表
  fetchJobs: (data = DEFAULT_PAGESIZE) => Api.post('job/search', data),
  fetchJob: data => Api.post('job/detail', data),
  addToCollection: data => Api.post('job/collection', data)
  // fetchJob: params => Api.get('job/detail', { params })
}
