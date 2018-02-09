import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { locales, defaultLocale } from '~/../server/config'
Vue.use(VueI18n)

Vue.mixin({
  methods: {
    $tt: function (locales) {
      if (typeof locales === 'string') {
        return locales
      }

      const locale = this.$store.state.locale.locale
      return locales[locale]
    }
  }
})

class CustomFormatter {
  constructor (options) {
    // ...
  }
 
  //
  // interpolate
  //
  // @param {string} message
  //   string of list or named format.
  //   e.g.
  //   - named formatting: 'Hi {name}'
  //   - list formatting: 'Hi {0}'
  //
  // @param {Object | Array} values
  //   values of `message` interpolcation.
  //   passed values with `$t`, `$tc` and `i18n` functional component.
  //   e.g. 
  //   - $t('hello', { name: 'kazupon' }) -> passed values: Object `{ name: 'kazupon' }` 
  //   - $t('hello', ['kazupon']) -> passed values: Array `['kazupon']`
  //   - `i18n` functional component (component interpolcation)
  //     <i18 path="hello">
  //       <p>kazupon</p>
  //       <p>how are you?</p>
  //     </i18n>
  //     -> passed values: Array (included VNode):
  //        `[VNode{ tag: 'p', text: 'kazupon', ...}, VNode{ tag: 'p', text: 'how are you?', ...}]`
  //
  // @return {Array<any>}
  //   interpolated values. you need to return the following:
  //   - array of string, when is using `$t` or `$tc`.
  //   - array included VNode object, when is using `i18n` functional component.
  // 
  interpolate (message, values) {
    // implement interpolcation logic here
    // ...
 
    // return the interpolated array
    return ['resolved message string']
  }
 }

export default ({ app, store }, inject) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    // formatter: new CustomFormatter(),
    locale: store.state.locale.locale,
    fallbackLocale: defaultLocale,
    messages: locales.reduce((acc, locale) => {
      acc[locale] = require(`@/locales/${locale}.json`)
      return acc
    }, {})
  })

  app.i18n.path = (link) => {
    // if (app.i18n.locale === app.i18n.fallbackLocale) {
    //   return `/${link}`
    // }

    return `/${app.i18n.locale}/${link}`
  }
}