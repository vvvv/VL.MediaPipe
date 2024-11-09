(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var t = "undefined" != typeof self ? self : {};
function e(e2) {
  t: {
    for (var n2 = ["CLOSURE_FLAGS"], r2 = t, i2 = 0; i2 < n2.length; i2++) if (null == (r2 = r2[n2[i2]])) {
      n2 = null;
      break t;
    }
    n2 = r2;
  }
  return null != (e2 = n2 && n2[e2]) && e2;
}
function n() {
  throw Error("Invalid UTF8");
}
function r(t2, e2) {
  return e2 = String.fromCharCode.apply(null, e2), null == t2 ? e2 : t2 + e2;
}
let i, s;
const o = "undefined" != typeof TextDecoder;
let a;
const h = "undefined" != typeof TextEncoder;
function c(t2) {
  if (h) t2 = (a || (a = new TextEncoder())).encode(t2);
  else {
    let n2 = 0;
    const r2 = new Uint8Array(3 * t2.length);
    for (let i2 = 0; i2 < t2.length; i2++) {
      var e2 = t2.charCodeAt(i2);
      if (128 > e2) r2[n2++] = e2;
      else {
        if (2048 > e2) r2[n2++] = e2 >> 6 | 192;
        else {
          if (55296 <= e2 && 57343 >= e2) {
            if (56319 >= e2 && i2 < t2.length) {
              const s2 = t2.charCodeAt(++i2);
              if (56320 <= s2 && 57343 >= s2) {
                e2 = 1024 * (e2 - 55296) + s2 - 56320 + 65536, r2[n2++] = e2 >> 18 | 240, r2[n2++] = e2 >> 12 & 63 | 128, r2[n2++] = e2 >> 6 & 63 | 128, r2[n2++] = 63 & e2 | 128;
                continue;
              }
              i2--;
            }
            e2 = 65533;
          }
          r2[n2++] = e2 >> 12 | 224, r2[n2++] = e2 >> 6 & 63 | 128;
        }
        r2[n2++] = 63 & e2 | 128;
      }
    }
    t2 = n2 === r2.length ? r2 : r2.subarray(0, n2);
  }
  return t2;
}
var u, l = e(610401301), d = e(188588736);
const f = t.navigator;
function p(t2) {
  return !!l && (!!u && u.brands.some(({ brand: e2 }) => e2 && -1 != e2.indexOf(t2)));
}
function g(e2) {
  var n2;
  return (n2 = t.navigator) && (n2 = n2.userAgent) || (n2 = ""), -1 != n2.indexOf(e2);
}
function m() {
  return !!l && (!!u && 0 < u.brands.length);
}
function y() {
  return m() ? p("Chromium") : (g("Chrome") || g("CriOS")) && !(!m() && g("Edge")) || g("Silk");
}
function _(t2) {
  return _[" "](t2), t2;
}
u = f && f.userAgentData || null, _[" "] = function() {
};
var v = !m() && (g("Trident") || g("MSIE"));
!g("Android") || y(), y(), g("Safari") && (y() || !m() && g("Coast") || !m() && g("Opera") || !m() && g("Edge") || (m() ? p("Microsoft Edge") : g("Edg/")) || m() && p("Opera"));
var E = {}, w = null;
function T(t2) {
  var e2 = t2.length, n2 = 3 * e2 / 4;
  n2 % 3 ? n2 = Math.floor(n2) : -1 != "=.".indexOf(t2[e2 - 1]) && (n2 = -1 != "=.".indexOf(t2[e2 - 2]) ? n2 - 2 : n2 - 1);
  var r2 = new Uint8Array(n2), i2 = 0;
  return function(t3, e3) {
    function n3(e4) {
      for (; r3 < t3.length; ) {
        var n4 = t3.charAt(r3++), i4 = w[n4];
        if (null != i4) return i4;
        if (!/^[\s\xa0]*$/.test(n4)) throw Error("Unknown base64 encoding at char: " + n4);
      }
      return e4;
    }
    A();
    for (var r3 = 0; ; ) {
      var i3 = n3(-1), s2 = n3(0), o2 = n3(64), a2 = n3(64);
      if (64 === a2 && -1 === i3) break;
      e3(i3 << 2 | s2 >> 4), 64 != o2 && (e3(s2 << 4 & 240 | o2 >> 2), 64 != a2 && e3(o2 << 6 & 192 | a2));
    }
  }(t2, function(t3) {
    r2[i2++] = t3;
  }), i2 !== n2 ? r2.subarray(0, i2) : r2;
}
function A() {
  if (!w) {
    w = {};
    for (var t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e2 = ["+/=", "+/", "-_=", "-_.", "-_"], n2 = 0; 5 > n2; n2++) {
      var r2 = t2.concat(e2[n2].split(""));
      E[n2] = r2;
      for (var i2 = 0; i2 < r2.length; i2++) {
        var s2 = r2[i2];
        void 0 === w[s2] && (w[s2] = i2);
      }
    }
  }
}
var b = "undefined" != typeof Uint8Array, k = !v && "function" == typeof btoa;
function x(t2) {
  if (!k) {
    var e2;
    void 0 === e2 && (e2 = 0), A(), e2 = E[e2];
    var n2 = Array(Math.floor(t2.length / 3)), r2 = e2[64] || "";
    let h2 = 0, c2 = 0;
    for (; h2 < t2.length - 2; h2 += 3) {
      var i2 = t2[h2], s2 = t2[h2 + 1], o2 = t2[h2 + 2], a2 = e2[i2 >> 2];
      i2 = e2[(3 & i2) << 4 | s2 >> 4], s2 = e2[(15 & s2) << 2 | o2 >> 6], o2 = e2[63 & o2], n2[c2++] = a2 + i2 + s2 + o2;
    }
    switch (a2 = 0, o2 = r2, t2.length - h2) {
      case 2:
        o2 = e2[(15 & (a2 = t2[h2 + 1])) << 2] || r2;
      case 1:
        t2 = t2[h2], n2[c2] = e2[t2 >> 2] + e2[(3 & t2) << 4 | a2 >> 4] + o2 + r2;
    }
    return n2.join("");
  }
  for (e2 = "", n2 = 0, r2 = t2.length - 10240; n2 < r2; ) e2 += String.fromCharCode.apply(null, t2.subarray(n2, n2 += 10240));
  return e2 += String.fromCharCode.apply(null, n2 ? t2.subarray(n2) : t2), btoa(e2);
}
const S = /[-_.]/g, L = { "-": "+", _: "/", ".": "=" };
function F(t2) {
  return L[t2] || "";
}
function R(t2) {
  if (!k) return T(t2);
  S.test(t2) && (t2 = t2.replace(S, F)), t2 = atob(t2);
  const e2 = new Uint8Array(t2.length);
  for (let n2 = 0; n2 < t2.length; n2++) e2[n2] = t2.charCodeAt(n2);
  return e2;
}
function M(t2) {
  return b && null != t2 && t2 instanceof Uint8Array;
}
let P;
function C() {
  return P || (P = new Uint8Array(0));
}
var O = {};
let I;
function U(t2) {
  if (t2 !== O) throw Error("illegal external caller");
}
function D() {
  return I || (I = new B(null, O));
}
function N(t2) {
  U(O);
  var e2 = t2.g;
  return null == (e2 = null == e2 || M(e2) ? e2 : "string" == typeof e2 ? R(e2) : null) ? e2 : t2.g = e2;
}
var B = class {
  constructor(t2, e2) {
    if (U(e2), this.g = t2, null != t2 && 0 === t2.length) throw Error("ByteString should be constructed with non-empty values");
  }
  h() {
    const t2 = N(this);
    return t2 ? new Uint8Array(t2) : C();
  }
};
function G(t2, e2) {
  return Error(`Invalid wire type: ${t2} (at position ${e2})`);
}
function j() {
  return Error("Failed to read varint, encoding is invalid.");
}
function V(t2, e2) {
  return Error(`Tried to read past the end of the data ${e2} > ${t2}`);
}
function X(t2) {
  if ("string" == typeof t2) return { buffer: R(t2), P: false };
  if (Array.isArray(t2)) return { buffer: new Uint8Array(t2), P: false };
  if (t2.constructor === Uint8Array) return { buffer: t2, P: false };
  if (t2.constructor === ArrayBuffer) return { buffer: new Uint8Array(t2), P: false };
  if (t2.constructor === B) return { buffer: N(t2) || C(), P: true };
  if (t2 instanceof Uint8Array) return { buffer: new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength), P: false };
  throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
function H() {
  return "function" == typeof BigInt;
}
const W = "function" == typeof Uint8Array.prototype.slice;
let z, K = 0, Y = 0;
function $(t2) {
  const e2 = 0 > t2;
  let n2 = (t2 = Math.abs(t2)) >>> 0;
  if (t2 = Math.floor((t2 - n2) / 4294967296), e2) {
    const [e3, r2] = rt(n2, t2);
    t2 = r2, n2 = e3;
  }
  K = n2 >>> 0, Y = t2 >>> 0;
}
function q(t2) {
  const e2 = z || (z = new DataView(new ArrayBuffer(8)));
  e2.setFloat32(0, +t2, true), Y = 0, K = e2.getUint32(0, true);
}
function J(t2, e2) {
  return 4294967296 * e2 + (t2 >>> 0);
}
function Z(t2, e2) {
  const n2 = 2147483648 & e2;
  return n2 && (e2 = ~e2 >>> 0, 0 == (t2 = 1 + ~t2 >>> 0) && (e2 = e2 + 1 >>> 0)), t2 = J(t2, e2), n2 ? -t2 : t2;
}
function Q(t2, e2) {
  if (t2 >>>= 0, 2097151 >= (e2 >>>= 0)) var n2 = "" + (4294967296 * e2 + t2);
  else H() ? n2 = "" + (BigInt(e2) << BigInt(32) | BigInt(t2)) : (t2 = (16777215 & t2) + 6777216 * (n2 = 16777215 & (t2 >>> 24 | e2 << 8)) + 6710656 * (e2 = e2 >> 16 & 65535), n2 += 8147497 * e2, e2 *= 2, 1e7 <= t2 && (n2 += Math.floor(t2 / 1e7), t2 %= 1e7), 1e7 <= n2 && (e2 += Math.floor(n2 / 1e7), n2 %= 1e7), n2 = e2 + tt(n2) + tt(t2));
  return n2;
}
function tt(t2) {
  return t2 = String(t2), "0000000".slice(t2.length) + t2;
}
function et() {
  var t2 = K, e2 = Y;
  if (2147483648 & e2) if (H()) t2 = "" + (BigInt(0 | e2) << BigInt(32) | BigInt(t2 >>> 0));
  else {
    const [n2, r2] = rt(t2, e2);
    t2 = "-" + Q(n2, r2);
  }
  else t2 = Q(t2, e2);
  return t2;
}
function nt(t2) {
  if (16 > t2.length) $(Number(t2));
  else if (H()) t2 = BigInt(t2), K = Number(t2 & BigInt(4294967295)) >>> 0, Y = Number(t2 >> BigInt(32) & BigInt(4294967295));
  else {
    const e2 = +("-" === t2[0]);
    Y = K = 0;
    const n2 = t2.length;
    for (let r2 = e2, i2 = (n2 - e2) % 6 + e2; i2 <= n2; r2 = i2, i2 += 6) {
      const e3 = Number(t2.slice(r2, i2));
      Y *= 1e6, K = 1e6 * K + e3, 4294967296 <= K && (Y += Math.trunc(K / 4294967296), Y >>>= 0, K >>>= 0);
    }
    if (e2) {
      const [t3, e3] = rt(K, Y);
      K = t3, Y = e3;
    }
  }
}
function rt(t2, e2) {
  return e2 = ~e2, t2 ? t2 = 1 + ~t2 : e2 += 1, [t2, e2];
}
function it(t2, e2) {
  let n2, r2 = 0, i2 = 0, s2 = 0;
  const o2 = t2.h;
  let a2 = t2.g;
  do {
    n2 = o2[a2++], r2 |= (127 & n2) << s2, s2 += 7;
  } while (32 > s2 && 128 & n2);
  for (32 < s2 && (i2 |= (127 & n2) >> 4), s2 = 3; 32 > s2 && 128 & n2; s2 += 7) n2 = o2[a2++], i2 |= (127 & n2) << s2;
  if (dt(t2, a2), 128 > n2) return e2(r2 >>> 0, i2 >>> 0);
  throw j();
}
function st(t2) {
  let e2 = 0, n2 = t2.g;
  const r2 = n2 + 10, i2 = t2.h;
  for (; n2 < r2; ) {
    const r3 = i2[n2++];
    if (e2 |= r3, 0 == (128 & r3)) return dt(t2, n2), !!(127 & e2);
  }
  throw j();
}
function ot(t2) {
  const e2 = t2.h;
  let n2 = t2.g, r2 = e2[n2++], i2 = 127 & r2;
  if (128 & r2 && (r2 = e2[n2++], i2 |= (127 & r2) << 7, 128 & r2 && (r2 = e2[n2++], i2 |= (127 & r2) << 14, 128 & r2 && (r2 = e2[n2++], i2 |= (127 & r2) << 21, 128 & r2 && (r2 = e2[n2++], i2 |= r2 << 28, 128 & r2 && 128 & e2[n2++] && 128 & e2[n2++] && 128 & e2[n2++] && 128 & e2[n2++] && 128 & e2[n2++]))))) throw j();
  return dt(t2, n2), i2;
}
function at(t2) {
  return ot(t2) >>> 0;
}
function ht(t2) {
  var e2 = t2.h;
  const n2 = t2.g, r2 = e2[n2], i2 = e2[n2 + 1], s2 = e2[n2 + 2];
  return e2 = e2[n2 + 3], dt(t2, t2.g + 4), (r2 << 0 | i2 << 8 | s2 << 16 | e2 << 24) >>> 0;
}
function ct(t2) {
  var e2 = ht(t2);
  t2 = 2 * (e2 >> 31) + 1;
  const n2 = e2 >>> 23 & 255;
  return e2 &= 8388607, 255 == n2 ? e2 ? NaN : 1 / 0 * t2 : 0 == n2 ? t2 * Math.pow(2, -149) * e2 : t2 * Math.pow(2, n2 - 150) * (e2 + Math.pow(2, 23));
}
function ut(t2) {
  return ot(t2);
}
function lt(t2, e2, { ca: n2 = false } = {}) {
  t2.ca = n2, e2 && (e2 = X(e2), t2.h = e2.buffer, t2.m = e2.P, t2.j = 0, t2.l = t2.h.length, t2.g = t2.j);
}
function dt(t2, e2) {
  if (t2.g = e2, e2 > t2.l) throw V(t2.l, e2);
}
function ft(t2, e2) {
  if (0 > e2) throw Error(`Tried to read a negative byte length: ${e2}`);
  const n2 = t2.g, r2 = n2 + e2;
  if (r2 > t2.l) throw V(e2, t2.l - n2);
  return t2.g = r2, n2;
}
function pt(t2, e2) {
  if (0 == e2) return D();
  var n2 = ft(t2, e2);
  return t2.ca && t2.m ? n2 = t2.h.subarray(n2, n2 + e2) : (t2 = t2.h, n2 = n2 === (e2 = n2 + e2) ? C() : W ? t2.slice(n2, e2) : new Uint8Array(t2.subarray(n2, e2))), 0 == n2.length ? D() : new B(n2, O);
}
var gt = [];
function mt(t2) {
  var e2 = t2.g;
  if (e2.g == e2.l) return false;
  t2.l = t2.g.g;
  var n2 = at(t2.g);
  if (e2 = n2 >>> 3, !(0 <= (n2 &= 7) && 5 >= n2)) throw G(n2, t2.l);
  if (1 > e2) throw Error(`Invalid field number: ${e2} (at position ${t2.l})`);
  return t2.m = e2, t2.h = n2, true;
}
function yt(t2) {
  switch (t2.h) {
    case 0:
      0 != t2.h ? yt(t2) : st(t2.g);
      break;
    case 1:
      dt(t2 = t2.g, t2.g + 8);
      break;
    case 2:
      if (2 != t2.h) yt(t2);
      else {
        var e2 = at(t2.g);
        dt(t2 = t2.g, t2.g + e2);
      }
      break;
    case 5:
      dt(t2 = t2.g, t2.g + 4);
      break;
    case 3:
      for (e2 = t2.m; ; ) {
        if (!mt(t2)) throw Error("Unmatched start-group tag: stream EOF");
        if (4 == t2.h) {
          if (t2.m != e2) throw Error("Unmatched end-group tag");
          break;
        }
        yt(t2);
      }
      break;
    default:
      throw G(t2.h, t2.l);
  }
}
function _t(t2, e2, n2) {
  const r2 = t2.g.l, i2 = at(t2.g), s2 = t2.g.g + i2;
  let o2 = s2 - r2;
  if (0 >= o2 && (t2.g.l = s2, n2(e2, t2, void 0, void 0, void 0), o2 = s2 - t2.g.g), o2) throw Error(`Message parsing ended unexpectedly. Expected to read ${i2} bytes, instead read ${i2 - o2} bytes, either the data ended unexpectedly or the message misreported its own length`);
  return t2.g.g = s2, t2.g.l = r2, e2;
}
function vt(t2) {
  var e2 = at(t2.g), a2 = ft(t2 = t2.g, e2);
  if (t2 = t2.h, o) {
    var h2, c2 = t2;
    (h2 = s) || (h2 = s = new TextDecoder("utf-8", { fatal: true })), e2 = a2 + e2, c2 = 0 === a2 && e2 === c2.length ? c2 : c2.subarray(a2, e2);
    try {
      var u2 = h2.decode(c2);
    } catch (t3) {
      if (void 0 === i) {
        try {
          h2.decode(new Uint8Array([128]));
        } catch (t4) {
        }
        try {
          h2.decode(new Uint8Array([97])), i = true;
        } catch (t4) {
          i = false;
        }
      }
      throw !i && (s = void 0), t3;
    }
  } else {
    e2 = (u2 = a2) + e2, a2 = [];
    let i2, s2 = null;
    for (; u2 < e2; ) {
      var l2 = t2[u2++];
      128 > l2 ? a2.push(l2) : 224 > l2 ? u2 >= e2 ? n() : (i2 = t2[u2++], 194 > l2 || 128 != (192 & i2) ? (u2--, n()) : a2.push((31 & l2) << 6 | 63 & i2)) : 240 > l2 ? u2 >= e2 - 1 ? n() : (i2 = t2[u2++], 128 != (192 & i2) || 224 === l2 && 160 > i2 || 237 === l2 && 160 <= i2 || 128 != (192 & (h2 = t2[u2++])) ? (u2--, n()) : a2.push((15 & l2) << 12 | (63 & i2) << 6 | 63 & h2)) : 244 >= l2 ? u2 >= e2 - 2 ? n() : (i2 = t2[u2++], 128 != (192 & i2) || 0 != i2 - 144 + (l2 << 28) >> 30 || 128 != (192 & (h2 = t2[u2++])) || 128 != (192 & (c2 = t2[u2++])) ? (u2--, n()) : (l2 = (7 & l2) << 18 | (63 & i2) << 12 | (63 & h2) << 6 | 63 & c2, l2 -= 65536, a2.push(55296 + (l2 >> 10 & 1023), 56320 + (1023 & l2)))) : n(), 8192 <= a2.length && (s2 = r(s2, a2), a2.length = 0);
    }
    u2 = r(s2, a2);
  }
  return u2;
}
function Et(t2) {
  const e2 = at(t2.g);
  return pt(t2.g, e2);
}
function wt(t2, e2, n2) {
  var r2 = at(t2.g);
  for (r2 = t2.g.g + r2; t2.g.g < r2; ) n2.push(e2(t2.g));
}
var Tt = [];
function At(t2) {
  return t2 ? /^\d+$/.test(t2) ? (nt(t2), new bt(K, Y)) : null : kt || (kt = new bt(0, 0));
}
var bt = class {
  constructor(t2, e2) {
    this.h = t2 >>> 0, this.g = e2 >>> 0;
  }
};
let kt;
function xt(t2) {
  return t2 ? /^-?\d+$/.test(t2) ? (nt(t2), new St(K, Y)) : null : Lt || (Lt = new St(0, 0));
}
var St = class {
  constructor(t2, e2) {
    this.h = t2 >>> 0, this.g = e2 >>> 0;
  }
};
let Lt;
function Ft(t2, e2, n2) {
  for (; 0 < n2 || 127 < e2; ) t2.g.push(127 & e2 | 128), e2 = (e2 >>> 7 | n2 << 25) >>> 0, n2 >>>= 7;
  t2.g.push(e2);
}
function Rt(t2, e2) {
  for (; 127 < e2; ) t2.g.push(127 & e2 | 128), e2 >>>= 7;
  t2.g.push(e2);
}
function Mt(t2, e2) {
  if (0 <= e2) Rt(t2, e2);
  else {
    for (let n2 = 0; 9 > n2; n2++) t2.g.push(127 & e2 | 128), e2 >>= 7;
    t2.g.push(1);
  }
}
function Pt(t2, e2) {
  t2.g.push(e2 >>> 0 & 255), t2.g.push(e2 >>> 8 & 255), t2.g.push(e2 >>> 16 & 255), t2.g.push(e2 >>> 24 & 255);
}
function Ct(t2, e2) {
  0 !== e2.length && (t2.l.push(e2), t2.h += e2.length);
}
function Ot(t2, e2, n2) {
  Rt(t2.g, 8 * e2 + n2);
}
function It(t2, e2) {
  return Ot(t2, e2, 2), e2 = t2.g.end(), Ct(t2, e2), e2.push(t2.h), e2;
}
function Ut(t2, e2) {
  var n2 = e2.pop();
  for (n2 = t2.h + t2.g.length() - n2; 127 < n2; ) e2.push(127 & n2 | 128), n2 >>>= 7, t2.h++;
  e2.push(n2), t2.h++;
}
function Dt(t2, e2, n2) {
  Ot(t2, e2, 2), Rt(t2.g, n2.length), Ct(t2, t2.g.end()), Ct(t2, n2);
}
function Nt(t2, e2, n2, r2) {
  null != n2 && (e2 = It(t2, e2), r2(n2, t2), Ut(t2, e2));
}
class Bt {
  constructor(t2, e2, n2, r2) {
    this.g = t2, this.h = e2, this.l = n2, this.pa = r2;
  }
}
function Gt(t2) {
  return Array.prototype.slice.call(t2);
}
function jt(t2) {
  return "function" == typeof Symbol && "symbol" == typeof Symbol() ? Symbol() : t2;
}
var Vt = jt(), Xt = jt("0di"), Ht = jt("2ex"), Wt = jt("0dg"), zt = Vt ? (t2, e2) => {
  t2[Vt] |= e2;
} : (t2, e2) => {
  void 0 !== t2.g ? t2.g |= e2 : Object.defineProperties(t2, { g: { value: e2, configurable: true, writable: true, enumerable: false } });
}, Kt = Vt ? (t2, e2) => {
  t2[Vt] &= ~e2;
} : (t2, e2) => {
  void 0 !== t2.g && (t2.g &= ~e2);
};
function Yt(t2, e2, n2) {
  return n2 ? t2 | e2 : t2 & ~e2;
}
var $t = Vt ? (t2) => 0 | t2[Vt] : (t2) => 0 | t2.g, qt = Vt ? (t2) => t2[Vt] : (t2) => t2.g, Jt = Vt ? (t2, e2) => (t2[Vt] = e2, t2) : (t2, e2) => (void 0 !== t2.g ? t2.g = e2 : Object.defineProperties(t2, { g: { value: e2, configurable: true, writable: true, enumerable: false } }), t2);
function Zt(t2) {
  return zt(t2, 34), t2;
}
function Qt(t2, e2) {
  Jt(e2, -14591 & (0 | t2));
}
function te(t2, e2) {
  Jt(e2, -14557 & (34 | t2));
}
function ee(t2) {
  return 0 === (t2 = t2 >> 14 & 1023) ? 536870912 : t2;
}
var ne, re = {}, ie = {};
function se(t2) {
  return !(!t2 || "object" != typeof t2 || t2.Ja !== ie);
}
function oe(t2) {
  return null !== t2 && "object" == typeof t2 && !Array.isArray(t2) && t2.constructor === Object;
}
function ae(t2, e2, n2) {
  if (null != t2) {
    if ("string" == typeof t2) t2 = t2 ? new B(t2, O) : D();
    else if (t2.constructor !== B) if (M(t2)) t2 = t2.length ? new B(n2 ? t2 : new Uint8Array(t2), O) : D();
    else {
      if (!e2) throw Error();
      t2 = void 0;
    }
  }
  return t2;
}
function he(t2, e2, n2) {
  if (!Array.isArray(t2) || t2.length) return false;
  const r2 = $t(t2);
  return !!(1 & r2) || !(!e2 || !(Array.isArray(e2) ? e2.includes(n2) : e2.has(n2))) && (Jt(t2, 1 | r2), true);
}
const ce = [];
function ue(t2) {
  if (2 & t2) throw Error();
}
Jt(ce, 55), ne = Object.freeze(ce);
class le {
  constructor(t2, e2, n2) {
    this.l = 0, this.g = t2, this.h = e2, this.m = n2;
  }
  next() {
    if (this.l < this.g.length) {
      const t2 = this.g[this.l++];
      return { done: false, value: this.h ? this.h.call(this.m, t2) : t2 };
    }
    return { done: true, value: void 0 };
  }
  [Symbol.iterator]() {
    return new le(this.g, this.h, this.m);
  }
}
let de, fe, pe;
function ge(t2, e2) {
  (e2 = de ? e2[de] : void 0) && (t2[de] = Gt(e2));
}
function me(t2, e2) {
  t2.__closure__error__context__984382 || (t2.__closure__error__context__984382 = {}), t2.__closure__error__context__984382.severity = e2;
}
function ye() {
  const e2 = Error();
  me(e2, "incident"), function(e3) {
    t.setTimeout(() => {
      throw e3;
    }, 0);
  }(e2);
}
function _e(t2) {
  return me(t2 = Error(t2), "warning"), t2;
}
function ve(t2) {
  return null == t2 || "number" == typeof t2 ? t2 : "NaN" === t2 || "Infinity" === t2 || "-Infinity" === t2 ? Number(t2) : void 0;
}
function Ee(t2) {
  return null == t2 || "boolean" == typeof t2 ? t2 : "number" == typeof t2 ? !!t2 : void 0;
}
Object.freeze(new class {
}()), Object.freeze(new class {
}());
const we = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function Te(t2) {
  const e2 = typeof t2;
  return "number" === e2 ? Number.isFinite(t2) : "string" === e2 && we.test(t2);
}
function Ae(t2) {
  if (null == t2) return t2;
  if ("string" == typeof t2) {
    if (!t2) return;
    t2 = +t2;
  }
  return "number" == typeof t2 && Number.isFinite(t2) ? 0 | t2 : void 0;
}
function be(t2) {
  if (null == t2) return t2;
  if ("string" == typeof t2) {
    if (!t2) return;
    t2 = +t2;
  }
  return "number" == typeof t2 && Number.isFinite(t2) ? t2 >>> 0 : void 0;
}
function ke(t2) {
  return "-" !== t2[0] && (20 > t2.length || 20 === t2.length && 184467 > Number(t2.substring(0, 6)));
}
function xe(t2) {
  return "-" === t2[0] ? 20 > t2.length || 20 === t2.length && -922337 < Number(t2.substring(0, 7)) : 19 > t2.length || 19 === t2.length && 922337 > Number(t2.substring(0, 6));
}
function Se(t2) {
  return t2 = Math.trunc(t2), Number.isSafeInteger(t2) || ($(t2), t2 = Z(K, Y)), t2;
}
function Le(t2) {
  var e2 = Math.trunc(Number(t2));
  return Number.isSafeInteger(e2) ? String(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), xe(t2) || (nt(t2), t2 = et()), t2);
}
function Fe(t2) {
  return null == t2 ? t2 : Te(t2) ? "number" == typeof t2 ? Se(t2) : Le(t2) : void 0;
}
function Re(t2) {
  if ("string" != typeof t2) throw Error();
  return t2;
}
function Me(t2) {
  if (null != t2 && "string" != typeof t2) throw Error();
  return t2;
}
function Pe(t2) {
  return null == t2 || "string" == typeof t2 ? t2 : void 0;
}
function Ce(t2, e2, n2, r2) {
  if (null != t2 && "object" == typeof t2 && t2.X === re) return t2;
  if (!Array.isArray(t2)) return n2 ? 2 & r2 ? (t2 = e2[Xt]) ? e2 = t2 : (Zt((t2 = new e2()).s), e2 = e2[Xt] = t2) : e2 = new e2() : e2 = void 0, e2;
  let i2 = n2 = $t(t2);
  return 0 === i2 && (i2 |= 32 & r2), i2 |= 2 & r2, i2 !== n2 && Jt(t2, i2), new e2(t2);
}
function Oe(t2, e2, n2) {
  if (e2) {
    var r2 = !!r2;
    if (!Te(e2 = t2)) throw _e("int64");
    "string" == typeof e2 ? r2 = Le(e2) : r2 ? (r2 = Math.trunc(e2), Number.isSafeInteger(r2) ? r2 = String(r2) : xe(e2 = String(r2)) ? r2 = e2 : ($(r2), r2 = et())) : r2 = Se(e2);
  } else r2 = Fe(t2);
  return "string" == typeof (n2 = null == (t2 = r2) ? n2 ? 0 : void 0 : t2) && (r2 = +n2, Number.isSafeInteger(r2)) ? r2 : n2;
}
let Ie, Ue, De;
function Ne(t2) {
  switch (typeof t2) {
    case "boolean":
      return Ue || (Ue = [0, void 0, true]);
    case "number":
      return 0 < t2 ? void 0 : 0 === t2 ? De || (De = [0, void 0]) : [-t2, void 0];
    case "string":
      return [0, t2];
    case "object":
      return t2;
  }
}
function Be(t2, e2) {
  return Ge(t2, e2[0], e2[1]);
}
function Ge(t2, e2, n2) {
  if (null == t2 && (t2 = Ie), Ie = void 0, null == t2) {
    var r2 = 96;
    n2 ? (t2 = [n2], r2 |= 512) : t2 = [], e2 && (r2 = -16760833 & r2 | (1023 & e2) << 14);
  } else {
    if (!Array.isArray(t2)) throw Error("narr");
    if (2048 & (r2 = $t(t2))) throw Error("farr");
    if (64 & r2) return t2;
    if (r2 |= 64, n2 && (r2 |= 512, n2 !== t2[0])) throw Error("mid");
    t: {
      const i2 = (n2 = t2).length;
      if (i2) {
        const t3 = i2 - 1;
        if (oe(n2[t3])) {
          if (1024 <= (e2 = t3 - (+!!(512 & (r2 |= 256)) - 1))) throw Error("pvtlmt");
          r2 = -16760833 & r2 | (1023 & e2) << 14;
          break t;
        }
      }
      if (e2) {
        if (1024 < (e2 = Math.max(e2, i2 - (+!!(512 & r2) - 1)))) throw Error("spvt");
        r2 = -16760833 & r2 | (1023 & e2) << 14;
      }
    }
  }
  return Jt(t2, r2), t2;
}
const je = {};
let Ve = function() {
  try {
    return _(new class extends Map {
      constructor() {
        super();
      }
    }()), false;
  } catch {
    return true;
  }
}();
class Xe {
  constructor() {
    this.g = /* @__PURE__ */ new Map();
  }
  get(t2) {
    return this.g.get(t2);
  }
  set(t2, e2) {
    return this.g.set(t2, e2), this.size = this.g.size, this;
  }
  delete(t2) {
    return t2 = this.g.delete(t2), this.size = this.g.size, t2;
  }
  clear() {
    this.g.clear(), this.size = this.g.size;
  }
  has(t2) {
    return this.g.has(t2);
  }
  entries() {
    return this.g.entries();
  }
  keys() {
    return this.g.keys();
  }
  values() {
    return this.g.values();
  }
  forEach(t2, e2) {
    return this.g.forEach(t2, e2);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
}
const He = Ve ? (Object.setPrototypeOf(Xe.prototype, Map.prototype), Object.defineProperties(Xe.prototype, { size: { value: 0, configurable: true, enumerable: true, writable: true } }), Xe) : class extends Map {
  constructor() {
    super();
  }
};
function We(t2) {
  return t2;
}
function ze(t2) {
  if (2 & t2.N) throw Error("Cannot mutate an immutable Map");
}
var Ke = class extends He {
  constructor(t2, e2, n2 = We, r2 = We) {
    super();
    let i2 = $t(t2);
    i2 |= 64, Jt(t2, i2), this.N = i2, this.U = e2, this.S = n2, this.Z = this.U ? Ye : r2;
    for (let s2 = 0; s2 < t2.length; s2++) {
      const o2 = t2[s2], a2 = n2(o2[0], false, true);
      let h2 = o2[1];
      e2 ? void 0 === h2 && (h2 = null) : h2 = r2(o2[1], false, true, void 0, void 0, i2), super.set(a2, h2);
    }
  }
  oa(t2 = $e) {
    if (0 !== this.size) return this.Y(t2);
  }
  Y(t2 = $e) {
    const e2 = [], n2 = super.entries();
    for (var r2; !(r2 = n2.next()).done; ) (r2 = r2.value)[0] = t2(r2[0]), r2[1] = t2(r2[1]), e2.push(r2);
    return e2;
  }
  clear() {
    ze(this), super.clear();
  }
  delete(t2) {
    return ze(this), super.delete(this.S(t2, true, false));
  }
  entries() {
    var t2 = this.na();
    return new le(t2, qe, this);
  }
  keys() {
    return this.Ia();
  }
  values() {
    var t2 = this.na();
    return new le(t2, Ke.prototype.get, this);
  }
  forEach(t2, e2) {
    super.forEach((n2, r2) => {
      t2.call(e2, this.get(r2), r2, this);
    });
  }
  set(t2, e2) {
    return ze(this), null == (t2 = this.S(t2, true, false)) ? this : null == e2 ? (super.delete(t2), this) : super.set(t2, this.Z(e2, true, true, this.U, false, this.N));
  }
  Oa(t2) {
    const e2 = this.S(t2[0], false, true);
    t2 = t2[1], t2 = this.U ? void 0 === t2 ? null : t2 : this.Z(t2, false, true, void 0, false, this.N), super.set(e2, t2);
  }
  has(t2) {
    return super.has(this.S(t2, false, false));
  }
  get(t2) {
    t2 = this.S(t2, false, false);
    const e2 = super.get(t2);
    if (void 0 !== e2) {
      var n2 = this.U;
      return n2 ? ((n2 = this.Z(e2, false, true, n2, this.ta, this.N)) !== e2 && super.set(t2, n2), n2) : e2;
    }
  }
  na() {
    return Array.from(super.keys());
  }
  Ia() {
    return super.keys();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};
function Ye(t2, e2, n2, r2, i2, s2) {
  return t2 = Ce(t2, r2, n2, s2), i2 && (t2 = an(t2)), t2;
}
function $e(t2) {
  return t2;
}
function qe(t2) {
  return [t2, this.get(t2)];
}
let Je;
function Ze() {
  return Je || (Je = new Ke(Zt([]), void 0, void 0, void 0, je));
}
function Qe(t2, e2, n2, r2, i2) {
  if (null != t2) {
    if (Array.isArray(t2)) t2 = he(t2, void 0, 0) ? void 0 : i2 && 2 & $t(t2) ? t2 : tn(t2, e2, n2, void 0 !== r2, i2);
    else if (oe(t2)) {
      const s2 = {};
      for (let o2 in t2) s2[o2] = Qe(t2[o2], e2, n2, r2, i2);
      t2 = s2;
    } else t2 = e2(t2, r2);
    return t2;
  }
}
function tn(t2, e2, n2, r2, i2) {
  const s2 = r2 || n2 ? $t(t2) : 0;
  r2 = r2 ? !!(32 & s2) : void 0;
  const o2 = Gt(t2);
  for (let t3 = 0; t3 < o2.length; t3++) o2[t3] = Qe(o2[t3], e2, n2, r2, i2);
  return n2 && (ge(o2, t2), n2(s2, o2)), o2;
}
function en(t2) {
  return Qe(t2, nn, void 0, void 0, false);
}
function nn(t2) {
  return t2.X === re ? t2.toJSON() : t2 instanceof Ke ? t2.oa(en) : function(t3) {
    switch (typeof t3) {
      case "number":
        return isFinite(t3) ? t3 : String(t3);
      case "boolean":
        return t3 ? 1 : 0;
      case "object":
        if (t3) if (Array.isArray(t3)) {
          if (he(t3, void 0, 0)) return;
        } else {
          if (M(t3)) return x(t3);
          if (t3 instanceof B) {
            const e2 = t3.g;
            return null == e2 ? "" : "string" == typeof e2 ? e2 : t3.g = x(e2);
          }
          if (t3 instanceof Ke) return t3.oa();
        }
    }
    return t3;
  }(t2);
}
function rn(t2, e2, n2 = te) {
  if (null != t2) {
    if (b && t2 instanceof Uint8Array) return e2 ? t2 : new Uint8Array(t2);
    if (Array.isArray(t2)) {
      var r2 = $t(t2);
      return 2 & r2 || (e2 && (e2 = 0 === r2 || !!(32 & r2) && !(64 & r2 || !(16 & r2))), t2 = e2 ? Jt(t2, -12293 & (34 | r2)) : tn(t2, rn, 4 & r2 ? te : n2, true, true)), t2;
    }
    return t2.X === re ? (n2 = t2.s, t2 = 2 & (r2 = qt(n2)) ? t2 : sn(t2, n2, r2, true)) : t2 instanceof Ke && !(2 & t2.N) && (n2 = Zt(t2.Y(rn)), t2 = new Ke(n2, t2.U, t2.S, t2.Z)), t2;
  }
}
function sn(t2, e2, n2, r2) {
  return t2 = t2.constructor, Ie = e2 = on(e2, n2, r2), e2 = new t2(e2), Ie = void 0, e2;
}
function on(t2, e2, n2) {
  const r2 = n2 || 2 & e2 ? te : Qt, i2 = !!(32 & e2);
  return t2 = function(t3, e3, n3) {
    const r3 = Gt(t3);
    var i3 = r3.length;
    const s2 = 256 & e3 ? r3[i3 - 1] : void 0;
    for (i3 += s2 ? -1 : 0, e3 = 512 & e3 ? 1 : 0; e3 < i3; e3++) r3[e3] = n3(r3[e3]);
    if (s2) {
      e3 = r3[e3] = {};
      for (const t4 in s2) e3[t4] = n3(s2[t4]);
    }
    return ge(r3, t3), r3;
  }(t2, e2, (t3) => rn(t3, i2, r2)), zt(t2, 32 | (n2 ? 2 : 0)), t2;
}
function an(t2) {
  const e2 = t2.s, n2 = qt(e2);
  return 2 & n2 ? sn(t2, e2, n2, false) : t2;
}
function hn(t2, e2, n2, r2) {
  return !(4 & e2) || null != n2 && (!r2 && 0 === n2 && (4096 & e2 || 8192 & e2) && 5 > (t2.constructor[Wt] = 1 + (0 | t2.constructor[Wt])) && ye(), 0 !== n2 && !(n2 & e2));
}
function cn(t2, e2) {
  return ln(t2 = t2.s, qt(t2), e2);
}
function un(t2, e2, n2, r2) {
  if (!(0 > (e2 = r2 + (+!!(512 & e2) - 1)) || e2 >= t2.length || e2 >= n2)) return t2[e2];
}
function ln(t2, e2, n2, r2) {
  if (-1 === n2) return null;
  const i2 = ee(e2);
  if (!(n2 >= i2)) {
    var s2 = t2.length;
    return r2 && 256 & e2 && null != (r2 = t2[s2 - 1][n2]) ? (un(t2, e2, i2, n2) && null != Ht && (4 <= (e2 = (t2 = pe ?? (pe = {}))[Ht] || 0) || (t2[Ht] = e2 + 1, ye())), r2) : un(t2, e2, i2, n2);
  }
  return 256 & e2 ? t2[t2.length - 1][n2] : void 0;
}
function dn(t2, e2, n2, r2) {
  const i2 = t2.s;
  let s2 = qt(i2);
  return ue(s2), fn(i2, s2, e2, n2, r2), t2;
}
function fn(t2, e2, n2, r2, i2) {
  const s2 = ee(e2);
  if (n2 >= s2 || i2) {
    let o2 = e2;
    if (256 & e2) i2 = t2[t2.length - 1];
    else {
      if (null == r2) return o2;
      i2 = t2[s2 + (+!!(512 & e2) - 1)] = {}, o2 |= 256;
    }
    return i2[n2] = r2, n2 < s2 && (t2[n2 + (+!!(512 & e2) - 1)] = void 0), o2 !== e2 && Jt(t2, o2), o2;
  }
  return t2[n2 + (+!!(512 & e2) - 1)] = r2, 256 & e2 && (n2 in (t2 = t2[t2.length - 1]) && delete t2[n2]), e2;
}
function pn(t2, e2, n2, r2, i2) {
  var s2 = 2 & e2;
  let o2 = ln(t2, e2, n2, i2);
  Array.isArray(o2) || (o2 = ne);
  const a2 = !(2 & r2);
  r2 = !(1 & r2);
  const h2 = !!(32 & e2);
  let c2 = $t(o2);
  return 0 !== c2 || !h2 || s2 || a2 ? 1 & c2 || (c2 |= 1, Jt(o2, c2)) : (c2 |= 33, Jt(o2, c2)), s2 ? (t2 = false, 2 & c2 || (Zt(o2), t2 = !!(4 & c2)), (r2 || t2) && Object.freeze(o2)) : (s2 = !!(2 & c2) || !!(2048 & c2), r2 && s2 ? (o2 = Gt(o2), r2 = 1, h2 && !a2 && (r2 |= 32), Jt(o2, r2), fn(t2, e2, n2, o2, i2)) : a2 && 32 & c2 && !s2 && Kt(o2, 32)), o2;
}
function gn(t2, e2) {
  t2 = t2.s;
  let n2 = qt(t2);
  const r2 = ln(t2, n2, e2), i2 = ve(r2);
  return null != i2 && i2 !== r2 && fn(t2, n2, e2, i2), i2;
}
function mn(t2) {
  t2 = t2.s;
  let e2 = qt(t2);
  const n2 = ln(t2, e2, 1), r2 = ae(n2, true, !!(34 & e2));
  return null != r2 && r2 !== n2 && fn(t2, e2, 1, r2), r2;
}
function yn(t2, e2, n2) {
  const r2 = t2.s;
  let i2 = qt(r2);
  const s2 = 2 & i2 ? 1 : 2;
  let o2 = _n(r2, i2, e2);
  var a2 = $t(o2);
  if (hn(t2, a2, void 0, false)) {
    (4 & a2 || Object.isFrozen(o2)) && (o2 = Gt(o2), a2 = In(a2, i2), i2 = fn(r2, i2, e2, o2));
    let s3 = t2 = 0;
    for (; t2 < o2.length; t2++) {
      const e3 = n2(o2[t2]);
      null != e3 && (o2[s3++] = e3);
    }
    s3 < t2 && (o2.length = s3), a2 = Yt(a2 = vn(a2, i2), 20, true), a2 = Yt(a2, 4096, false), a2 = Yt(a2, 8192, false), Jt(o2, a2), 2 & a2 && Object.freeze(o2);
  }
  return En(a2) || (n2 = a2, (a2 = (t2 = 1 === s2 || 4 === s2 && !!(32 & a2)) ? Yt(a2, 2, true) : Un(a2, i2, false)) !== n2 && Jt(o2, a2), t2 && Object.freeze(o2)), 2 === s2 && En(a2) && (o2 = Gt(o2), a2 = Un(a2 = In(a2, i2), i2, false), Jt(o2, a2), fn(r2, i2, e2, o2)), o2;
}
function _n(t2, e2, n2) {
  return t2 = ln(t2, e2, n2), Array.isArray(t2) ? t2 : ne;
}
function vn(t2, e2) {
  return 0 === t2 && (t2 = In(t2, e2)), Yt(t2, 1, true);
}
function En(t2) {
  return !!(2 & t2) && !!(4 & t2) || !!(2048 & t2);
}
function wn(t2) {
  t2 = Gt(t2);
  for (let e2 = 0; e2 < t2.length; e2++) {
    const n2 = t2[e2] = Gt(t2[e2]);
    Array.isArray(n2[1]) && (n2[1] = Zt(n2[1]));
  }
  return t2;
}
function Tn(t2, e2, n2) {
  {
    const a2 = t2.s;
    let h2 = qt(a2);
    if (ue(h2), null == n2) fn(a2, h2, e2);
    else {
      var r2, i2 = $t(n2), s2 = i2, o2 = !!(2 & i2) || Object.isFrozen(n2);
      if ((r2 = !o2) && (r2 = false), hn(t2, i2)) for (i2 = 21, o2 && (n2 = Gt(n2), s2 = 0, i2 = Un(i2 = In(i2, h2), h2, true)), t2 = 0; t2 < n2.length; t2++) n2[t2] = Re(n2[t2]);
      r2 && (n2 = Gt(n2), s2 = 0, i2 = Un(i2 = In(i2, h2), h2, true)), i2 !== s2 && Jt(n2, i2), fn(a2, h2, e2, n2);
    }
  }
}
function An(t2, e2, n2, r2) {
  t2 = t2.s;
  let i2 = qt(t2);
  ue(i2), fn(t2, i2, e2, ("0" === r2 ? 0 === Number(n2) : n2 === r2) ? void 0 : n2);
}
function bn(t2, e2, n2, r2) {
  const i2 = qt(t2);
  ue(i2), t2 = pn(t2, i2, e2, 2), r2 = n2(r2, !!(4 & (e2 = $t(t2))) && !!(4096 & e2)), t2.push(r2);
}
function kn(t2) {
  return t2;
}
function xn(t2, e2) {
  return Sn(t2 = t2.s, qt(t2), ws) === e2 ? e2 : -1;
}
function Sn(t2, e2, n2) {
  let r2 = 0;
  for (let i2 = 0; i2 < n2.length; i2++) {
    const s2 = n2[i2];
    null != ln(t2, e2, s2) && (0 !== r2 && (e2 = fn(t2, e2, r2)), r2 = s2);
  }
  return r2;
}
function Ln(t2, e2, n2, r2) {
  let i2 = qt(t2);
  ue(i2);
  const s2 = ln(t2, i2, n2, r2);
  let o2;
  if (null != s2 && s2.X === re) return (e2 = an(s2)) !== s2 && fn(t2, i2, n2, e2, r2), e2.s;
  if (Array.isArray(s2)) {
    const t3 = $t(s2);
    o2 = 2 & t3 ? on(s2, t3, false) : s2, o2 = Be(o2, e2);
  } else o2 = Be(void 0, e2);
  return o2 !== s2 && fn(t2, i2, n2, o2, r2), o2;
}
function Fn(t2, e2, n2, r2) {
  t2 = t2.s;
  let i2 = qt(t2);
  const s2 = ln(t2, i2, n2, r2);
  return (e2 = Ce(s2, e2, false, i2)) !== s2 && null != e2 && fn(t2, i2, n2, e2, r2), e2;
}
function Rn(t2, e2, n2, r2 = false) {
  if (null == (e2 = Fn(t2, e2, n2, r2))) return e2;
  t2 = t2.s;
  let i2 = qt(t2);
  if (!(2 & i2)) {
    const s2 = an(e2);
    s2 !== e2 && fn(t2, i2, n2, e2 = s2, r2);
  }
  return e2;
}
function Mn(t2, e2, n2, r2, i2, s2) {
  var o2 = 2, a2 = !!(2 & e2);
  o2 = a2 ? 1 : o2, i2 = !!i2, s2 && (s2 = !a2), a2 = _n(t2, e2, r2);
  var h2 = $t(a2);
  const c2 = !!(4 & h2);
  if (!c2) {
    var u2 = a2, l2 = e2;
    const t3 = !!(2 & (h2 = vn(h2, e2)));
    t3 && (l2 = Yt(l2, 2, true));
    let r3 = !t3, i3 = true, s3 = 0, o3 = 0;
    for (; s3 < u2.length; s3++) {
      const e3 = Ce(u2[s3], n2, false, l2);
      if (e3 instanceof n2) {
        if (!t3) {
          const t4 = !!(2 & $t(e3.s));
          r3 && (r3 = !t4), i3 && (i3 = t4);
        }
        u2[o3++] = e3;
      }
    }
    o3 < s3 && (u2.length = o3), h2 = Yt(h2, 4, true), h2 = Yt(h2, 16, i3), h2 = Yt(h2, 8, r3), Jt(u2, h2), t3 && Object.freeze(u2);
  }
  if (s2 && !(8 & h2 || !a2.length && (1 === o2 || 4 === o2 && 32 & h2))) {
    for (En(h2) && (a2 = Gt(a2), h2 = In(h2, e2), e2 = fn(t2, e2, r2, a2)), n2 = a2, s2 = h2, u2 = 0; u2 < n2.length; u2++) (h2 = n2[u2]) !== (l2 = an(h2)) && (n2[u2] = l2);
    s2 = Yt(s2, 8, true), s2 = Yt(s2, 16, !n2.length), Jt(n2, s2), h2 = s2;
  }
  return En(h2) || (n2 = h2, (h2 = (s2 = 1 === o2 || 4 === o2 && !!(32 & h2)) ? Yt(h2, !a2.length || 16 & h2 && (!c2 || 32 & h2) ? 2 : 2048, true) : Un(h2, e2, i2)) !== n2 && Jt(a2, h2), s2 && Object.freeze(a2)), 2 === o2 && En(h2) && (a2 = Gt(a2), h2 = Un(h2 = In(h2, e2), e2, i2), Jt(a2, h2), fn(t2, e2, r2, a2)), a2;
}
function Pn(t2, e2, n2) {
  t2 = t2.s;
  const r2 = qt(t2);
  return Mn(t2, r2, e2, n2, false, !(2 & r2));
}
function Cn(t2, e2, n2, r2, i2) {
  return null == r2 && (r2 = void 0), dn(t2, n2, r2, i2);
}
function On(t2, e2, n2, r2) {
  null == r2 && (r2 = void 0), t2 = t2.s;
  let i2 = qt(t2);
  ue(i2), (n2 = Sn(t2, i2, n2)) && n2 !== e2 && null != r2 && (i2 = fn(t2, i2, n2)), fn(t2, i2, e2, r2);
}
function In(t2, e2) {
  return t2 = Yt(t2, 2, !!(2 & e2)), t2 = Yt(t2, 32, true), Yt(t2, 2048, false);
}
function Un(t2, e2, n2) {
  return 32 & e2 && n2 || (t2 = Yt(t2, 32, false)), t2;
}
function Dn(t2, e2, n2, r2) {
  t2 = t2.s;
  const i2 = qt(t2);
  ue(i2), e2 = Mn(t2, i2, n2, e2, true), n2 = null != r2 ? r2 : new n2(), e2.push(n2), 2 & $t(n2.s) ? Kt(e2, 8) : Kt(e2, 16);
}
function Nn(t2, e2) {
  return Ae(cn(t2, e2));
}
function Bn(t2, e2) {
  return t2 ?? e2;
}
function Gn(t2, e2) {
  return Bn(gn(t2, e2), 0);
}
function jn(t2, e2) {
  return Bn(Pe(cn(t2, e2)), "");
}
function Vn(t2, e2, n2) {
  if (null != n2 && "boolean" != typeof n2) throw t2 = typeof n2, Error(`Expected boolean but got ${"object" != t2 ? t2 : n2 ? Array.isArray(n2) ? "array" : t2 : "null"}: ${n2}`);
  dn(t2, e2, n2);
}
function Xn(t2, e2, n2) {
  if (null != n2) {
    if ("number" != typeof n2) throw _e("int32");
    if (!Number.isFinite(n2)) throw _e("int32");
    n2 |= 0;
  }
  dn(t2, e2, n2);
}
function Hn(t2, e2, n2) {
  if (null != n2 && "number" != typeof n2) throw Error(`Value of float/double field must be a number, found ${typeof n2}: ${n2}`);
  dn(t2, e2, n2);
}
function Wn(t2, e2, n2) {
  e2.g ? e2.m(t2, e2.g, e2.h, n2, true) : e2.m(t2, e2.h, n2, true);
}
Ke.prototype.toJSON = void 0, Ke.prototype.Ja = ie;
var zn = class {
  constructor(t2, e2) {
    this.s = Ge(t2, e2);
  }
  toJSON() {
    return Kn(this, tn(this.s, nn, void 0, void 0, false), true);
  }
  l() {
    var t2 = ko;
    return t2.g ? t2.l(this, t2.g, t2.h, true) : t2.l(this, t2.h, t2.defaultValue, true);
  }
  clone() {
    const t2 = this.s;
    return sn(this, t2, qt(t2), false);
  }
  P() {
    return !!(2 & $t(this.s));
  }
};
function Kn(t2, e2, n2) {
  var r2 = d ? void 0 : t2.constructor.B;
  const i2 = qt(n2 ? t2.s : e2);
  if (!(t2 = e2.length)) return e2;
  let s2, o2;
  if (oe(n2 = e2[t2 - 1])) {
    t: {
      var a2 = n2;
      let t3 = {}, e3 = false;
      for (var h2 in a2) {
        let n3 = a2[h2];
        if (Array.isArray(n3)) {
          let t4 = n3;
          (he(n3, r2, +h2) || se(n3) && 0 === n3.size) && (n3 = null), n3 != t4 && (e3 = true);
        }
        null != n3 ? t3[h2] = n3 : e3 = true;
      }
      if (e3) {
        for (var c2 in t3) {
          a2 = t3;
          break t;
        }
        a2 = null;
      }
    }
    a2 != n2 && (s2 = true), t2--;
  }
  for (h2 = +!!(512 & i2) - 1; 0 < t2 && (n2 = e2[c2 = t2 - 1], c2 -= h2, null == n2 || he(n2, r2, c2) || se(n2) && 0 === n2.size); t2--) o2 = true;
  return s2 || o2 ? (e2 = Array.prototype.slice.call(e2, 0, t2), a2 && e2.push(a2), e2) : e2;
}
function Yn(t2) {
  return Array.isArray(t2) ? t2[0] instanceof Bt ? t2 : [$r, t2] : [t2, void 0];
}
function $n(t2, e2) {
  if (Array.isArray(e2)) {
    var n2 = $t(e2);
    if (4 & n2) return e2;
    for (var r2 = 0, i2 = 0; r2 < e2.length; r2++) {
      const n3 = t2(e2[r2]);
      null != n3 && (e2[i2++] = n3);
    }
    return i2 < r2 && (e2.length = i2), Jt(e2, -12289 & (5 | n2)), 2 & n2 && Object.freeze(e2), e2;
  }
}
zn.prototype.X = re, zn.prototype.toString = function() {
  return Kn(this, this.s, false).toString();
};
const qn = Symbol();
function Jn(t2) {
  let e2 = t2[qn];
  if (!e2) {
    const n2 = sr(t2), r2 = yr(t2), i2 = r2.l;
    e2 = i2 ? (t3, e3) => i2(t3, e3, r2) : (t3, e3) => {
      for (; mt(e3) && 4 != e3.h; ) {
        var i3 = e3.m, s2 = r2[i3];
        if (!s2) {
          var o2 = r2.ea;
          o2 && (o2 = o2[i3]) && (s2 = r2[i3] = Zn(o2));
        }
        s2 && s2(e3, t3, i3) || (i3 = (s2 = e3).l, yt(s2), s2.ia ? s2 = void 0 : (o2 = s2.g.g - i3, s2.g.g = i3, s2 = pt(s2.g, o2)), i3 = t3, s2 && (de || (de = Symbol()), (o2 = i3[de]) ? o2.push(s2) : i3[de] = [s2]));
      }
      n2 === tr || n2 === er || n2.j || (t3[fe || (fe = Symbol())] = n2);
    }, t2[qn] = e2;
  }
  return e2;
}
function Zn(t2) {
  const e2 = (t2 = Yn(t2))[0].g;
  if (t2 = t2[1]) {
    const n2 = Jn(t2), r2 = yr(t2).T;
    return (t3, i2, s2) => e2(t3, i2, s2, r2, n2);
  }
  return e2;
}
class Qn {
}
let tr, er;
const nr = Symbol();
function rr(t2, e2, n2) {
  const r2 = n2[1];
  let i2;
  if (r2) {
    const n3 = r2[nr];
    i2 = n3 ? n3.T : Ne(r2[0]), t2[e2] = n3 ?? r2;
  }
  i2 && i2 === Ue ? (t2.g || (t2.g = /* @__PURE__ */ new Set())).add(e2) : n2[0] && (t2.h || (t2.h = /* @__PURE__ */ new Set())).add(e2);
}
function ir(t2, e2) {
  return [t2.l, !e2 || 0 < e2[0] ? void 0 : e2];
}
function sr(t2) {
  var e2 = t2[nr];
  if (e2) return e2;
  if (!(e2 = ar(t2, t2[nr] = new Qn(), ir, ir, rr)).ea && !e2.h && !e2.g) {
    let n2 = true;
    for (let t3 in e2) isNaN(t3) || (n2 = false);
    n2 ? (Ne(t2[0]) === Ue ? er ? e2 = er : ((e2 = new Qn()).T = Ne(true), e2 = er = e2) : e2 = tr || (tr = new Qn()), e2 = t2[nr] = e2) : e2.j = true;
  }
  return e2;
}
function or(t2, e2, n2) {
  t2[e2] = n2;
}
function ar(t2, e2, n2, r2, i2 = or) {
  e2.T = Ne(t2[0]);
  let s2 = 0;
  var o2 = t2[++s2];
  o2 && o2.constructor === Object && (e2.ea = o2, "function" == typeof (o2 = t2[++s2]) && (e2.l = o2, e2.m = t2[++s2], o2 = t2[++s2]));
  const a2 = {};
  for (; Array.isArray(o2) && "number" == typeof o2[0] && 0 < o2[0]; ) {
    for (var h2 = 0; h2 < o2.length; h2++) a2[o2[h2]] = o2;
    o2 = t2[++s2];
  }
  for (h2 = 1; void 0 !== o2; ) {
    let l2;
    "number" == typeof o2 && (h2 += o2, o2 = t2[++s2]);
    var c2 = void 0;
    if (o2 instanceof Bt ? l2 = o2 : (l2 = qr, s2--), l2.pa) {
      o2 = t2[++s2], c2 = t2;
      var u2 = s2;
      "function" == typeof o2 && (o2 = o2(), c2[u2] = o2), c2 = o2;
    }
    for (u2 = h2 + 1, "number" == typeof (o2 = t2[++s2]) && 0 > o2 && (u2 -= o2, o2 = t2[++s2]); h2 < u2; h2++) {
      const t3 = a2[h2];
      i2(e2, h2, c2 ? r2(l2, c2, t3) : n2(l2, t3));
    }
  }
  return e2;
}
const hr = Symbol();
function cr(t2) {
  let e2 = t2[hr];
  if (!e2) {
    const n2 = fr(t2);
    e2 = (t3, e3) => Er(t3, e3, n2), t2[hr] = e2;
  }
  return e2;
}
const ur = Symbol();
function lr(t2) {
  return t2.h;
}
function dr(t2, e2) {
  let n2, r2;
  const i2 = t2.h;
  return (t3, s2, o2) => i2(t3, s2, o2, r2 || (r2 = fr(e2).T), n2 || (n2 = cr(e2)));
}
function fr(t2) {
  let e2 = t2[ur];
  return e2 || (e2 = ar(t2, t2[ur] = {}, lr, dr), _r(t2), e2);
}
const pr = Symbol();
function gr(t2, e2) {
  const n2 = t2.g;
  return e2 ? (t3, r2, i2) => n2(t3, r2, i2, e2) : n2;
}
function mr(t2, e2, n2) {
  const r2 = t2.g;
  let i2, s2;
  return (t3, o2, a2) => r2(t3, o2, a2, s2 || (s2 = yr(e2).T), i2 || (i2 = Jn(e2)), n2);
}
function yr(t2) {
  let e2 = t2[pr];
  return e2 || (sr(t2), e2 = ar(t2, t2[pr] = {}, gr, mr), _r(t2), e2);
}
function _r(t2) {
  pr in t2 && nr in t2 && ur in t2 && (t2.length = 0);
}
function vr(t2, e2) {
  var n2 = t2[e2];
  if (n2) return n2;
  if ((n2 = t2.ea) && (n2 = n2[e2])) {
    var r2 = (n2 = Yn(n2))[0].h;
    if (n2 = n2[1]) {
      const e3 = cr(n2), i2 = fr(n2).T;
      n2 = (n2 = t2.m) ? n2(i2, e3) : (t3, n3, s2) => r2(t3, n3, s2, i2, e3);
    } else n2 = r2;
    return t2[e2] = n2;
  }
}
function Er(t2, e2, n2) {
  for (var r2 = qt(t2), i2 = +!!(512 & r2) - 1, s2 = t2.length, o2 = 512 & r2 ? 1 : 0, a2 = s2 + (256 & r2 ? -1 : 0); o2 < a2; o2++) {
    const r3 = t2[o2];
    if (null == r3) continue;
    const s3 = o2 - i2, a3 = vr(n2, s3);
    a3 && a3(e2, r3, s3);
  }
  if (256 & r2) {
    r2 = t2[s2 - 1];
    for (let t3 in r2) i2 = +t3, Number.isNaN(i2) || null != (s2 = r2[t3]) && (a2 = vr(n2, i2)) && a2(e2, s2, i2);
  }
  if (t2 = de ? t2[de] : void 0) for (Ct(e2, e2.g.end()), n2 = 0; n2 < t2.length; n2++) Ct(e2, N(t2[n2]) || C());
}
function wr(t2, e2) {
  return new Bt(t2, e2, false, false);
}
function Tr(t2, e2) {
  return new Bt(t2, e2, true, false);
}
function Ar(t2, e2) {
  return new Bt(t2, e2, false, true);
}
function br(t2, e2, n2) {
  fn(t2, qt(t2), e2, n2);
}
var kr = Ar(function(t2, e2, n2, r2, i2) {
  return 2 === t2.h && (t2 = _t(t2, Be([void 0, void 0], r2), i2), ue(r2 = qt(e2)), (i2 = ln(e2, r2, n2)) instanceof Ke ? 0 != (2 & i2.N) ? ((i2 = i2.Y()).push(t2), fn(e2, r2, n2, i2)) : i2.Oa(t2) : Array.isArray(i2) ? (2 & $t(i2) && fn(e2, r2, n2, i2 = wn(i2)), i2.push(t2)) : fn(e2, r2, n2, [t2]), true);
}, function(t2, e2, n2, r2, i2) {
  if (e2 instanceof Ke) e2.forEach((e3, s2) => {
    Nt(t2, n2, Be([s2, e3], r2), i2);
  });
  else if (Array.isArray(e2)) for (let s2 = 0; s2 < e2.length; s2++) {
    const o2 = e2[s2];
    Array.isArray(o2) && Nt(t2, n2, Be(o2, r2), i2);
  }
});
function xr(t2, e2, n2) {
  t: if (null != e2) {
    if (Te(e2)) {
      if ("string" == typeof e2) {
        e2 = Le(e2);
        break t;
      }
      if ("number" == typeof e2) {
        e2 = Se(e2);
        break t;
      }
    }
    e2 = void 0;
  }
  null != e2 && ("string" == typeof e2 && xt(e2), null != e2 && (Ot(t2, n2, 0), "number" == typeof e2 ? (t2 = t2.g, $(e2), Ft(t2, K, Y)) : (n2 = xt(e2), Ft(t2.g, n2.h, n2.g))));
}
function Sr(t2, e2, n2) {
  null != (e2 = Ae(e2)) && null != e2 && (Ot(t2, n2, 0), Mt(t2.g, e2));
}
function Lr(t2, e2, n2) {
  null != (e2 = Ee(e2)) && (Ot(t2, n2, 0), t2.g.g.push(e2 ? 1 : 0));
}
function Fr(t2, e2, n2) {
  null != (e2 = Pe(e2)) && Dt(t2, n2, c(e2));
}
function Rr(t2, e2, n2, r2, i2) {
  Nt(t2, n2, e2 instanceof zn ? e2.s : Array.isArray(e2) ? Be(e2, r2) : void 0, i2);
}
function Mr(t2, e2, n2) {
  null != (e2 = null == e2 || "string" == typeof e2 || M(e2) || e2 instanceof B ? e2 : void 0) && Dt(t2, n2, X(e2).buffer);
}
function Pr(t2, e2, n2) {
  return (5 === t2.h || 2 === t2.h) && (e2 = pn(e2, qt(e2), n2, 2, false), 2 == t2.h ? wt(t2, ct, e2) : e2.push(ct(t2.g)), true);
}
var Cr, Or = wr(function(t2, e2, n2) {
  if (1 !== t2.h) return false;
  var r2 = t2.g;
  t2 = ht(r2);
  const i2 = ht(r2);
  r2 = 2 * (i2 >> 31) + 1;
  const s2 = i2 >>> 20 & 2047;
  return t2 = 4294967296 * (1048575 & i2) + t2, br(e2, n2, 2047 == s2 ? t2 ? NaN : 1 / 0 * r2 : 0 == s2 ? r2 * Math.pow(2, -1074) * t2 : r2 * Math.pow(2, s2 - 1075) * (t2 + 4503599627370496)), true;
}, function(t2, e2, n2) {
  null != (e2 = ve(e2)) && (Ot(t2, n2, 1), t2 = t2.g, (n2 = z || (z = new DataView(new ArrayBuffer(8)))).setFloat64(0, +e2, true), K = n2.getUint32(0, true), Y = n2.getUint32(4, true), Pt(t2, K), Pt(t2, Y));
}), Ir = wr(function(t2, e2, n2) {
  return 5 === t2.h && (br(e2, n2, ct(t2.g)), true);
}, function(t2, e2, n2) {
  null != (e2 = ve(e2)) && (Ot(t2, n2, 5), t2 = t2.g, q(e2), Pt(t2, K));
}), Ur = Tr(Pr, function(t2, e2, n2) {
  if (null != (e2 = $n(ve, e2))) for (let o2 = 0; o2 < e2.length; o2++) {
    var r2 = t2, i2 = n2, s2 = e2[o2];
    null != s2 && (Ot(r2, i2, 5), r2 = r2.g, q(s2), Pt(r2, K));
  }
}), Dr = Tr(Pr, function(t2, e2, n2) {
  if (null != (e2 = $n(ve, e2)) && e2.length) {
    Ot(t2, n2, 2), Rt(t2.g, 4 * e2.length);
    for (let r2 = 0; r2 < e2.length; r2++) n2 = t2.g, q(e2[r2]), Pt(n2, K);
  }
}), Nr = wr(function(t2, e2, n2) {
  return 0 === t2.h && (br(e2, n2, it(t2.g, Z)), true);
}, xr), Br = wr(function(t2, e2, n2) {
  return 0 === t2.h && (br(e2, n2, 0 === (t2 = it(t2.g, Z)) ? void 0 : t2), true);
}, xr), Gr = wr(function(t2, e2, n2) {
  return 0 === t2.h && (br(e2, n2, it(t2.g, J)), true);
}, function(t2, e2, n2) {
  t: if (null != e2) {
    if (Te(e2)) {
      if ("string" == typeof e2) {
        var r2 = Math.trunc(Number(e2));
        Number.isSafeInteger(r2) && 0 <= r2 ? e2 = String(r2) : (-1 !== (r2 = e2.indexOf(".")) && (e2 = e2.substring(0, r2)), ke(e2) || (nt(e2), e2 = Q(K, Y)));
        break t;
      }
      if ("number" == typeof e2) {
        e2 = 0 <= (e2 = Math.trunc(e2)) && Number.isSafeInteger(e2) ? e2 : function(t3) {
          if (0 > t3) {
            $(t3);
            const e3 = Q(K, Y);
            return t3 = Number(e3), Number.isSafeInteger(t3) ? t3 : e3;
          }
          return ke(String(t3)) ? t3 : ($(t3), J(K, Y));
        }(e2);
        break t;
      }
    }
    e2 = void 0;
  }
  null != e2 && ("string" == typeof e2 && At(e2), null != e2 && (Ot(t2, n2, 0), "number" == typeof e2 ? (t2 = t2.g, $(e2), Ft(t2, K, Y)) : (n2 = At(e2), Ft(t2.g, n2.h, n2.g))));
}), jr = wr(function(t2, e2, n2) {
  return 0 === t2.h && (br(e2, n2, ot(t2.g)), true);
}, Sr), Vr = Tr(function(t2, e2, n2) {
  return (0 === t2.h || 2 === t2.h) && (e2 = pn(e2, qt(e2), n2, 2, false), 2 == t2.h ? wt(t2, ot, e2) : e2.push(ot(t2.g)), true);
}, function(t2, e2, n2) {
  if (null != (e2 = $n(Ae, e2)) && e2.length) {
    n2 = It(t2, n2);
    for (let n3 = 0; n3 < e2.length; n3++) Mt(t2.g, e2[n3]);
    Ut(t2, n2);
  }
}), Xr = wr(function(t2, e2, n2) {
  return 0 === t2.h && (br(e2, n2, 0 === (t2 = ot(t2.g)) ? void 0 : t2), true);
}, Sr), Hr = wr(function(t2, e2, n2) {
  return 0 === t2.h && (br(e2, n2, st(t2.g)), true);
}, Lr), Wr = wr(function(t2, e2, n2) {
  return 0 === t2.h && (br(e2, n2, false === (t2 = st(t2.g)) ? void 0 : t2), true);
}, Lr), zr = Tr(function(t2, e2, n2) {
  return 2 === t2.h && (bn(e2, n2, kn, t2 = vt(t2)), true);
}, function(t2, e2, n2) {
  if (null != (e2 = $n(Pe, e2))) for (let o2 = 0; o2 < e2.length; o2++) {
    var r2 = t2, i2 = n2, s2 = e2[o2];
    null != s2 && Dt(r2, i2, c(s2));
  }
}), Kr = wr(function(t2, e2, n2) {
  return 2 === t2.h && (br(e2, n2, "" === (t2 = vt(t2)) ? void 0 : t2), true);
}, Fr), Yr = wr(function(t2, e2, n2) {
  return 2 === t2.h && (br(e2, n2, vt(t2)), true);
}, Fr), $r = Ar(function(t2, e2, n2, r2, i2) {
  return 2 === t2.h && (_t(t2, Ln(e2, r2, n2, true), i2), true);
}, Rr), qr = Ar(function(t2, e2, n2, r2, i2) {
  return 2 === t2.h && (_t(t2, Ln(e2, r2, n2), i2), true);
}, Rr);
Cr = new Bt(function(t2, e2, n2, r2, i2) {
  if (2 !== t2.h) return false;
  r2 = Be(void 0, r2);
  let s2 = qt(e2);
  ue(s2);
  let o2 = pn(e2, s2, n2, 3);
  return s2 = qt(e2), 4 & $t(o2) && (o2 = Gt(o2), Jt(o2, -2079 & (1 | $t(o2))), fn(e2, s2, n2, o2)), o2.push(r2), _t(t2, r2, i2), true;
}, function(t2, e2, n2, r2, i2) {
  if (Array.isArray(e2)) for (let s2 = 0; s2 < e2.length; s2++) Rr(t2, e2[s2], n2, r2, i2);
}, true, true);
var Jr = Ar(function(t2, e2, n2, r2, i2, s2) {
  if (2 !== t2.h) return false;
  let o2 = qt(e2);
  return ue(o2), (s2 = Sn(e2, o2, s2)) && n2 !== s2 && fn(e2, o2, s2), _t(t2, e2 = Ln(e2, r2, n2), i2), true;
}, Rr), Zr = wr(function(t2, e2, n2) {
  return 2 === t2.h && (br(e2, n2, Et(t2)), true);
}, Mr), Qr = Tr(function(t2, e2, n2) {
  return (0 === t2.h || 2 === t2.h) && (e2 = pn(e2, qt(e2), n2, 2, false), 2 == t2.h ? wt(t2, at, e2) : e2.push(at(t2.g)), true);
}, function(t2, e2, n2) {
  if (null != (e2 = $n(be, e2))) for (let o2 = 0; o2 < e2.length; o2++) {
    var r2 = t2, i2 = n2, s2 = e2[o2];
    null != s2 && (Ot(r2, i2, 0), Rt(r2.g, s2));
  }
}), ti = wr(function(t2, e2, n2) {
  return 0 === t2.h && (br(e2, n2, ot(t2.g)), true);
}, function(t2, e2, n2) {
  null != (e2 = Ae(e2)) && (e2 = parseInt(e2, 10), Ot(t2, n2, 0), Mt(t2.g, e2));
}), ei = Tr(function(t2, e2, n2) {
  return (0 === t2.h || 2 === t2.h) && (e2 = pn(e2, qt(e2), n2, 2, false), 2 == t2.h ? wt(t2, ut, e2) : e2.push(ot(t2.g)), true);
}, function(t2, e2, n2) {
  if (null != (e2 = $n(Ae, e2)) && e2.length) {
    n2 = It(t2, n2);
    for (let n3 = 0; n3 < e2.length; n3++) Mt(t2.g, e2[n3]);
    Ut(t2, n2);
  }
});
class ni {
  constructor(t2, e2) {
    this.h = t2, this.g = e2, this.l = Rn, this.m = Cn, this.defaultValue = void 0;
  }
}
function ri(t2, e2) {
  return new ni(t2, e2);
}
function ii(t2, e2) {
  return (n2, r2) => {
    if (Tt.length) {
      const t3 = Tt.pop();
      t3.o(r2), lt(t3.g, n2, r2), n2 = t3;
    } else n2 = new class {
      constructor(t3, e3) {
        if (gt.length) {
          const n3 = gt.pop();
          lt(n3, t3, e3), t3 = n3;
        } else t3 = new class {
          constructor(t4, e4) {
            this.h = null, this.m = false, this.g = this.l = this.j = 0, lt(this, t4, e4);
          }
          clear() {
            this.h = null, this.m = false, this.g = this.l = this.j = 0, this.ca = false;
          }
        }(t3, e3);
        this.g = t3, this.l = this.g.g, this.h = this.m = -1, this.o(e3);
      }
      o({ ia: t3 = false } = {}) {
        this.ia = t3;
      }
    }(n2, r2);
    try {
      const r3 = new t2(), s2 = r3.s;
      Jn(e2)(s2, n2);
      var i2 = r3;
    } finally {
      n2.g.clear(), n2.m = -1, n2.h = -1, 100 > Tt.length && Tt.push(n2);
    }
    return i2;
  };
}
function si(t2) {
  return function() {
    const e2 = new class {
      constructor() {
        this.l = [], this.h = 0, this.g = new class {
          constructor() {
            this.g = [];
          }
          length() {
            return this.g.length;
          }
          end() {
            const t3 = this.g;
            return this.g = [], t3;
          }
        }();
      }
    }();
    Er(this.s, e2, fr(t2)), Ct(e2, e2.g.end());
    const n2 = new Uint8Array(e2.h), r2 = e2.l, i2 = r2.length;
    let s2 = 0;
    for (let t3 = 0; t3 < i2; t3++) {
      const e3 = r2[t3];
      n2.set(e3, s2), s2 += e3.length;
    }
    return e2.l = [n2], n2;
  };
}
var oi = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, ai = [0, Kr, wr(function(t2, e2, n2) {
  return 2 === t2.h && (br(e2, n2, (t2 = Et(t2)) === D() ? void 0 : t2), true);
}, function(t2, e2, n2) {
  if (null != e2) {
    if (e2 instanceof zn) {
      const r2 = e2.Qa;
      return void (r2 && (e2 = r2(e2), null != e2 && Dt(t2, n2, X(e2).buffer)));
    }
    if (Array.isArray(e2)) return;
  }
  Mr(t2, e2, n2);
})], hi = [0, Yr], ci = [0, jr, ti, Hr, -1, Vr, ti, -1], ui = [0, Hr, -1], li = class extends zn {
  constructor() {
    super();
  }
};
li.B = [6];
var di = [0, Hr, Yr, Hr, ti, -1, ei, Yr, -1, ui, ti], fi = [0, Yr, -2], pi = class extends zn {
  constructor() {
    super();
  }
}, gi = [0], mi = [0, jr, Hr, -4], yi = class extends zn {
  constructor(t2) {
    super(t2, 2);
  }
}, _i = {}, vi = [-2, _i, Hr];
_i[336783863] = [0, Yr, Hr, -1, jr, [0, [1, 2, 3, 4, 5, 6], Jr, gi, Jr, di, Jr, fi, Jr, mi, Jr, ci, Jr, [0, Yr]], hi, Hr, [0, [1, 3], [2, 4], Jr, [0, Vr], -1, Jr, [0, zr], -1, Cr, [0, Yr, -1]], Yr];
var Ei = [0, Kr, Wr], wi = [0, Br, -1, Wr, -3, Br, Vr, Kr, Xr, Br, -1, Wr, Xr, Wr, -2, Kr], Ti = [-1, {}], Ai = [0, Yr, 1, Ti], bi = [0, Yr, zr, Ti];
function ki(t2, e2) {
  An(t2, 2, Me(e2), "");
}
function xi(t2, e2) {
  bn(t2.s, 3, Re, e2);
}
function Si(t2, e2) {
  bn(t2.s, 4, Re, e2);
}
var Li = class extends zn {
  constructor(t2) {
    super(t2, 500);
  }
  o(t2) {
    return Cn(this, 0, 7, t2);
  }
};
Li.B = [3, 4, 5, 6, 8, 13, 17, 1005];
var Fi = [-500, Kr, -1, zr, -3, vi, Cr, ai, Xr, -1, Ai, bi, Cr, Ei, Kr, wi, Xr, zr, 987, zr], Ri = [0, Kr, -1, Ti], Mi = [-500, Yr, -1, [-1, {}], 998, Yr], Pi = [-500, Yr, zr, -1, [-2, {}, Hr], 997, zr, -1], Ci = [-500, Yr, zr, Ti, 998, zr];
function Oi(t2, e2) {
  Dn(t2, 1, Li, e2);
}
function Ii(t2, e2) {
  bn(t2.s, 10, Re, e2);
}
function Ui(t2, e2) {
  bn(t2.s, 15, Re, e2);
}
var Di = class extends zn {
  constructor(t2) {
    super(t2, 500);
  }
  o(t2) {
    return Cn(this, 0, 1001, t2);
  }
};
Di.B = [1, 6, 7, 9, 10, 15, 16, 17, 14, 1002];
var Ni = [-500, Cr, Fi, 4, Cr, Mi, Cr, Pi, Xr, Cr, Ci, zr, Xr, Ai, bi, Cr, Ri, zr, -2, wi, Kr, -1, Wr, 979, Ti, Cr, ai], Bi = ii(Di, Ni);
Di.prototype.g = si(Ni);
var Gi = [0, Cr, [0, jr, -2]], ji = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Vi = [0, jr, Ir, Yr, -1], Xi = class extends zn {
  constructor(t2) {
    super(t2);
  }
  g() {
    return Pn(this, ji, 1);
  }
};
Xi.B = [1];
var Hi = [0, Cr, Vi], Wi = ii(Xi, Hi), zi = [0, jr, Ir], Ki = [0, jr, -1, Gi], Yi = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, $i = [0, jr, -3], qi = [0, Ir, -3], Ji = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Zi = [0, Ir, -1, Yr, Ir], Qi = class extends zn {
  constructor(t2) {
    super(t2);
  }
  h() {
    return Rn(this, Yi, 2);
  }
  g() {
    return Pn(this, Ji, 5);
  }
};
Qi.B = [5];
var ts = [0, ti, $i, qi, Ki, Cr, Zi], es = class extends zn {
  constructor(t2) {
    super(t2);
  }
};
es.B = [1, 2, 3, 8, 9];
var ns = ii(es, [0, zr, Vr, Dr, ts, Yr, -1, Nr, Cr, zi, zr, Nr]), rs = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, is = [0, Ir, -4], ss = class extends zn {
  constructor(t2) {
    super(t2);
  }
};
ss.B = [1];
var os = ii(ss, [0, Cr, is]), as = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, hs = [0, Ir, -4], cs = class extends zn {
  constructor(t2) {
    super(t2);
  }
};
cs.B = [1];
var us = ii(cs, [0, Cr, hs]), ls = class extends zn {
  constructor(t2) {
    super(t2);
  }
};
ls.B = [3];
var ds = [0, jr, -1, Dr, ti], fs = class extends zn {
  constructor() {
    super();
  }
};
fs.prototype.g = si([0, Ir, -4, Nr]);
var ps = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, gs = [0, 1, jr, Yr, Hi], ms = class extends zn {
  constructor(t2) {
    super(t2);
  }
};
ms.B = [1];
var ys = ii(ms, [0, Cr, gs, Nr]), _s = class extends zn {
  constructor(t2) {
    super(t2);
  }
};
_s.B = [1];
var vs = class extends zn {
  constructor(t2) {
    super(t2);
  }
  qa() {
    const t2 = mn(this);
    return null == t2 ? D() : t2;
  }
}, Es = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, ws = [1, 2], Ts = [0, ws, Jr, [0, Dr], Jr, [0, Zr], jr, Yr], As = class extends zn {
  constructor(t2) {
    super(t2);
  }
};
As.B = [1];
var bs = ii(As, [0, Cr, Ts, Nr]), ks = class extends zn {
  constructor(t2) {
    super(t2);
  }
};
ks.B = [4, 5];
var xs = [0, Yr, jr, Ir, zr, -1], Ss = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Ls = [0, Hr, -1], Fs = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Rs = [1, 2, 3, 4, 5], Ms = class extends zn {
  constructor(t2) {
    super(t2);
  }
  g() {
    return null != mn(this);
  }
  h() {
    return null != Pe(cn(this, 2));
  }
}, Ps = [0, Zr, Yr, [0, jr, Nr, -1], [0, Gr, Nr]], Cs = class extends zn {
  constructor(t2) {
    super(t2);
  }
  g() {
    return Ee(cn(this, 2)) ?? false;
  }
}, Os = [0, Ps, Hr, [0, Rs, Jr, mi, Jr, di, Jr, ci, Jr, gi, Jr, fi], ti], Is = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Us = [0, Os, Ir, -1, jr], Ds = ri(502141897, Is);
_i[502141897] = Us;
var Ns = [0, Ps];
_i[512499200] = Ns;
var Bs = [0, Ns];
_i[515723506] = Bs;
var Gs = ii(class extends zn {
  constructor(t2) {
    super(t2);
  }
}, [0, [0, ti, -1, Ur, Qr], ds]), js = [0, Os];
_i[508981768] = js;
var Vs = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Xs = [0, Os, Ir, js, Hr], Hs = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Ws = [0, Os, Us, Xs, Ir, Bs];
_i[508968149] = Xs;
var zs = ri(508968150, Hs);
_i[508968150] = Ws;
var Ks = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Ys = ri(513916220, Ks);
_i[513916220] = [0, Os, Ws, jr];
var $s = class extends zn {
  constructor(t2) {
    super(t2);
  }
  h() {
    return Rn(this, ks, 2);
  }
  g() {
    dn(this, 2);
  }
}, qs = [0, Os, xs];
_i[478825465] = qs;
var Js = [0, Os];
_i[478825422] = Js;
var Zs = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Qs = [0, Os, Js, qs, -1], to = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, eo = [0, Os, Ir, jr], no = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, ro = [0, Os, Ir], io = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, so = [0, Os, eo, ro, Ir], oo = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, ao = [0, Os, so, Qs];
_i[463370452] = Qs, _i[464864288] = eo, _i[474472470] = ro;
var ho = ri(462713202, io);
_i[462713202] = so;
var co = ri(479097054, oo);
_i[479097054] = ao;
var uo = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, lo = [0, Os], fo = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, po = [0, Os, Ir, -1, jr];
_i[514774813] = po;
var go = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, mo = [0, Os, Ir, Hr];
_i[518928384] = mo;
var yo = class extends zn {
  constructor() {
    super();
  }
};
yo.prototype.g = si([0, Os, ro, lo, Us, Xs, po, mo]);
var _o = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, vo = ri(456383383, _o);
_i[456383383] = [0, Os, xs];
var Eo = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, wo = ri(476348187, Eo);
_i[476348187] = [0, Os, Ls];
var To = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Ao = [0, ti, -1], bo = class extends zn {
  constructor(t2) {
    super(t2);
  }
};
bo.B = [3];
var ko = ri(458105876, class extends zn {
  constructor(t2) {
    super(t2);
  }
  g() {
    var t2 = this.s;
    const e2 = qt(t2);
    var n2 = 2 & e2;
    return t2 = function(t3, e3, n3) {
      var r2 = bo;
      const i2 = 2 & e3;
      let s2 = false;
      if (null == n3) {
        if (i2) return Ze();
        n3 = [];
      } else if (n3.constructor === Ke) {
        if (0 == (2 & n3.N) || i2) return n3;
        n3 = n3.Y();
      } else Array.isArray(n3) ? s2 = !!(2 & $t(n3)) : n3 = [];
      if (i2) {
        if (!n3.length) return Ze();
        s2 || (s2 = true, Zt(n3));
      } else s2 && (s2 = false, n3 = wn(n3));
      return s2 || (64 & $t(n3) ? Kt(n3, 32) : 32 & e3 && zt(n3, 32)), fn(t3, e3, 2, r2 = new Ke(n3, r2, Oe, void 0), false), r2;
    }(t2, e2, ln(t2, e2, 2)), null == t2 || !n2 && bo && (t2.ta = true), n2 = t2;
  }
});
_i[458105876] = [0, Ao, kr, [true, Nr, [0, Yr, -1, zr]]];
var xo = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, So = ri(458105758, xo);
_i[458105758] = [0, Os, Yr, Ao];
var Lo = class extends zn {
  constructor(t2) {
    super(t2);
  }
};
Lo.B = [5, 6];
var Fo = ri(443442058, Lo);
_i[443442058] = [0, Os, Yr, jr, Ir, zr, -1];
var Ro = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Mo = ri(516587230, Ro);
function Po(t2, e2) {
  return e2 = e2 ? e2.clone() : new ks(), void 0 !== t2.displayNamesLocale ? dn(e2, 1, Me(t2.displayNamesLocale)) : void 0 === t2.displayNamesLocale && dn(e2, 1), void 0 !== t2.maxResults ? Xn(e2, 2, t2.maxResults) : "maxResults" in t2 && dn(e2, 2), void 0 !== t2.scoreThreshold ? Hn(e2, 3, t2.scoreThreshold) : "scoreThreshold" in t2 && dn(e2, 3), void 0 !== t2.categoryAllowlist ? Tn(e2, 4, t2.categoryAllowlist) : "categoryAllowlist" in t2 && dn(e2, 4), void 0 !== t2.categoryDenylist ? Tn(e2, 5, t2.categoryDenylist) : "categoryDenylist" in t2 && dn(e2, 5), e2;
}
function Co(t2, e2 = -1, n2 = "") {
  return { categories: t2.map((t3) => ({ index: Bn(Nn(t3, 1), 0) ?? -1, score: Gn(t3, 2) ?? 0, categoryName: jn(t3, 3) ?? "", displayName: jn(t3, 4) ?? "" })), headIndex: e2, headName: n2 };
}
function Oo(t2) {
  var _a2, _b;
  var e2 = yn(t2, 3, ve), n2 = yn(t2, 2, Ae), r2 = yn(t2, 1, Pe), i2 = yn(t2, 9, Pe);
  const s2 = { categories: [], keypoints: [] };
  for (let t3 = 0; t3 < e2.length; t3++) s2.categories.push({ score: e2[t3], index: n2[t3] ?? -1, categoryName: r2[t3] ?? "", displayName: i2[t3] ?? "" });
  if ((e2 = (_a2 = Rn(t2, Qi, 4)) == null ? void 0 : _a2.h()) && (s2.boundingBox = { originX: Nn(e2, 1) ?? 0, originY: Nn(e2, 2) ?? 0, width: Nn(e2, 3) ?? 0, height: Nn(e2, 4) ?? 0, angle: 0 }), (_b = Rn(t2, Qi, 4)) == null ? void 0 : _b.g().length) for (const e3 of Rn(t2, Qi, 4).g()) s2.keypoints.push({ x: gn(e3, 1) ?? 0, y: gn(e3, 2) ?? 0, score: gn(e3, 4) ?? 0, label: Pe(cn(e3, 3)) ?? "" });
  return s2;
}
function Io(t2) {
  const e2 = [];
  for (const n2 of Pn(t2, as, 1)) e2.push({ x: Gn(n2, 1) ?? 0, y: Gn(n2, 2) ?? 0, z: Gn(n2, 3) ?? 0, visibility: Gn(n2, 4) ?? 0 });
  return e2;
}
function Uo(t2) {
  const e2 = [];
  for (const n2 of Pn(t2, rs, 1)) e2.push({ x: Gn(n2, 1) ?? 0, y: Gn(n2, 2) ?? 0, z: Gn(n2, 3) ?? 0, visibility: Gn(n2, 4) ?? 0 });
  return e2;
}
function Do(t2) {
  return Array.from(t2, (t3) => 127 < t3 ? t3 - 256 : t3);
}
function No(t2, e2) {
  if (t2.length !== e2.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t2.length} vs. ${e2.length}).`);
  let n2 = 0, r2 = 0, i2 = 0;
  for (let s2 = 0; s2 < t2.length; s2++) n2 += t2[s2] * e2[s2], r2 += t2[s2] * t2[s2], i2 += e2[s2] * e2[s2];
  if (0 >= r2 || 0 >= i2) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
  return n2 / Math.sqrt(r2 * i2);
}
let Bo;
_i[516587230] = [0, Os, po, mo, Ir];
const Go = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function jo() {
  if (void 0 === Bo) try {
    await WebAssembly.instantiate(Go), Bo = true;
  } catch {
    Bo = false;
  }
  return Bo;
}
async function Vo(t2, e2 = "") {
  const n2 = await jo() ? "wasm_internal" : "wasm_nosimd_internal";
  return { wasmLoaderPath: `${e2}/${t2}_${n2}.js`, wasmBinaryPath: `${e2}/${t2}_${n2}.wasm` };
}
var Xo = class {
};
function Ho() {
  var t2 = navigator;
  return "undefined" != typeof OffscreenCanvas && (!function(t3 = navigator) {
    return (t3 = t3.userAgent).includes("Safari") && !t3.includes("Chrome");
  }(t2) || !!((t2 = t2.userAgent.match(/Version\/([\d]+).*Safari/)) && 1 <= t2.length && 17 <= Number(t2[1])));
}
async function Wo(t2) {
  if ("function" != typeof importScripts) {
    const e2 = document.createElement("script");
    return e2.src = t2.toString(), e2.crossOrigin = "anonymous", new Promise((t3, n2) => {
      e2.addEventListener("load", () => {
        t3();
      }, false), e2.addEventListener("error", (t4) => {
        n2(t4);
      }, false), document.body.appendChild(e2);
    });
  }
  importScripts(t2.toString());
}
function zo(t2) {
  return void 0 !== t2.videoWidth ? [t2.videoWidth, t2.videoHeight] : void 0 !== t2.naturalWidth ? [t2.naturalWidth, t2.naturalHeight] : void 0 !== t2.displayWidth ? [t2.displayWidth, t2.displayHeight] : [t2.width, t2.height];
}
function Ko(t2, e2, n2) {
  t2.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n2(e2 = t2.i.stringToNewUTF8(e2)), t2.i._free(e2);
}
function Yo(t2, e2, n2) {
  if (!t2.i.canvas) throw Error("No OpenGL canvas configured.");
  if (n2 ? t2.i._bindTextureToStream(n2) : t2.i._bindTextureToCanvas(), !(n2 = t2.i.canvas.getContext("webgl2") || t2.i.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
  t2.i.gpuOriginForWebTexturesIsBottomLeft && n2.pixelStorei(n2.UNPACK_FLIP_Y_WEBGL, true), n2.texImage2D(n2.TEXTURE_2D, 0, n2.RGBA, n2.RGBA, n2.UNSIGNED_BYTE, e2), t2.i.gpuOriginForWebTexturesIsBottomLeft && n2.pixelStorei(n2.UNPACK_FLIP_Y_WEBGL, false);
  const [r2, i2] = zo(e2);
  return !t2.l || r2 === t2.i.canvas.width && i2 === t2.i.canvas.height || (t2.i.canvas.width = r2, t2.i.canvas.height = i2), [r2, i2];
}
function $o(t2, e2, n2) {
  t2.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
  const r2 = new Uint32Array(e2.length);
  for (let n3 = 0; n3 < e2.length; n3++) r2[n3] = t2.i.stringToNewUTF8(e2[n3]);
  e2 = t2.i._malloc(4 * r2.length), t2.i.HEAPU32.set(r2, e2 >> 2), n2(e2);
  for (const e3 of r2) t2.i._free(e3);
  t2.i._free(e2);
}
function qo(t2, e2, n2) {
  t2.i.simpleListeners = t2.i.simpleListeners || {}, t2.i.simpleListeners[e2] = n2;
}
function Jo(t2, e2, n2) {
  let r2 = [];
  t2.i.simpleListeners = t2.i.simpleListeners || {}, t2.i.simpleListeners[e2] = (t3, e3, i2) => {
    e3 ? (n2(r2, i2), r2 = []) : r2.push(t3);
  };
}
Xo.forVisionTasks = function(t2) {
  return Vo("vision", t2);
}, Xo.forTextTasks = function(t2) {
  return Vo("text", t2);
}, Xo.forGenAiExperimentalTasks = function(t2) {
  return Vo("genai_experimental", t2);
}, Xo.forGenAiTasks = function(t2) {
  return Vo("genai", t2);
}, Xo.forAudioTasks = function(t2) {
  return Vo("audio", t2);
}, Xo.isSimdSupported = function() {
  return jo();
};
async function Zo(t2, e2, n2, r2) {
  return t2 = await (async (t3, e3, n3, r3, i2) => {
    if (e3 && await Wo(e3), !self.ModuleFactory) throw Error("ModuleFactory not set.");
    if (n3 && (await Wo(n3), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && i2 && ((e3 = self.Module).locateFile = i2.locateFile, i2.mainScriptUrlOrBlob && (e3.mainScriptUrlOrBlob = i2.mainScriptUrlOrBlob)), i2 = await self.ModuleFactory(self.Module || i2), self.ModuleFactory = self.Module = void 0, new t3(i2, r3);
  })(t2, n2.wasmLoaderPath, n2.assetLoaderPath, e2, { locateFile: (t3) => t3.endsWith(".wasm") ? n2.wasmBinaryPath.toString() : n2.assetBinaryPath && t3.endsWith(".data") ? n2.assetBinaryPath.toString() : t3 }), await t2.o(r2), t2;
}
function Qo(t2, e2) {
  const n2 = Rn(t2.baseOptions, Ms, 1) || new Ms();
  "string" == typeof e2 ? (dn(n2, 2, Me(e2)), dn(n2, 1)) : e2 instanceof Uint8Array && (dn(n2, 1, ae(e2, false, false)), dn(n2, 2)), Cn(t2.baseOptions, 0, 1, n2);
}
function ta(t2) {
  try {
    const e2 = t2.K.length;
    if (1 === e2) throw Error(t2.K[0].message);
    if (1 < e2) throw Error("Encountered multiple errors: " + t2.K.map((t3) => t3.message).join(", "));
  } finally {
    t2.K = [];
  }
}
function ea(t2, e2) {
  t2.J = Math.max(t2.J, e2);
}
function na(t2, e2) {
  t2.C = new Li(), ki(t2.C, "PassThroughCalculator"), xi(t2.C, "free_memory"), Si(t2.C, "free_memory_unused_out"), Ii(e2, "free_memory"), Oi(e2, t2.C);
}
function ra(t2, e2) {
  xi(t2.C, e2), Si(t2.C, e2 + "_unused_out");
}
function ia(t2) {
  t2.g.addBoolToStream(true, "free_memory", t2.J);
}
var sa = class {
  constructor(t2) {
    this.g = t2, this.K = [], this.J = 0, this.g.setAutoRenderToScreen(false);
  }
  l(t2, e2 = true) {
    var _a2, _b, _c, _d, _e2, _f;
    if (e2) {
      const e3 = t2.baseOptions || {};
      if (((_a2 = t2.baseOptions) == null ? void 0 : _a2.modelAssetBuffer) && ((_b = t2.baseOptions) == null ? void 0 : _b.modelAssetPath)) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      if (!(((_c = Rn(this.baseOptions, Ms, 1)) == null ? void 0 : _c.g()) || ((_d = Rn(this.baseOptions, Ms, 1)) == null ? void 0 : _d.h()) || ((_e2 = t2.baseOptions) == null ? void 0 : _e2.modelAssetBuffer) || ((_f = t2.baseOptions) == null ? void 0 : _f.modelAssetPath))) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
      if (function(t3, e4) {
        let n2 = Rn(t3.baseOptions, Fs, 3);
        if (!n2) {
          var r2 = n2 = new Fs(), i2 = new pi();
          On(r2, 4, Rs, i2);
        }
        "delegate" in e4 && ("GPU" === e4.delegate ? (e4 = n2, r2 = new li(), On(e4, 2, Rs, r2)) : (e4 = n2, r2 = new pi(), On(e4, 4, Rs, r2))), Cn(t3.baseOptions, 0, 3, n2);
      }(this, e3), e3.modelAssetPath) return fetch(e3.modelAssetPath.toString()).then((t3) => {
        if (t3.ok) return t3.arrayBuffer();
        throw Error(`Failed to fetch model: ${e3.modelAssetPath} (${t3.status})`);
      }).then((t3) => {
        try {
          this.g.i.FS_unlink("/model.dat");
        } catch {
        }
        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(t3), true, false, false), Qo(this, "/model.dat"), this.m(), this.L();
      });
      if (e3.modelAssetBuffer instanceof Uint8Array) Qo(this, e3.modelAssetBuffer);
      else if (e3.modelAssetBuffer) return async function(t3) {
        const e4 = [];
        for (var n2 = 0; ; ) {
          const { done: r2, value: i2 } = await t3.read();
          if (r2) break;
          e4.push(i2), n2 += i2.length;
        }
        if (0 === e4.length) return new Uint8Array(0);
        if (1 === e4.length) return e4[0];
        t3 = new Uint8Array(n2), n2 = 0;
        for (const r2 of e4) t3.set(r2, n2), n2 += r2.length;
        return t3;
      }(e3.modelAssetBuffer).then((t3) => {
        Qo(this, t3), this.m(), this.L();
      });
    }
    return this.m(), this.L(), Promise.resolve();
  }
  L() {
  }
  fa() {
    let t2;
    if (this.g.fa((e2) => {
      t2 = Bi(e2);
    }), !t2) throw Error("Failed to retrieve CalculatorGraphConfig");
    return t2;
  }
  setGraph(t2, e2) {
    this.g.attachErrorListener((t3, e3) => {
      this.K.push(Error(e3));
    }), this.g.Ma(), this.g.setGraph(t2, e2), this.C = void 0, ta(this);
  }
  finishProcessing() {
    this.g.finishProcessing(), ta(this);
  }
  close() {
    this.C = void 0, this.g.closeGraph();
  }
};
function oa(t2, e2) {
  if (!t2) throw Error(`Unable to obtain required WebGL resource: ${e2}`);
  return t2;
}
sa.prototype.close = sa.prototype.close, function(e2, n2) {
  e2 = e2.split(".");
  var r2, i2 = t;
  e2[0] in i2 || void 0 === i2.execScript || i2.execScript("var " + e2[0]);
  for (; e2.length && (r2 = e2.shift()); ) e2.length || void 0 === n2 ? i2 = i2[r2] && i2[r2] !== Object.prototype[r2] ? i2[r2] : i2[r2] = {} : i2[r2] = n2;
}("TaskRunner", sa);
class aa {
  constructor(t2, e2, n2, r2) {
    this.g = t2, this.h = e2, this.m = n2, this.l = r2;
  }
  bind() {
    this.g.bindVertexArray(this.h);
  }
  close() {
    this.g.deleteVertexArray(this.h), this.g.deleteBuffer(this.m), this.g.deleteBuffer(this.l);
  }
}
function ha(t2, e2, n2) {
  const r2 = t2.g;
  if (n2 = oa(r2.createShader(n2), "Failed to create WebGL shader"), r2.shaderSource(n2, e2), r2.compileShader(n2), !r2.getShaderParameter(n2, r2.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${r2.getShaderInfoLog(n2)}`);
  return r2.attachShader(t2.h, n2), n2;
}
function ca(t2, e2) {
  const n2 = t2.g, r2 = oa(n2.createVertexArray(), "Failed to create vertex array");
  n2.bindVertexArray(r2);
  const i2 = oa(n2.createBuffer(), "Failed to create buffer");
  n2.bindBuffer(n2.ARRAY_BUFFER, i2), n2.enableVertexAttribArray(t2.K), n2.vertexAttribPointer(t2.K, 2, n2.FLOAT, false, 0, 0), n2.bufferData(n2.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n2.STATIC_DRAW);
  const s2 = oa(n2.createBuffer(), "Failed to create buffer");
  return n2.bindBuffer(n2.ARRAY_BUFFER, s2), n2.enableVertexAttribArray(t2.J), n2.vertexAttribPointer(t2.J, 2, n2.FLOAT, false, 0, 0), n2.bufferData(n2.ARRAY_BUFFER, new Float32Array(e2 ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), n2.STATIC_DRAW), n2.bindBuffer(n2.ARRAY_BUFFER, null), n2.bindVertexArray(null), new aa(n2, r2, i2, s2);
}
function ua(t2, e2) {
  if (t2.g) {
    if (e2 !== t2.g) throw Error("Cannot change GL context once initialized");
  } else t2.g = e2;
}
function la(t2, e2, n2, r2) {
  return ua(t2, e2), t2.h || (t2.m(), t2.D()), n2 ? (t2.v || (t2.v = ca(t2, true)), n2 = t2.v) : (t2.A || (t2.A = ca(t2, false)), n2 = t2.A), e2.useProgram(t2.h), n2.bind(), t2.l(), t2 = r2(), n2.g.bindVertexArray(null), t2;
}
function da(t2, e2, n2) {
  return ua(t2, e2), t2 = oa(e2.createTexture(), "Failed to create texture"), e2.bindTexture(e2.TEXTURE_2D, t2), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_WRAP_S, e2.CLAMP_TO_EDGE), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_WRAP_T, e2.CLAMP_TO_EDGE), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_MIN_FILTER, n2 ?? e2.LINEAR), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_MAG_FILTER, n2 ?? e2.LINEAR), e2.bindTexture(e2.TEXTURE_2D, null), t2;
}
function fa(t2, e2, n2) {
  ua(t2, e2), t2.u || (t2.u = oa(e2.createFramebuffer(), "Failed to create framebuffe.")), e2.bindFramebuffer(e2.FRAMEBUFFER, t2.u), e2.framebufferTexture2D(e2.FRAMEBUFFER, e2.COLOR_ATTACHMENT0, e2.TEXTURE_2D, n2, 0);
}
function pa(t2) {
  var _a2;
  (_a2 = t2.g) == null ? void 0 : _a2.bindFramebuffer(t2.g.FRAMEBUFFER, null);
}
var ga = class {
  H() {
    return "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n ";
  }
  m() {
    const t2 = this.g;
    if (this.h = oa(t2.createProgram(), "Failed to create WebGL program"), this.ba = ha(this, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", t2.VERTEX_SHADER), this.aa = ha(this, this.H(), t2.FRAGMENT_SHADER), t2.linkProgram(this.h), !t2.getProgramParameter(this.h, t2.LINK_STATUS)) throw Error(`Error during program linking: ${t2.getProgramInfoLog(this.h)}`);
    this.K = t2.getAttribLocation(this.h, "aVertex"), this.J = t2.getAttribLocation(this.h, "aTex");
  }
  D() {
  }
  l() {
  }
  close() {
    if (this.h) {
      const t2 = this.g;
      t2.deleteProgram(this.h), t2.deleteShader(this.ba), t2.deleteShader(this.aa);
    }
    this.u && this.g.deleteFramebuffer(this.u), this.A && this.A.close(), this.v && this.v.close();
  }
};
var ma = class extends ga {
  H() {
    return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n ";
  }
  D() {
    const t2 = this.g;
    t2.activeTexture(t2.TEXTURE1), this.C = da(this, t2, t2.LINEAR), t2.activeTexture(t2.TEXTURE2), this.j = da(this, t2, t2.NEAREST);
  }
  m() {
    super.m();
    const t2 = this.g;
    this.M = oa(t2.getUniformLocation(this.h, "backgroundTexture"), "Uniform location"), this.V = oa(t2.getUniformLocation(this.h, "colorMappingTexture"), "Uniform location"), this.L = oa(t2.getUniformLocation(this.h, "maskTexture"), "Uniform location");
  }
  l() {
    super.l();
    const t2 = this.g;
    t2.uniform1i(this.L, 0), t2.uniform1i(this.M, 1), t2.uniform1i(this.V, 2);
  }
  close() {
    this.C && this.g.deleteTexture(this.C), this.j && this.g.deleteTexture(this.j), super.close();
  }
}, ya = class extends ga {
  H() {
    return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n ";
  }
  D() {
    const t2 = this.g;
    t2.activeTexture(t2.TEXTURE1), this.j = da(this, t2), t2.activeTexture(t2.TEXTURE2), this.C = da(this, t2);
  }
  m() {
    super.m();
    const t2 = this.g;
    this.L = oa(t2.getUniformLocation(this.h, "defaultTexture"), "Uniform location"), this.M = oa(t2.getUniformLocation(this.h, "overlayTexture"), "Uniform location"), this.I = oa(t2.getUniformLocation(this.h, "maskTexture"), "Uniform location");
  }
  l() {
    super.l();
    const t2 = this.g;
    t2.uniform1i(this.I, 0), t2.uniform1i(this.L, 1), t2.uniform1i(this.M, 2);
  }
  close() {
    this.j && this.g.deleteTexture(this.j), this.C && this.g.deleteTexture(this.C), super.close();
  }
};
function _a(t2, e2) {
  switch (e2) {
    case 0:
      return t2.g.find((t3) => t3 instanceof Uint8Array);
    case 1:
      return t2.g.find((t3) => t3 instanceof Float32Array);
    case 2:
      return t2.g.find((t3) => "undefined" != typeof WebGLTexture && t3 instanceof WebGLTexture);
    default:
      throw Error(`Type is not supported: ${e2}`);
  }
}
function va(t2) {
  var e2 = _a(t2, 1);
  if (!e2) {
    if (e2 = _a(t2, 0)) e2 = new Float32Array(e2).map((t3) => t3 / 255);
    else {
      e2 = new Float32Array(t2.width * t2.height);
      const r2 = wa(t2);
      var n2 = Aa(t2);
      if (fa(n2, r2, Ea(t2)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in self.document) {
        n2 = new Float32Array(t2.width * t2.height * 4), r2.readPixels(0, 0, t2.width, t2.height, r2.RGBA, r2.FLOAT, n2);
        for (let t3 = 0, r3 = 0; t3 < e2.length; ++t3, r3 += 4) e2[t3] = n2[r3];
      } else r2.readPixels(0, 0, t2.width, t2.height, r2.RED, r2.FLOAT, e2);
    }
    t2.g.push(e2);
  }
  return e2;
}
function Ea(t2) {
  let e2 = _a(t2, 2);
  if (!e2) {
    const n2 = wa(t2);
    e2 = ba(t2);
    const r2 = va(t2), i2 = Ta(t2);
    n2.texImage2D(n2.TEXTURE_2D, 0, i2, t2.width, t2.height, 0, n2.RED, n2.FLOAT, r2), ka(t2);
  }
  return e2;
}
function wa(t2) {
  if (!t2.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return t2.h || (t2.h = oa(t2.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t2.h;
}
function Ta(t2) {
  if (t2 = wa(t2), !xa) if (t2.getExtension("EXT_color_buffer_float") && t2.getExtension("OES_texture_float_linear") && t2.getExtension("EXT_float_blend")) xa = t2.R32F;
  else {
    if (!t2.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
    xa = t2.R16F;
  }
  return xa;
}
function Aa(t2) {
  return t2.l || (t2.l = new ga()), t2.l;
}
function ba(t2) {
  const e2 = wa(t2);
  e2.viewport(0, 0, t2.width, t2.height), e2.activeTexture(e2.TEXTURE0);
  let n2 = _a(t2, 2);
  return n2 || (n2 = da(Aa(t2), e2, t2.m ? e2.LINEAR : e2.NEAREST), t2.g.push(n2), t2.j = true), e2.bindTexture(e2.TEXTURE_2D, n2), n2;
}
function ka(t2) {
  t2.h.bindTexture(t2.h.TEXTURE_2D, null);
}
var xa, Sa = class {
  constructor(t2, e2, n2, r2, i2, s2, o2) {
    this.g = t2, this.m = e2, this.j = n2, this.canvas = r2, this.l = i2, this.width = s2, this.height = o2, this.j && (0 === --La && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources."));
  }
  Ha() {
    return !!_a(this, 0);
  }
  la() {
    return !!_a(this, 1);
  }
  R() {
    return !!_a(this, 2);
  }
  ka() {
    return (e2 = _a(t2 = this, 0)) || (e2 = va(t2), e2 = new Uint8Array(e2.map((t3) => 255 * t3)), t2.g.push(e2)), e2;
    var t2, e2;
  }
  ja() {
    return va(this);
  }
  O() {
    return Ea(this);
  }
  clone() {
    const t2 = [];
    for (const e2 of this.g) {
      let n2;
      if (e2 instanceof Uint8Array) n2 = new Uint8Array(e2);
      else if (e2 instanceof Float32Array) n2 = new Float32Array(e2);
      else {
        if (!(e2 instanceof WebGLTexture)) throw Error(`Type is not supported: ${e2}`);
        {
          const t3 = wa(this), e3 = Aa(this);
          t3.activeTexture(t3.TEXTURE1), n2 = da(e3, t3, this.m ? t3.LINEAR : t3.NEAREST), t3.bindTexture(t3.TEXTURE_2D, n2);
          const r2 = Ta(this);
          t3.texImage2D(t3.TEXTURE_2D, 0, r2, this.width, this.height, 0, t3.RED, t3.FLOAT, null), t3.bindTexture(t3.TEXTURE_2D, null), fa(e3, t3, n2), la(e3, t3, false, () => {
            ba(this), t3.clearColor(0, 0, 0, 0), t3.clear(t3.COLOR_BUFFER_BIT), t3.drawArrays(t3.TRIANGLE_FAN, 0, 4), ka(this);
          }), pa(e3), ka(this);
        }
      }
      t2.push(n2);
    }
    return new Sa(t2, this.m, this.R(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && wa(this).deleteTexture(_a(this, 2)), La = -1;
  }
};
Sa.prototype.close = Sa.prototype.close, Sa.prototype.clone = Sa.prototype.clone, Sa.prototype.getAsWebGLTexture = Sa.prototype.O, Sa.prototype.getAsFloat32Array = Sa.prototype.ja, Sa.prototype.getAsUint8Array = Sa.prototype.ka, Sa.prototype.hasWebGLTexture = Sa.prototype.R, Sa.prototype.hasFloat32Array = Sa.prototype.la, Sa.prototype.hasUint8Array = Sa.prototype.Ha;
var La = 250;
const Fa = { color: "white", lineWidth: 4, radius: 6 };
function Ra(t2) {
  return { ...Fa, fillColor: (t2 = t2 || {}).color, ...t2 };
}
function Ma(t2, e2) {
  return t2 instanceof Function ? t2(e2) : t2;
}
function Pa(t2, e2, n2) {
  return Math.max(Math.min(e2, n2), Math.min(Math.max(e2, n2), t2));
}
function Ca(t2) {
  if (!t2.l) throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");
  return t2.l;
}
function Oa(t2) {
  if (!t2.j) throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");
  return t2.j;
}
function Ia(t2, e2, n2) {
  if (e2.R()) n2(e2.O());
  else {
    const r2 = e2.la() ? e2.ja() : e2.ka();
    t2.m = t2.m ?? new ga();
    const i2 = Oa(t2);
    n2((t2 = new Sa([r2], e2.m, false, i2.canvas, t2.m, e2.width, e2.height)).O()), t2.close();
  }
}
function Ua(t2, e2, n2, r2) {
  const i2 = function(t3) {
    return t3.g || (t3.g = new ma()), t3.g;
  }(t2), s2 = Oa(t2), o2 = Array.isArray(n2) ? new ImageData(new Uint8ClampedArray(n2), 1, 1) : n2;
  la(i2, s2, true, () => {
    !function(t4, e3, n3, r3) {
      const i3 = t4.g;
      if (i3.activeTexture(i3.TEXTURE0), i3.bindTexture(i3.TEXTURE_2D, e3), i3.activeTexture(i3.TEXTURE1), i3.bindTexture(i3.TEXTURE_2D, t4.C), i3.texImage2D(i3.TEXTURE_2D, 0, i3.RGBA, i3.RGBA, i3.UNSIGNED_BYTE, n3), t4.I && function(t5, e4) {
        if (t5 !== e4) return false;
        t5 = t5.entries(), e4 = e4.entries();
        for (const [r4, i4] of t5) {
          t5 = r4;
          const s3 = i4;
          var n4 = e4.next();
          if (n4.done) return false;
          const [o3, a2] = n4.value;
          if (n4 = a2, t5 !== o3 || s3[0] !== n4[0] || s3[1] !== n4[1] || s3[2] !== n4[2] || s3[3] !== n4[3]) return false;
        }
        return !!e4.next().done;
      }(t4.I, r3)) i3.activeTexture(i3.TEXTURE2), i3.bindTexture(i3.TEXTURE_2D, t4.j);
      else {
        t4.I = r3;
        const e4 = Array(1024).fill(0);
        r3.forEach((t5, n4) => {
          if (4 !== t5.length) throw Error(`Color at index ${n4} is not a four-channel value.`);
          e4[4 * n4] = t5[0], e4[4 * n4 + 1] = t5[1], e4[4 * n4 + 2] = t5[2], e4[4 * n4 + 3] = t5[3];
        }), i3.activeTexture(i3.TEXTURE2), i3.bindTexture(i3.TEXTURE_2D, t4.j), i3.texImage2D(i3.TEXTURE_2D, 0, i3.RGBA, 256, 1, 0, i3.RGBA, i3.UNSIGNED_BYTE, new Uint8Array(e4));
      }
    }(i2, e2, o2, r2), s2.clearColor(0, 0, 0, 0), s2.clear(s2.COLOR_BUFFER_BIT), s2.drawArrays(s2.TRIANGLE_FAN, 0, 4);
    const t3 = i2.g;
    t3.activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, null);
  });
}
function Da(t2, e2, n2, r2) {
  const i2 = Oa(t2), s2 = function(t3) {
    return t3.h || (t3.h = new ya()), t3.h;
  }(t2), o2 = Array.isArray(n2) ? new ImageData(new Uint8ClampedArray(n2), 1, 1) : n2, a2 = Array.isArray(r2) ? new ImageData(new Uint8ClampedArray(r2), 1, 1) : r2;
  la(s2, i2, true, () => {
    var t3 = s2.g;
    t3.activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, e2), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, s2.j), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, t3.RGBA, t3.UNSIGNED_BYTE, o2), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, s2.C), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, t3.RGBA, t3.UNSIGNED_BYTE, a2), i2.clearColor(0, 0, 0, 0), i2.clear(i2.COLOR_BUFFER_BIT), i2.drawArrays(i2.TRIANGLE_FAN, 0, 4), i2.bindTexture(i2.TEXTURE_2D, null), (t3 = s2.g).activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, null);
  });
}
var Na = class {
  constructor(t2, e2) {
    t2 instanceof CanvasRenderingContext2D || t2 instanceof OffscreenCanvasRenderingContext2D ? (this.l = t2, this.j = e2) : this.j = t2;
  }
  Aa(t2, e2) {
    if (t2) {
      var n2 = Ca(this);
      e2 = Ra(e2), n2.save();
      var r2 = n2.canvas, i2 = 0;
      for (const s2 of t2) n2.fillStyle = Ma(e2.fillColor, { index: i2, from: s2 }), n2.strokeStyle = Ma(e2.color, { index: i2, from: s2 }), n2.lineWidth = Ma(e2.lineWidth, { index: i2, from: s2 }), (t2 = new Path2D()).arc(s2.x * r2.width, s2.y * r2.height, Ma(e2.radius, { index: i2, from: s2 }), 0, 2 * Math.PI), n2.fill(t2), n2.stroke(t2), ++i2;
      n2.restore();
    }
  }
  za(t2, e2, n2) {
    if (t2 && e2) {
      var r2 = Ca(this);
      n2 = Ra(n2), r2.save();
      var i2 = r2.canvas, s2 = 0;
      for (const o2 of e2) {
        r2.beginPath(), e2 = t2[o2.start];
        const a2 = t2[o2.end];
        e2 && a2 && (r2.strokeStyle = Ma(n2.color, { index: s2, from: e2, to: a2 }), r2.lineWidth = Ma(n2.lineWidth, { index: s2, from: e2, to: a2 }), r2.moveTo(e2.x * i2.width, e2.y * i2.height), r2.lineTo(a2.x * i2.width, a2.y * i2.height)), ++s2, r2.stroke();
      }
      r2.restore();
    }
  }
  wa(t2, e2) {
    const n2 = Ca(this);
    e2 = Ra(e2), n2.save(), n2.beginPath(), n2.lineWidth = Ma(e2.lineWidth, {}), n2.strokeStyle = Ma(e2.color, {}), n2.fillStyle = Ma(e2.fillColor, {}), n2.moveTo(t2.originX, t2.originY), n2.lineTo(t2.originX + t2.width, t2.originY), n2.lineTo(t2.originX + t2.width, t2.originY + t2.height), n2.lineTo(t2.originX, t2.originY + t2.height), n2.lineTo(t2.originX, t2.originY), n2.stroke(), n2.fill(), n2.restore();
  }
  xa(t2, e2, n2 = [0, 0, 0, 255]) {
    this.l ? function(t3, e3, n3, r2) {
      const i2 = Oa(t3);
      Ia(t3, e3, (e4) => {
        Ua(t3, e4, n3, r2), (e4 = Ca(t3)).drawImage(i2.canvas, 0, 0, e4.canvas.width, e4.canvas.height);
      });
    }(this, t2, n2, e2) : Ua(this, t2.O(), n2, e2);
  }
  ya(t2, e2, n2) {
    this.l ? function(t3, e3, n3, r2) {
      const i2 = Oa(t3);
      Ia(t3, e3, (e4) => {
        Da(t3, e4, n3, r2), (e4 = Ca(t3)).drawImage(i2.canvas, 0, 0, e4.canvas.width, e4.canvas.height);
      });
    }(this, t2, e2, n2) : Da(this, t2.O(), e2, n2);
  }
  close() {
    var _a2, _b, _c;
    (_a2 = this.g) == null ? void 0 : _a2.close(), this.g = void 0, (_b = this.h) == null ? void 0 : _b.close(), this.h = void 0, (_c = this.m) == null ? void 0 : _c.close(), this.m = void 0;
  }
};
function Ba(t2, e2) {
  switch (e2) {
    case 0:
      return t2.g.find((t3) => t3 instanceof ImageData);
    case 1:
      return t2.g.find((t3) => "undefined" != typeof ImageBitmap && t3 instanceof ImageBitmap);
    case 2:
      return t2.g.find((t3) => "undefined" != typeof WebGLTexture && t3 instanceof WebGLTexture);
    default:
      throw Error(`Type is not supported: ${e2}`);
  }
}
function Ga(t2) {
  var e2 = Ba(t2, 0);
  if (!e2) {
    e2 = Va(t2);
    const n2 = Xa(t2), r2 = new Uint8Array(t2.width * t2.height * 4);
    fa(n2, e2, ja(t2)), e2.readPixels(0, 0, t2.width, t2.height, e2.RGBA, e2.UNSIGNED_BYTE, r2), pa(n2), e2 = new ImageData(new Uint8ClampedArray(r2.buffer), t2.width, t2.height), t2.g.push(e2);
  }
  return e2;
}
function ja(t2) {
  let e2 = Ba(t2, 2);
  if (!e2) {
    const n2 = Va(t2);
    e2 = Ha(t2);
    const r2 = Ba(t2, 1) || Ga(t2);
    n2.texImage2D(n2.TEXTURE_2D, 0, n2.RGBA, n2.RGBA, n2.UNSIGNED_BYTE, r2), Wa(t2);
  }
  return e2;
}
function Va(t2) {
  if (!t2.canvas) throw Error("Conversion to different image formats require that a canvas is passed when iniitializing the image.");
  return t2.h || (t2.h = oa(t2.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t2.h;
}
function Xa(t2) {
  return t2.l || (t2.l = new ga()), t2.l;
}
function Ha(t2) {
  const e2 = Va(t2);
  e2.viewport(0, 0, t2.width, t2.height), e2.activeTexture(e2.TEXTURE0);
  let n2 = Ba(t2, 2);
  return n2 || (n2 = da(Xa(t2), e2), t2.g.push(n2), t2.m = true), e2.bindTexture(e2.TEXTURE_2D, n2), n2;
}
function Wa(t2) {
  t2.h.bindTexture(t2.h.TEXTURE_2D, null);
}
function za(t2) {
  const e2 = Va(t2);
  return la(Xa(t2), e2, true, () => function(t3, e3) {
    const n2 = t3.canvas;
    if (n2.width === t3.width && n2.height === t3.height) return e3();
    const r2 = n2.width, i2 = n2.height;
    return n2.width = t3.width, n2.height = t3.height, t3 = e3(), n2.width = r2, n2.height = i2, t3;
  }(t2, () => {
    if (e2.bindFramebuffer(e2.FRAMEBUFFER, null), e2.clearColor(0, 0, 0, 0), e2.clear(e2.COLOR_BUFFER_BIT), e2.drawArrays(e2.TRIANGLE_FAN, 0, 4), !(t2.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
    return t2.canvas.transferToImageBitmap();
  }));
}
Na.prototype.close = Na.prototype.close, Na.prototype.drawConfidenceMask = Na.prototype.ya, Na.prototype.drawCategoryMask = Na.prototype.xa, Na.prototype.drawBoundingBox = Na.prototype.wa, Na.prototype.drawConnectors = Na.prototype.za, Na.prototype.drawLandmarks = Na.prototype.Aa, Na.lerp = function(t2, e2, n2, r2, i2) {
  return Pa(r2 * (1 - (t2 - e2) / (n2 - e2)) + i2 * (1 - (n2 - t2) / (n2 - e2)), r2, i2);
}, Na.clamp = Pa;
var Ka = class {
  constructor(t2, e2, n2, r2, i2, s2, o2) {
    this.g = t2, this.j = e2, this.m = n2, this.canvas = r2, this.l = i2, this.width = s2, this.height = o2, (this.j || this.m) && (0 === --Ya && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources."));
  }
  Ga() {
    return !!Ba(this, 0);
  }
  ma() {
    return !!Ba(this, 1);
  }
  R() {
    return !!Ba(this, 2);
  }
  Ea() {
    return Ga(this);
  }
  Da() {
    var t2 = Ba(this, 1);
    return t2 || (ja(this), Ha(this), t2 = za(this), Wa(this), this.g.push(t2), this.j = true), t2;
  }
  O() {
    return ja(this);
  }
  clone() {
    const t2 = [];
    for (const e2 of this.g) {
      let n2;
      if (e2 instanceof ImageData) n2 = new ImageData(e2.data, this.width, this.height);
      else if (e2 instanceof WebGLTexture) {
        const t3 = Va(this), e3 = Xa(this);
        t3.activeTexture(t3.TEXTURE1), n2 = da(e3, t3), t3.bindTexture(t3.TEXTURE_2D, n2), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, this.width, this.height, 0, t3.RGBA, t3.UNSIGNED_BYTE, null), t3.bindTexture(t3.TEXTURE_2D, null), fa(e3, t3, n2), la(e3, t3, false, () => {
          Ha(this), t3.clearColor(0, 0, 0, 0), t3.clear(t3.COLOR_BUFFER_BIT), t3.drawArrays(t3.TRIANGLE_FAN, 0, 4), Wa(this);
        }), pa(e3), Wa(this);
      } else {
        if (!(e2 instanceof ImageBitmap)) throw Error(`Type is not supported: ${e2}`);
        ja(this), Ha(this), n2 = za(this), Wa(this);
      }
      t2.push(n2);
    }
    return new Ka(t2, this.ma(), this.R(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Ba(this, 1).close(), this.m && Va(this).deleteTexture(Ba(this, 2)), Ya = -1;
  }
};
Ka.prototype.close = Ka.prototype.close, Ka.prototype.clone = Ka.prototype.clone, Ka.prototype.getAsWebGLTexture = Ka.prototype.O, Ka.prototype.getAsImageBitmap = Ka.prototype.Da, Ka.prototype.getAsImageData = Ka.prototype.Ea, Ka.prototype.hasWebGLTexture = Ka.prototype.R, Ka.prototype.hasImageBitmap = Ka.prototype.ma, Ka.prototype.hasImageData = Ka.prototype.Ga;
var Ya = 250;
function $a(...t2) {
  return t2.map(([t3, e2]) => ({ start: t3, end: e2 }));
}
const qa = /* @__PURE__ */ function(t2) {
  return class extends t2 {
    Ma() {
      this.i._registerModelResourcesGraphService();
    }
  };
}((Ja = class {
  constructor(t2, e2) {
    this.l = true, this.i = t2, this.g = null, this.h = 0, this.m = "function" == typeof this.i._addIntToInputStream, void 0 !== e2 ? this.i.canvas = e2 : Ho() ? this.i.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.i.canvas = document.createElement("canvas"));
  }
  async initializeGraph(t2) {
    const e2 = await (await fetch(t2)).arrayBuffer();
    t2 = !(t2.endsWith(".pbtxt") || t2.endsWith(".textproto")), this.setGraph(new Uint8Array(e2), t2);
  }
  setGraphFromString(t2) {
    this.setGraph(new TextEncoder().encode(t2), false);
  }
  setGraph(t2, e2) {
    const n2 = t2.length, r2 = this.i._malloc(n2);
    this.i.HEAPU8.set(t2, r2), e2 ? this.i._changeBinaryGraph(n2, r2) : this.i._changeTextGraph(n2, r2), this.i._free(r2);
  }
  configureAudio(t2, e2, n2, r2, i2) {
    this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), Ko(this, r2 || "input_audio", (r3) => {
      Ko(this, i2 = i2 || "audio_header", (i3) => {
        this.i._configureAudio(r3, i3, t2, e2, n2);
      });
    });
  }
  setAutoResizeCanvas(t2) {
    this.l = t2;
  }
  setAutoRenderToScreen(t2) {
    this.i._setAutoRenderToScreen(t2);
  }
  setGpuBufferVerticalFlip(t2) {
    this.i.gpuOriginForWebTexturesIsBottomLeft = t2;
  }
  fa(t2) {
    qo(this, "__graph_config__", (e2) => {
      t2(e2);
    }), Ko(this, "__graph_config__", (t3) => {
      this.i._getGraphConfig(t3, void 0);
    }), delete this.i.simpleListeners.__graph_config__;
  }
  attachErrorListener(t2) {
    this.i.errorListener = t2;
  }
  attachEmptyPacketListener(t2, e2) {
    this.i.emptyPacketListeners = this.i.emptyPacketListeners || {}, this.i.emptyPacketListeners[t2] = e2;
  }
  addAudioToStream(t2, e2, n2) {
    this.addAudioToStreamWithShape(t2, 0, 0, e2, n2);
  }
  addAudioToStreamWithShape(t2, e2, n2, r2, i2) {
    const s2 = 4 * t2.length;
    this.h !== s2 && (this.g && this.i._free(this.g), this.g = this.i._malloc(s2), this.h = s2), this.i.HEAPF32.set(t2, this.g / 4), Ko(this, r2, (t3) => {
      this.i._addAudioToInputStream(this.g, e2, n2, t3, i2);
    });
  }
  addGpuBufferToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      const [r2, i2] = Yo(this, t2, e3);
      this.i._addBoundTextureToStream(e3, r2, i2, n2);
    });
  }
  addBoolToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      this.i._addBoolToInputStream(t2, e3, n2);
    });
  }
  addDoubleToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      this.i._addDoubleToInputStream(t2, e3, n2);
    });
  }
  addFloatToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      this.i._addFloatToInputStream(t2, e3, n2);
    });
  }
  addIntToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      this.i._addIntToInputStream(t2, e3, n2);
    });
  }
  addUintToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      this.i._addUintToInputStream(t2, e3, n2);
    });
  }
  addStringToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      Ko(this, t2, (t3) => {
        this.i._addStringToInputStream(t3, e3, n2);
      });
    });
  }
  addStringRecordToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      $o(this, Object.keys(t2), (r2) => {
        $o(this, Object.values(t2), (i2) => {
          this.i._addFlatHashMapToInputStream(r2, i2, Object.keys(t2).length, e3, n2);
        });
      });
    });
  }
  addProtoToStream(t2, e2, n2, r2) {
    Ko(this, n2, (n3) => {
      Ko(this, e2, (e3) => {
        const i2 = this.i._malloc(t2.length);
        this.i.HEAPU8.set(t2, i2), this.i._addProtoToInputStream(i2, t2.length, e3, n3, r2), this.i._free(i2);
      });
    });
  }
  addEmptyPacketToStream(t2, e2) {
    Ko(this, t2, (t3) => {
      this.i._addEmptyPacketToInputStream(t3, e2);
    });
  }
  addBoolVectorToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      const r2 = this.i._allocateBoolVector(t2.length);
      if (!r2) throw Error("Unable to allocate new bool vector on heap.");
      for (const e4 of t2) this.i._addBoolVectorEntry(r2, e4);
      this.i._addBoolVectorToInputStream(r2, e3, n2);
    });
  }
  addDoubleVectorToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      const r2 = this.i._allocateDoubleVector(t2.length);
      if (!r2) throw Error("Unable to allocate new double vector on heap.");
      for (const e4 of t2) this.i._addDoubleVectorEntry(r2, e4);
      this.i._addDoubleVectorToInputStream(r2, e3, n2);
    });
  }
  addFloatVectorToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      const r2 = this.i._allocateFloatVector(t2.length);
      if (!r2) throw Error("Unable to allocate new float vector on heap.");
      for (const e4 of t2) this.i._addFloatVectorEntry(r2, e4);
      this.i._addFloatVectorToInputStream(r2, e3, n2);
    });
  }
  addIntVectorToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      const r2 = this.i._allocateIntVector(t2.length);
      if (!r2) throw Error("Unable to allocate new int vector on heap.");
      for (const e4 of t2) this.i._addIntVectorEntry(r2, e4);
      this.i._addIntVectorToInputStream(r2, e3, n2);
    });
  }
  addUintVectorToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      const r2 = this.i._allocateUintVector(t2.length);
      if (!r2) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const e4 of t2) this.i._addUintVectorEntry(r2, e4);
      this.i._addUintVectorToInputStream(r2, e3, n2);
    });
  }
  addStringVectorToStream(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      const r2 = this.i._allocateStringVector(t2.length);
      if (!r2) throw Error("Unable to allocate new string vector on heap.");
      for (const e4 of t2) Ko(this, e4, (t3) => {
        this.i._addStringVectorEntry(r2, t3);
      });
      this.i._addStringVectorToInputStream(r2, e3, n2);
    });
  }
  addBoolToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      this.i._addBoolToInputSidePacket(t2, e3);
    });
  }
  addDoubleToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      this.i._addDoubleToInputSidePacket(t2, e3);
    });
  }
  addFloatToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      this.i._addFloatToInputSidePacket(t2, e3);
    });
  }
  addIntToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      this.i._addIntToInputSidePacket(t2, e3);
    });
  }
  addUintToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      this.i._addUintToInputSidePacket(t2, e3);
    });
  }
  addStringToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      Ko(this, t2, (t3) => {
        this.i._addStringToInputSidePacket(t3, e3);
      });
    });
  }
  addProtoToInputSidePacket(t2, e2, n2) {
    Ko(this, n2, (n3) => {
      Ko(this, e2, (e3) => {
        const r2 = this.i._malloc(t2.length);
        this.i.HEAPU8.set(t2, r2), this.i._addProtoToInputSidePacket(r2, t2.length, e3, n3), this.i._free(r2);
      });
    });
  }
  addBoolVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      const n2 = this.i._allocateBoolVector(t2.length);
      if (!n2) throw Error("Unable to allocate new bool vector on heap.");
      for (const e4 of t2) this.i._addBoolVectorEntry(n2, e4);
      this.i._addBoolVectorToInputSidePacket(n2, e3);
    });
  }
  addDoubleVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      const n2 = this.i._allocateDoubleVector(t2.length);
      if (!n2) throw Error("Unable to allocate new double vector on heap.");
      for (const e4 of t2) this.i._addDoubleVectorEntry(n2, e4);
      this.i._addDoubleVectorToInputSidePacket(n2, e3);
    });
  }
  addFloatVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      const n2 = this.i._allocateFloatVector(t2.length);
      if (!n2) throw Error("Unable to allocate new float vector on heap.");
      for (const e4 of t2) this.i._addFloatVectorEntry(n2, e4);
      this.i._addFloatVectorToInputSidePacket(n2, e3);
    });
  }
  addIntVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      const n2 = this.i._allocateIntVector(t2.length);
      if (!n2) throw Error("Unable to allocate new int vector on heap.");
      for (const e4 of t2) this.i._addIntVectorEntry(n2, e4);
      this.i._addIntVectorToInputSidePacket(n2, e3);
    });
  }
  addUintVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      const n2 = this.i._allocateUintVector(t2.length);
      if (!n2) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const e4 of t2) this.i._addUintVectorEntry(n2, e4);
      this.i._addUintVectorToInputSidePacket(n2, e3);
    });
  }
  addStringVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, (e3) => {
      const n2 = this.i._allocateStringVector(t2.length);
      if (!n2) throw Error("Unable to allocate new string vector on heap.");
      for (const e4 of t2) Ko(this, e4, (t3) => {
        this.i._addStringVectorEntry(n2, t3);
      });
      this.i._addStringVectorToInputSidePacket(n2, e3);
    });
  }
  attachBoolListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachBoolListener(t3);
    });
  }
  attachBoolVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachBoolVectorListener(t3);
    });
  }
  attachIntListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachIntListener(t3);
    });
  }
  attachIntVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachIntVectorListener(t3);
    });
  }
  attachUintListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachUintListener(t3);
    });
  }
  attachUintVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachUintVectorListener(t3);
    });
  }
  attachDoubleListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachDoubleListener(t3);
    });
  }
  attachDoubleVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachDoubleVectorListener(t3);
    });
  }
  attachFloatListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachFloatListener(t3);
    });
  }
  attachFloatVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachFloatVectorListener(t3);
    });
  }
  attachStringListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachStringListener(t3);
    });
  }
  attachStringVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachStringVectorListener(t3);
    });
  }
  attachProtoListener(t2, e2, n2) {
    qo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachProtoListener(t3, n2 || false);
    });
  }
  attachProtoVectorListener(t2, e2, n2) {
    Jo(this, t2, e2), Ko(this, t2, (t3) => {
      this.i._attachProtoVectorListener(t3, n2 || false);
    });
  }
  attachAudioListener(t2, e2, n2) {
    this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), qo(this, t2, (t3, n3) => {
      t3 = new Float32Array(t3.buffer, t3.byteOffset, t3.length / 4), e2(t3, n3);
    }), Ko(this, t2, (t3) => {
      this.i._attachAudioListener(t3, n2 || false);
    });
  }
  finishProcessing() {
    this.i._waitUntilIdle();
  }
  closeGraph() {
    this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
  }
}, class extends Ja {
  get ha() {
    return this.i;
  }
  sa(t2, e2, n2) {
    Ko(this, e2, (e3) => {
      const [r2, i2] = Yo(this, t2, e3);
      this.ha._addBoundTextureAsImageToStream(e3, r2, i2, n2);
    });
  }
  W(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, (t3) => {
      this.ha._attachImageListener(t3);
    });
  }
  da(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, (t3) => {
      this.ha._attachImageVectorListener(t3);
    });
  }
}));
var Ja, Za = class extends qa {
};
async function Qa(t2, e2, n2) {
  return async function(t3, e3, n3, r2) {
    return Zo(t3, e3, n3, r2);
  }(t2, n2.canvas ?? (Ho() ? void 0 : document.createElement("canvas")), e2, n2);
}
function th(t2, e2, n2, r2) {
  if (t2.V) {
    const s2 = new fs();
    if (n2 == null ? void 0 : n2.regionOfInterest) {
      if (!t2.ra) throw Error("This task doesn't support region-of-interest.");
      var i2 = n2.regionOfInterest;
      if (i2.left >= i2.right || i2.top >= i2.bottom) throw Error("Expected RectF with left < right and top < bottom.");
      if (0 > i2.left || 0 > i2.top || 1 < i2.right || 1 < i2.bottom) throw Error("Expected RectF values to be in [0,1].");
      Hn(s2, 1, (i2.left + i2.right) / 2), Hn(s2, 2, (i2.top + i2.bottom) / 2), Hn(s2, 4, i2.right - i2.left), Hn(s2, 3, i2.bottom - i2.top);
    } else Hn(s2, 1, 0.5), Hn(s2, 2, 0.5), Hn(s2, 4, 1), Hn(s2, 3, 1);
    if (n2 == null ? void 0 : n2.rotationDegrees) {
      if (0 != (n2 == null ? void 0 : n2.rotationDegrees) % 90) throw Error("Expected rotation to be a multiple of 90°.");
      if (Hn(s2, 5, -Math.PI * n2.rotationDegrees / 180), 0 != (n2 == null ? void 0 : n2.rotationDegrees) % 180) {
        const [t3, r3] = zo(e2);
        n2 = Gn(s2, 3) * r3 / t3, i2 = Gn(s2, 4) * t3 / r3, Hn(s2, 4, n2), Hn(s2, 3, i2);
      }
    }
    t2.g.addProtoToStream(s2.g(), "mediapipe.NormalizedRect", t2.V, r2);
  }
  t2.g.sa(e2, t2.ba, r2 ?? performance.now()), t2.finishProcessing();
}
function eh(t2, e2, n2) {
  var _a2;
  if ((_a2 = t2.baseOptions) == null ? void 0 : _a2.g()) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
  th(t2, e2, n2, t2.J + 1);
}
function nh(t2, e2, n2, r2) {
  var _a2;
  if (!((_a2 = t2.baseOptions) == null ? void 0 : _a2.g())) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
  th(t2, e2, n2, r2);
}
function rh(t2, e2, n2, r2) {
  var i2 = e2.data;
  const s2 = e2.width, o2 = s2 * (e2 = e2.height);
  if ((i2 instanceof Uint8Array || i2 instanceof Float32Array) && i2.length !== o2) throw Error("Unsupported channel count: " + i2.length / o2);
  return t2 = new Sa([i2], n2, false, t2.g.i.canvas, t2.M, s2, e2), r2 ? t2.clone() : t2;
}
var ih = class extends sa {
  constructor(t2, e2, n2, r2) {
    super(t2), this.g = t2, this.ba = e2, this.V = n2, this.ra = r2, this.M = new ga();
  }
  l(t2, e2 = true) {
    if ("runningMode" in t2 && Vn(this.baseOptions, 2, !!t2.runningMode && "IMAGE" !== t2.runningMode), void 0 !== t2.canvas && this.g.i.canvas !== t2.canvas) throw Error("You must create a new task to reset the canvas.");
    return super.l(t2, e2);
  }
  close() {
    this.M.close(), super.close();
  }
};
ih.prototype.close = ih.prototype.close;
var sh = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect_in", false), this.j = { detections: [] }, Cn(t2 = this.h = new Is(), 0, 1, e2 = new Cs()), Hn(this.h, 2, 0.5), Hn(this.h, 3, 0.3);
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.h, 0, 1, t2);
  }
  o(t2) {
    return "minDetectionConfidence" in t2 && Hn(this.h, 2, t2.minDetectionConfidence ?? 0.5), "minSuppressionThreshold" in t2 && Hn(this.h, 3, t2.minSuppressionThreshold ?? 0.3), this.l(t2);
  }
  F(t2, e2) {
    return this.j = { detections: [] }, eh(this, t2, e2), this.j;
  }
  G(t2, e2, n2) {
    return this.j = { detections: [] }, nh(this, t2, n2, e2), this.j;
  }
  m() {
    var t2 = new Di();
    Ii(t2, "image_in"), Ii(t2, "norm_rect_in"), Ui(t2, "detections");
    const e2 = new yi();
    Wn(e2, Ds, this.h);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), xi(n2, "IMAGE:image_in"), xi(n2, "NORM_RECT:norm_rect_in"), Si(n2, "DETECTIONS:detections"), n2.o(e2), Oi(t2, n2), this.g.attachProtoVectorListener("detections", (t3, e3) => {
      for (const e4 of t3) t3 = ns(e4), this.j.detections.push(Oo(t3));
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("detections", (t3) => {
      ea(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
sh.prototype.detectForVideo = sh.prototype.G, sh.prototype.detect = sh.prototype.F, sh.prototype.setOptions = sh.prototype.o, sh.createFromModelPath = async function(t2, e2) {
  return Qa(sh, t2, { baseOptions: { modelAssetPath: e2 } });
}, sh.createFromModelBuffer = function(t2, e2) {
  return Qa(sh, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, sh.createFromOptions = function(t2, e2) {
  return Qa(sh, t2, e2);
};
var oh = $a([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]), ah = $a([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]), hh = $a([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]), ch = $a([474, 475], [475, 476], [476, 477], [477, 474]), uh = $a([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]), lh = $a([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]), dh = $a([469, 470], [470, 471], [471, 472], [472, 469]), fh = $a([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]), ph = [...oh, ...ah, ...hh, ...uh, ...lh, ...fh], gh = $a([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function mh(t2) {
  t2.u = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] };
}
var yh = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", false), this.u = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = false, Cn(t2 = this.h = new Hs(), 0, 1, e2 = new Cs()), this.H = new Vs(), Cn(this.h, 0, 3, this.H), this.j = new Is(), Cn(this.h, 0, 2, this.j), Xn(this.j, 4, 1), Hn(this.j, 2, 0.5), Hn(this.H, 2, 0.5), Hn(this.h, 4, 0.5);
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.h, 0, 1, t2);
  }
  o(t2) {
    return "numFaces" in t2 && Xn(this.j, 4, t2.numFaces ?? 1), "minFaceDetectionConfidence" in t2 && Hn(this.j, 2, t2.minFaceDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Hn(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minFacePresenceConfidence" in t2 && Hn(this.H, 2, t2.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in t2 && (this.outputFaceBlendshapes = !!t2.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in t2 && (this.outputFacialTransformationMatrixes = !!t2.outputFacialTransformationMatrixes), this.l(t2);
  }
  F(t2, e2) {
    return mh(this), eh(this, t2, e2), this.u;
  }
  G(t2, e2, n2) {
    return mh(this), nh(this, t2, n2, e2), this.u;
  }
  m() {
    var t2 = new Di();
    Ii(t2, "image_in"), Ii(t2, "norm_rect"), Ui(t2, "face_landmarks");
    const e2 = new yi();
    Wn(e2, zs, this.h);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), xi(n2, "IMAGE:image_in"), xi(n2, "NORM_RECT:norm_rect"), Si(n2, "NORM_LANDMARKS:face_landmarks"), n2.o(e2), Oi(t2, n2), this.g.attachProtoVectorListener("face_landmarks", (t3, e3) => {
      for (const e4 of t3) t3 = us(e4), this.u.faceLandmarks.push(Io(t3));
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("face_landmarks", (t3) => {
      ea(this, t3);
    }), this.outputFaceBlendshapes && (Ui(t2, "blendshapes"), Si(n2, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", (t3, e3) => {
      if (this.outputFaceBlendshapes) for (const e4 of t3) t3 = Wi(e4), this.u.faceBlendshapes.push(Co(t3.g() ?? []));
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("blendshapes", (t3) => {
      ea(this, t3);
    })), this.outputFacialTransformationMatrixes && (Ui(t2, "face_geometry"), Si(n2, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", (t3, e3) => {
      if (this.outputFacialTransformationMatrixes) for (const e4 of t3) (t3 = Rn(Gs(e4), ls, 2)) && this.u.facialTransformationMatrixes.push({ rows: Bn(Nn(t3, 1), 0) ?? 0, columns: Bn(Nn(t3, 2), 0) ?? 0, data: yn(t3, 3, ve).slice() ?? [] });
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("face_geometry", (t3) => {
      ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
yh.prototype.detectForVideo = yh.prototype.G, yh.prototype.detect = yh.prototype.F, yh.prototype.setOptions = yh.prototype.o, yh.createFromModelPath = function(t2, e2) {
  return Qa(yh, t2, { baseOptions: { modelAssetPath: e2 } });
}, yh.createFromModelBuffer = function(t2, e2) {
  return Qa(yh, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, yh.createFromOptions = function(t2, e2) {
  return Qa(yh, t2, e2);
}, yh.FACE_LANDMARKS_LIPS = oh, yh.FACE_LANDMARKS_LEFT_EYE = ah, yh.FACE_LANDMARKS_LEFT_EYEBROW = hh, yh.FACE_LANDMARKS_LEFT_IRIS = ch, yh.FACE_LANDMARKS_RIGHT_EYE = uh, yh.FACE_LANDMARKS_RIGHT_EYEBROW = lh, yh.FACE_LANDMARKS_RIGHT_IRIS = dh, yh.FACE_LANDMARKS_FACE_OVAL = fh, yh.FACE_LANDMARKS_CONTOURS = ph, yh.FACE_LANDMARKS_TESSELATION = gh;
var _h = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", true), Cn(t2 = this.j = new Ks(), 0, 1, e2 = new Cs());
  }
  get baseOptions() {
    return Rn(this.j, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.j, 0, 1, t2);
  }
  o(t2) {
    return super.l(t2);
  }
  Pa(t2, e2, n2) {
    const r2 = "function" != typeof e2 ? e2 : {};
    if (this.h = "function" == typeof e2 ? e2 : n2, eh(this, t2, r2 ?? {}), !this.h) return this.u;
  }
  m() {
    var t2 = new Di();
    Ii(t2, "image_in"), Ii(t2, "norm_rect"), Ui(t2, "stylized_image");
    const e2 = new yi();
    Wn(e2, Ys, this.j);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"), xi(n2, "IMAGE:image_in"), xi(n2, "NORM_RECT:norm_rect"), Si(n2, "STYLIZED_IMAGE:stylized_image"), n2.o(e2), Oi(t2, n2), this.g.W("stylized_image", (t3, e3) => {
      var n3 = !this.h, r2 = t3.data, i2 = t3.width;
      const s2 = i2 * (t3 = t3.height);
      if (r2 instanceof Uint8Array) if (r2.length === 3 * s2) {
        const e4 = new Uint8ClampedArray(4 * s2);
        for (let t4 = 0; t4 < s2; ++t4) e4[4 * t4] = r2[3 * t4], e4[4 * t4 + 1] = r2[3 * t4 + 1], e4[4 * t4 + 2] = r2[3 * t4 + 2], e4[4 * t4 + 3] = 255;
        r2 = new ImageData(e4, i2, t3);
      } else {
        if (r2.length !== 4 * s2) throw Error("Unsupported channel count: " + r2.length / s2);
        r2 = new ImageData(new Uint8ClampedArray(r2.buffer, r2.byteOffset, r2.length), i2, t3);
      }
      else if (!(r2 instanceof WebGLTexture)) throw Error(`Unsupported format: ${r2.constructor.name}`);
      i2 = new Ka([r2], false, false, this.g.i.canvas, this.M, i2, t3), this.u = n3 = n3 ? i2.clone() : i2, this.h && this.h(n3), ea(this, e3);
    }), this.g.attachEmptyPacketListener("stylized_image", (t3) => {
      this.u = null, this.h && this.h(null), ea(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
_h.prototype.stylize = _h.prototype.Pa, _h.prototype.setOptions = _h.prototype.o, _h.createFromModelPath = function(t2, e2) {
  return Qa(_h, t2, { baseOptions: { modelAssetPath: e2 } });
}, _h.createFromModelBuffer = function(t2, e2) {
  return Qa(_h, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, _h.createFromOptions = function(t2, e2) {
  return Qa(_h, t2, e2);
};
var vh = $a([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function Eh(t2) {
  t2.gestures = [], t2.landmarks = [], t2.worldLandmarks = [], t2.handedness = [];
}
function wh(t2) {
  return 0 === t2.gestures.length ? { gestures: [], landmarks: [], worldLandmarks: [], handedness: [], handednesses: [] } : { gestures: t2.gestures, landmarks: t2.landmarks, worldLandmarks: t2.worldLandmarks, handedness: t2.handedness, handednesses: t2.handedness };
}
function Th(t2, e2 = true) {
  const n2 = [];
  for (const i2 of t2) {
    var r2 = Wi(i2);
    t2 = [];
    for (const n3 of r2.g()) r2 = e2 && null != Nn(n3, 1) ? Bn(Nn(n3, 1), 0) : -1, t2.push({ score: Gn(n3, 2) ?? 0, index: r2, categoryName: jn(n3, 3) ?? "", displayName: jn(n3, 4) ?? "" });
    n2.push(t2);
  }
  return n2;
}
var Ah = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", false), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Cn(t2 = this.v = new oo(), 0, 1, e2 = new Cs()), this.A = new io(), Cn(this.v, 0, 2, this.A), this.u = new no(), Cn(this.A, 0, 3, this.u), this.h = new to(), Cn(this.A, 0, 2, this.h), this.j = new Zs(), Cn(this.v, 0, 3, this.j), Hn(this.h, 2, 0.5), Hn(this.A, 4, 0.5), Hn(this.u, 2, 0.5);
  }
  get baseOptions() {
    return Rn(this.v, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.v, 0, 1, t2);
  }
  o(t2) {
    var _a2, _b, _c, _d;
    if (Xn(this.h, 3, t2.numHands ?? 1), "minHandDetectionConfidence" in t2 && Hn(this.h, 2, t2.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Hn(this.A, 4, t2.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in t2 && Hn(this.u, 2, t2.minHandPresenceConfidence ?? 0.5), t2.cannedGesturesClassifierOptions) {
      var e2 = new $s(), n2 = e2, r2 = Po(t2.cannedGesturesClassifierOptions, (_a2 = Rn(this.j, $s, 3)) == null ? void 0 : _a2.h());
      Cn(n2, 0, 2, r2), Cn(this.j, 0, 3, e2);
    } else void 0 === t2.cannedGesturesClassifierOptions && ((_b = Rn(this.j, $s, 3)) == null ? void 0 : _b.g());
    return t2.customGesturesClassifierOptions ? (Cn(n2 = e2 = new $s(), 0, 2, r2 = Po(t2.customGesturesClassifierOptions, (_c = Rn(this.j, $s, 4)) == null ? void 0 : _c.h())), Cn(this.j, 0, 4, e2)) : void 0 === t2.customGesturesClassifierOptions && ((_d = Rn(this.j, $s, 4)) == null ? void 0 : _d.g()), this.l(t2);
  }
  Ka(t2, e2) {
    return Eh(this), eh(this, t2, e2), wh(this);
  }
  La(t2, e2, n2) {
    return Eh(this), nh(this, t2, n2, e2), wh(this);
  }
  m() {
    var t2 = new Di();
    Ii(t2, "image_in"), Ii(t2, "norm_rect"), Ui(t2, "hand_gestures"), Ui(t2, "hand_landmarks"), Ui(t2, "world_hand_landmarks"), Ui(t2, "handedness");
    const e2 = new yi();
    Wn(e2, co, this.v);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), xi(n2, "IMAGE:image_in"), xi(n2, "NORM_RECT:norm_rect"), Si(n2, "HAND_GESTURES:hand_gestures"), Si(n2, "LANDMARKS:hand_landmarks"), Si(n2, "WORLD_LANDMARKS:world_hand_landmarks"), Si(n2, "HANDEDNESS:handedness"), n2.o(e2), Oi(t2, n2), this.g.attachProtoVectorListener("hand_landmarks", (t3, e3) => {
      for (const e4 of t3) {
        t3 = us(e4);
        const n3 = [];
        for (const e5 of Pn(t3, as, 1)) n3.push({ x: Gn(e5, 1) ?? 0, y: Gn(e5, 2) ?? 0, z: Gn(e5, 3) ?? 0, visibility: Gn(e5, 4) ?? 0 });
        this.landmarks.push(n3);
      }
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("hand_landmarks", (t3) => {
      ea(this, t3);
    }), this.g.attachProtoVectorListener("world_hand_landmarks", (t3, e3) => {
      for (const e4 of t3) {
        t3 = os(e4);
        const n3 = [];
        for (const e5 of Pn(t3, rs, 1)) n3.push({ x: Gn(e5, 1) ?? 0, y: Gn(e5, 2) ?? 0, z: Gn(e5, 3) ?? 0, visibility: Gn(e5, 4) ?? 0 });
        this.worldLandmarks.push(n3);
      }
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("world_hand_landmarks", (t3) => {
      ea(this, t3);
    }), this.g.attachProtoVectorListener("hand_gestures", (t3, e3) => {
      this.gestures.push(...Th(t3, false)), ea(this, e3);
    }), this.g.attachEmptyPacketListener("hand_gestures", (t3) => {
      ea(this, t3);
    }), this.g.attachProtoVectorListener("handedness", (t3, e3) => {
      this.handedness.push(...Th(t3)), ea(this, e3);
    }), this.g.attachEmptyPacketListener("handedness", (t3) => {
      ea(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
function bh(t2) {
  return { landmarks: t2.landmarks, worldLandmarks: t2.worldLandmarks, handednesses: t2.handedness, handedness: t2.handedness };
}
Ah.prototype.recognizeForVideo = Ah.prototype.La, Ah.prototype.recognize = Ah.prototype.Ka, Ah.prototype.setOptions = Ah.prototype.o, Ah.createFromModelPath = function(t2, e2) {
  return Qa(Ah, t2, { baseOptions: { modelAssetPath: e2 } });
}, Ah.createFromModelBuffer = function(t2, e2) {
  return Qa(Ah, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Ah.createFromOptions = function(t2, e2) {
  return Qa(Ah, t2, e2);
}, Ah.HAND_CONNECTIONS = vh;
var kh = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", false), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Cn(t2 = this.j = new io(), 0, 1, e2 = new Cs()), this.u = new no(), Cn(this.j, 0, 3, this.u), this.h = new to(), Cn(this.j, 0, 2, this.h), Xn(this.h, 3, 1), Hn(this.h, 2, 0.5), Hn(this.u, 2, 0.5), Hn(this.j, 4, 0.5);
  }
  get baseOptions() {
    return Rn(this.j, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.j, 0, 1, t2);
  }
  o(t2) {
    return "numHands" in t2 && Xn(this.h, 3, t2.numHands ?? 1), "minHandDetectionConfidence" in t2 && Hn(this.h, 2, t2.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Hn(this.j, 4, t2.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in t2 && Hn(this.u, 2, t2.minHandPresenceConfidence ?? 0.5), this.l(t2);
  }
  F(t2, e2) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], eh(this, t2, e2), bh(this);
  }
  G(t2, e2, n2) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], nh(this, t2, n2, e2), bh(this);
  }
  m() {
    var t2 = new Di();
    Ii(t2, "image_in"), Ii(t2, "norm_rect"), Ui(t2, "hand_landmarks"), Ui(t2, "world_hand_landmarks"), Ui(t2, "handedness");
    const e2 = new yi();
    Wn(e2, ho, this.j);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), xi(n2, "IMAGE:image_in"), xi(n2, "NORM_RECT:norm_rect"), Si(n2, "LANDMARKS:hand_landmarks"), Si(n2, "WORLD_LANDMARKS:world_hand_landmarks"), Si(n2, "HANDEDNESS:handedness"), n2.o(e2), Oi(t2, n2), this.g.attachProtoVectorListener("hand_landmarks", (t3, e3) => {
      for (const e4 of t3) t3 = us(e4), this.landmarks.push(Io(t3));
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("hand_landmarks", (t3) => {
      ea(this, t3);
    }), this.g.attachProtoVectorListener("world_hand_landmarks", (t3, e3) => {
      for (const e4 of t3) t3 = os(e4), this.worldLandmarks.push(Uo(t3));
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("world_hand_landmarks", (t3) => {
      ea(this, t3);
    }), this.g.attachProtoVectorListener("handedness", (t3, e3) => {
      var n3 = this.handedness, r2 = n3.push;
      const i2 = [];
      for (const e4 of t3) {
        t3 = Wi(e4);
        const n4 = [];
        for (const e5 of t3.g()) n4.push({ score: Gn(e5, 2) ?? 0, index: Bn(Nn(e5, 1), 0) ?? -1, categoryName: jn(e5, 3) ?? "", displayName: jn(e5, 4) ?? "" });
        i2.push(n4);
      }
      r2.call(n3, ...i2), ea(this, e3);
    }), this.g.attachEmptyPacketListener("handedness", (t3) => {
      ea(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
kh.prototype.detectForVideo = kh.prototype.G, kh.prototype.detect = kh.prototype.F, kh.prototype.setOptions = kh.prototype.o, kh.createFromModelPath = function(t2, e2) {
  return Qa(kh, t2, { baseOptions: { modelAssetPath: e2 } });
}, kh.createFromModelBuffer = function(t2, e2) {
  return Qa(kh, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, kh.createFromOptions = function(t2, e2) {
  return Qa(kh, t2, e2);
}, kh.HAND_CONNECTIONS = vh;
var xh = $a([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
function Sh(t2) {
  t2.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] };
}
function Lh(t2) {
  try {
    if (!t2.I) return t2.h;
    t2.I(t2.h);
  } finally {
    ia(t2);
  }
}
function Fh(t2, e2) {
  t2 = us(t2), e2.push(Io(t2));
}
var Rh = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "input_frames_image", null, false), this.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = false, Cn(t2 = this.A = new yo(), 0, 1, e2 = new Cs()), this.u = new no(), Cn(this.A, 0, 2, this.u), this.aa = new uo(), Cn(this.A, 0, 3, this.aa), this.j = new Is(), Cn(this.A, 0, 4, this.j), this.H = new Vs(), Cn(this.A, 0, 5, this.H), this.v = new fo(), Cn(this.A, 0, 6, this.v), this.D = new go(), Cn(this.A, 0, 7, this.D), Hn(this.j, 2, 0.5), Hn(this.j, 3, 0.3), Hn(this.H, 2, 0.5), Hn(this.v, 2, 0.5), Hn(this.v, 3, 0.3), Hn(this.D, 2, 0.5), Hn(this.u, 2, 0.5);
  }
  get baseOptions() {
    return Rn(this.A, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.A, 0, 1, t2);
  }
  o(t2) {
    return "minFaceDetectionConfidence" in t2 && Hn(this.j, 2, t2.minFaceDetectionConfidence ?? 0.5), "minFaceSuppressionThreshold" in t2 && Hn(this.j, 3, t2.minFaceSuppressionThreshold ?? 0.3), "minFacePresenceConfidence" in t2 && Hn(this.H, 2, t2.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in t2 && (this.outputFaceBlendshapes = !!t2.outputFaceBlendshapes), "minPoseDetectionConfidence" in t2 && Hn(this.v, 2, t2.minPoseDetectionConfidence ?? 0.5), "minPoseSuppressionThreshold" in t2 && Hn(this.v, 3, t2.minPoseSuppressionThreshold ?? 0.3), "minPosePresenceConfidence" in t2 && Hn(this.D, 2, t2.minPosePresenceConfidence ?? 0.5), "outputPoseSegmentationMasks" in t2 && (this.outputPoseSegmentationMasks = !!t2.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in t2 && Hn(this.u, 2, t2.minHandLandmarksConfidence ?? 0.5), this.l(t2);
  }
  F(t2, e2, n2) {
    const r2 = "function" != typeof e2 ? e2 : {};
    return this.I = "function" == typeof e2 ? e2 : n2, Sh(this), eh(this, t2, r2), Lh(this);
  }
  G(t2, e2, n2, r2) {
    const i2 = "function" != typeof n2 ? n2 : {};
    return this.I = "function" == typeof n2 ? n2 : r2, Sh(this), nh(this, t2, i2, e2), Lh(this);
  }
  m() {
    var t2 = new Di();
    Ii(t2, "input_frames_image"), Ui(t2, "pose_landmarks"), Ui(t2, "pose_world_landmarks"), Ui(t2, "face_landmarks"), Ui(t2, "left_hand_landmarks"), Ui(t2, "left_hand_world_landmarks"), Ui(t2, "right_hand_landmarks"), Ui(t2, "right_hand_world_landmarks");
    const e2 = new yi(), n2 = new oi();
    An(n2, 1, Me("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""), function(t3, e3) {
      if (null != e3) if (Array.isArray(e3)) dn(t3, 2, tn(e3, nn, void 0, void 0, false));
      else {
        if (!("string" == typeof e3 || e3 instanceof B || M(e3))) throw Error("invalid value in Any.value field: " + e3 + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
        An(t3, 2, ae(e3, false, false), D());
      }
    }(n2, this.A.g());
    const r2 = new Li();
    ki(r2, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), Dn(r2, 8, oi, n2), xi(r2, "IMAGE:input_frames_image"), Si(r2, "POSE_LANDMARKS:pose_landmarks"), Si(r2, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), Si(r2, "FACE_LANDMARKS:face_landmarks"), Si(r2, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), Si(r2, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), Si(r2, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), Si(r2, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), r2.o(e2), Oi(t2, r2), na(this, t2), this.g.attachProtoListener("pose_landmarks", (t3, e3) => {
      Fh(t3, this.h.poseLandmarks), ea(this, e3);
    }), this.g.attachEmptyPacketListener("pose_landmarks", (t3) => {
      ea(this, t3);
    }), this.g.attachProtoListener("pose_world_landmarks", (t3, e3) => {
      var n3 = this.h.poseWorldLandmarks;
      t3 = os(t3), n3.push(Uo(t3)), ea(this, e3);
    }), this.g.attachEmptyPacketListener("pose_world_landmarks", (t3) => {
      ea(this, t3);
    }), this.outputPoseSegmentationMasks && (Si(r2, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), ra(this, "pose_segmentation_mask"), this.g.W("pose_segmentation_mask", (t3, e3) => {
      this.h.poseSegmentationMasks = [rh(this, t3, true, !this.I)], ea(this, e3);
    }), this.g.attachEmptyPacketListener("pose_segmentation_mask", (t3) => {
      this.h.poseSegmentationMasks = [], ea(this, t3);
    })), this.g.attachProtoListener("face_landmarks", (t3, e3) => {
      Fh(t3, this.h.faceLandmarks), ea(this, e3);
    }), this.g.attachEmptyPacketListener("face_landmarks", (t3) => {
      ea(this, t3);
    }), this.outputFaceBlendshapes && (Ui(t2, "extra_blendshapes"), Si(r2, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", (t3, e3) => {
      var n3 = this.h.faceBlendshapes;
      this.outputFaceBlendshapes && (t3 = Wi(t3), n3.push(Co(t3.g() ?? []))), ea(this, e3);
    }), this.g.attachEmptyPacketListener("extra_blendshapes", (t3) => {
      ea(this, t3);
    })), this.g.attachProtoListener("left_hand_landmarks", (t3, e3) => {
      Fh(t3, this.h.leftHandLandmarks), ea(this, e3);
    }), this.g.attachEmptyPacketListener("left_hand_landmarks", (t3) => {
      ea(this, t3);
    }), this.g.attachProtoListener("left_hand_world_landmarks", (t3, e3) => {
      var n3 = this.h.leftHandWorldLandmarks;
      t3 = os(t3), n3.push(Uo(t3)), ea(this, e3);
    }), this.g.attachEmptyPacketListener("left_hand_world_landmarks", (t3) => {
      ea(this, t3);
    }), this.g.attachProtoListener("right_hand_landmarks", (t3, e3) => {
      Fh(t3, this.h.rightHandLandmarks), ea(this, e3);
    }), this.g.attachEmptyPacketListener("right_hand_landmarks", (t3) => {
      ea(this, t3);
    }), this.g.attachProtoListener("right_hand_world_landmarks", (t3, e3) => {
      var n3 = this.h.rightHandWorldLandmarks;
      t3 = os(t3), n3.push(Uo(t3)), ea(this, e3);
    }), this.g.attachEmptyPacketListener("right_hand_world_landmarks", (t3) => {
      ea(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Rh.prototype.detectForVideo = Rh.prototype.G, Rh.prototype.detect = Rh.prototype.F, Rh.prototype.setOptions = Rh.prototype.o, Rh.createFromModelPath = function(t2, e2) {
  return Qa(Rh, t2, { baseOptions: { modelAssetPath: e2 } });
}, Rh.createFromModelBuffer = function(t2, e2) {
  return Qa(Rh, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Rh.createFromOptions = function(t2, e2) {
  return Qa(Rh, t2, e2);
}, Rh.HAND_CONNECTIONS = vh, Rh.POSE_CONNECTIONS = xh, Rh.FACE_LANDMARKS_LIPS = oh, Rh.FACE_LANDMARKS_LEFT_EYE = ah, Rh.FACE_LANDMARKS_LEFT_EYEBROW = hh, Rh.FACE_LANDMARKS_LEFT_IRIS = ch, Rh.FACE_LANDMARKS_RIGHT_EYE = uh, Rh.FACE_LANDMARKS_RIGHT_EYEBROW = lh, Rh.FACE_LANDMARKS_RIGHT_IRIS = dh, Rh.FACE_LANDMARKS_FACE_OVAL = fh, Rh.FACE_LANDMARKS_CONTOURS = ph, Rh.FACE_LANDMARKS_TESSELATION = gh;
var Mh = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "input_image", "norm_rect", true), this.j = { classifications: [] }, Cn(t2 = this.h = new _o(), 0, 1, e2 = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.h, 0, 1, t2);
  }
  o(t2) {
    return Cn(this.h, 0, 2, Po(t2, Rn(this.h, ks, 2))), this.l(t2);
  }
  ua(t2, e2) {
    return this.j = { classifications: [] }, eh(this, t2, e2), this.j;
  }
  va(t2, e2, n2) {
    return this.j = { classifications: [] }, nh(this, t2, n2, e2), this.j;
  }
  m() {
    var t2 = new Di();
    Ii(t2, "input_image"), Ii(t2, "norm_rect"), Ui(t2, "classifications");
    const e2 = new yi();
    Wn(e2, vo, this.h);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), xi(n2, "IMAGE:input_image"), xi(n2, "NORM_RECT:norm_rect"), Si(n2, "CLASSIFICATIONS:classifications"), n2.o(e2), Oi(t2, n2), this.g.attachProtoListener("classifications", (t3, e3) => {
      this.j = function(t4) {
        const e4 = { classifications: Pn(t4, ps, 1).map((t5) => {
          var _a2;
          return Co(((_a2 = Rn(t5, Xi, 4)) == null ? void 0 : _a2.g()) ?? [], Bn(Nn(t5, 2), 0), jn(t5, 3));
        }) };
        return null != Fe(cn(t4, 2)) && (e4.timestampMs = Bn(Fe(cn(t4, 2)), 0)), e4;
      }(ys(t3)), ea(this, e3);
    }), this.g.attachEmptyPacketListener("classifications", (t3) => {
      ea(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Mh.prototype.classifyForVideo = Mh.prototype.va, Mh.prototype.classify = Mh.prototype.ua, Mh.prototype.setOptions = Mh.prototype.o, Mh.createFromModelPath = function(t2, e2) {
  return Qa(Mh, t2, { baseOptions: { modelAssetPath: e2 } });
}, Mh.createFromModelBuffer = function(t2, e2) {
  return Qa(Mh, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Mh.createFromOptions = function(t2, e2) {
  return Qa(Mh, t2, e2);
};
var Ph = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", true), this.h = new Eo(), this.embeddings = { embeddings: [] }, Cn(t2 = this.h, 0, 1, e2 = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.h, 0, 1, t2);
  }
  o(t2) {
    var e2 = this.h, n2 = Rn(this.h, Ss, 2);
    return n2 = n2 ? n2.clone() : new Ss(), void 0 !== t2.l2Normalize ? Vn(n2, 1, t2.l2Normalize) : "l2Normalize" in t2 && dn(n2, 1), void 0 !== t2.quantize ? Vn(n2, 2, t2.quantize) : "quantize" in t2 && dn(n2, 2), Cn(e2, 0, 2, n2), this.l(t2);
  }
  Ba(t2, e2) {
    return eh(this, t2, e2), this.embeddings;
  }
  Ca(t2, e2, n2) {
    return nh(this, t2, n2, e2), this.embeddings;
  }
  m() {
    var t2 = new Di();
    Ii(t2, "image_in"), Ii(t2, "norm_rect"), Ui(t2, "embeddings_out");
    const e2 = new yi();
    Wn(e2, wo, this.h);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), xi(n2, "IMAGE:image_in"), xi(n2, "NORM_RECT:norm_rect"), Si(n2, "EMBEDDINGS:embeddings_out"), n2.o(e2), Oi(t2, n2), this.g.attachProtoListener("embeddings_out", (t3, e3) => {
      t3 = bs(t3), this.embeddings = function(t4) {
        return { embeddings: Pn(t4, Es, 1).map((t5) => {
          var _a2, _b;
          const e4 = { headIndex: Bn(Nn(t5, 3), 0) ?? -1, headName: jn(t5, 4) ?? "" };
          if (void 0 !== Fn(t5, _s, xn(t5, 1))) t5 = yn(t5 = Rn(t5, _s, xn(t5, 1)), 1, ve), e4.floatEmbedding = t5.slice();
          else {
            const n3 = new Uint8Array(0);
            e4.quantizedEmbedding = ((_b = (_a2 = Rn(t5, vs, xn(t5, 2))) == null ? void 0 : _a2.qa()) == null ? void 0 : _b.h()) ?? n3;
          }
          return e4;
        }), timestampMs: Bn(Fe(cn(t4, 2)), 0) };
      }(t3), ea(this, e3);
    }), this.g.attachEmptyPacketListener("embeddings_out", (t3) => {
      ea(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Ph.cosineSimilarity = function(t2, e2) {
  if (t2.floatEmbedding && e2.floatEmbedding) t2 = No(t2.floatEmbedding, e2.floatEmbedding);
  else {
    if (!t2.quantizedEmbedding || !e2.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
    t2 = No(Do(t2.quantizedEmbedding), Do(e2.quantizedEmbedding));
  }
  return t2;
}, Ph.prototype.embedForVideo = Ph.prototype.Ca, Ph.prototype.embed = Ph.prototype.Ba, Ph.prototype.setOptions = Ph.prototype.o, Ph.createFromModelPath = function(t2, e2) {
  return Qa(Ph, t2, { baseOptions: { modelAssetPath: e2 } });
}, Ph.createFromModelBuffer = function(t2, e2) {
  return Qa(Ph, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Ph.createFromOptions = function(t2, e2) {
  return Qa(Ph, t2, e2);
};
var Ch = class {
  constructor(t2, e2, n2) {
    this.confidenceMasks = t2, this.categoryMask = e2, this.qualityScores = n2;
  }
  close() {
    var _a2, _b;
    (_a2 = this.confidenceMasks) == null ? void 0 : _a2.forEach((t2) => {
      t2.close();
    }), (_b = this.categoryMask) == null ? void 0 : _b.close();
  }
};
function Oh(t2) {
  t2.categoryMask = void 0, t2.confidenceMasks = void 0, t2.qualityScores = void 0;
}
function Ih(t2) {
  try {
    const e2 = new Ch(t2.confidenceMasks, t2.categoryMask, t2.qualityScores);
    if (!t2.j) return e2;
    t2.j(e2);
  } finally {
    ia(t2);
  }
}
Ch.prototype.close = Ch.prototype.close;
var Uh = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", false), this.u = [], this.outputCategoryMask = false, this.outputConfidenceMasks = true, this.h = new xo(), this.v = new To(), Cn(this.h, 0, 3, this.v), Cn(t2 = this.h, 0, 1, e2 = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.h, 0, 1, t2);
  }
  o(t2) {
    return void 0 !== t2.displayNamesLocale ? dn(this.h, 2, Me(t2.displayNamesLocale)) : "displayNamesLocale" in t2 && dn(this.h, 2), "outputCategoryMask" in t2 && (this.outputCategoryMask = t2.outputCategoryMask ?? false), "outputConfidenceMasks" in t2 && (this.outputConfidenceMasks = t2.outputConfidenceMasks ?? true), super.l(t2);
  }
  L() {
    !function(t2) {
      var _a2, _b;
      const e2 = Pn(t2.fa(), Li, 1).filter((t3) => jn(t3, 1).includes("mediapipe.tasks.TensorsToSegmentationCalculator"));
      if (t2.u = [], 1 < e2.length) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
      1 === e2.length && (((_b = (_a2 = Rn(e2[0], yi, 7)) == null ? void 0 : _a2.l()) == null ? void 0 : _b.g()) ?? /* @__PURE__ */ new Map()).forEach((e3, n2) => {
        t2.u[Number(n2)] = jn(e3, 1);
      });
    }(this);
  }
  ga(t2, e2, n2) {
    const r2 = "function" != typeof e2 ? e2 : {};
    return this.j = "function" == typeof e2 ? e2 : n2, Oh(this), eh(this, t2, r2), Ih(this);
  }
  Na(t2, e2, n2, r2) {
    const i2 = "function" != typeof n2 ? n2 : {};
    return this.j = "function" == typeof n2 ? n2 : r2, Oh(this), nh(this, t2, i2, e2), Ih(this);
  }
  Fa() {
    return this.u;
  }
  m() {
    var t2 = new Di();
    Ii(t2, "image_in"), Ii(t2, "norm_rect");
    const e2 = new yi();
    Wn(e2, So, this.h);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), xi(n2, "IMAGE:image_in"), xi(n2, "NORM_RECT:norm_rect"), n2.o(e2), Oi(t2, n2), na(this, t2), this.outputConfidenceMasks && (Ui(t2, "confidence_masks"), Si(n2, "CONFIDENCE_MASKS:confidence_masks"), ra(this, "confidence_masks"), this.g.da("confidence_masks", (t3, e3) => {
      this.confidenceMasks = t3.map((t4) => rh(this, t4, true, !this.j)), ea(this, e3);
    }), this.g.attachEmptyPacketListener("confidence_masks", (t3) => {
      this.confidenceMasks = [], ea(this, t3);
    })), this.outputCategoryMask && (Ui(t2, "category_mask"), Si(n2, "CATEGORY_MASK:category_mask"), ra(this, "category_mask"), this.g.W("category_mask", (t3, e3) => {
      this.categoryMask = rh(this, t3, false, !this.j), ea(this, e3);
    }), this.g.attachEmptyPacketListener("category_mask", (t3) => {
      this.categoryMask = void 0, ea(this, t3);
    })), Ui(t2, "quality_scores"), Si(n2, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", (t3, e3) => {
      this.qualityScores = t3, ea(this, e3);
    }), this.g.attachEmptyPacketListener("quality_scores", (t3) => {
      this.categoryMask = void 0, ea(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Uh.prototype.getLabels = Uh.prototype.Fa, Uh.prototype.segmentForVideo = Uh.prototype.Na, Uh.prototype.segment = Uh.prototype.ga, Uh.prototype.setOptions = Uh.prototype.o, Uh.createFromModelPath = function(t2, e2) {
  return Qa(Uh, t2, { baseOptions: { modelAssetPath: e2 } });
}, Uh.createFromModelBuffer = function(t2, e2) {
  return Qa(Uh, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Uh.createFromOptions = function(t2, e2) {
  return Qa(Uh, t2, e2);
};
var Dh = class {
  constructor(t2, e2, n2) {
    this.confidenceMasks = t2, this.categoryMask = e2, this.qualityScores = n2;
  }
  close() {
    var _a2, _b;
    (_a2 = this.confidenceMasks) == null ? void 0 : _a2.forEach((t2) => {
      t2.close();
    }), (_b = this.categoryMask) == null ? void 0 : _b.close();
  }
};
Dh.prototype.close = Dh.prototype.close;
var Nh = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Bh = [0, jr, -2], Gh = [0, Or, -3, Hr], jh = [0, Or, -3, Hr, Or, -1], Vh = [0, jh], Xh = [0, Vh, Bh], Hh = [0, jh, Bh], Wh = [0, jh, jr, -1], zh = [0, Wh, Bh], Kh = [0, Or, -3, Hr, Bh, -1], Yh = [0, Or, -3, Hr, ti], $h = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, qh = [0, Or, -1, Hr], Jh = class extends zn {
  constructor() {
    super();
  }
};
Jh.B = [1];
var Zh = class extends zn {
  constructor(t2) {
    super(t2);
  }
}, Qh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15], tc = [0, Qh, Jr, jh, Jr, Hh, Jr, Vh, Jr, Xh, Jr, qh, Jr, Yh, Jr, Gh, Jr, [0, Yr, Or, -2, Hr, jr, Hr, -1, 2, Or, Bh], Jr, Wh, Jr, zh, Or, Bh, Yr, Jr, Kh, Jr, [0, Cr, qh]], ec = [0, Yr, jr, -1, Hr], nc = class extends zn {
  constructor() {
    super();
  }
};
nc.B = [1], nc.prototype.g = si([0, Cr, tc, Yr, ec]);
var rc = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect_in", false), this.outputCategoryMask = false, this.outputConfidenceMasks = true, this.h = new xo(), this.v = new To(), Cn(this.h, 0, 3, this.v), Cn(t2 = this.h, 0, 1, e2 = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.h, 0, 1, t2);
  }
  o(t2) {
    return "outputCategoryMask" in t2 && (this.outputCategoryMask = t2.outputCategoryMask ?? false), "outputConfidenceMasks" in t2 && (this.outputConfidenceMasks = t2.outputConfidenceMasks ?? true), super.l(t2);
  }
  ga(t2, e2, n2, r2) {
    const i2 = "function" != typeof n2 ? n2 : {};
    this.j = "function" == typeof n2 ? n2 : r2, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, n2 = this.J + 1, r2 = new nc();
    const s2 = new Zh();
    var o2 = new Nh();
    if (Xn(o2, 1, 255), Cn(s2, 0, 12, o2), e2.keypoint && e2.scribble) throw Error("Cannot provide both keypoint and scribble.");
    if (e2.keypoint) {
      var a2 = new $h();
      Vn(a2, 3, true), Hn(a2, 1, e2.keypoint.x), Hn(a2, 2, e2.keypoint.y), On(s2, 5, Qh, a2);
    } else {
      if (!e2.scribble) throw Error("Must provide either a keypoint or a scribble.");
      for (a2 of (o2 = new Jh(), e2.scribble)) Vn(e2 = new $h(), 3, true), Hn(e2, 1, a2.x), Hn(e2, 2, a2.y), Dn(o2, 1, $h, e2);
      On(s2, 15, Qh, o2);
    }
    Dn(r2, 1, Zh, s2), this.g.addProtoToStream(r2.g(), "drishti.RenderData", "roi_in", n2), eh(this, t2, i2);
    t: {
      try {
        const t3 = new Dh(this.confidenceMasks, this.categoryMask, this.qualityScores);
        if (!this.j) {
          var h2 = t3;
          break t;
        }
        this.j(t3);
      } finally {
        ia(this);
      }
      h2 = void 0;
    }
    return h2;
  }
  m() {
    var t2 = new Di();
    Ii(t2, "image_in"), Ii(t2, "roi_in"), Ii(t2, "norm_rect_in");
    const e2 = new yi();
    Wn(e2, So, this.h);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"), xi(n2, "IMAGE:image_in"), xi(n2, "ROI:roi_in"), xi(n2, "NORM_RECT:norm_rect_in"), n2.o(e2), Oi(t2, n2), na(this, t2), this.outputConfidenceMasks && (Ui(t2, "confidence_masks"), Si(n2, "CONFIDENCE_MASKS:confidence_masks"), ra(this, "confidence_masks"), this.g.da("confidence_masks", (t3, e3) => {
      this.confidenceMasks = t3.map((t4) => rh(this, t4, true, !this.j)), ea(this, e3);
    }), this.g.attachEmptyPacketListener("confidence_masks", (t3) => {
      this.confidenceMasks = [], ea(this, t3);
    })), this.outputCategoryMask && (Ui(t2, "category_mask"), Si(n2, "CATEGORY_MASK:category_mask"), ra(this, "category_mask"), this.g.W("category_mask", (t3, e3) => {
      this.categoryMask = rh(this, t3, false, !this.j), ea(this, e3);
    }), this.g.attachEmptyPacketListener("category_mask", (t3) => {
      this.categoryMask = void 0, ea(this, t3);
    })), Ui(t2, "quality_scores"), Si(n2, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", (t3, e3) => {
      this.qualityScores = t3, ea(this, e3);
    }), this.g.attachEmptyPacketListener("quality_scores", (t3) => {
      this.categoryMask = void 0, ea(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
rc.prototype.segment = rc.prototype.ga, rc.prototype.setOptions = rc.prototype.o, rc.createFromModelPath = function(t2, e2) {
  return Qa(rc, t2, { baseOptions: { modelAssetPath: e2 } });
}, rc.createFromModelBuffer = function(t2, e2) {
  return Qa(rc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, rc.createFromOptions = function(t2, e2) {
  return Qa(rc, t2, e2);
};
var ic = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "input_frame_gpu", "norm_rect", false), this.j = { detections: [] }, Cn(t2 = this.h = new Lo(), 0, 1, e2 = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.h, 0, 1, t2);
  }
  o(t2) {
    return void 0 !== t2.displayNamesLocale ? dn(this.h, 2, Me(t2.displayNamesLocale)) : "displayNamesLocale" in t2 && dn(this.h, 2), void 0 !== t2.maxResults ? Xn(this.h, 3, t2.maxResults) : "maxResults" in t2 && dn(this.h, 3), void 0 !== t2.scoreThreshold ? Hn(this.h, 4, t2.scoreThreshold) : "scoreThreshold" in t2 && dn(this.h, 4), void 0 !== t2.categoryAllowlist ? Tn(this.h, 5, t2.categoryAllowlist) : "categoryAllowlist" in t2 && dn(this.h, 5), void 0 !== t2.categoryDenylist ? Tn(this.h, 6, t2.categoryDenylist) : "categoryDenylist" in t2 && dn(this.h, 6), this.l(t2);
  }
  F(t2, e2) {
    return this.j = { detections: [] }, eh(this, t2, e2), this.j;
  }
  G(t2, e2, n2) {
    return this.j = { detections: [] }, nh(this, t2, n2, e2), this.j;
  }
  m() {
    var t2 = new Di();
    Ii(t2, "input_frame_gpu"), Ii(t2, "norm_rect"), Ui(t2, "detections");
    const e2 = new yi();
    Wn(e2, Fo, this.h);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.ObjectDetectorGraph"), xi(n2, "IMAGE:input_frame_gpu"), xi(n2, "NORM_RECT:norm_rect"), Si(n2, "DETECTIONS:detections"), n2.o(e2), Oi(t2, n2), this.g.attachProtoVectorListener("detections", (t3, e3) => {
      for (const e4 of t3) t3 = ns(e4), this.j.detections.push(Oo(t3));
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("detections", (t3) => {
      ea(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
ic.prototype.detectForVideo = ic.prototype.G, ic.prototype.detect = ic.prototype.F, ic.prototype.setOptions = ic.prototype.o, ic.createFromModelPath = async function(t2, e2) {
  return Qa(ic, t2, { baseOptions: { modelAssetPath: e2 } });
}, ic.createFromModelBuffer = function(t2, e2) {
  return Qa(ic, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, ic.createFromOptions = function(t2, e2) {
  return Qa(ic, t2, e2);
};
var sc = class {
  constructor(t2, e2, n2) {
    this.landmarks = t2, this.worldLandmarks = e2, this.segmentationMasks = n2;
  }
  close() {
    var _a2;
    (_a2 = this.segmentationMasks) == null ? void 0 : _a2.forEach((t2) => {
      t2.close();
    });
  }
};
function oc(t2) {
  t2.landmarks = [], t2.worldLandmarks = [], t2.segmentationMasks = void 0;
}
function ac(t2) {
  try {
    const e2 = new sc(t2.landmarks, t2.worldLandmarks, t2.segmentationMasks);
    if (!t2.j) return e2;
    t2.j(e2);
  } finally {
    ia(t2);
  }
}
sc.prototype.close = sc.prototype.close;
var hc = class extends ih {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", false), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = false, Cn(t2 = this.h = new Ro(), 0, 1, e2 = new Cs()), this.D = new go(), Cn(this.h, 0, 3, this.D), this.v = new fo(), Cn(this.h, 0, 2, this.v), Xn(this.v, 4, 1), Hn(this.v, 2, 0.5), Hn(this.D, 2, 0.5), Hn(this.h, 4, 0.5);
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t2) {
    Cn(this.h, 0, 1, t2);
  }
  o(t2) {
    return "numPoses" in t2 && Xn(this.v, 4, t2.numPoses ?? 1), "minPoseDetectionConfidence" in t2 && Hn(this.v, 2, t2.minPoseDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Hn(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minPosePresenceConfidence" in t2 && Hn(this.D, 2, t2.minPosePresenceConfidence ?? 0.5), "outputSegmentationMasks" in t2 && (this.outputSegmentationMasks = t2.outputSegmentationMasks ?? false), this.l(t2);
  }
  F(t2, e2, n2) {
    const r2 = "function" != typeof e2 ? e2 : {};
    return this.j = "function" == typeof e2 ? e2 : n2, oc(this), eh(this, t2, r2), ac(this);
  }
  G(t2, e2, n2, r2) {
    const i2 = "function" != typeof n2 ? n2 : {};
    return this.j = "function" == typeof n2 ? n2 : r2, oc(this), nh(this, t2, i2, e2), ac(this);
  }
  m() {
    var t2 = new Di();
    Ii(t2, "image_in"), Ii(t2, "norm_rect"), Ui(t2, "normalized_landmarks"), Ui(t2, "world_landmarks"), Ui(t2, "segmentation_masks");
    const e2 = new yi();
    Wn(e2, Mo, this.h);
    const n2 = new Li();
    ki(n2, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), xi(n2, "IMAGE:image_in"), xi(n2, "NORM_RECT:norm_rect"), Si(n2, "NORM_LANDMARKS:normalized_landmarks"), Si(n2, "WORLD_LANDMARKS:world_landmarks"), n2.o(e2), Oi(t2, n2), na(this, t2), this.g.attachProtoVectorListener("normalized_landmarks", (t3, e3) => {
      this.landmarks = [];
      for (const e4 of t3) t3 = us(e4), this.landmarks.push(Io(t3));
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("normalized_landmarks", (t3) => {
      this.landmarks = [], ea(this, t3);
    }), this.g.attachProtoVectorListener("world_landmarks", (t3, e3) => {
      this.worldLandmarks = [];
      for (const e4 of t3) t3 = os(e4), this.worldLandmarks.push(Uo(t3));
      ea(this, e3);
    }), this.g.attachEmptyPacketListener("world_landmarks", (t3) => {
      this.worldLandmarks = [], ea(this, t3);
    }), this.outputSegmentationMasks && (Si(n2, "SEGMENTATION_MASK:segmentation_masks"), ra(this, "segmentation_masks"), this.g.da("segmentation_masks", (t3, e3) => {
      this.segmentationMasks = t3.map((t4) => rh(this, t4, true, !this.j)), ea(this, e3);
    }), this.g.attachEmptyPacketListener("segmentation_masks", (t3) => {
      this.segmentationMasks = [], ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
hc.prototype.detectForVideo = hc.prototype.G, hc.prototype.detect = hc.prototype.F, hc.prototype.setOptions = hc.prototype.o, hc.createFromModelPath = function(t2, e2) {
  return Qa(hc, t2, { baseOptions: { modelAssetPath: e2 } });
}, hc.createFromModelBuffer = function(t2, e2) {
  return Qa(hc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, hc.createFromOptions = function(t2, e2) {
  return Qa(hc, t2, e2);
}, hc.POSE_CONNECTIONS = xh;
let faceLandmarkModelTypes = {
  "full": "./mediapipe/models/face_landmark_detection/face_landmarker.task"
};
let faceLandmarkState = {
  modelTypes: faceLandmarkModelTypes,
  modelPath: faceLandmarkModelTypes["full"],
  detect: true,
  detector: void 0,
  results: void 0,
  resultsName: "faceLandmarkResults",
  numFaces: 1,
  minDetectionConfidence: 0.5,
  minPresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
  outputBlendshapes: true,
  outputTransformationMatrixes: true,
  draw: (state, canvas) => drawFaceLandmarks(state, canvas)
};
const createFaceLandmarker = async (wasm_path) => {
  console.log("Starting facial landmark detection");
  console.log(faceLandmarkState);
  const vision = await Xo.forVisionTasks(wasm_path);
  let faceLandmarker = await yh.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: faceLandmarkState.modelPath,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numFaces: parseInt(faceLandmarkState.numFaces),
    minDetectionConfidence: parseFloat(faceLandmarkState.minDetectionConfidence),
    minPresenceConfidence: parseFloat(faceLandmarkState.minPresenceConfidence),
    minTrackingConfidence: parseFloat(faceLandmarkState.minTrackingConfidence),
    outputFaceBlendshapes: Boolean(faceLandmarkState.outputBlendshapes),
    outputFacialTransformationMatrixes: Boolean(faceLandmarkState.outputTransformationMatrixes)
  });
  return faceLandmarker;
};
function drawFaceLandmarks(results, drawingUtils) {
  if (results && results.faceLandmarks) {
    for (const landmarks of results.faceLandmarks) {
      drawingUtils.drawConnectors(
        landmarks,
        yh.FACE_LANDMARKS_TESSELATION,
        { color: "#C0C0C070", lineWidth: 1 }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yh.FACE_LANDMARKS_RIGHT_EYE,
        { color: "#FF3030" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yh.FACE_LANDMARKS_RIGHT_EYEBROW,
        { color: "#FF3030" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yh.FACE_LANDMARKS_LEFT_EYE,
        { color: "#30FF30" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yh.FACE_LANDMARKS_LEFT_EYEBROW,
        { color: "#30FF30" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yh.FACE_LANDMARKS_FACE_OVAL,
        { color: "#E0E0E0" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yh.FACE_LANDMARKS_LIPS,
        { color: "#E0E0E0" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yh.FACE_LANDMARKS_RIGHT_IRIS,
        { color: "#FF3030" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yh.FACE_LANDMARKS_LEFT_IRIS,
        { color: "#30FF30" }
      );
    }
  }
}
let faceDetectorModelTypes = {
  "shortrange": "./mediapipe/models/face_detection/blaze_face_short_range.tflite"
};
let faceDetectorState = {
  modelTypes: faceDetectorModelTypes,
  modelPath: faceDetectorModelTypes["shortrange"],
  detect: true,
  landmarker: void 0,
  results: void 0,
  facesDiv: "",
  children: [],
  resultsName: "faceDetectorResults",
  minDetectionConfidence: 0.5,
  minSuppressionThreshold: 0.3,
  draw: (video2) => displayFaceDetections(video2)
};
const createFaceDetector = async (wasm_path, facesDiv2) => {
  console.log("Starting face detection");
  console.log(faceDetectorState);
  faceDetectorState.facesDiv = facesDiv2;
  const vision = await Xo.forVisionTasks(wasm_path);
  let faceDetector = await sh.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: faceDetectorState.modelPath,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    minSuppressionThreashold: parseFloat(faceDetectorState.minSuppressionThreashold),
    minDetectionConfidence: parseFloat(faceDetectorState.minDetectionConfidence)
  });
  return faceDetector;
};
function displayFaceDetections(video2) {
  let offsetRatioX = faceDetectorState.facesDiv.width / video2.width;
  let offsetRatioY = faceDetectorState.facesDiv.height / video2.height;
  for (let child of faceDetectorState.children) {
    faceDetectorState.facesDiv.removeChild(child);
  }
  faceDetectorState.children.splice(0);
  for (let detection of faceDetectorState.results.detections) {
    const p2 = document.createElement("p");
    p2.setAttribute("class", "info");
    p2.innerText = "Face - with " + Math.round(parseFloat(detection.categories[0].score) * 100) + "% confidence";
    p2.style = "left: " + detection.boundingBox.originX * offsetRatioX + "px;top: " + detection.boundingBox.originY * offsetRatioY + "px;";
    const highlighter = document.createElement("div");
    highlighter.setAttribute("class", "highlighter");
    highlighter.style = "left: " + detection.boundingBox.originX * offsetRatioX + "px;top: " + detection.boundingBox.originY * offsetRatioY + "px;width: " + detection.boundingBox.width * offsetRatioX + "px;height: " + detection.boundingBox.height * offsetRatioY + "px;";
    faceDetectorState.facesDiv.appendChild(highlighter);
    faceDetectorState.facesDiv.appendChild(p2);
    faceDetectorState.children.push(highlighter);
    faceDetectorState.children.push(p2);
    for (let keypoint of detection.keypoints) {
      const keypointEl = document.createElement("span");
      keypointEl.className = "key-point";
      keypointEl.style.top = `${keypoint.y * faceDetectorState.facesDiv.height}px`;
      keypointEl.style.left = `${keypoint.x * faceDetectorState.facesDiv.width}px`;
      faceDetectorState.facesDiv.appendChild(keypointEl);
      faceDetectorState.children.push(keypointEl);
    }
  }
}
let handModelTypes = {
  "full": "./mediapipe/models/hand_landmark_detection/hand_landmarker.task"
};
let handState = {
  modelTypes: handModelTypes,
  modelPath: handModelTypes["full"],
  detect: false,
  landmarker: void 0,
  results: void 0,
  resultsName: "handResults",
  numHands: 2,
  minDetectionConfidence: 0.5,
  minPresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
  draw: (state, canvas) => drawHandLandmarks(state, canvas)
};
const createHandLandmarker = async (WASM_PATH2, modelAssetPath) => {
  console.log("Starting hand landmark detection");
  console.log(handState);
  const vision = await Xo.forVisionTasks(WASM_PATH2);
  let handLandmarker = await kh.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: handState.modelPath,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numHands: parseInt(handState.numHands),
    minHandDetectionConfidence: parseFloat(handState.minDetectionConfidence),
    minHandPresenceConfidence: parseFloat(handState.minPresenceConfidence),
    minTrackingConfidence: parseFloat(handState.minTrackingConfidence)
  });
  return handLandmarker;
};
function drawHandLandmarks(results, drawingUtils) {
  if (results && results.landmarks) {
    for (const landmarks of results.landmarks) {
      drawingUtils.drawConnectors(
        landmarks,
        kh.HAND_CONNECTIONS,
        {
          color: "#00FF00",
          lineWidth: 5
        }
      );
      drawingUtils.drawLandmarks(landmarks, {
        color: "#FF0000",
        lineWidth: 2
      });
    }
  }
}
let gestureModelTypes = {
  "full": "./mediapipe/models/gesture_recognition/gesture_recognizer.task"
};
let gestureState = {
  modelTypes: gestureModelTypes,
  modelPath: gestureModelTypes["full"],
  detect: true,
  landmarker: void 0,
  results: void 0,
  resultsName: "gestureResults",
  numHands: 2,
  minDetectionConfidence: 0.5,
  minPresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
  maxResults: -1,
  scoreThreshold: 0.5,
  draw: (state, canvas) => drawHandGestures(state, canvas)
};
const createGestureLandmarker = async (WASM_PATH2) => {
  console.log("Starting gesture detection");
  console.log(gestureState);
  const vision = await Xo.forVisionTasks(WASM_PATH2);
  let handGestures = await Ah.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: gestureState.modelPath,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numHands: parseInt(gestureState.numHands),
    minHandDetectionConfidence: parseFloat(gestureState.minDetectionConfidence),
    minHandPresenceConfidence: parseFloat(gestureState.minPresenceConfidence),
    minTrackingConfidence: parseFloat(gestureState.minTrackingConfidence),
    cannedGesturesClassifierOptions: {
      maxResults: parseInt(gestureState.maxResults),
      scoreThreshold: parseFloat(gestureState.scoreThreshold)
    }
  });
  return handGestures;
};
function drawHandGestures(results, drawingUtils) {
  if (results && results.landmarks) {
    for (const landmarks of results.landmarks) {
      drawingUtils.drawConnectors(
        landmarks,
        Ah.HAND_CONNECTIONS,
        {
          color: "#00FF00",
          lineWidth: 5
        }
      );
      drawingUtils.drawLandmarks(landmarks, {
        color: "#FF0000",
        lineWidth: 2
      });
    }
  }
}
let poseModelTypes = {
  "lite": "./mediapipe/models/pose_landmark_detection/pose_landmarker_lite.task",
  "full": "./mediapipe/models/pose_landmark_detection/pose_landmarker_full.task",
  "heavy": "./mediapipe/models/pose_landmark_detection/pose_landmarker_heavy.task"
};
let poseState = {
  modelTypes: poseModelTypes,
  detect: true,
  modelPath: poseModelTypes["full"],
  landmarker: void 0,
  results: void 0,
  resultsName: "poseResults",
  numPoses: 1,
  minDetectionConfidence: 0.5,
  minPresenceConfidence: 0.5,
  minTrackingConfidence: 0.5,
  draw: (state, canvas) => drawPoseLandmarks$1(state, canvas)
};
const createPoseLandmarker = async (WASM_PATH2) => {
  console.log("Starting pose detection");
  console.log(poseState);
  const vision = await Xo.forVisionTasks(WASM_PATH2);
  console.log("numPoses", parseInt(poseState.numPoses));
  let poseLandmarker = await hc.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: poseState.modelPath,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    numPoses: parseInt(poseState.numPoses),
    minPoseDetectionConfidence: parseFloat(poseState.minDetectionConfidence),
    minPosePresenceConfidence: parseFloat(poseState.minPresenceConfidence),
    minTrackingConfidence: parseFloat(poseState.minTrackingConfidence)
  });
  return poseLandmarker;
};
function drawPoseLandmarks$1(results, drawingUtils) {
  if (results && results.landmarks) {
    for (const landmark of results.landmarks) {
      drawingUtils.drawLandmarks(landmark, {
        radius: (data) => Na.lerp(data.from.z, -0.15, 0.1, 5, 1)
      });
      drawingUtils.drawConnectors(
        landmark,
        hc.POSE_CONNECTIONS
      );
    }
  }
}
let objectModelTypes = {
  "lite": "./mediapipe/models/object_detection/ssd_mobilenet_v2.tflite",
  "full": "./mediapipe/models/object_detection/efficientdet_lite0.tflite",
  "accurate": "./mediapipe/models/object_detection/efficientdet_lite2.tflite"
};
let objectState = {
  modelTypes: objectModelTypes,
  detect: true,
  modelPath: objectModelTypes["full"],
  detector: void 0,
  results: void 0,
  objectsDiv: "",
  children: [],
  resultsName: "objectResults",
  maxResults: -1,
  scoreThreshold: 0.5,
  draw: (video2) => drawObjects$1(video2)
};
const createObjectDetector = async (WASM_PATH2, objectsDiv2) => {
  console.log("Starting object detection");
  console.log(objectState);
  objectState.objectsDiv = objectsDiv2;
  const vision = await Xo.forVisionTasks(WASM_PATH2);
  let objectDetector = await ic.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: objectState.modelPath,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    maxResults: parseInt(objectState.maxResults),
    scoreThreshold: parseFloat(objectState.scoreThreshold)
  });
  return objectDetector;
};
function drawObjects$1(video2) {
  let offsetRatioX = objectState.objectsDiv.width / video2.width;
  let offsetRatioY = objectState.objectsDiv.height / video2.height;
  for (let child of objectState.children) {
    objectState.objectsDiv.removeChild(child);
  }
  objectState.children.splice(0);
  for (let detection of objectState.results.detections) {
    const p2 = document.createElement("p");
    p2.innerText = detection.categories[0].categoryName + " - with " + Math.round(parseFloat(detection.categories[0].score) * 100) + "% confidence";
    p2.style = "left: " + detection.boundingBox.originX * offsetRatioX + "px;top: " + detection.boundingBox.originY * offsetRatioY + "px;";
    const highlighter = document.createElement("div");
    highlighter.setAttribute("class", "highlighter");
    highlighter.style = "left: " + detection.boundingBox.originX * offsetRatioX + "px;top: " + detection.boundingBox.originY * offsetRatioY + "px;width: " + detection.boundingBox.width * offsetRatioX + "px;height: " + detection.boundingBox.height * offsetRatioY + "px;";
    objectState.objectsDiv.appendChild(highlighter);
    objectState.objectsDiv.appendChild(p2);
    objectState.children.push(highlighter);
    objectState.children.push(p2);
  }
}
let imageModelTypes = {
  "full": "./mediapipe/models/image_classification/efficientnet_lite0.tflite",
  "accurate": "./mediapipe/models/image_classification/efficientnet_lite2.tflite"
};
let imageState = {
  modelTypes: imageModelTypes,
  detect: false,
  modelPath: imageModelTypes["full"],
  detector: void 0,
  results: void 0,
  objectsDiv: "",
  children: [],
  resultsName: "imageResults",
  maxResults: -1,
  scoreThreshold: 0.5,
  draw: () => drawObjects()
};
const createImageClassifier = async (WASM_PATH2) => {
  console.log("Starting image classifier: " + imageState);
  const vision = await Xo.forVisionTasks(WASM_PATH2);
  let imageClassifier = await Mh.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: imageState.modelPath,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    maxResults: parseInt(imageState.maxResults),
    scoreThreshold: parseFloat(imageState.scoreThreshold)
  });
  return imageClassifier;
};
let segmentationModelTypes = {
  selfieSquare: "./mediapipe/models/image_segmentation/selfie_segmenter.tflite",
  selfieLandscape: "./mediapipe/models/image_segmentation/selfie_segmenter_landscape.tflite",
  hairSegmenter: "./mediapipe/models/image_segmentation/hair_segmenter.tflite",
  selfieMulticlass: "./mediapipe/models/image_segmentation/selfie_multiclass_256x256.tflite",
  deepLabV3: "./mediapipe/models/image_segmentation/deeplab_v3.tflite"
};
let segmenterState = {
  modelTypes: segmentationModelTypes,
  detect: false,
  modelPath: segmentationModelTypes["selfieMulticlass"],
  detector: void 0,
  results: void 0,
  segmentationCanvas: "",
  videoElement: "",
  labels: [],
  resultsName: "segmenterResults",
  legendColors: [
    [0, 0, 0, 0],
    // Background
    [193, 0, 32, 255],
    // Hair // Vivid Red
    [255, 0, 255, 255],
    // Body-skin
    [255, 197, 0, 255],
    // Face Skin // Vivid Yellow
    [0, 255, 0, 255],
    // Clothes
    [0, 225, 225, 255],
    // Accessories
    [255, 255, 255, 255],
    // Selfie // White
    [0, 0, 255, 255],
    [0, 0, 0, 255],
    [0, 125, 52, 255],
    // Vivid Green
    [0, 83, 138, 255],
    // Strong Blue
    [128, 62, 117, 255],
    // Strong Purple
    [255, 104, 0, 255],
    // Vivid Orange
    [166, 189, 215, 255],
    // Very Light Blue
    [206, 162, 98, 255],
    // Grayish Yellow
    [129, 112, 102, 255],
    // Medium Gray
    [246, 118, 142, 255],
    // Strong Purplish Pink
    [255, 112, 92, 255],
    // Strong Yellowish Pink
    [83, 55, 112, 255],
    // Strong Violet
    [255, 142, 0, 255],
    // Vivid Orange Yellow
    [179, 40, 81, 255],
    // Strong Purplish Red
    [244, 200, 0, 255],
    // Vivid Greenish Yellow
    [127, 24, 13, 255],
    // Strong Reddish Brown
    [147, 170, 0, 255],
    // Vivid Yellowish Green
    [89, 51, 21, 255],
    // Deep Yellowish Brown
    [241, 58, 19, 255],
    // Vivid Reddish Orange
    [35, 44, 22, 255]
    // Dark Olive Green
  ],
  toImageBitmap: void 0,
  showMultiClassBackgroundOnly: false,
  draw: () => drawSegmentation()
};
const createImageSegmenter = async (WASM_PATH2, videoElement, segmentationCanvas2) => {
  segmenterState.videoElement = videoElement;
  segmenterState.segmentationCanvas = segmentationCanvas2;
  console.log("Starting image segmentation");
  console.log(segmenterState);
  const vision = await Xo.forVisionTasks(WASM_PATH2);
  let imageSegmenter = await Uh.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: segmenterState.modelPath,
      delegate: "GPU"
    },
    canvas: segmenterState.segmentationCanvas,
    runningMode: "VIDEO",
    outputCategoryMask: true,
    outputConfidenceMasks: true
  });
  segmenterState.legendColors = segmenterState.legendColors.map(
    (color) => color.map((channel) => channel / 255)
  );
  segmenterState.toImageBitmap = createCopyTextureToCanvas;
  segmenterState.labels = imageSegmenter.getLabels();
  console.log(segmenterState.labels);
  return imageSegmenter;
};
const createShaderProgram = (gl) => {
  const vs2 = `
      attribute vec2 position;
      varying vec2 texCoords;
    
      void main() {
        texCoords = (position + 1.0) / 2.0;
        texCoords.y = 1.0 - texCoords.y;
        gl_Position = vec4(position, 0, 1.0);
      }
    `;
  const fs2 = `
        precision highp float;
        varying vec2 texCoords;
        uniform sampler2D masks[6]; // Array of mask samplers
        uniform vec4 colors[6];     // Array of mask colors
        uniform bool showBackgroundOnly;
    
        void main() {
            vec4 finalColor = vec4(0.0);
            if(showBackgroundOnly) {
                float maskValue = pow(1.-clamp(texture2D(masks[0], texCoords).r, 0.0, 1.0), 2.55);
                finalColor = vec4(maskValue, maskValue, maskValue, maskValue);
            } else {
                for(int i = 0; i < 6; i++) {
                    float maskValue = texture2D(masks[i], texCoords).r;
                    finalColor += maskValue * colors[i];
                }
            }
            gl_FragColor = finalColor;
        }
    `;
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  if (!vertexShader) {
    throw Error("can not create vertex shader");
  }
  gl.shaderSource(vertexShader, vs2);
  gl.compileShader(vertexShader);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  if (!fragmentShader) {
    throw Error("can not create fragment shader");
  }
  gl.shaderSource(fragmentShader, fs2);
  gl.compileShader(fragmentShader);
  const program = gl.createProgram();
  if (!program) {
    throw Error("can not create program");
  }
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  return {
    vertexShader,
    fragmentShader,
    shaderProgram: program,
    attribLocations: {
      position: gl.getAttribLocation(program, "position")
    },
    uniformLocations: {
      masks: Array.from({ length: 6 }).map(
        (_2, i2) => gl.getUniformLocation(program, `masks[${i2}]`)
      ),
      colors: Array.from({ length: 6 }).map(
        (_2, i2) => gl.getUniformLocation(program, `colors[${i2}]`)
      ),
      showBackgroundOnly: gl.getUniformLocation(program, "showBackgroundOnly")
    }
  };
};
const createVertexBuffer = (gl) => {
  if (!gl) {
    return null;
  }
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, 1, -1, -1, 1, 1, 1, -1]),
    gl.STATIC_DRAW
  );
  return vertexBuffer;
};
function createCopyTextureToCanvas(results) {
  const gl = segmenterState.segmentationCanvas.getContext("webgl2");
  if (!gl) {
    return void 0;
  }
  const {
    shaderProgram,
    attribLocations: { position: positionLocation },
    uniformLocations: { masks, colors, showBackgroundOnly }
  } = createShaderProgram(gl);
  const vertexBuffer = createVertexBuffer(gl);
  gl.viewport(0, 0, segmenterState.segmentationCanvas.width, segmenterState.segmentationCanvas.height);
  gl.clearColor(1, 1, 1, 1);
  gl.useProgram(shaderProgram);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLocation);
  const canvasAspect = segmenterState.segmentationCanvas.width / segmenterState.segmentationCanvas.height;
  const imageAspect = segmenterState.videoElement.videoWidth / segmenterState.videoElement.videoHeight;
  let scaleY = 1;
  let scaleX = imageAspect / canvasAspect;
  if (results.confidenceMasks.length == 1) {
    const maskTexture = results.confidenceMasks[0].getAsWebGLTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, maskTexture);
    gl.uniform1i(masks[0], 0);
    gl.uniform4fv(colors[0], [1, 1, 1, 1]);
  } else {
    gl.uniform1i(showBackgroundOnly, segmenterState.showMultiClassBackgroundOnly);
    for (let i2 = 0; i2 < results.confidenceMasks.length; i2++) {
      const maskTexture = results.confidenceMasks[i2].getAsWebGLTexture();
      gl.activeTexture(gl.TEXTURE0 + i2);
      gl.bindTexture(gl.TEXTURE_2D, maskTexture);
      gl.uniform1i(masks[i2], i2);
      gl.uniform4fv(colors[i2], segmenterState.legendColors[i2]);
    }
  }
  const maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
  if (results.confidenceMasks.length > maxTextureUnits) {
    console.error("Too many textures!");
  }
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
let imageEmbedderModelTypes = {
  "small": "./mediapipe/models/image_embedder/mobilenet_v3_small.tflite",
  "large": "./mediapipe/models/image_embedder/mobilenet_v3_large.tflite"
};
let imageEmbedderState = {
  modelTypes: imageEmbedderModelTypes,
  detect: true,
  modelPath: imageEmbedderModelTypes["large"],
  landmarker: void 0,
  results: void 0,
  resultsName: "imageEmbedderResults",
  draw: (state, canvas) => drawPoseLandmarks(state, canvas)
};
const createImageEmbedder = async (WASM_PATH2) => {
  console.log("Starting Image Embedder");
  const vision = await Xo.forVisionTasks(WASM_PATH2);
  let imageEmbedder2 = await Ph.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: imageEmbedderState.modelPath
    },
    runningMode: "VIDEO"
  });
  return imageEmbedder2;
};
async function predictWebcam$1() {
  if (runningMode === "IMAGE") {
    runningMode = "VIDEO";
    await imageEmbedder.setOptions({ runningMode });
  }
  const startTimeMs = performance.now();
  const embedderResult = await imageEmbedder.embedForVideo(video, startTimeMs);
  if (uploadImageEmbedderResult != null) {
    const similarity = Ph.cosineSimilarity(
      uploadImageEmbedderResult.embeddings[0],
      embedderResult.embeddings[0]
    );
    videoResult.className = "";
    videoResult.innerText = "Image similarity: " + similarity.toFixed(2);
  }
  window.requestAnimationFrame(predictWebcam$1);
}
const canvasElement$1 = document.getElementById("output_canvas");
const canvasCtx = canvasElement$1.getContext("2d");
const offscreenCanvas = document.createElement("canvas");
const offscreenCtx = offscreenCanvas.getContext("2d");
let webcamState = {
  videoElement: "",
  webcamRunning: false,
  webcamDevices: [],
  webcamLabel: "",
  webcamId: "default",
  lastVideoTime: -1,
  targetFrameRate: 30,
  width: 1280,
  height: 720,
  frameRate: 30,
  flipped: 0,
  offscreenCanvas,
  offscreenCtx,
  drawingUtils: new Na(canvasCtx),
  startWebcam: () => changeWebcam(webcamState.webcamLabel),
  changeWebcam: (webcam) => changeWebcam(webcam)
};
let socketState = {
  adddress: "ws://localhost",
  port: "3002",
  ws: void 0
};
let overlayState = {
  show: true
};
let outputState = {
  width: 1280,
  height: 720
};
async function changeWebcam(webcam) {
  var _a2;
  console.log("Attempting to change webcam to " + webcam);
  var webcamFound = true;
  if (webcam !== webcamState.webcamLabel) {
    webcamFound = false;
    if (!((_a2 = navigator.mediaDevices) == null ? void 0 : _a2.enumerateDevices)) {
      console.log("enumerateDevices() not supported.");
    } else {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices = devices.filter((device) => device.kind === "videoinput");
        webcamState.webcamDevices = devices;
        devices.forEach((device) => {
          if (device.label == webcam) {
            webcamState.webcamId = device.deviceId;
            console.log("Found webcam: " + device.label);
            console.log("Reported capabilities:", device.getCapabilities());
            webcamFound = true;
          }
        });
        if (!webcamFound) {
          console.log("Can't find webcam: " + webcamState.webcamLabel);
        } else if (!webcamState.webcamRunning || webcamState.webcamLabel != webcam) {
          webcamState.webcamLabel = webcam;
          startNewWebcam();
        }
      }).catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
    }
  }
  if (webcamState.flipped) {
    webcamState.videoElement.style.transform = "scaleX(-1)";
  } else {
    webcamState.videoElement.style.transform = "scaleX(1)";
  }
}
async function startNewWebcam() {
  const constraints = {
    video: {
      deviceId: {
        exact: webcamState.webcamId
      },
      width: {
        exact: webcamState.width
      },
      height: {
        exact: webcamState.height
      },
      aspectRatio: 1.7777777777777777,
      frameRate: {
        ideal: webcamState.targetFrameRate
      }
    }
  };
  if (webcamState.webcamRunning) {
    const tracks = webcamState.videoElement.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    webcamState.webcamRunning = false;
  }
  try {
    let stream = await navigator.mediaDevices.getUserMedia(constraints);
    webcamState.videoElement.srcObject = stream;
    stream.getTracks().forEach(function(track) {
      let trackSettings = track.getSettings();
      webcamState.frameRate = trackSettings.frameRate;
      console.log("Webcam started with following settings: ", trackSettings);
    });
    webcamState.webcamRunning = true;
    webcamState.videoElement.height = webcamState.height;
    socketState.ws.send(JSON.stringify({ success: "webcamStarted" }));
  } catch (err) {
    console.log("Error starting webcam: " + err.name + ": " + err.message);
    socketState.ws.send(JSON.stringify({ error: "webcamStartFail" }));
  }
  offscreenCanvas.width = webcamState.width;
  offscreenCanvas.height = webcamState.height;
}
const configMap = {
  "Wsaddress": (value) => socketState.adddress = value,
  "Wsport": (value) => socketState.port = value,
  "Webcam": (value) => webcamState.changeWebcam(value),
  "Wheight": (value) => webcamState.height = value,
  "Wwidth": (value) => webcamState.width = value,
  "Wtargetframerate": (value) => webcamState.targetFrameRate = value,
  "Wflip": (value) => {
    webcamState.flipped = parseInt(value) === 1;
    webcamState.changeWebcam(webcamState.webcamLabel);
  },
  "Oheight": (value) => outputState.height = value,
  "Owidth": (value) => outputState.width = value,
  "Detectfacelandmarks": (value) => detectSwitch(faceLandmarkState, parseInt(value) === 1),
  "Detectfaces": (value) => detectSwitch(faceDetectorState, parseInt(value) === 1),
  "Detectgestures": (value) => detectSwitch(gestureState, parseInt(value) === 1),
  "Detecthands": (value) => detectSwitch(handState, parseInt(value) === 1),
  "Detectposes": (value) => detectSwitch(poseState, parseInt(value) === 1),
  "Detectobjects": (value) => detectSwitch(objectState, parseInt(value) === 1),
  "Detectimages": (value) => detectSwitch(imageState, parseInt(value) === 1),
  "Detectsegments": (value) => detectSwitch(segmenterState, parseInt(value) === 1),
  "Detectimageembeddings": (value) => detectSwitch(imageEmbedderState, parseInt(value) === 1),
  "Showoverlays": (value) => overlaySwitch(parseInt(value) === 1),
  "Hnumhands": (value) => handState.numHands = value,
  "Hdetectconf": (value) => handState.minDetectionConfidence = value,
  "Hpresconf": (value) => handState.minPresenceConfidence = value,
  "Htrackconf": (value) => handState.minTrackingConfidence = value,
  "Gnumhands": (value) => gestureState.numHands = value,
  "Gdetectconf": (value) => gestureState.minDetectionConfidence = value,
  "Gpresconf": (value) => gestureState.minPresenceConfidence = value,
  "Gtrackconf": (value) => gestureState.minTrackingConfidence = value,
  "Gnumgestures": (value) => gestureState.maxNumGestures = value,
  "Gscore": (value) => gestureState.scoreThreshold = value,
  "Jointthreshold": "",
  "Posemodeltype": (value) => modelCheck(poseState, value),
  "Pnumposes": (value) => poseState.numPoses = value,
  "Pdetectconf": (value) => poseState.minDetectionConfidence = value,
  "Ppresconf": (value) => poseState.minPresenceConfidence = value,
  "Ptrackconf": (value) => poseState.minTrackingConfidence = value,
  "Fnumfaces": (value) => faceLandmarkState.numFaces = value,
  "Fblendshapes": (value) => faceLandmarkState.outputBlendshapes = parseInt(value) === 1,
  "Ftransmtrx": (value) => faceLandmarkState.outputTransformationMatrixes = parseInt(value) === 1,
  "Fpresconf": (value) => faceLandmarkState.minPresenceConfidence = value,
  "Fdetectconf": (value) => faceLandmarkState.minDetectionConfidence = value,
  "Ftrackconf": (value) => faceLandmarkState.minTrackingConfidence = value,
  "Fdtype": (value) => modelCheck(faceDetectorState, value),
  "Fdminconf": (value) => faceDetectorState.minDetectionConfidence = value,
  "Fdminsuppression": (value) => faceDetectorState.minSuppressionThreshold = value,
  "Onumobjects": (value) => objectState.maxResults = value,
  "Omodeltype": (value) => modelCheck(objectState, value),
  "Oscore": (value) => objectState.scoreThreshold = value,
  "Inumoresults": (value) => imageState.maxResults = value,
  "Imodeltype": (value) => modelCheck(imageState, value),
  "Iscore": (value) => imageState.scoreThreshold = value,
  "Smodeltype": (value) => modelCheck(segmenterState, value),
  "Sshowmulticlassbackgroundonly": (value) => segmenterState.showMultiClassBackgroundOnly = parseInt(value) === 1,
  "Iemodeltype": (value) => modelCheck(imageEmbedderState, value)
  // 'Scolor0r': value => segmenterState.legendColors[0][0] = Math.round(value * 255.0),
  // 'Scolor0g': value => segmenterState.legendColors[0][1] = Math.round(value * 255.0),
  // 'Scolor0b': value => segmenterState.legendColors[0][2] = Math.round(value * 255.0),
  // 'Scolor1r': value => segmenterState.legendColors[1][0] = Math.round(value * 255.0),
  // 'Scolor1g': value => segmenterState.legendColors[1][1] = Math.round(value * 255.0),
  // 'Scolor1b': value => segmenterState.legendColors[1][2] = Math.round(value * 255.0),
  // 'Scolor2r': value => segmenterState.legendColors[2][0] = Math.round(value * 255.0),
  // 'Scolor2g': value => segmenterState.legendColors[2][1] = Math.round(value * 255.0),
  // 'Scolor2b': value => segmenterState.legendColors[2][2] = Math.round(value * 255.0),
  // 'Scolor3r': value => segmenterState.legendColors[3][0] = Math.round(value * 255.0),
  // 'Scolor3g': value => segmenterState.legendColors[3][1] = Math.round(value * 255.0),
  // 'Scolor3b': value => segmenterState.legendColors[3][2] = Math.round(value * 255.0),
  // 'Scolor4r': value => segmenterState.legendColors[4][0] = Math.round(value * 255.0),
  // 'Scolor4g': value => segmenterState.legendColors[4][1] = Math.round(value * 255.0),
  // 'Scolor4b': value => segmenterState.legendColors[4][2] = Math.round(value * 255.0),
  // 'Scolor5r': value => segmenterState.legendColors[5][0] = Math.round(value * 255.0),
  // 'Scolor5g': value => segmenterState.legendColors[5][1] = Math.round(value * 255.0),
  // 'Scolor5b': value => segmenterState.legendColors[5][2] = Math.round(value * 255.0),
  // 'Scolor6r': value => segmenterState.legendColors[6][0] = Math.round(value * 255.0),
  // 'Scolor6g': value => segmenterState.legendColors[6][1] = Math.round(value * 255.0),
  // 'Scolor6b': value => segmenterState.legendColors[6][2] = Math.round(value * 255.0),
};
function modelCheck(state, value) {
  console.log("Looking for model : " + value);
  if (state.modelTypes.hasOwnProperty(value)) {
    console.log("Setting : " + state.modelTypes[value]);
    state.modelPath = state.modelTypes[value];
  } else {
    console.error(`Invalid modelType: ${state.modelType}`);
  }
}
function detectSwitch(state, value) {
  if (value) {
    state.detect = true;
  } else {
    state.detect = false;
    state.results = null;
    if (objectState.children != null) {
      for (let child of objectState.children) {
        objectState.objectsDiv.removeChild(child);
      }
      objectState.children.splice(0);
    }
    if (faceDetectorState.children != null) {
      for (let child of faceDetectorState.children) {
        faceDetectorState.facesDiv.removeChild(child);
      }
      faceDetectorState.children.splice(0);
    }
    let video2 = document.getElementById("webcam");
    video2.style.opacity = 1;
    const ctx = document.getElementById("segmentation");
    const gl = ctx.getContext("webgl2");
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  }
}
function overlaySwitch(value) {
  overlayState.show = value;
  if (objectState.children != null) {
    for (let child of objectState.children) {
      objectState.objectsDiv.removeChild(child);
    }
    objectState.children.splice(0);
  }
  if (faceDetectorState.children != null) {
    for (let child of faceDetectorState.children) {
      faceDetectorState.facesDiv.removeChild(child);
    }
    faceDetectorState.children.splice(0);
  }
  let video2 = document.getElementById("webcam");
  video2.style.opacity = 1;
  const canvas = document.getElementById("segmentation");
}
const WASM_PATH = "./mediapipe/wasm";
const video$1 = document.getElementById("webcam");
let flippedVideo = null;
webcamState.videoElement = video$1;
const canvasElement = document.getElementById("output_canvas");
const objectsDiv = document.getElementById("objects");
const facesDiv = document.getElementById("faces");
const segmentationCanvas = document.getElementById("segmentation");
let allModelState = [faceLandmarkState, faceDetectorState, handState, gestureState, poseState, objectState, imageState, segmenterState, imageEmbedderState];
let landmarkerModelState = [faceLandmarkState, handState, gestureState, poseState];
(async function setup() {
  handleQueryParams();
  setupWebSocket(socketState.adddress + ":" + socketState.port, socketState);
  webcamState.webcamDevices = await getWebcamDevices();
  handState.landmarker = await createHandLandmarker(WASM_PATH);
  gestureState.landmarker = await createGestureLandmarker(WASM_PATH);
  faceLandmarkState.landmarker = await createFaceLandmarker(WASM_PATH);
  faceDetectorState.landmarker = await createFaceDetector(WASM_PATH, facesDiv);
  poseState.landmarker = await createPoseLandmarker(WASM_PATH);
  objectState.landmarker = await createObjectDetector(WASM_PATH, objectsDiv);
  imageState.landmarker = await createImageClassifier(WASM_PATH);
  segmenterState.landmarker = await createImageSegmenter(WASM_PATH, video$1, segmentationCanvas);
  imageEmbedderState.landmarker = await createImageEmbedder(WASM_PATH);
  webcamState.startWebcam();
  window.requestAnimationFrame(() => predictWebcam(allModelState, objectState, webcamState, video$1));
})();
function handleQueryParams() {
  socketState.port = window.location.port;
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.forEach((value, key) => {
    if (key in configMap) {
      configMap[key](decodeURIComponent(value));
    }
  });
}
function safeSocketSend(ws2, data) {
  if (ws2.readyState === ws2.OPEN) {
    ws2.send(data);
  }
}
async function predictWebcam(allModelState2, objectState2, webcamState2, video2) {
  let timeToDetect = 0;
  let timeToDraw = 0;
  if (!webcamState2.webcamRunning || video2.videoWidth === 0 || video2.videoHeight === 0) {
    window.requestAnimationFrame(() => predictWebcam(allModelState2, objectState2, webcamState2, video2));
    return;
  }
  canvasElement.style.width = outputState.width;
  canvasElement.style.height = outputState.height;
  canvasElement.width = outputState.width;
  canvasElement.height = outputState.height;
  objectsDiv.style.width = outputState.width;
  objectsDiv.style.height = outputState.height;
  objectsDiv.width = outputState.width;
  objectsDiv.height = outputState.height;
  facesDiv.style.width = outputState.width;
  facesDiv.style.height = outputState.height;
  facesDiv.width = outputState.width;
  facesDiv.height = outputState.height;
  segmentationCanvas.style.width = outputState.width;
  segmentationCanvas.style.height = outputState.height;
  segmentationCanvas.width = outputState.width;
  segmentationCanvas.height = outputState.height;
  webcamState2.offscreenCanvas.width = outputState.width;
  webcamState2.offscreenCanvas.height = outputState.height;
  let startTimeMs = performance.now();
  if (webcamState2.lastVideoTime !== video2.currentTime) {
    if (webcamState2.webcamRunning && !(video2.videoWidth === 0 || video2.videoHeight === 0)) {
      flippedVideo = captureAndFlipWebcam(video2, webcamState2);
    }
    let startDetect = Date.now();
    webcamState2.lastVideoTime = video2.currentTime;
    for (let landmarker of allModelState2) {
      if (landmarker.detect && landmarker.landmarker) {
        let marker = landmarker.landmarker;
        if (landmarker.resultsName === "segmenterResults") {
          video2.style.opacity = 0;
          await marker.segmentForVideo(flippedVideo, startTimeMs, segmenterState.toImageBitmap);
        } else if (landmarker.resultsName === "gestureResults") {
          landmarker.results = await marker.recognizeForVideo(flippedVideo, startTimeMs);
        } else if (landmarker.resultsName === "imageResults") {
          landmarker.results = await marker.classifyForVideo(flippedVideo, startTimeMs);
        } else if (landmarker.resultsName === "imageEmbedderResults") {
          landmarker.results = await marker.embedForVideo(video2, startTimeMs);
        } else {
          landmarker.results = await marker.detectForVideo(flippedVideo, startTimeMs);
        }
        safeSocketSend(socketState.ws, JSON.stringify({
          [landmarker["resultsName"]]: landmarker.results,
          "resolution": { "width": video2.videoWidth, "height": video2.videoHeight }
        }));
      }
      let endDetect = Date.now();
      timeToDetect = Math.round(endDetect - startDetect);
    }
  }
  let startDraw = Date.now();
  if (segmenterState.detect && segmenterState.results) {
  }
  if (overlayState.show) {
    for (let landmarker of landmarkerModelState) {
      if (landmarker.detect && landmarker.results) {
        landmarker.draw(landmarker.results, webcamState2.drawingUtils);
      }
    }
    if (objectState2.detect && objectState2.results) {
      objectState2.draw(flippedVideo);
    }
    if (faceDetectorState.detect && faceDetectorState.results) {
      faceDetectorState.draw(flippedVideo);
    }
  }
  let endDraw = Date.now();
  timeToDraw = Math.round(endDraw - startDraw);
  safeSocketSend(socketState.ws, JSON.stringify({ "timers": { "detectTime": timeToDetect, "drawTime": timeToDraw, "sourceFrameRate": webcamState2.frameRate } }));
  window.requestAnimationFrame(() => predictWebcam(allModelState2, objectState2, webcamState2, video2));
}
function setupWebSocket(socketURL, socketState2) {
  socketState2.ws = new WebSocket(socketURL);
  socketState2.ws.addEventListener("open", () => {
    console.log("WebSocket connection opened");
    socketState2.ws.send("pong");
    getWebcamDevices().then((devices) => {
      socketState2.ws.send(JSON.stringify({ type: "webcamDevices", devices }));
    });
  });
  socketState2.ws.addEventListener("message", async (event) => {
    if (event.data === "ping" || event.data === "pong") return;
    const data = JSON.parse(event.data);
    for (let [key, value] of Object.entries(data)) {
      if (key in configMap) {
        console.log("Got WS dats: " + key + " : " + value);
        configMap[key](value);
      }
    }
  });
  socketState2.ws.addEventListener("error", (error) => {
    console.error("Error in websocket connection", error);
  });
  socketState2.ws.addEventListener("close", () => {
    console.log("Socket connection closed");
  });
}
async function getWebcamDevices() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const webcams = devices.filter((device) => device.kind === "videoinput");
    return webcams.map(({ label }) => ({ label }));
  } catch (error) {
    console.error("Error getting webcam devices:", error);
    return [];
  }
}
function captureAndFlipWebcam(video2, webcamState2) {
  let offscreenCanvas2 = webcamState2.offscreenCanvas;
  let offscreenCtx2 = webcamState2.offscreenCtx;
  offscreenCtx2.clearRect(0, 0, offscreenCanvas2.width, offscreenCanvas2.height);
  if (webcamState2.flipped) {
    offscreenCtx2.save();
    offscreenCtx2.scale(-1, 1);
    offscreenCtx2.drawImage(video2, -offscreenCanvas2.width, 0, offscreenCanvas2.width, offscreenCanvas2.height);
    offscreenCtx2.restore();
  } else {
    offscreenCtx2.drawImage(video2, 0, 0, offscreenCanvas2.width, offscreenCanvas2.height);
  }
  return offscreenCanvas2;
}
