
export const jCryption = {
  getKeys: function (data) {
    const JCryptionKeyPair = function (encryptionExponent, modulus, maxdigits) {
      setMaxDigits(parseInt(maxdigits, 10))
      this.e = biFromHex(encryptionExponent)
      this.m = biFromHex(modulus)
      this.chunkSize = 2 * biHighIndex(this.m)
      this.radix = 16
      this.barrett = new BarrettMu(this.m)
    }

    const keys = new JCryptionKeyPair(data.e, data.n, data.maxdigits)
    return keys
  },
  encrypt: function (string, keyPair, callback) {
    let charSum = 0
    for (let i = 0; i < string.length; i++) {
      charSum += string.charCodeAt(i)
    }
    const tag = '0123456789abcdef'
    let hex = ''
    hex += tag.charAt((charSum & 0xF0) >> 4) + tag.charAt(charSum & 0x0F)

    const taggedString = hex + string

    const encrypt = []
    let j = 0

    while (j < taggedString.length) {
      encrypt[j] = taggedString.charCodeAt(j)
      j++
    }

    while (encrypt.length % keyPair.chunkSize !== 0) {
      encrypt[j++] = 0
    }

    function encryption (encryptObject) {
      let charCounter = 0
      let j, block
      let encrypted = ''
      function encryptChar () {
        block = new BigInt()
        j = 0
        for (let k = charCounter; k < charCounter + keyPair.chunkSize; ++j) {
          block.digits[j] = encryptObject[k++]
          block.digits[j] += encryptObject[k++] << 8
        }
        const crypt = keyPair.barrett.powMod(block, keyPair.e)
        const text = keyPair.radix === 16 ? biToHex(crypt) : biToString(crypt, keyPair.radix)
        encrypted += text + ' '
        charCounter += keyPair.chunkSize
        if (charCounter < encryptObject.length) {
          setTimeout(encryptChar, 1)
        } else {
          const encryptedString = encrypted.substring(0, encrypted.length - 1)
          if (typeof callback === 'function') {
            callback(encryptedString)
          } else {
            return encryptedString
          }
        }
      }
      setTimeout(encryptChar, 1)
    }

    encryption(encrypt)
  },
  encrypt2: function (string, keyPair) {
    // let charSum = 0
    // for (let i = 0; i < string.length; i++) {
    //   charSum += string.charCodeAt(i)
    // }
    // const tag = '0123456789abcdef'
    // let hex = ''
    //
    // hex += tag.charAt((charSum & 0xF0) >> 4) + tag.charAt(charSum & 0x0F)

    const taggedString = string

    const encrypt = []
    let j = 0

    while (j < taggedString.length) {
      encrypt[j] = taggedString.charCodeAt(j)
      j++
    }

    while (encrypt.length % keyPair.chunkSize !== 0) {
      encrypt[j++] = 0
    }

    function encryption (encryptObject) {
      let charCounter = 0
      let j, block
      let encrypted = ''
      let encryptedString
      function encryptChar () {
        block = new BigInt()
        j = 0
        for (let k = charCounter; k < charCounter + keyPair.chunkSize; ++j) {
          block.digits[j] = encryptObject[k++]
          block.digits[j] += encryptObject[k++] << 8
        }
        const crypt = keyPair.barrett.powMod(block, keyPair.e)
        const text = keyPair.radix === 16 ? biToHex(crypt) : biToString(crypt, keyPair.radix)
        encrypted += text + ' '
        charCounter += keyPair.chunkSize
        if (charCounter < encryptObject.length) {
          encryptChar()
        } else {
          encryptedString = encrypted.substring(0, encrypted.length - 1)
        }
      }
      encryptChar()
      return encryptedString
    }
    return encryption(encrypt)
  }
}

/*
* BigInt, a suite of routines for performing multiple-precision arithmetic in
* JavaScript.
* BarrettMu, a class for performing Barrett modular reduction computations in
* JavaScript.
*
*
* Copyright 1998-2005 David Shapiro.
* dave@ohdave.com
*
* changed and improved by Daniel Griesser
* http://www.jcryption.org/
* Daniel Griesser <daniel.griesser@jcryption.org>
*/

const biRadixBits = 16
const bitsPerDigit = biRadixBits
const biRadix = 1 << 16
const biHalfRadix = biRadix >>> 1
const biRadixSquared = biRadix * biRadix
const maxDigitVal = biRadix - 1

let maxDigits
let ZERO_ARRAY
let bigZero, bigOne

