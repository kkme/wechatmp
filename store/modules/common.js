import CommonService from '@/services/CommonService'
import { unionBy } from 'lodash'
export const state = {
  areas: []
}

export const getters = {
  areas: state => state.areas
}

export const mutations = {
  UPDATE_CITY(state, areas) {
    state.areas = unionBy(areas, state.areas, 'id')
  }
}

export const actions = {
  fetchCities({ commit, state }, payload) {
    if (payload) {
      let exist = state.areas.find(area => +area.pid === +payload.id)
      if (exist) return
    }
    return CommonService.fetchCities(payload).then(res => {
      commit('UPDATE_CITY', res)
      return res
    })
  }
}
