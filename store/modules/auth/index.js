import * as actions from './actions.js'
import * as mutations from './mutations.js'

export default {
  namespaced: true,
  
  state: () => ({
    accessToken: null,
    expireAt: null,
    account: null
  }),

  getters: {
    fresh (state) {
      return state.expireAt && new Date().getTime() < state.expireAt
    },
    ready (state) {
      return state.account && state.accessToken && state.expireAt && new Date().getTime() < state.expireAt
    }
  },

  actions,
  mutations
}