import axios from 'axios'
import UserService from '@/services/UserService'
import { groupBy, unionBy } from 'lodash'
import { collectionTypes } from '@const'
import { labelToValue } from '@helper'
export const state = {
  baseInfo: {},
  scoreLog: [],
  pointsLog: [],
  walletLog: [],
  collections: [],
  jobCollections: [],
  corpCollections: [],
  comments: [],
  resume: {}
}

export const getters = {
  baseInfo: state => state.baseInfo,
  scoreLog: state => state.scoreLog,
  groupedScoreLog: state => groupByMonth(state.scoreLog),
  pointsLog: state => state.pointsLog,
  groupedPointsLog: state => {
    let list = groupByMonth(state.pointsLog)
    // console.log(JSON.stringify(list, null, 2))
    return list
  },
  walletLog: state => state.walletLog,
  collections: state => state.collections,
  jobCollections: state => state.jobCollections,
  corpCollections: state => state.corpCollections,
  comments: state => state.comments,
  resume: state => state.resume
}

export const mutations = {
  UPDATE_BASE_INFO(state, info) {
    state.baseInfo = info
  },
  UPDATE_SCORE_LOG(state, scoreLog) {
    state.scoreLog = scoreLog
  },
  UPDATE_POINTS_LOG(state, pointsLog) {
    state.pointsLog = pointsLog
  },
  UPDATE_WALLET_LOG(state, walletLog) {
    state.walletLog = walletLog
  },
  UPDATE_JOB_COLLECTIONS(state, jobCollections) {
    state.jobCollections = unionBy(jobCollections, state.jobCollections, 'collectionId')
  },
  UPDATE_CORP_COLLECTIONS(state, corpCollections) {
    state.corpCollections = unionBy(corpCollections, state.corpCollections, 'comId')
  },
  UPDATE_COMMENTS(state, comments) {
    state.comments = comments
  },
  UPDATE_RESUME(state, resume) {
    state.resume = resume
  }
}

export const actions = {
  fetchUser({ commit, state, rootState }, { username }) {
    // 1. Check if we already have the user as a current user.
    const { currentUser } = rootState.auth
    if (currentUser && currentUser.username === username) {
      return Promise.resolve(currentUser)
    }

    // 2. Check if we've already fetched and cached the user.
    const matchedUser = state.cached.find(user => user.name === username)
    if (matchedUser) {
      return Promise.resolve(currentUser)
    }

    // 3. Fetch the user from the API and cache it in case
    //    we need it again in the future.
    return axios.get(`/users/${username}`).then(response => {
      const user = response.data
      commit('CACHE_USER', user)
      return user
    })
  },

  fetchBaseInfo({ commit }) {
    return UserService.fetchBaseInfo().then(res => {
      commit('UPDATE_BASE_INFO', res)
      return res
    })
  },

  fetchScoreLog({ commit }) {
    return UserService.fetchScoreLog().then(res => {
      commit('UPDATE_SCORE_LOG', res)
      return res
    })
  },

  fetchPointsLog({ commit }) {
    return UserService.fetchPointsLog().then(res => {
      commit('UPDATE_POINTS_LOG', res)
      return res
    })
  },

  fetchWalletLog({ commit }) {
    return UserService.fetchWalletLog().then(res => {
      commit('UPDATE_WALLET_LOG', res)
      return res
    })
  },

  fetchCollections({ commit }, { payload, type }) {
    payload.type = labelToValue(type, collectionTypes)
    return UserService.fetchCollections(payload).then(res => {
      if (type === 'job') {
        commit('UPDATE_JOB_COLLECTIONS', res)
      } else if (type === 'corp') {
        commit('UPDATE_CORP_COLLECTIONS', res)
      }
      return res
    })
  },
  deleteJobCollection({ commit }, payload) {
    return UserService.deleteJobCollection(payload).then(res => {
      // commit('UPDATE_COLLECTIONS', res)
      return res
    })
  },
  fetchComments({ commit }) {
    return UserService.fetchComments().then(res => {
      commit('UPDATE_COMMENTS', res)
      return res
    })
  },

  fetchResume({ commit }) {
    return UserService.fetchResume().then(res => {
      commit('UPDATE_RESUME', res)
      return res
    })
  }
}

const groupByMonth = data => {
  if (!(data || data.length)) return []
  let group = Object.entries(groupBy(data, ele => ele.createtime.substr(0, 7)))
  return group.sort((a, b) => a[0] < b[0]).map(ele => {
    ele[1] = ele[1].sort((a, b) => a.createtime < b.createtime)
    // TODO count negative and positive
    return ele
  })
}
