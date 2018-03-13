import { http } from '@/plugins/backend'

export async function signup ({ commit, dispatch, state }, { payload, signature }) {
  return await http.signup(payload, signature)
}
export async function login ({ commit, dispatch, state }, { payload, signature }) {
  const response = await http.login(payload, signature)
  commit('setEmail', payload.email)
  http.setToken(response.token)
  commit('setAccessToken', response.token)
  commit('setExpireAt', new Date().getTime() + (response.ttl * 1000))
  return response
}
export async function account ({ commit, dispatch, state }) {
  const email = state.email
  const account = await http.me()

  if (!account)
  {
    throw new Error('not found')
  }

  commit('setAccount', account)
  return account
}