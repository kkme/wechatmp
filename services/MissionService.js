import axios from 'axios'
export default {
  feedback: data => axios.post('/feedback/company/add', data), // 任务反馈
  fetchCountInfo: data => axios.post('/myDelivery/countInfo', data), // 我的任务首页count信息
  fetchMyMissions: data => axios.post('myDelivery/catched', data), // 已领取任务列表
  fetchInvitations: data => axios.post('/myDelivery/inviteMe', data), // 收到的邀请
  fetchApplications: data => axios.post('/myDelivery/applyList', data), // 申请列表
  fetchCompletedMissions: data => axios.post('/myDelivery/finish', data), // 已完成和取消的任务列表
  handleInvitation: data => axios.post('/myDelivery/inviteMe/deal', data), // 处理邀请
  fetchDetail: data => axios.post('/myDelivery/detail', data), // 任务详情
  fetchCheckInOutLog: data => axios.post('/myDelivery/parttime/signin', data), // 任务签到列表
  fetchOrders: data => axios.post('/myDelivery/parttime/order', data), // 单量列表
  fetchSalaryLog: data => axios.post('/myDelivery/parttime/wage', data), // 工资列表
  checkIn: data => axios.post('/parttimeSignin/up', data), // 上班打卡
  checkOut: data => axios.post('/parttimeSignin/down', data), // 下班打卡
  fetchCheckStatus: data => axios.post('/parttimeSignin/find', data), // 打卡记录
  addOrder: data => axios.post('/parttimeOrder/add', data), // 上传单量
  cancelMission: data => axios.post('/myDelivery/cancel', data), // 取消任务
  endMission: data => axios.post('/myDelivery/aheadFinish', data), // 提前结束任务
  delayMission: data => axios.post('/parttimeApply/delay', data), // 申请延期
  patchOrder: data => axios.post('/parttimeOrder/remedy', data), // 补单量
  overdueCheckInOut: data => axios.post('/parttimeSignin/remedy', data), // 补签到
  postComment: data => axios.post('evaluation/jobuser/add', data) // 添加评论
}
