import axios from 'axios'

export const state = {
  cached: [112, 1212, 121, 21, 21, 4, 21, 2, 1, 2]
}

export const getters = {
  cached: state => state.cached,

  positions: state => state.positions
}

export const mutations = {
  CACHE_USER(state, newUser) {
    state.cached.push(newUser)
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
  }
}
