const MESSAGES_HISTORY = 20

export function setPrivateKey (state, pkey) {
  state.pkey = pkey
}

export function setAddress (state, address) {
  state.address = address
}

export function addSignedMessage (state, signedMessage) {
  state.messages.push(signedMessage)
  while(state.messages.length > MESSAGES_HISTORY) {
    state.messages.shift()
  }
}

export function updateNonce (state, nonce) {
  state.nonce = nonce
}