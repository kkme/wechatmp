export const state = {
  meta: null
}

export const getters = {
  meta: state => state.meta
}

export const mutations = {
  SET_META(state, newMeta) {
    state.meta = newMeta[0]
  }
}

export const actions = {}
