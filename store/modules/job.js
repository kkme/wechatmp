import JobService from '@/services/JobService'
import { unionBy } from 'lodash'
export const state = {
  jobs: []
}

export const getters = {
  jobs: state => state.jobs
}

export const mutations = {
  UPDATE_JOBS(state, jobs) {
    state.jobs = unionBy(jobs, state.jobs, 'recruitmentId')
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
  }
}
