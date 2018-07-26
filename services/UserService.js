import Api from '@/services/Api'

export default {
  // signIn: () => Api.post('../Login/login'),
  //
  // signUp: () => Api.get('../Login/register'),
  //
  // logout: () => Api.get('loginOut'),

  fetchBaseInfo: () => Api.get('jobuser/center'), // center页面信息

  fetchCertification: () => Api.get('jobuser/verify'), // 用户认证信息

  fetchIDCard: () => Api.get('jobuser/verify/idcard'), // 用户身份证

  fetchCollections: () => Api.get('jobuser/collection'), // 收藏明细

  deleteCollection: () => Api.get('jobuser/collection/delete'), // 删除收藏

  fetchHistory: () => Api.get('jobuser/history'), // 浏览记录

  fetchComments: () => Api.get('jobuser/evaluation'), // 用户评价

  fetchScoreLog: () => Api.get('jobuser/reputation'), // 信誉记录

  fetchPointsLog: data =>
    Api.get('jobuser/integral/receive', {
      params: {
        flag: true
      }
    }), // 积分记录

  fetchWalletLog: () => Api.get('jobuser/money'), // 钱包记录

  fetchExp: () => Api.get('jobuser/experience/receive'), // 用户经验值

  fetchFeedBack: () => Api.get('jobuser/platform/add'), // 投诉建议

  fetchCharges: () => Api.get('jobuser/company/add') // 用户申述
}
