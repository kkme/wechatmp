import JobService from '@/services/JobService'
import { unionBy } from 'lodash'
export const state = {
  jobs: [],
  hotKeywords: [],
  searchHistories: []
}

export const getters = {
  jobs: state => state.jobs,
  hotKeywords: state => state.hotKeywords,
  searchHistories: state => state.searchHistories
}

export const mutations = {
  UPDATE_JOBS(state, jobs) {
    state.jobs = unionBy(jobs, state.jobs, 'recruitmentId')
  },
  UPDATE_HOT_KEYWORDS(state, hotKeywords) {
    state.hotKeywords = unionBy(hotKeywords, state.hotKeywords, 'recruitmentId')
  },
  UPDATE_SEARCH_HISTORIES(state, searchHistories) {
    state.searchHistories = unionBy(searchHistories, state.searchHistories, 'recruitmentId')
  }
}

export const actions = {
  fetchJobs({ commit, state }, payload) {
    return JobService.fetchJobs(payload).then(res => {
      commit('UPDATE_JOBS', res)
      return res
    })
  },
  fetchJob({ commit, state }, payload) {
    return JobService.fetchJob(payload)
  },
  addToJobCollection({ commit, state }, payload) {
    return JobService.addToJobCollection(payload)
  },
  addToCorpCollection({ commit, state }, payload) {
    return JobService.addToCorpCollection(payload)
  },
  fetchRecommendJobs({ commit, state }, payload) {
    return JobService.fetchRecommendJobs(payload)
  },
  fetchCompanyInfo({ commit, state }, payload) {
    return JobService.fetchCompanyInfo(payload)
  },
  applyJob({ commit, state }, payload) {
    return JobService.applyJob(payload)
  },
  fetchHotKeywords({ commit, state }) {
    return JobService.fetchHotKeywords().then(res => {
      commit('UPDATE_HOT_KEYWORDS', res)
      return res
    })
  },
  fetchSearchHistory({ commit, state }) {
    return JobService.fetchSearchHistory().then(res => {
      commit('UPDATE_SEARCH_HISTORIES', res)
      return res
    })
  },
  fetchPackageJobs({ commit, state }, payload) {
    return JobService.fetchPackageJobs(payload).then(res => {
      // commit('UPDATE_SEARCH_HISTORIES', res)
      return res
    })
  }
}