const highBitMasks = [0x0000, 0x8000, 0xC000, 0xE000, 0xF000, 0xF800,
  0xFC00, 0xFE00, 0xFF00, 0xFF80, 0xFFC0, 0xFFE0, 0xFFF0, 0xFFF8, 0xFFFC, 0xFFFE, 0xFFFF]

const hexatrigesimalToChar = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z'
]

const hexToChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f']

const lowBitMasks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
  0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
  0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF]

function setMaxDigits (value) {
  maxDigits = value
  ZERO_ARRAY = new Array(maxDigits)
  for (let iza = 0; iza < ZERO_ARRAY.length; iza++) ZERO_ARRAY[iza] = 0
  bigZero = new BigInt()
  bigOne = new BigInt()
  bigOne.digits[0] = 1
}

function BigInt (flag) {
  if (typeof flag === 'boolean' && flag === true) {
    this.digits = null
  } else {
    this.digits = ZERO_ARRAY.slice(0)
  }
  this.isNeg = false
}

function biCopy (bi) {
  const result = new BigInt(true)
  result.digits = bi.digits.slice(0)
  result.isNeg = bi.isNeg
  return result
}

function reverseStr (s) {
  let result = ''
  for (let i = s.length - 1; i > -1; --i) {
    result += s.charAt(i)
  }
  return result
}

function biToString (x, radix) {
  const b = new BigInt()
  b.digits[0] = radix
  let qr = biDivideModulo(x, b)
  let result = hexatrigesimalToChar[qr[1].digits[0]]
  while (biCompare(qr[0], bigZero) === 1) {
    qr = biDivideModulo(qr[0], b)
    result += hexatrigesimalToChar[qr[1].digits[0]]
  }
  return (x.isNeg ? '-' : '') + reverseStr(result)
}

function digitToHex (n) {
  const mask = 0xf
  let result = ''
  for (let i = 0; i < 4; ++i) {
    result += hexToChar[n & mask]
    n >>>= 4
  }
  return reverseStr(result)
}

function biToHex (x) {
  let result = ''
  for (let i = biHighIndex(x); i > -1; --i) {
    result += digitToHex(x.digits[i])
  }
  return result
}

function charToHex (c) {
  const ZERO = 48
  const NINE = ZERO + 9
  const littleA = 97
  const littleZ = littleA + 25
  const bigA = 65
  const bigZ = 65 + 25
  let result

  if (c >= ZERO && c <= NINE) {
    result = c - ZERO
  } else if (c >= bigA && c <= bigZ) {
    result = 10 + c - bigA
  } else if (c >= littleA && c <= littleZ) {
    result = 10 + c - littleA
  } else {
    result = 0
  }
  return result
}

function hexToDigit (s) {
  let result = 0
  const sl = Math.min(s.length, 4)
  for (let i = 0; i < sl; ++i) {
    result <<= 4
    result |= charToHex(s.charCodeAt(i))
  }
  return result
}

function biFromHex (s) {
  const result = new BigInt()
  const sl = s.length
  for (let i = sl, j = 0; i > 0; i -= 4, ++j) {
    result.digits[j] = hexToDigit(s.substr(Math.max(i - 4, 0), Math.min(i, 4)))
  }
  return result
}

function biAdd (x, y) {
  let result

  if (x.isNeg !== y.isNeg) {
    y.isNeg = !y.isNeg
    result = biSubtract(x, y)
    y.isNeg = !y.isNeg
  } else {
    result = new BigInt()
    let c = 0
    let n
    for (let i = 0; i < x.digits.length; ++i) {
      n = x.digits[i] + y.digits[i] + c
      result.digits[i] = n & 0xffff
      c = Number(n >= biRadix)
    }
    result.isNeg = x.isNeg
  }
  return result
}

function biSubtract (x, y) {
  let result
  if (x.isNeg !== y.isNeg) {
    y.isNeg = !y.isNeg
    result = biAdd(x, y)
    y.isNeg = !y.isNeg
  } else {
    result = new BigInt()
    let n, c
    c = 0
    for (let i = 0; i < x.digits.length; ++i) {
      n = x.digits[i] - y.digits[i] + c
      result.digits[i] = n & 0xffff
      if (result.digits[i] < 0) result.digits[i] += biRadix
      c = 0 - Number(n < 0)
    }
    if (c === -1) {
      c = 0
      for (let i = 0; i < x.digits.length; ++i) {
        n = 0 - result.digits[i] + c
        result.digits[i] = n & 0xffff
        if (result.digits[i] < 0) result.digits[i] += biRadix
        c = 0 - Number(n < 0)
      }
      result.isNeg = !x.isNeg
    } else {
      result.isNeg = x.isNeg
    }
  }
  return result
}

