import { unionBy } from 'lodash'
import TeamService from '@/services/TeamService'
export const state = {
  myTeam: null,
  searchResult: null,
  invitations: null,
  members: null,
  teamApplications: null,
  settings: null,
  // owner
  missionsForOwner: null,
  claimedMissionsForOwner: null,
  appliedMissionsForOwner: null
}

export const getters = {
  myTeam: state => state.myTeam,
  searchResult: state => state.searchResult,
  invitations: state => state.invitations,
  members: state => state.members,
  teamApplications: state => state.teamApplications,
  settings: state => state.settings,
  // owner
  missionsForOwner: state => state.missionsForOwner,
  claimedMissionsForOwner: state => state.claimedMissionsForOwner,
  appliedMissionsForOwner: state => state.appliedMissionsForOwner
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
  },
  DELETE_TEAM_APPLICATIONS_ITEM(state, id) {
    state.teamApplications.splice(state.teamApplications.findIndex(teamApplication => teamApplication.userId === id), 1)
  },

  // owner
  UPDATE_MISSIONS_FOR_OWNER(state, missions) {
    state.missionsForOwner = unionBy(state.missionsForOwner, missions, 'recruitmentId')
  },
  UPDATE_CLAIMED_MISSIONS_FOR_OWNER(state, missions) {
    state.claimedMissionsForOwner = unionBy(state.claimedMissionsForOwner, missions, 'taskId')
  },
  UPDATE_APPLIED_MISSIONS_FOR_OWNER(state, missions) {
    state.appliedMissionsForOwner = unionBy(state.appliedMissionsForOwner, missions, 'taskId')
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
      commit('UPDATE_TEAM_APPLICATIONS', res)
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
    return TeamService.handleApplies({ id, status: type }).then(res => {
      commit('DELETE_TEAM_APPLICATIONS_ITEM', id)
      return res
    })
  },

  // owner fetchMisiionByOwner
  fetchMisiionByOwner({ commit }, payload) {
    return TeamService.fetchMisiionByOwner(payload).then(res => {
      commit('UPDATE_MISSIONS_FOR_OWNER', res)
      return res
    })
  },
  fetchClaimedMissionByOwner({ commit }, payload) {
    return TeamService.fetchClaimedMissionByOwner(payload).then(res => {
      commit('UPDATE_CLAIMED_MISSIONS_FOR_OWNER', res)
      return res
    })
  },
  fetchAppliedMissionByOwner({ commit }, payload) {
    return TeamService.fetchAppliedMissionByOwner(payload).then(res => {
      commit('UPDATE_APPLIED_MISSIONS_FOR_OWNER', res)
      return res
    })
  },
  claimMissionByOwner({ commit }, payload) {
    return TeamService.claimMissionByOwner(payload).then(res => {
      return res
    })
  }
}
