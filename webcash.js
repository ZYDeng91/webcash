function str2blks_SHA1(str) {
  let nblk = ((str.length + 8) >> 6) + 1;
  let blks = new Array(nblk*16);
  for (let i=0; i<nblk*16; i++) blks[i] = 0;
  for (var i=0; i<str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << (24 - (i % 4) * 8);
  blks[i >> 2] |= 0x80 << (24 - (i % 4) * 8);
  blks[nblk * 16 - 1] = str.length * 8;
  return blks;
}

function calcSHA1(str) {
  let x = str2blks_SHA1(str);
  let w = new Array(80);
  let t;
  let a = 0x67452301;
  let b = 0xEFCDAB89;
  let c = 0x98BADCFE;
  let d = 0x10325476;
  let e = 0xC3D2E1F0;

  for(let i=0; i<x.length; i+=16) {
    let olda = a;
    let oldb = b;
    let oldc = c;
    let oldd = d;
    let olde = e;

    for(let j=0; j<80; j++) {
      if(j < 16) w[j] = x[i + j];
      else { t = w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16]; w[j] = (t<<1) | (t>>>31); }
    }

    e = ((a<<5)|(a>>>27)) + ((b&c)|((~b)&d)) + e + w[ 0] + 0x5A827999; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + ((a&b)|((~a)&c)) + d + w[ 1] + 0x5A827999; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + ((e&a)|((~e)&b)) + c + w[ 2] + 0x5A827999; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + ((d&e)|((~d)&a)) + b + w[ 3] + 0x5A827999; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + ((c&d)|((~c)&e)) + a + w[ 4] + 0x5A827999; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + ((b&c)|((~b)&d)) + e + w[ 5] + 0x5A827999; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + ((a&b)|((~a)&c)) + d + w[ 6] + 0x5A827999; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + ((e&a)|((~e)&b)) + c + w[ 7] + 0x5A827999; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + ((d&e)|((~d)&a)) + b + w[ 8] + 0x5A827999; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + ((c&d)|((~c)&e)) + a + w[ 9] + 0x5A827999; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + ((b&c)|((~b)&d)) + e + w[10] + 0x5A827999; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + ((a&b)|((~a)&c)) + d + w[11] + 0x5A827999; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + ((e&a)|((~e)&b)) + c + w[12] + 0x5A827999; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + ((d&e)|((~d)&a)) + b + w[13] + 0x5A827999; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + ((c&d)|((~c)&e)) + a + w[14] + 0x5A827999; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + ((b&c)|((~b)&d)) + e + w[15] + 0x5A827999; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + ((a&b)|((~a)&c)) + d + w[16] + 0x5A827999; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + ((e&a)|((~e)&b)) + c + w[17] + 0x5A827999; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + ((d&e)|((~d)&a)) + b + w[18] + 0x5A827999; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + ((c&d)|((~c)&e)) + a + w[19] + 0x5A827999; c=(c<<30)|(c>>>2);

    e = ((a<<5)|(a>>>27)) + (b^c^d) + e + w[20] + 0x6ED9EBA1; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + (a^b^c) + d + w[21] + 0x6ED9EBA1; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + (e^a^b) + c + w[22] + 0x6ED9EBA1; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + (d^e^a) + b + w[23] + 0x6ED9EBA1; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + (c^d^e) + a + w[24] + 0x6ED9EBA1; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + (b^c^d) + e + w[25] + 0x6ED9EBA1; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + (a^b^c) + d + w[26] + 0x6ED9EBA1; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + (e^a^b) + c + w[27] + 0x6ED9EBA1; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + (d^e^a) + b + w[28] + 0x6ED9EBA1; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + (c^d^e) + a + w[29] + 0x6ED9EBA1; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + (b^c^d) + e + w[30] + 0x6ED9EBA1; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + (a^b^c) + d + w[31] + 0x6ED9EBA1; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + (e^a^b) + c + w[32] + 0x6ED9EBA1; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + (d^e^a) + b + w[33] + 0x6ED9EBA1; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + (c^d^e) + a + w[34] + 0x6ED9EBA1; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + (b^c^d) + e + w[35] + 0x6ED9EBA1; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + (a^b^c) + d + w[36] + 0x6ED9EBA1; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + (e^a^b) + c + w[37] + 0x6ED9EBA1; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + (d^e^a) + b + w[38] + 0x6ED9EBA1; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + (c^d^e) + a + w[39] + 0x6ED9EBA1; c=(c<<30)|(c>>>2);

    e = ((a<<5)|(a>>>27)) + ((b&c)|(b&d)|(c&d)) + e + w[40] + 0x8F1BBCDC; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + ((a&b)|(a&c)|(b&c)) + d + w[41] + 0x8F1BBCDC; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + ((e&a)|(e&b)|(a&b)) + c + w[42] + 0x8F1BBCDC; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + ((d&e)|(d&a)|(e&a)) + b + w[43] + 0x8F1BBCDC; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + ((c&d)|(c&e)|(d&e)) + a + w[44] + 0x8F1BBCDC; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + ((b&c)|(b&d)|(c&d)) + e + w[45] + 0x8F1BBCDC; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + ((a&b)|(a&c)|(b&c)) + d + w[46] + 0x8F1BBCDC; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + ((e&a)|(e&b)|(a&b)) + c + w[47] + 0x8F1BBCDC; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + ((d&e)|(d&a)|(e&a)) + b + w[48] + 0x8F1BBCDC; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + ((c&d)|(c&e)|(d&e)) + a + w[49] + 0x8F1BBCDC; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + ((b&c)|(b&d)|(c&d)) + e + w[50] + 0x8F1BBCDC; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + ((a&b)|(a&c)|(b&c)) + d + w[51] + 0x8F1BBCDC; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + ((e&a)|(e&b)|(a&b)) + c + w[52] + 0x8F1BBCDC; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + ((d&e)|(d&a)|(e&a)) + b + w[53] + 0x8F1BBCDC; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + ((c&d)|(c&e)|(d&e)) + a + w[54] + 0x8F1BBCDC; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + ((b&c)|(b&d)|(c&d)) + e + w[55] + 0x8F1BBCDC; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + ((a&b)|(a&c)|(b&c)) + d + w[56] + 0x8F1BBCDC; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + ((e&a)|(e&b)|(a&b)) + c + w[57] + 0x8F1BBCDC; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + ((d&e)|(d&a)|(e&a)) + b + w[58] + 0x8F1BBCDC; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + ((c&d)|(c&e)|(d&e)) + a + w[59] + 0x8F1BBCDC; c=(c<<30)|(c>>>2);

    e = ((a<<5)|(a>>>27)) + (b^c^d) + e + w[60] + 0xCA62C1D6; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + (a^b^c) + d + w[61] + 0xCA62C1D6; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + (e^a^b) + c + w[62] + 0xCA62C1D6; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + (d^e^a) + b + w[63] + 0xCA62C1D6; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + (c^d^e) + a + w[64] + 0xCA62C1D6; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + (b^c^d) + e + w[65] + 0xCA62C1D6; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + (a^b^c) + d + w[66] + 0xCA62C1D6; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + (e^a^b) + c + w[67] + 0xCA62C1D6; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + (d^e^a) + b + w[68] + 0xCA62C1D6; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + (c^d^e) + a + w[69] + 0xCA62C1D6; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + (b^c^d) + e + w[70] + 0xCA62C1D6; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + (a^b^c) + d + w[71] + 0xCA62C1D6; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + (e^a^b) + c + w[72] + 0xCA62C1D6; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + (d^e^a) + b + w[73] + 0xCA62C1D6; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + (c^d^e) + a + w[74] + 0xCA62C1D6; c=(c<<30)|(c>>>2);
    e = ((a<<5)|(a>>>27)) + (b^c^d) + e + w[75] + 0xCA62C1D6; b=(b<<30)|(b>>>2);
    d = ((e<<5)|(e>>>27)) + (a^b^c) + d + w[76] + 0xCA62C1D6; a=(a<<30)|(a>>>2);
    c = ((d<<5)|(d>>>27)) + (e^a^b) + c + w[77] + 0xCA62C1D6; e=(e<<30)|(e>>>2);
    b = ((c<<5)|(c>>>27)) + (d^e^a) + b + w[78] + 0xCA62C1D6; d=(d<<30)|(d>>>2);
    a = ((b<<5)|(b>>>27)) + (c^d^e) + a + w[79] + 0xCA62C1D6; c=(c<<30)|(c>>>2);


    a += olda;
    b += oldb;
    c += oldc;
    d += oldd;
    e += olde;
  }
  // return hex(a) + hex(b) + hex(c) + hex(d) + hex(e)
  return a;
}

