import { jCryption } from './jcryption'
import { sha256_digest } from './sha256'

export const getKeys = (keyData) => {
  return jCryption.getKeys(keyData)
}

export const encrypt = (str, keys) => {
  const hash = sha256_digest(str)
  const hashReverse = hash.split('').reverse().join('')
  return jCryption.encrypt2(hashReverse, keys)
}

export const cryption = (str, keyData) => {
  const keys = getKeys(keyData)
  return encrypt(str, keys)
}

export const encrypt3 = (str, keys) => {
    const hashReverse = str.split('').reverse().join('')
    return jCryption.encrypt2(hashReverse, keys)
}

export const cryption3 = (str, keyData) => {
    const keys = getKeys(keyData)
    return encrypt3(str, keys)
}