// import crypto from 'crypto-js'
import createHash from 'create-hash'
import { deriveWallets, generateMnemonic } from './bip39'
import { SigningKey, utils } from 'ethers'
import { Buffer } from 'safe-buffer'

export async function createWallet (email, password) {
  const entropy = createHash('sha256').update(email).update(password).digest()
  const mnemonic = generateMnemonic(entropy)
  const wallets = deriveWallets(mnemonic)
  return {
    mnemonic,
    wallets
  }
}

export function toBuffer (raw) {
  if (typeof raw === 'string') 
    return utils.toUtf8Bytes(raw)

  if (typeof raw === 'number')
    return utils.toUtf8Bytes(raw)

  return utils.toUtf8Bytes(JSON.stringify(raw))
}

export async function sign (buffer, pkey) {
  const signingKey = new SigningKey('0x' + pkey)
  const digest = utils.keccak256(buffer)
  const signature = signingKey.signDigest(digest)

  signature.v = signature.recoveryParam + 27
  delete signature.recoveryParam

  console.log(`"${digest}", ${signature.v}, "${signature.r}", "${signature.s}"`)

  console.log(SigningKey.recover(digest, signature.r, signature.s, signature.v - 27));
  return {
    ...signature,
    encoded: utils.RLP.encode([signature.r, signature.s, utils.hexlify(signature.v)])
  }
}