function biHighIndex (x) {
  let result = x.digits.length - 1
  while (result > 0 && x.digits[result] === 0) --result
  return result
}

function biNumBits (x) {
  const n = biHighIndex(x)
  let d = x.digits[n]
  const m = (n + 1) * bitsPerDigit
  let result
  for (result = m; result > m - bitsPerDigit; --result) {
    if ((d & 0x8000) !== 0) break
    d <<= 1
  }
  return result
}

function biMultiply (x, y) {
  const result = new BigInt()
  let c = null
  const n = biHighIndex(x)
  const t = biHighIndex(y)
  let uv = null
  let k = null

  for (let i = 0; i <= t; ++i) {
    c = 0
    k = i
    for (let j = 0; j <= n; ++j, ++k) {
      uv = result.digits[k] + x.digits[j] * y.digits[i] + c
      result.digits[k] = uv & maxDigitVal
      c = uv >>> biRadixBits
    }
    result.digits[i + n + 1] = c
  }
  result.isNeg = x.isNeg !== y.isNeg
  return result
}

function biMultiplyDigit (x, y) {
  let uv

  const result = new BigInt()
  const n = biHighIndex(x)
  let c = 0
  for (let j = 0; j <= n; ++j) {
    uv = result.digits[j] + x.digits[j] * y + c
    result.digits[j] = uv & maxDigitVal
    c = uv >>> biRadixBits
  }
  result.digits[1 + n] = c
  return result
}

function arrayCopy (src, srcStart, dest, destStart, n) {
  const m = Math.min(srcStart + n, src.length)
  for (let i = srcStart, j = destStart; i < m; ++i, ++j) {
    dest[j] = src[i]
  }
}

function biShiftLeft (x, n) {
  const digitCount = Math.floor(n / bitsPerDigit)
  const result = new BigInt()
  arrayCopy(x.digits, 0, result.digits, digitCount, result.digits.length - digitCount)
  const bits = n % bitsPerDigit
  const rightBits = bitsPerDigit - bits
  let i, i1
  for (i = result.digits.length - 1, i1 = i - 1; i > 0; --i, --i1) {
    result.digits[i] = ((result.digits[i] << bits) & maxDigitVal) |
      ((result.digits[i1] & highBitMasks[bits]) >>>
        (rightBits))
  }
  result.digits[0] = ((result.digits[i] << bits) & maxDigitVal)
  result.isNeg = x.isNeg
  return result
}

function biShiftRight (x, n) {
  const digitCount = Math.floor(n / bitsPerDigit)
  const result = new BigInt()
  arrayCopy(x.digits, digitCount, result.digits, 0, x.digits.length - digitCount)
  const bits = n % bitsPerDigit
  const leftBits = bitsPerDigit - bits
  for (let i = 0, i1 = i + 1; i < result.digits.length - 1; ++i, ++i1) {
    result.digits[i] = (result.digits[i] >>> bits) |
      ((result.digits[i1] & lowBitMasks[bits]) << leftBits)
  }
  result.digits[result.digits.length - 1] >>>= bits
  result.isNeg = x.isNeg
  return result
}

function biMultiplyByRadixPower (x, n) {
  const result = new BigInt()
  arrayCopy(x.digits, 0, result.digits, n, result.digits.length - n)
  return result
}

function biDivideByRadixPower (x, n) {
  const result = new BigInt()
  arrayCopy(x.digits, n, result.digits, 0, result.digits.length - n)
  return result
}

function biModuloByRadixPower (x, n) {
  const result = new BigInt()
  arrayCopy(x.digits, 0, result.digits, 0, n)
  return result
}

function biCompare (x, y) {
  if (x.isNeg !== y.isNeg) {
    return 1 - 2 * Number(x.isNeg)
  }
  for (let i = x.digits.length - 1; i >= 0; --i) {
    if (x.digits[i] !== y.digits[i]) {
      if (x.isNeg) {
        return 1 - 2 * Number(x.digits[i] > y.digits[i])
      } else {
        return 1 - 2 * Number(x.digits[i] < y.digits[i])
      }
    }
  }
  return 0
}

