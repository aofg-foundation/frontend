import Vuex from 'vuex'
import auth from './modules/auth'
import locale from './modules/locale'

export default () => new Vuex.Store({
  state: () => ({
  }),
  modules: {
    auth,
    locale
  }
})
