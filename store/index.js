import Vuex from 'vuex'
import auth from './modules/auth'
import locale from './modules/locale'
import signer from './modules/signer'
import network from './modules/network'

export default () => new Vuex.Store({
  state: () => ({
  }),
  modules: {
    auth,
    locale,
    signer,
    network
  }
  // plugins: [
  //   createPersistedState()
  // ]
})
