import CommonService from '@/services/CommonService'
import { unionBy } from 'lodash'
export const state = {
  currentLocation: {},
  areas: [],
  positions: [],
  metroPlatforms: [],
  districts: []
}

export const getters = {
  currentLocation: state => state.currentLocation,
  areas: state => state.areas,
  positions: state => state.positions,
  metroPlatformss: state => state.metroPlatforms,
  districts: state => state.districts
}

export const mutations = {
  UPDATE_CURRENT_LOCATION(state, location) {
    state.currentLocation = location
  },
  UPDATE_CITIES(state, areas) {
    state.areas = unionBy(areas, state.areas, 'id')
  },
  UPDATE_POSITIONS(state, areas) {
    state.positions = unionBy(areas, state.positions, 'id')
  },
  UPDATE_METRO_PLATFORMS(state, areas) {
    state.metroPlatformss = unionBy(areas, state.metroPlatformss, 'id')
  },
  UPDATE_DISTRICTS(state, areas) {
    state.districts = unionBy(areas, state.districts, 'id')
  }
}

export const actions = {
  fetchCities({ commit, state }, payload) {
    if (payload) {
      let exist = state.areas.find(area => +area.pid === +payload.id)
      if (exist) return
    }
    return CommonService.fetchCities(payload).then(res => {
      commit('UPDATE_CITIES', res)
      return res
    })
  },
  fetchPositions({ commit, state }, payload) {
    if (payload) {
      let exist = state.positions.find(position => +position.pid === +payload.id)
      if (exist) return
    }
    return CommonService.fetchPositions(payload).then(res => {
      commit('UPDATE_POSITIONS', res)
      return res
    })
  },
  fetchMetroPlatforms({ commit, state }, payload) {
    if (payload) {
      let exist = state.metroPlatforms.find(metroPlatform => +metroPlatform.pid === +payload.id)
      if (exist) return
    }
    return CommonService.fetchMetroPlatforms(payload).then(res => {
      commit('UPDATE_METRO_PLATFORMS', res)
      return res
    })
  },
  fetchDistricts({ commit, state }, payload) {
    if (payload) {
      let exist = state.districts.find(district => +district.pid === +payload.id)
      if (exist) return
    }
    return CommonService.fetchDistricts(payload).then(res => {
      commit('UPDATE_DISTRICTS', res)
      return res
    })
  },

  uploadFile({ commit }, payload) {
    return CommonService.uploadFile(payload)
  }
}
