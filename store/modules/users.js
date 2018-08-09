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
  histories: [],
  comments: [],
  resume: {}
}

export const getters = {
  baseInfo: state => state.baseInfo,
  scoreLog: state => state.scoreLog,
  groupedScoreLog: state => groupByMonth(state.scoreLog),
  pointsLog: state => state.pointsLog,
  groupedPointsLog: state => groupByMonth(state.pointsLog),
  walletLog: state => state.walletLog,
  collections: state => state.collections,
  jobCollections: state => state.jobCollections,
  corpCollections: state => state.corpCollections,
  commhistoriesents: state => state.histories,
  comments: state => state.comments,
  resume: state => state.resume
}

export const mutations = {
  UPDATE_BASE_INFO(state, info) {
    state.baseInfo = info
  },
  UPDATE_SCORE_LOG(state, scoreLog) {
    state.scoreLog = unionBy(scoreLog, state.scoreLog, 'id')
  },
  UPDATE_POINTS_LOG(state, pointsLog) {
    state.pointsLog = unionBy(pointsLog, state.pointsLog, 'id')
  },
  UPDATE_WALLET_LOG(state, walletLog) {
    state.walletLog = unionBy(walletLog, state.walletLog, 'id')
  },
  UPDATE_JOB_COLLECTIONS(state, jobCollections) {
    state.jobCollections = unionBy(jobCollections, state.jobCollections, 'collectionId')
  },
  UPDATE_CORP_COLLECTIONS(state, corpCollections) {
    state.corpCollections = unionBy(corpCollections, state.corpCollections, 'comId')
  },
  UPDATE_HISTORIES(state, histories) {
    state.histories = unionBy(histories, state.histories, 'id')
  },
  UPDATE_COMMENTS(state, comments) {
    state.comments = unionBy(comments, state.comments, 'id')
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

  fetchBaseInfo({ commit }, payload) {
    return UserService.fetchBaseInfo(payload).then(res => {
      console.log(res.length)

      commit('UPDATE_BASE_INFO', res)
      return res
    })
  },

  fetchScoreLog({ commit }, payload) {
    return UserService.fetchScoreLog(payload).then(res => {
      console.log(res.length)

      commit('UPDATE_SCORE_LOG', res)
      return res
    })
  },

  fetchPointsLog({ commit }, payload) {
    return UserService.fetchPointsLog(payload).then(res => {
      console.log(res.length)

      commit('UPDATE_POINTS_LOG', res)
      return res
    })
  },

  fetchWalletLog({ commit }, payload) {
    return UserService.fetchWalletLog(payload).then(res => {
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
  deleteCollection({ commit }, payload) {
    return UserService.deleteCollection(payload).then(res => {
      // commit('UPDATE_COLLECTIONS', res)
      return res
    })
  },
  fetchHistories({ commit }, payload) {
    return UserService.fetchHistories(payload).then(res => {
      commit('UPDATE_HISTORIES', res)
      return res
    })
  },
  fetchComments({ commit }, payload) {
    return UserService.fetchComments(payload).then(res => {
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
