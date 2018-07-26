import axios from 'axios'
import UserService from '@/services/UserService'

export const state = {
  baseInfo: {},
  scoreLog: [],
  pointsLog: [],
  walletLog: [],
  collections: [],
  comments: []
}

export const getters = {
  baseInfo: state => state.baseInfo,
  scoreLog: state => state.scoreLog,
  pointsLog: state => state.pointsLog,
  walletLog: state => state.walletLog,
  collections: state => state.collections,
  comments: state => state.comments
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
  UPDATE_COLLECTIONS(state, collections) {
    state.collections = collections
  },
  UPDATE_COMMENTS(state, comments) {
    state.comments = comments
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

  fetchCollections({ commit }) {
    return UserService.fetchCollections().then(res => {
      commit('UPDATE_COLLECTIONS', res)
      return res
    })
  },

  fetchComments({ commit }) {
    return UserService.fetchComments().then(res => {
      commit('UPDATE_COMMENTS', res)
      return res
    })
  }
}
