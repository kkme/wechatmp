import Api from '@/services/Api'

export default {
  search: data => Api.post('/team/search', data), // 1.战队搜索开始页, 可直接输入战队ID check
  createTeam: data => Api.post('/team/create', data), // 创建战队 check
  searchUser: data => Api.post('/team/invite/search', data), // 战队邀请 搜索可邀请用户  check
  fetchInvitations: data => Api.post('/team/inviteMe', data), // 战队邀请列表 chekc
  handleInvitation: data => Api.post('/team/inviteMe/handler', data), // 同意, 拒绝邀请 check
  applyTeam: data => Api.post('/team/joinApply', data), // 申请加入战队 check
  fetchMyTeamInfo: data => Api.post('/team/mine', data), // 我的战队 check

  fetchTeamMission: data => Api.post('/team/task', data), // 战队任务大厅 check
  fetchMembers: data => Api.post('/team/member', data), // 战队成员列表 check
  postNews: data => Api.post('/team/addNews', data), // 发布战队公告
  quitTeam: data => Api.post('/team/quit', data), // 退出战队 check
  updateSettings: data => Api.post('/team/setting', data), // 战队设置 check
  applyMission: data => Api.post('/team/task/apply', data), // 战队任务报名 check
  quitMission: data => Api.post('/team/task/quit', data), // 战队任务退出 check

  handleApplies: data => Api.post('/team/joinApply/handler', data), // 同意入队 // 拒绝入队 check

  fetchMisiionByOwner: data => Api.post('/team/adminTask/find', data), // 队长找任务 check
  fetchClaimedMissionByOwner: data => Api.post('/team/adminTask/catch', data), // 已领取任务 check
  fetchAppliedMissionByOwner: data => Api.post('/team/adminTask/applied', data), // 已申请任务 check
  claimMissionByOwner: data => Api.post('/team/task/adminGet', data), // 队长领取任务 check
  quitMissionByOwner: data => Api.post('/team/task/adminGiveUp', data), // 队长放弃任务
  applyMissionByOwner: data => Api.post('/team/task/adminApply', data), // 队长提交申请

  taskGetTaskMember: data => Api.post('/team/task/getTaskMember', data), // 已领取任务 的报名人员列表
  removeMissonAppliedUser: data => Api.post('/team/task/getTaskMember/remove', data), // 移除已领取任务的报名人员 check
  taskAppliedMember: data => Api.post('/team/task/appliedMember', data), // 已申请任务 的人员列表

  removeMember: data => Api.post('/team/member/remove', data), // 开除队员 check
  rewards: data => Api.post('/team/integral/gift', data), // 积分赠送 check
  joinRecord: data => Api.post('/team/joinRecord', data), // 加入战队的记录
  inviteSend: data => Api.post('/team/invite/send', data), // 添加成员 发送邀请 check
  changeTeamRole: data => Api.post('/team/changePosition', data), //  修改职位 check
  fetchTeamApplications: data => Api.post('/team/joinAppplyList', data) // 入队申请列表 check
}
