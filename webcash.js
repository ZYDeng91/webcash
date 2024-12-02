async function calcSHA1(input) {
  const textAsBuffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-1", textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hash = hashArray.map((item) => item.toString(16).padStart(2, "0")).join("");
  return hash;
}

async function hashcash_count(stamp) {
  const res = await calcSHA1(stamp);
  const res32 = parseInt(res.slice(0,8), 16);
  return Math.clz32(res32);
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

async function hashcash_mint(bits, date, res, ext) {
  const version = 1;
  date = date || getDMYhm();
  res = res || ""; 
  ext = ext || "";
  const rand = getSalt(8);
  const searchStr = `${version}:${bits}:${date}:${res}:${ext}:${rand}:`;
  return await hashcash_mint_internal(searchStr, bits);
}

async function hashcash_mint_internal(challenge, bits) {
  let counter = 0;
  while (true) {
    if (await hashcash_count(challenge + counter.toString(16)) >= bits) {
      return challenge + counter.toString(16);
    }
    counter++;
  }
}
