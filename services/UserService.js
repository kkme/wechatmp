import Api from '@/services/Api'
import constant from '@const/public'
const DEFAULT_PAGESIZE = constant.DEFAULT_PAGESIZE

export default {
  // signIn: ((data = DEFAULT_PAGESIZE)) => Api.post('../Login/login', data),
  //
  // signUp: ((data = DEFAULT_PAGESIZE)) => Api.post('../Login/register', data),
  //
  // logout: ((data = DEFAULT_PAGESIZE)) => Api.post('loginOut', data),

  // center页面信息
  fetchBaseInfo: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/center', data),

  // 用户认证信息
  fetchCertification: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/verify', data),

  // 用户身份证
  fetchIDCard: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/verify/idcard', data),

  // 收藏明细
  fetchCollections: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/collection', data),

  // 删除收藏
  deleteCollection: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/collection/delete', data),

  // 浏览记录
  fetchHistory: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/history', data),

  // 用户评价
  fetchComments: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/evaluation', data),

  // 信誉记录
  fetchScoreLog: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/reputation', data),

  // 积分记录
  fetchPointsLog: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/integral', data),

  // 钱包记录
  fetchWalletLog: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/money', data),

  // 用户经验值
  fetchExp: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/experience', data),

  // 投诉建议
  fetchFeedBack: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/platform/add', data),

  // 用户申述
  fetchCharges: (data = DEFAULT_PAGESIZE) => Api.post('jobuser/company/add', data),

  // 简历信息
  fetchResume: () => Api.post('jobuser/resume')
}
