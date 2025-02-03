import { createHash } from 'crypto'

export function checkStamp(stamp, resource, difficulty, expiration) {
  // const [ver, bits, date, res, ext, rand, counter, _] = stamp.split(":")
  const [ver, bits, date, res, , , counter, _] = stamp.split(":")
  if (ver !== "1") {
    return "only hashcash v1 is supported"
  }

  // make sure the destructured stamp has exact amount of vars
  if (!counter || _ !== undefined) {
    return "malformed stamp"
  }
  if (expiry(date, expiration)) {
    return "expired stamp"
  }
  const claimed = parseInt(bits)
  // claimed < difficulty; calculated < claimed; mismatched resource
  if (claimed < difficulty || !clz(stamp, claimed) || resource !== res) {
    return "invalid stamp"
  }
  return "ok"
}

function hash(stamp) {
  const sha1sum = createHash('sha1')
  sha1sum.update(stamp)
  return sha1sum.digest('hex')
}

function clz(stamp, claimed) {
  const hashed = hash(stamp)
  let res = 0, i = 0, res32, hashed32
  while (8*i<hashed.length) {
    hashed32 = parseInt(hashed.slice(8*i, 8*i+8), 16)
    res32 = Math.clz32(hashed32)
    res += res32
    if (res >= claimed) {
      return true
    }
    if (res32 < 32) {
      return false
    }
    i += 1
  }
  return false
}

function expiry(date, expiration) {
  const now = Date.now()
  // date format conversion is janky
  const datestr = `20${date.slice(0,2)}/${date.slice(2,4)}/${date.slice(4,6)}`
  const d = Date.parse(datestr)
  // invalid time; future stamp; expired stamp
  return isNaN(d) || d > now || d < now - expiration
}
