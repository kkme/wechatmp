import axios from 'axios'

export default {
  signIn: data => axios.post('jobuser/login', data),
  //
  signUp: data => axios.post('jobuser/register', data),
  //
  logOut: () => axios.post('jobuser/logout', {}),

  // center页面信息
  fetchBaseInfo: data => axios.post('jobuser/center', data),

  // 用户认证信息
  fetchCertification: data => axios.post('jobuser/verify', data),

  // 身份证认证
  identifyByIdCard: data => axios.post('jobuser/verify/idcard', data),

  // 学生证认证
  identifyByStudentCard: data => axios.post('jobuser/verify/student', data),

  // 收藏明细
  fetchCollections: data => axios.post('jobuser/collection', data),

  // 删除收藏
  deleteCollection: data => axios.post('jobuser/collection/delete', data),

  // 浏览记录
  fetchHistories: data => axios.post('jobuser/history', data),

  // 用户评价
  fetchComments: data => axios.post('jobuser/evaluation', data),

  // 信誉记录
  fetchScoreLog: data => axios.post('jobuser/reputation', data),

  // 积分记录
  fetchPointsLog: data => axios.post('jobuser/integral', data),

  // 钱包记录
  fetchWalletLog: data => axios.post('jobuser/money', data),

  // 用户经验值
  fetchExpLog: data => axios.post('jobuser/experience', data),

  // 投诉建议
  fetchFeedBack: data => axios.post('jobuser/platform/add', data),

  // 用户申述
  fetchCharges: data => axios.post('jobuser/company/add', data),

  // 简历信息
  fetchResume: () => axios.post('jobuser/resume'),

  // 修改基本信息
  updateUserBaseInfo: data => axios.post('/jobuser/updateUserInfo', data),
  updateUserContacts: data => axios.post('/jobuser/addCommunication', data),
  updateUserEducation: data => axios.post('/jobuser/addEducation', data),
  updateUserJobExp: data => axios.post('/jobuser/addWork', data),
  updateUserAbout: data => axios.post('/jobuser/addSelfEvaluation', data),
  updateUserSkill: data => axios.post('/jobuser/addAbility', data),
  updatePreference: data => axios.post('/customize/add', data),

  // 领取经验
  collectExp: data => axios.post('/jobuser/experience/receive', data),

  // 领取积分
  collectPoints: data => axios.post('/jobuser/integral/receive', data),
  platformFeedback: data => axios.post('/feedback/platform/add', data),
  companyFeedback: data => axios.post('/feedback/company/add', data),

  withdraw: data => axios.post('jobuser/withdraw/apply', data)
}
