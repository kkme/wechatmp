import { unionBy } from 'lodash'
import TeamService from '@/services/TeamService'
export const state = {
  myTeam: null,
  searchResult: null,
  invitations: null,
  members: null
}

export const getters = {
  myTeam: state => state.myTeam,
  searchResult: state => state.searchResult,
  invitations: state => state.invitations,
  members: state => state.members
}

export const mutations = {
  UPDATE_MY_TEAM(state, myTeam) {
    state.myTeam = myTeam
  },
  UPDATE_SEARCH_RESULT(state, searchResult) {
    state.searchResult = unionBy(state.searchResult, searchResult, 'teamId')
  },
  RESET_SEARCH_RESULT(state, searchResult) {
    state.searchResult = searchResult
  },
  UPDATE_INVITATIONS(state, invitations) {
    state.invitations = invitations
  },
  UPDATE_MEMBERS(state, members) {
    state.members = members
  }
}

export const actions = {
  fetchMyTeamInfo({ commit }, payload) {
    return TeamService.fetchMyTeamInfo(payload).then(res => {
      commit('UPDATE_MY_TEAM', res)
      return res
    })
  },
  search({ commit }, payload) {
    let reset = payload.reset
    let params = Object.assign({}, payload)
    delete params.reset
    return TeamService.search(params).then(res => {
      if (reset) {
        commit('RESET_SEARCH_RESULT', res)
      } else {
        commit('UPDATE_SEARCH_RESULT', res)
      }
      return res
    })
  },
  applyTeam({ commit }, payload) {
    return TeamService.applyTeam(payload).then(res => {
      return res
    })
  },
  searchUser({ commit }, payload) {
    return TeamService.searchUser(payload)
  },
  fetchInvitations({ commit }, payload) {
    return TeamService.fetchInvitations(payload).then(res => {
      commit('UPDATE_INVITATIONS', res)
      return res
    })
  },
  fetchMembers({ commit }, payload) {
    return TeamService.fetchMembers(payload).then(res => {
      commit('UPDATE_MEMBERS', res)
      return res
    })
  },
  removeMember({ commit }, payload) {
    return TeamService.removeMember(payload).then(res => {
      commit('REMOVE_MEMBERS', res)
      return res
    })
  }
}
