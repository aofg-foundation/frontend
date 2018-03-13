import secp256k1 from 'secp256k1'
import { Buffer } from 'safe-buffer'
import createHash from 'create-hash'
import createKeccakHash from 'keccak'
import { pbkdf2Sync as pbkdf2 } from 'pbkdf2'
import unorm from 'unorm'

const HDNode = require('bitcoinjs-lib/src/hdnode')

const DEFAULT_WORDLIST = require('./wordlists/english.json')

const INVALID_MNEMONIC = 'Invalid mnemonic'
const INVALID_ENTROPY = 'Invalid entropy'
const INVALID_CHECKSUM = 'Invalid mnemonic checksum'



function padPrivKey (privB) {
  const privHex = privB.toString('hex')
  return ('0000000000000000' + privHex).slice(-64)
}

function lpad (str, padString, length) {
  while (str.length < length) str = padString + str
  return str
}

function bytesToBinary (bytes) {
  return bytes.map(function (x) {
    return lpad(x.toString(2), '0', 8)
  }).join('')
}

function binaryToByte (bin) {
  return parseInt(bin, 2)
}

function salt (password) {
  return 'mnemonic' + (password || '')
}

export function getAddress (pub) {
  if (pub == null || pub.length !== 64) {
    throw Error('Invalid public key')
  }

  return '0x' + createKeccakHash('keccak256').update(pub).digest().slice(-20).toString('hex')
}

export function deriveChecksumBits (entropyBuffer) {
  const ENT = entropyBuffer.length * 8
  const CS = ENT / 32
  const hash = createHash('sha256').update(entropyBuffer).digest()

  return bytesToBinary([].slice.call(hash)).slice(0, CS)
}

export function entropyToMnemonic (entropy, wordlist) {
  if (!Buffer.isBuffer(entropy)) {
    entropy = Buffer.from(entropy, 'hex')
  }

  wordlist = wordlist || DEFAULT_WORDLIST

  console.log(entropy.length)
  // 128 <= ENT <= 256
  if (entropy.length < 16) throw new TypeError(INVALID_ENTROPY)
  if (entropy.length > 32) throw new TypeError(INVALID_ENTROPY)
  if (entropy.length % 4 !== 0) throw new TypeError(INVALID_ENTROPY)

  const entropyBits = bytesToBinary([].slice.call(entropy))
  const checksumBits = deriveChecksumBits(entropy)
  const bits = entropyBits + checksumBits
  const chunks = bits.match(/(.{1,11})/g)
  const words = chunks.map(function (binary) {
    const index = binaryToByte(binary)
    return wordlist[index]
  })

  return words.join(' ')
}

export function mnemonicToSeed (mnemonic, password) {
  const mnemonicBuffer = Buffer.from(unorm.nfkd(mnemonic), 'utf8')
  const saltBuffer = Buffer.from(salt(unorm.nfkd(password)), 'utf8')

  return pbkdf2(mnemonicBuffer, saltBuffer, 2048, 64, 'sha512')
}

export function generateMnemonic (strength, wordlist) {
  const rnd = typeof strength === 'number' ? createHash('sha256').update(Math.random()).digest() : strength
  return entropyToMnemonic(rnd, wordlist)
}


export function deriveMasterKey (mnemonic) {
  // seed must be 12 or more space-separated words
  const words = mnemonic.trim().split(/\s+/g)

  if (words.length < 12) { throw Error('Mnemonic must be at least 12 words') }

  const seed = mnemonicToSeed(mnemonic)
  const masterKey = HDNode.fromSeedBuffer(seed)
  return masterKey
}

export function deriveWallets (mnemonic, count) {
  count = count || 1

  const masterKey = deriveMasterKey(mnemonic)
  const paths = [...Array(count).keys()].map(index => `m/44'/60'/0'/0/${index}`)
  console.log(paths)
  
  return paths.map(path => ({
    path,
    hdnode: masterKey.derivePath(path)
  })).map(pair => ({
    ...pair,
    privateKey: pair.hdnode.keyPair.d.toBuffer()
  })).map(wallet => ({
    ...wallet,
    publicKey: secp256k1.publicKeyCreate(wallet.privateKey, false).slice(-64)
  })).map(wallet => ({
    ...wallet,
    address: getAddress(wallet.publicKey),
    pkey: padPrivKey(wallet.privateKey)
  }))
}


// function mnemonicToSeedHex (mnemonic, password) {
//   return mnemonicToSeed(mnemonic, password).toString('hex')
// }

// function mnemonicToEntropy (mnemonic, wordlist) {
//   wordlist = wordlist || DEFAULT_WORDLIST

//   const words = unorm.nfkd(mnemonic).split(' ')
//   if (words.length % 3 !== 0) throw new Error(INVALID_MNEMONIC)

//   // convert word indices to 11 bit binary strings
//   const bits = words.map(function (word) {
//     const index = wordlist.indexOf(word)
//     if (index === -1) throw new Error(INVALID_MNEMONIC)

//     return lpad(index.toString(2), '0', 11)
//   }).join('')

//   // split the binary string into ENT/CS
//   const dividerIndex = Math.floor(bits.length / 33) * 32
//   const entropyBits = bits.slice(0, dividerIndex)
//   const checksumBits = bits.slice(dividerIndex)

//   // calculate the checksum and compare
//   const entropyBytes = entropyBits.match(/(.{1,8})/g).map(binaryToByte)
//   if (entropyBytes.length < 16) throw new Error(INVALID_ENTROPY)
//   if (entropyBytes.length > 32) throw new Error(INVALID_ENTROPY)
//   if (entropyBytes.length % 4 !== 0) throw new Error(INVALID_ENTROPY)

//   const entropy = Buffer.from(entropyBytes)
//   const newChecksum = deriveChecksumBits(entropy)
//   if (newChecksum !== checksumBits) throw new Error(INVALID_CHECKSUM)

//   return entropy.toString('hex')
// }


// function generateMnemonic (strength, rng, wordlist) {
//   strength = strength || 128
//   if (strength % 32 !== 0) throw new TypeError(INVALID_ENTROPY)
//   rng = rng || randomBytes

//   return entropyToMnemonic(rng(strength / 8), wordlist)
// }

// function validateMnemonic (mnemonic, wordlist) {
//   try {
//     mnemonicToEntropy(mnemonic, wordlist)
//   } catch (e) {
//     return false
//   }

//   return true
// }

// module.exports = {
//   mnemonicToSeed: mnemonicToSeed,
//   mnemonicToSeedHex: mnemonicToSeedHex,
//   mnemonicToEntropy: mnemonicToEntropy,
//   entropyToMnemonic: entropyToMnemonic,
//   generateMnemonic: generateMnemonic,
//   validateMnemonic: validateMnemonic,
//   wordlists: {
//     EN: ENGLISH_WORDLIST,
//     JA: JAPANESE_WORDLIST,

//     chinese_simplified: CHINESE_SIMPLIFIED_WORDLIST,
//     chinese_traditional: CHINESE_TRADITIONAL_WORDLIST,
//     english: ENGLISH_WORDLIST,
//     french: FRENCH_WORDLIST,
//     italian: ITALIAN_WORDLIST,
//     japanese: JAPANESE_WORDLIST,
//     korean: KOREAN_WORDLIST,
//     spanish: SPANISH_WORDLIST
//   }
// }