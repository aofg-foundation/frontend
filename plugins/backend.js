import Vue from 'vue'
import { host, restApiRoot, port } from '~/../server/config'
import axios from 'axios'

export const http = axios.create({
  // TODO: production checks
  baseURL: `http://localhost:${port}${restApiRoot}/`
})

http.interceptors.response.use(interceptResponse, interceptErorrs)

function interceptResponse (res) {
  try {
    return res.data
  } catch (e) {
    return res
  }
}

function interceptErorrs (err) {
  try {
    err = Object.assign(new Error(), err.response.data.error)
  } catch (e) {}

  return Promise.reject(err)
}

http.removeToken = function () {
  delete http.defaults.headers.common.Authorization
}

http.setToken = function (token) {
  // ? Should be a Bearer?
  http.defaults.headers.common.Authorization = token
}

http.find = function (endpoint, filter, params) {
  return http.get(endpoint, { params: { ...params, filter } })
}

http.findOne = function (endpoint, filter, params) {
  return http.get(endpoint + '/findOne', { params: { ...params, filter } })
}

http.signup = function (payload, signature) {
  return http
    .post('endpoint/signup', {
      payload,
      signature
    })
    .then(data => data.response)
}

http.nonce = function (payload) {
  return http
    .post('endpoint/nonce', {
      payload
    })
    .then(data => data.response)
}

http.login = function (payload, signature) {
  return http
    .post('endpoint/login', {
      payload,
      signature
    })
    .then(data => data.response)
}

http.me = function () {
  return http
    .get('endpoint/me')
    .then(data => data.response)
}

const mixin = {
  beforeCreate () {
    this.$backend = http
  }
}

Vue.mixin(mixin)

export default function backendModule ({ app }, inject) {
  app.$backend = http
}