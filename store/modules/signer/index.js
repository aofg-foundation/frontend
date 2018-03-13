import * as actions from './actions.js'
import * as mutations from './mutations.js'

export default {
  namespaced: true,
  
  state: () => ({
    pkey: null,
    address: null,
    messages: [],
    nonce: 0
  }),

  actions,
  mutations,

  getters: {
    ready (state) {
      return !(!state.pkey || !state.address)
    }
  }
}