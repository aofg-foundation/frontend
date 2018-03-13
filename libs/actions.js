import { http } from '@/plugins/backend'

let app, store

export default function install (context) {
  app = context.app
  store = app.store
  console.log(app, store)
}

export function call(path, payload) {
  return store.dispatch(path, payload)
}


export async function createAccount (email, password) {
  const { address } = await call('signer/unlock', { email, password })
  const signature = await call('signer/sign', { email, address })
  return await call('auth/signup', { 
    payload: {
      email, 
      address 
    }, 
    signature 
  })
}

export async function loginWithAccount (email, password) {
  const { address } = await call('signer/unlock', { email, password })
  const nonce = await call('signer/nonce', { email })
  const signature = await call('signer/sign', { email, address, nonce })
  const token = await call('auth/login', {
    payload: {
      email,
      address,
      nonce
    },
    signature
  })

  const account = await call('auth/account')
  return { token, account }
}

export async function connectToNode ({ onBlock }) {
  await call('network/connect')
}