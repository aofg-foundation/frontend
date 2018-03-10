import Vue from 'vue'
import { host, restApiRoot, port } from '~/../server/config'
import axios from 'axios'

const http = axios.create({
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
  delete this.http.defaults.headers.common.Authorization
}

http.setToken = function (token) {
  // ? Should be a Bearer?
  this.http.defaults.headers.common.Authorization = token
}

http.find = function (endpoint, filter, params) {
  return http.get(endpoint, { params: { ...params, filter } })
}

http.findOne = function (endpoint, filter, params) {
  return http.get(endpoint + '/findOne', { params: { ...params, filter } })
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