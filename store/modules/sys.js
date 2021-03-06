export const state = {
  meta: null,
  snackbar: {
    show: false,
    msg: ''
  }
}

export const getters = {
  meta: state => state.meta,
  snackbar: state => state.snackbar
}

export const mutations = {
  SET_META(state, newMeta) {
    state.meta = newMeta[0]
  },
  SET_SNACKBAR(state, snackbar) {
    if (typeof snackbar === 'string') {
      state.snackbar = { show: true, msg: snackbar }
    } else {
      snackbar.show = true
      state.snackbar = snackbar
    }
  },
  RESET_SNAKBAR(state) {
    state.snackbar = { show: false, msg: '' }
  }
}

export const actions = {
  showSnackbar({ commit }, payload) {
    commit('RESET_SNAKBAR')
    commit('SET_SNACKBAR', payload)
  }
}