function biDivideModulo (x, y) {
  let nb = biNumBits(x)
  let tb = biNumBits(y)
  const origYIsNeg = y.isNeg
  let q, r
  if (nb < tb) {
    if (x.isNeg) {
      q = biCopy(bigOne)
      q.isNeg = !y.isNeg
      x.isNeg = false
      y.isNeg = false
      r = biSubtract(y, x)
      x.isNeg = true
      y.isNeg = origYIsNeg
    } else {
      q = new BigInt()
      r = biCopy(x)
    }
    return [q, r]
  }

  q = new BigInt()
  r = x

  let t = Math.ceil(tb / bitsPerDigit) - 1
  let lambda = 0
  while (y.digits[t] < biHalfRadix) {
    y = biShiftLeft(y, 1)
    ++lambda
    ++tb
    t = Math.ceil(tb / bitsPerDigit) - 1
  }

  r = biShiftLeft(r, lambda)
  nb += lambda
  const n = Math.ceil(nb / bitsPerDigit) - 1

  let b = biMultiplyByRadixPower(y, n - t)
  while (biCompare(r, b) !== -1) {
    ++q.digits[n - t]
    r = biSubtract(r, b)
  }
  for (let i = n; i > t; --i) {
    const ri = (i >= r.digits.length) ? 0 : r.digits[i]
    const ri1 = (i - 1 >= r.digits.length) ? 0 : r.digits[i - 1]
    const ri2 = (i - 2 >= r.digits.length) ? 0 : r.digits[i - 2]
    const yt = (t >= y.digits.length) ? 0 : y.digits[t]
    const yt1 = (t - 1 >= y.digits.length) ? 0 : y.digits[t - 1]
    if (ri === yt) {
      q.digits[i - t - 1] = maxDigitVal
    } else {
      q.digits[i - t - 1] = Math.floor((ri * biRadix + ri1) / yt)
    }

    let c1 = q.digits[i - t - 1] * ((yt * biRadix) + yt1)
    let c2 = (ri * biRadixSquared) + ((ri1 * biRadix) + ri2)
    while (c1 > c2) {
      --q.digits[i - t - 1]
      c1 = q.digits[i - t - 1] * ((yt * biRadix) | yt1)
      c2 = (ri * biRadix * biRadix) + ((ri1 * biRadix) + ri2)
    }

    b = biMultiplyByRadixPower(y, i - t - 1)
    r = biSubtract(r, biMultiplyDigit(b, q.digits[i - t - 1]))
    if (r.isNeg) {
      r = biAdd(r, b)
      --q.digits[i - t - 1]
    }
  }
  r = biShiftRight(r, lambda)

  q.isNeg = x.isNeg !== origYIsNeg
  if (x.isNeg) {
    if (origYIsNeg) {
      q = biAdd(q, bigOne)
    } else {
      q = biSubtract(q, bigOne)
    }
    y = biShiftRight(y, lambda)
    r = biSubtract(y, r)
  }

  if (r.digits[0] === 0 && biHighIndex(r) === 0) r.isNeg = false

  return [q, r]
}

function biDivide (x, y) {
  return biDivideModulo(x, y)[0]
}

function BarrettMu (m) {
  this.modulus = biCopy(m)
  this.k = biHighIndex(this.modulus) + 1
  const b2k = new BigInt()
  b2k.digits[2 * this.k] = 1
  this.mu = biDivide(b2k, this.modulus)
  this.bkplus1 = new BigInt()
  this.bkplus1.digits[this.k + 1] = 1
  this.modulo = barrettMuModulo
  this.multiplyMod = barrettMuMultiplyMod
  this.powMod = barrettMuPowMod
}

function barrettMuModulo (x) {
  const q1 = biDivideByRadixPower(x, this.k - 1)
  const q2 = biMultiply(q1, this.mu)
  const q3 = biDivideByRadixPower(q2, this.k + 1)
  const r1 = biModuloByRadixPower(x, this.k + 1)
  const r2term = biMultiply(q3, this.modulus)
  const r2 = biModuloByRadixPower(r2term, this.k + 1)
  let r = biSubtract(r1, r2)
  if (r.isNeg) {
    r = biAdd(r, this.bkplus1)
  }
  let rgtem = biCompare(r, this.modulus) >= 0
  while (rgtem) {
    r = biSubtract(r, this.modulus)
    rgtem = biCompare(r, this.modulus) >= 0
  }
  return r
}

function barrettMuMultiplyMod (x, y) {
  const xy = biMultiply(x, y)
  return this.modulo(xy)
}

function barrettMuPowMod (x, y) {
  let result = new BigInt()
  result.digits[0] = 1
  while (true) {
    if ((y.digits[0] & 1) !== 0) result = this.multiplyMod(result, x)
    y = biShiftRight(y, 1)
    if (y.digits[0] === 0 && biHighIndex(y) === 0) break
    x = this.multiplyMod(x, x)
  }
  return result
}
