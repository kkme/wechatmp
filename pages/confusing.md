1.我的任务-----上部分信息 /myDelivery/countInfo
需要领取任务总数、完成任务总数、工资总数

2.已领取任务查询
请求地址：/myDelivery/verify/idcard
404

3.收到兼职邀请
请求地址：/myDelivery /inviteMe
缺少：
兼职 id 和 任务 id
没 id 需要兼职 id 和任务 id
状态：待处理、已同意、已拒绝
标签：是否战队任务

4.申请列表:
请求地址：/myDelivery/applyList
缺少：
兼职 id 和 任务 id
标签：是否战队任务
状态：申请状况（等待确认）

5.已完成(包括完成和取消的)
请求地址：/myDelivery/finish
缺少：
兼职 id 和 任务 id
需要状态：是否评价
标签：是否战队任务

以上 1-5 是否可以按照月份查询。根据设计图可以跟查看每个月的情况

6.我的兼职任务详情
/myDelivery/detail
需要兼职 id 查详情 或者 直接返到一起
