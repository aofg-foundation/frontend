import * as actions from './actions.js'
import * as mutations from './mutations.js'

export default {
  namespaced: true,
  
  state: () => ({
    provider: null,
    connection: null,
    latestBlock: null,
    nodes: [
      { endpoint: 'http://localhost:8545', name: 'Local node' },
      { endpoint: 'http://node.aofg.cc', name: 'aofg.cc node' },
    ],
    selectedNode: null,
    blocks: {}
  }),

  getters: {
    defaultNode (state) {
      return state.nodes[0]
    }
  },

  actions,
  mutations
}