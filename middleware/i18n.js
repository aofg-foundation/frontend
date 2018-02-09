import { defaultLocale, locales } from '~/../server/config'

export default function ({
  isHMR,
  app,
  store,
  route,
  params,
  query,
  error,
  redirect 
}) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return
  }
  const prefer = store.state.locale.prefered
  
  if (locales.indexOf(params.lang) === -1) {
    return redirect(`/${prefer}${route.path}`)
  }

  // Get locale from params
  const locale = params.lang || prefer
  if (store.state.locale.locales.indexOf(locale) === -1) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  // Set locale
  store.commit('locale/setLocale', locale)
  app.i18n.locale = store.state.locale

  
  // If route is /en/... -> redirect to /...
  // if (locale === 'en' && route.fullPath.indexOf('/en') === 0) {
  //   return redirect(route.fullPath.replace(/^\/en/, '/'))
  // }
}