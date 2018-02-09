import * as actions from './actions.js'
import * as mutations from './mutations.js'

import { defaultLocale, locales } from '~/../server/config'

export default {
  namespaced: true,
  
  state: () => ({
    prefered: defaultLocale,
    locales: locales,
    locale: defaultLocale
  }),

  actions,
  mutations
}