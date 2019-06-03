import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    user: null,
    isUserLoggedIn: false,
  },
  mutations: {
    setToken(state, value) {
        state.isUserLoggedIn = value
    },
    setUser(state, user) {
      state.user = user
    },
    addfollow(state, data){
      state.user.following.push(data)
    }
  },
  actions: {
    setToken({commit}, value) {
        commit('setToken', value)
      },
    setUser({commit}, user) {
      commit('setUser', user)
    },
    addfollow({commit}, user){
      commit('addfollow', user)
    }
  }
})
