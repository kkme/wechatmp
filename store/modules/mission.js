import MissionService from '@/services/MissionService'
import { labelToValue } from '@helper'
import { applyStatuses } from '@const'
import { unionBy } from 'lodash'
export const state = {
  countInfo: {},
  myMissions: [],
  invitations: [],
  applications: [],
  completedMissions: [],
  detail: {},
  myMissionLog: [],
  orders: [],
  salaryLog: [],
  checkInOutLog: []
}

export const getters = {
  countInfo: state => state.countInfo,
  myMissions: state => state.myMissions,
  invitations: state => state.invitations,
  applications: state => state.applications,
  completedMissions: state => state.completedMissions,
  detail: state => state.detail,
  myMissionLog: state => state.myMissionLog,
  orders: state => state.orders,
  salaryLog: state => state.salaryLog,
  checkInOutLog: state => state.checkInOutLog
}

export const mutations = {
  UPDATE_COUNT_INFO(state, countInfo) {
    state.countInfo = countInfo
  },
  UPDATE_MISSIONS(state, myMissions) {
    state.myMissions = unionBy(myMissions, state.myMissions, 'deliveryId')
  },
  UPDATE_INVITATIONS(state, invitations) {
    state.invitations = unionBy(invitations, state.invitations, 'deliveryId')
  },
  UPDATE_INVITATION(state, { id, flag }) {
    let invitation = state.invitations.find(invitation => invitation.deliveryId === id)
    if (!invitation) return
    invitation.deliveryStatus = labelToValue(flag ? 'pass' : 'reject', applyStatuses)
    console.log({ invitation })
  },
  UPDATE_APPLICATIONS(state, applications) {
    state.applications = unionBy(applications, state.applications, 'deliveryId')
  },
  UPDATE_COMPLETED_MISSIONS(state, completedMissions) {
    state.completedMissions = unionBy(completedMissions, state.completedMissions, 'deliveryId')
  },
  UPDATE_DETAIL(state, detail) {
    state.detail = detail
  },
  UPDATE_MISSION_LOG(state, myMissionLog) {
    state.myMissionLog = unionBy(myMissionLog, state.myMissionLog)
  },
  UPDATE_ORDERS(state, orders) {
    state.orders = unionBy(orders, state.orders)
  },
  UPDATE_SALARY_LOG(state, salaryLog) {
    state.salaryLog = unionBy(salaryLog, state.salaryLog)
  },
  UPDATE_CHECK_IN_OUT_LOG(state, checkInOutLog) {
    state.checkInOutLog = unionBy(checkInOutLog, state.checkInOutLog)
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
  fetchApplications({ commit, state }, payload) {
    return MissionService.fetchApplications(payload).then(res => {
      commit('UPDATE_APPLICATIONS', res)
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
    return MissionService.handleInvitation(payload).then(res => {
      commit('UPDATE_INVITATION', payload)
      return res
    })
  },
  fetchDetail({ commit, state }, payload) {
    return MissionService.fetchDetail(payload).then(res => {
      commit('UPDATE_MISSION_LOG', res)
      return res
    })
  },
  fetchCheckStatus({ commit, state }, payload) {
    return MissionService.fetchCheckStatus(payload).then(res => {
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
  fetchCheckInOutLog({ commit, state }, payload) {
    return MissionService.fetchCheckInOutLog(payload).then(res => {
      commit('UPDATE_CHECK_IN_OUT_LOG', res)
      return res
    })
  },
  checkIn({ commit, state }, payload) {
    return MissionService.checkIn(payload)
  },
  checkOut({ commit, state }, payload) {
    return MissionService.checkOut(payload)
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
