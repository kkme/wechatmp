import Api from '@/services/Api'
export default {
  feedback: data => Api.post('/feedback/company/add', data), // 任务反馈
  fetchCountInfo: data => Api.post('/myDelivery/countInfo', data), // 我的任务首页count信息
  fetchMyMissions: data => Api.post('/myDelivery/verify/idcard', data), // 已领取任务列表
  fetchInvitations: data => Api.post('/myDelivery/inviteMe', data), // 收到的邀请
  fetchApplyList: data => Api.post('/myDelivery/applyList', data), // 申请列表
  fetchCompletedMissions: data => Api.post('/myDelivery/finish', data), // 已完成和取消的任务列表
  postComment: data => Api.post('/myDelivery/jobuser/add', data), // 添加评论
  handleInvitation: data => Api.post('/myDelivery/inviteMe/deal', data), // 处理邀请
  fetchDetail: data => Api.post('/myDelivery/detail', data), // 任务详情
  fetchMissionLog: data => Api.post('/myDelivery/integral', data), // 任务签到列表
  fetchOrders: data => Api.post('/myDelivery/parttime/order', data), // 单量列表
  fetchSalaryLog: data => Api.post('/myDelivery/parttime/wage', data), // 工资列表
  checkIn: data => Api.post('/parttimeSignin/up', data), // 上班打卡
  checkOut: data => Api.post('/parttimeSignin/down', data), // 下班打卡
  fetchCheckLog: data => Api.post('/parttimeSignin/find', data), // 打卡记录
  addOrder: data => Api.post('/parttimeOrder/add', data), // 上传单量
  cancelMission: data => Api.post('/myDelivery/cancel', data), // 取消任务
  applyEndMission: data => Api.post('/myDelivery/aheadFinish', data) // 提前结束任务
}
