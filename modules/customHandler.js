// function customRequestHandler (req, res, next) {
//   console.log('request', arguments)
//   next()
// }

function customErrorsHandler (req, res, next) {
  console.log('error', arguments)
  next()
}

module.exports = function (moduleOptions) {
  // this.nuxt.hook('render:setupMiddleware', app => app.use(customRequestHandler))
  this.nuxt.hook('render:errorMiddleware', app => app.use(customErrorsHandler))
}