function hashcash_count(stamp) {
  const res = calcSHA1(stamp);
  return Math.clz32(res);
}

function pad(a) {
  return a.toString().padStart(2, "0");
}

function getDMY() {
  const d = new Date();
  const YY = pad(d.getUTCFullYear() % 100);
  const MM = pad(d.getUTCMonth() + 1);
  const DD = pad(d.getUTCDay() + 1);
  return `${YY}${MM}${DD}`;
}

function getDMYhm() {
  const d = new Date();
  const YY = pad(d.getUTCFullYear() % 100);
  const MM = pad(d.getUTCMonth() + 1);
  const DD = pad(d.getUTCDay() + 1);
  const hh = pad(d.getUTCHours());
  const mm = pad(d.getUTCMinutes());
  return `${YY}${MM}${DD}${hh}${mm}`;
}

function getSalt(l) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
  const length = alphabet.length;
  let res = "";
  let _;
  for (_ = l; _ > 0; _--) {
    res += alphabet.charAt(Math.floor(Math.random() * length));
  }
  return res;
}

function hashcash_mint(bits, date, res, ext) {
  const version = 1;
  date = date || getDMYhm();
  res = res || ""; 
  ext = ext || "";
  const rand = getSalt(8);
  const searchStr = `${version}:${bits}:${date}:${res}:${ext}:${rand}:`;
  return hashcash_mint_internal(searchStr, bits);
}

function hashcash_mint_internal(challenge, bits) {
  let counter = 0;
  while (true) {
    if (hashcash_count(challenge + counter.toString(16)) >= bits) {
      return challenge + counter.toString(16);
    }
    counter++;
  }
}
