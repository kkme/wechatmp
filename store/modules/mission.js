import MissionService from '@/services/MissionService'
import { unionBy } from 'lodash'
export const state = {
  countInfo: {},
  missions: [],
  invitations: [],
  applyList: [],
  completedMissions: [],
  detail: {},
  missionLog: [],
  orders: [],
  salaryLog: [],
  checkInOutLog: []
}

export const getters = {
  countInfo: state => state.countInfo,
  missions: state => state.missions,
  invitations: state => state.invitations,
  applyList: state => state.applyList,
  completedMissions: state => state.completedMissions,
  detail: state => state.detail,
  missionLog: state => state.missionLog,
  orders: state => state.orders,
  salaryLog: state => state.salaryLog,
  checkInOutLog: state => state.checkInOutLog
}

export const mutations = {
  UPDATE_COUNT_INFO(state, countInfo) {
    state.currentLocation = countInfo
  },
  UPDATE_MISSIONS(state, missions) {
    state.currentLocation = unionBy(missions, state.missions)
  },
  UPDATE_INVITATIONS(state, invitations) {
    state.currentLocation = unionBy(invitations, state.invitations)
  },
  UPDATE_APPLY_LIST(state, applyList) {
    state.currentLocation = unionBy(applyList, state.applyList)
  },
  UPDATE_COMPLETED_MISSIONS(state, completedMissions) {
    state.currentLocation = unionBy(completedMissions, state.completedMissions)
  },
  UPDATE_DETAIL(state, detail) {
    state.currentLocation = detail
  },
  UPDATE_MISSION_LOG(state, missionLog) {
    state.currentLocation = unionBy(missionLog, state.missionLog)
  },
  UPDATE_ORDERS(state, orders) {
    state.currentLocation = unionBy(orders, state.orders)
  },
  UPDATE_SALARY_LOG(state, salaryLog) {
    state.currentLocation = unionBy(salaryLog, state.salaryLog)
  },
  UPDATE_CHECK_IN_OUT_LOG(state, checkInOutLog) {
    state.currentLocation = unionBy(checkInOutLog, state.checkInOutLog)
  }
}

export const actions = {
  feedback({ commit, state }, payload) {
    return MissionService.feedback(payload)
  },
  fetchCountInfo({ commit, state }, payload) {
    return MissionService.fetchCountInfo(payload).then(res => {
      commit('UPDATE_COUNT_INFO', res)
      return res
    })
  },
  fetchMyMissions({ commit, state }, payload) {
    return MissionService.fetchMyMissions(payload).then(res => {
      commit('UPDATE_MISSIONS', res)
      return res
    })
  },
  fetchInvitations({ commit, state }, payload) {
    return MissionService.fetchInvitations(payload).then(res => {
      commit('UPDATE_INVITATIONS', res)
      return res
    })
  },
  fetchApplyList({ commit, state }, payload) {
    return MissionService.fetchApplyList(payload).then(res => {
      commit('UPDATE_APPLY_LIST', res)
      return res
    })
  },
  fetchCompletedMissions({ commit, state }, payload) {
    return MissionService.fetchCompletedMissions(payload).then(res => {
      commit('UPDATE_COMPLETED_MISSIONS', res)
      return res
    })
  },
  postComment({ commit, state }, payload) {
    return MissionService.postComment(payload)
  },
  handleInvitation({ commit, state }, payload) {
    return MissionService.handleInvitation(payload)
  },
  fetchDetail({ commit, state }, payload) {
    return MissionService.fetchDetail(payload).then(res => {
      commit('UPDATE_MISSION_LOG', res)
      return res
    })
  },
  fetchMissionLog({ commit, state }, payload) {
    return MissionService.fetchMissionLog(payload).then(res => {
      commit('UPDATE_MISSION_LOG', res)
      return res
    })
  },
  fetchOrders({ commit, state }, payload) {
    return MissionService.fetchOrders(payload).then(res => {
      commit('UPDATE_ORDERS', res)
      return res
    })
  },
  fetchSalaryLog({ commit, state }, payload) {
    return MissionService.fetchSalaryLog(payload).then(res => {
      commit('UPDATE_SALARY_LOG', res)
      return res
    })
  },
  checkIn({ commit, state }, payload) {
    return MissionService.checkIn(payload)
  },
  checkOut({ commit, state }, payload) {
    return MissionService.checkOut(payload)
  },
  fetchCheckLog({ commit, state }, payload) {
    return MissionService.fetchCheckLog(payload).then(res => {
      commit('UPDATE_CHECK_IN_OUT_LOG', res)
      return res
    })
  },
  addOrder({ commit, state }, payload) {
    return MissionService.addOrder(payload)
  },
  cancelMission({ commit, state }, payload) {
    return MissionService.cancelMission(payload)
  },
  applyEndMission({ commit, state }, payload) {
    return MissionService.applyEndMission(payload)
  }
}
