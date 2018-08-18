import { unionBy } from 'lodash'
import TeamService from '@/services/TeamService'
export const state = {
  myTeam: null,
  searchResult: null,
  invitations: null,
  members: null,
  teamApplications: null,
  settings: null
}

export const getters = {
  myTeam: state => state.myTeam,
  searchResult: state => state.searchResult,
  invitations: state => state.invitations,
  members: state => state.members,
  teamApplications: state => state.teamApplications,
  settings: state => state.settings
}

export const mutations = {
  UPDATE_MY_TEAM(state, myTeam) {
    state.myTeam = myTeam
  },
  RESET_SEARCH_RESULT(state, searchResult) {
    state.searchResult = searchResult
  },
  UPDATE_INVITATIONS(state, invitations) {
    state.invitations = invitations
  },
  DELETE_INVITATIONS_ITEM(state, id) {
    state.invitations.splice(state.invitations.findIndex(invitation => invitation.applyForId === id), 1)
  },
  UPDATE_MEMBERS(state, members) {
    state.members = members
  },
  UPDATE_SETTINGS(state, settings) {
    state.settings = settings
  },
  UPDATE_SEARCH_RESULT(state, searchResult) {
    state.searchResult = unionBy(state.searchResult, searchResult, 'teamId')
  },
  UPDATE_TEAM_APPLICATIONS(state, teamApplications) {
    state.teamApplications = unionBy(state.teamApplications, teamApplications, 'teamId')
  }
}

export const actions = {
  fetchMyTeamInfo({ commit }, payload) {
    return TeamService.fetchMyTeamInfo(payload).then(res => {
      commit('UPDATE_MY_TEAM', res)
      return res
    })
  },

  createTeam({ commit }, payload) {
    return TeamService.createTeam(payload).then(res => {
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
  },
  handleInvitation({ commit }, payload) {
    return TeamService.handleInvitation(payload).then(res => {
      commit('DELETE_INVITATIONS_ITEM', payload.id)
      return res
    })
  },
  quitTeam({ commit }, payload) {
    return TeamService.quitTeam(payload)
  },
  changeTeamRole({ commit }, payload) {
    return TeamService.changeTeamRole(payload)
  },
  rewards({ commit }, payload) {
    return TeamService.rewards(payload)
  },
  fetchTeamApplications({ commit }, payload) {
    return TeamService.fetchTeamApplications(payload).then(res => {
      commit('UPDATE_TEAM_APPLICATIONS', payload.id)
      return res
    })
  },
  updateSettings({ commit }, payload) {
    return TeamService.updateSettings(payload).then(res => {
      commit('UPDATE_SETTINGS', payload)
      return res
    })
  },
  handleApplies({ commit }, { id, type }) {
    if (type === 'reject') {
      return TeamService.rejectApplies({ id })
    } else if (type === 'accept') {
      return TeamService.acceptApplies({ id })
    }
  }
}
