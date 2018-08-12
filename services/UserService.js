import Api from '@/services/Api'

export default {
  signIn: data => Api.post('jobuser/login', data),
  //
  signUp: data => Api.post('jobuser/register', data),
  //
  logOut: () => Api.post('jobuser/logout', {}),

  // center页面信息
  fetchBaseInfo: data => Api.post('jobuser/center', data),

  // 用户认证信息
  fetchCertification: data => Api.post('jobuser/verify', data),

  // 用户身份证
  fetchIDCard: data => Api.post('jobuser/verify/idcard', data),

  // 收藏明细
  fetchCollections: data => Api.post('jobuser/collection', data),

  // 删除收藏
  deleteCollection: data => Api.post('jobuser/collection/delete', data),

  // 浏览记录
  fetchHistories: data => Api.post('jobuser/history', data),

  // 用户评价
  fetchComments: data => Api.post('jobuser/evaluation', data),

  // 信誉记录
  fetchScoreLog: data => Api.post('jobuser/reputation', data),

  // 积分记录
  fetchPointsLog: data => Api.post('jobuser/integral', data),

  // 钱包记录
  fetchWalletLog: data => Api.post('jobuser/money', data),

  // 用户经验值
  fetchExp: data => Api.post('jobuser/experience', data),

  // 投诉建议
  fetchFeedBack: data => Api.post('jobuser/platform/add', data),

  // 用户申述
  fetchCharges: data => Api.post('jobuser/company/add', data),

  // 简历信息
  fetchResume: () => Api.post('jobuser/resume')
}
