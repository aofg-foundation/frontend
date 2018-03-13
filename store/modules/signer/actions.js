import { http } from '@/plugins/backend'
import { createWallet, sign as signMessage, toBuffer } from '@/libs/crypto'

export async function unlock ({ commit, dispatch, state }, { email, password }) {
  const walletData = await createWallet(email, password)
  const { pkey, address } = walletData.wallets[0]
  commit('setPrivateKey', pkey)
  commit('setAddress', address)

  return { pkey, address }
}

export async function sign ({ commit, state }, message) {
  const signature = await signMessage(toBuffer(message), state.pkey)
  commit('addSignedMessage', { message, signature })
  return signature.encoded
}

export async function nonce ({ commit }, { email }) {
  const { nonce } = await http.nonce(email)
  commit('updateNonce', nonce + 1)
  return nonce + 1
}