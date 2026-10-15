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
function e(e2, r2) {
  t: {
    for (var n2 = ["CLOSURE_FLAGS"], i2 = t, s2 = 0; s2 < n2.length; s2++) if (null == (i2 = i2[n2[s2]])) {
      n2 = null;
      break t;
    }
    n2 = i2;
  }
  return null != (e2 = n2 && n2[e2]) ? e2 : r2;
}
function r(e2, r2) {
  e2 = e2.split(".");
  for (var n2, i2 = t; e2.length && (n2 = e2.shift()); ) e2.length || void 0 === r2 ? i2 = i2[n2] && i2[n2] !== Object.prototype[n2] ? i2[n2] : i2[n2] = {} : i2[n2] = r2;
}
function n() {
  throw Error("Invalid UTF8");
}
function i(t2, e2) {
  return e2 = String.fromCharCode.apply(null, e2), null == t2 ? e2 : t2 + e2;
}
var s, o, a = void 0, h = "undefined" != typeof TextDecoder, u = "undefined" != typeof TextEncoder;
function c(t2) {
  if (u) t2 = (o || (o = new TextEncoder())).encode(t2);
  else {
    let r2 = 0, n2 = new Uint8Array(3 * t2.length);
    for (let i2 = 0; i2 < t2.length; i2++) {
      var e2 = t2.charCodeAt(i2);
      if (e2 < 128) n2[r2++] = e2;
      else {
        if (e2 < 2048) n2[r2++] = e2 >> 6 | 192;
        else {
          if (e2 >= 55296 && e2 <= 57343) {
            if (e2 <= 56319 && i2 < t2.length) {
              let s2 = t2.charCodeAt(++i2);
              if (s2 >= 56320 && s2 <= 57343) {
                e2 = 1024 * (e2 - 55296) + s2 - 56320 + 65536, n2[r2++] = e2 >> 18 | 240, n2[r2++] = e2 >> 12 & 63 | 128, n2[r2++] = e2 >> 6 & 63 | 128, n2[r2++] = 63 & e2 | 128;
                continue;
              }
              i2--;
            }
            e2 = 65533;
          }
          n2[r2++] = e2 >> 12 | 224, n2[r2++] = e2 >> 6 & 63 | 128;
        }
        n2[r2++] = 63 & e2 | 128;
      }
    }
    t2 = r2 === n2.length ? n2 : n2.subarray(0, r2);
  }
  return t2;
}
function l(e2) {
  t.setTimeout(() => {
    throw e2;
  }, 0);
}
var d = e(610401301, false), f = e(748402147, true);
function p() {
  var e2 = t.navigator;
  return e2 && (e2 = e2.userAgent) ? e2 : "";
}
var g, m = t.navigator;
function v(t2) {
  return v[" "](t2), t2;
}
g = m && m.userAgentData || null, v[" "] = function() {
};
var _ = {}, y = null;
function E(t2) {
  var e2 = t2.length, r2 = 3 * e2 / 4;
  r2 % 3 ? r2 = Math.floor(r2) : -1 != "=.".indexOf(t2[e2 - 1]) && (r2 = -1 != "=.".indexOf(t2[e2 - 2]) ? r2 - 2 : r2 - 1);
  var n2 = new Uint8Array(r2), i2 = 0;
  return function(t3, e3) {
    function r3(e4) {
      for (; n3 < t3.length; ) {
        let e5 = t3.charAt(n3++), r4 = y[e5];
        if (null != r4) return r4;
        if (!/^[\s\xa0]*$/.test(e5)) throw Error("Unknown base64 encoding at char: " + e5);
      }
      return e4;
    }
    A();
    for (var n3 = 0; ; ) {
      let t4 = r3(-1), n4 = r3(0), i3 = r3(64), s2 = r3(64);
      if (64 === s2 && -1 === t4) break;
      e3(t4 << 2 | n4 >> 4), 64 != i3 && (e3(n4 << 4 & 240 | i3 >> 2), 64 != s2 && e3(i3 << 6 & 192 | s2));
    }
  }(t2, function(t3) {
    n2[i2++] = t3;
  }), i2 !== r2 ? n2.subarray(0, i2) : n2;
}
function A() {
  if (!y) {
    y = {};
    var t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e2 = ["+/=", "+/", "-_=", "-_.", "-_"];
    for (let r2 = 0; r2 < 5; r2++) {
      let n2 = t2.concat(e2[r2].split(""));
      _[r2] = n2;
      for (let t3 = 0; t3 < n2.length; t3++) {
        let e3 = n2[t3];
        void 0 === y[e3] && (y[e3] = t3);
      }
    }
  }
}
var w = "undefined" != typeof Uint8Array, b = !(!(d && g && g.brands.length > 0) && (-1 != p().indexOf("Trident") || -1 != p().indexOf("MSIE"))) && "function" == typeof btoa, T = /[-_.]/g, k = { "-": "+", _: "/", ".": "=" };
function S(t2) {
  return k[t2] || "";
}
function L(t2) {
  if (!b) return E(t2);
  t2 = T.test(t2) ? t2.replace(T, S) : t2, t2 = atob(t2);
  var e2 = new Uint8Array(t2.length);
  for (let r2 = 0; r2 < t2.length; r2++) e2[r2] = t2.charCodeAt(r2);
  return e2;
}
function x(t2) {
  return w && null != t2 && t2 instanceof Uint8Array;
}
var R = {};
function I() {
  return C || (C = new N(null, R));
}
function F(t2) {
  M(R);
  var e2 = t2.g;
  return null == (e2 = null == e2 || x(e2) ? e2 : "string" == typeof e2 ? L(e2) : null) ? e2 : t2.g = e2;
}
var C, N = class {
  h() {
    return new Uint8Array(F(this) || 0);
  }
  constructor(t2, e2) {
    if (M(e2), this.g = t2, null != t2 && 0 === t2.length) throw Error("ByteString should be constructed with non-empty values");
  }
};
function M(t2) {
  if (t2 !== R) throw Error("illegal external caller");
}
function O(t2, e2) {
  t2.__closure__error__context__984382 || (t2.__closure__error__context__984382 = {}), t2.__closure__error__context__984382.severity = e2;
}
var D = void 0;
function P(t2) {
  return O(t2 = Error(t2), "warning"), t2;
}
function $(t2, e2) {
  if (null != t2) {
    var r2 = D ?? (D = {}), n2 = r2[t2] || 0;
    n2 >= e2 || (r2[t2] = n2 + 1, O(t2 = Error(), "incident"), l(t2));
  }
}
function U() {
  return "function" == typeof BigInt;
}
var B = "function" == typeof Symbol && "symbol" == typeof Symbol();
function G(t2, e2, r2 = false) {
  return "function" == typeof Symbol && "symbol" == typeof Symbol() ? r2 && Symbol.for && t2 ? Symbol.for(t2) : null != t2 ? Symbol(t2) : Symbol() : e2;
}
var j, V = G("jas", void 0, true), H = G(void 0, "0di"), K = G(void 0, "1oa"), X = G(void 0, Symbol()), W = G(void 0, "0ub"), z = G(void 0, "0ubs"), Y = G(void 0, "0ubsb"), q = G(void 0, "0actk"), J = G("m_m", "kb", true), Z = G(), Q = { Va: { value: 0, configurable: true, writable: true, enumerable: false } }, tt = Object.defineProperties, et = B ? V : "Va", rt = [];
function nt(t2, e2) {
  B || et in t2 || tt(t2, Q), t2[et] |= e2;
}
function it(t2, e2) {
  B || et in t2 || tt(t2, Q), t2[et] = e2;
}
function st(t2) {
  return nt(t2, 34), t2;
}
function ot(t2) {
  return nt(t2, 8192), t2;
}
it(rt, 7), j = Object.freeze(rt);
var at = {};
function ht(t2, e2) {
  return void 0 === e2 ? t2.h !== ut && !!(2 & t2.A[et]) : !!(2 & e2) && t2.h !== ut;
}
var ut = {};
function ct(t2, e2) {
  if (null != t2) {
    if ("string" == typeof t2) t2 = t2 ? new N(t2, R) : I();
    else if (t2.constructor !== N) if (x(t2)) t2 = t2.length ? new N(new Uint8Array(t2), R) : I();
    else {
      if (!e2) throw Error();
      t2 = void 0;
    }
  }
  return t2;
}
class lt {
  constructor(t2, e2, r2) {
    this.g = t2, this.h = e2, this.j = r2;
  }
  next() {
    var t2 = this.g.next();
    return t2.done || (t2.value = this.h.call(this.j, t2.value)), t2;
  }
  [Symbol.iterator]() {
    return this;
  }
}
var dt = Object.freeze({});
function ft(t2, e2, r2) {
  var n2, i2 = 128 & e2 ? 0 : -1, s2 = t2.length;
  (n2 = !!s2) && (n2 = null != (n2 = t2[s2 - 1]) && "object" == typeof n2 && n2.constructor === Object);
  var o2 = s2 + (n2 ? -1 : 0);
  for (e2 = 128 & e2 ? 1 : 0; e2 < o2; e2++) r2(e2 - i2, t2[e2]);
  if (n2) {
    t2 = t2[s2 - 1];
    for (let e3 in t2) !isNaN(e3) && r2(+e3, t2[e3]);
  }
}
var pt = {};
function gt(t2) {
  return 128 & t2 ? pt : void 0;
}
function mt(t2) {
  return t2.ib = true, t2;
}
var vt = mt((t2) => "number" == typeof t2), _t = mt((t2) => "string" == typeof t2), yt = mt((t2) => "boolean" == typeof t2), Et = "function" == typeof t.BigInt && "bigint" == typeof t.BigInt(0);
function At(t2) {
  var e2 = t2;
  if (_t(e2)) {
    if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e2)) throw Error(String(e2));
  } else if (vt(e2) && !Number.isSafeInteger(e2)) throw Error(String(e2));
  return Et ? BigInt(t2) : t2 = yt(t2) ? t2 ? "1" : "0" : _t(t2) ? t2.trim() || "0" : String(t2);
}
var wt = mt((t2) => Et ? t2 >= Tt && t2 <= St : "-" === t2[0] ? Lt(t2, bt) : Lt(t2, kt)), bt = Number.MIN_SAFE_INTEGER.toString(), Tt = Et ? BigInt(Number.MIN_SAFE_INTEGER) : void 0, kt = Number.MAX_SAFE_INTEGER.toString(), St = Et ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
function Lt(t2, e2) {
  if (t2.length > e2.length) return false;
  if (t2.length < e2.length || t2 === e2) return true;
  for (let r2 = 0; r2 < t2.length; r2++) {
    let n2 = t2[r2], i2 = e2[r2];
    if (n2 > i2) return false;
    if (n2 < i2) return true;
  }
}
var xt, Rt = "function" == typeof Uint8Array.prototype.slice, It = 0, Ft = 0;
function Ct(t2) {
  var e2 = t2 >>> 0;
  It = e2, Ft = (t2 - e2) / 4294967296 >>> 0;
}
function Nt(t2) {
  if (t2 < 0) {
    Ct(-t2);
    let [e2, r2] = jt(It, Ft);
    It = e2 >>> 0, Ft = r2 >>> 0;
  } else Ct(t2);
}
function Mt(t2) {
  var e2 = xt || (xt = new DataView(new ArrayBuffer(8)));
  e2.setFloat32(0, +t2, true), Ft = 0, It = e2.getUint32(0, true);
}
function Ot(t2, e2) {
  var r2 = 4294967296 * e2 + (t2 >>> 0);
  return Number.isSafeInteger(r2) ? r2 : $t(t2, e2);
}
function Dt(t2, e2) {
  return At(U() ? BigInt.asUintN(64, (BigInt(e2 >>> 0) << BigInt(32)) + BigInt(t2 >>> 0)) : $t(t2, e2));
}
function Pt(t2, e2) {
  return U() ? At(BigInt.asIntN(64, (BigInt.asUintN(32, BigInt(e2)) << BigInt(32)) + BigInt.asUintN(32, BigInt(t2)))) : At(Bt(t2, e2));
}
function $t(t2, e2) {
  if (t2 >>>= 0, (e2 >>>= 0) <= 2097151) var r2 = "" + (4294967296 * e2 + t2);
  else U() ? r2 = "" + (BigInt(e2) << BigInt(32) | BigInt(t2)) : (t2 = (16777215 & t2) + 6777216 * (r2 = 16777215 & (t2 >>> 24 | e2 << 8)) + 6710656 * (e2 = e2 >> 16 & 65535), r2 += 8147497 * e2, e2 *= 2, t2 >= 1e7 && (r2 += t2 / 1e7 >>> 0, t2 %= 1e7), r2 >= 1e7 && (e2 += r2 / 1e7 >>> 0, r2 %= 1e7), r2 = e2 + Ut(r2) + Ut(t2));
  return r2;
}
function Ut(t2) {
  return t2 = String(t2), "0000000".slice(t2.length) + t2;
}
function Bt(t2, e2) {
  if (2147483648 & e2) if (U()) t2 = "" + (BigInt(0 | e2) << BigInt(32) | BigInt(t2 >>> 0));
  else {
    let [r2, n2] = jt(t2, e2);
    t2 = "-" + $t(r2, n2);
  }
  else t2 = $t(t2, e2);
  return t2;
}
function Gt(t2) {
  if (t2.length < 16) Nt(Number(t2));
  else if (U()) t2 = BigInt(t2), It = Number(t2 & BigInt(4294967295)) >>> 0, Ft = Number(t2 >> BigInt(32) & BigInt(4294967295));
  else {
    let e2 = +("-" === t2[0]);
    Ft = It = 0;
    let r2 = t2.length;
    for (let n2 = e2, i2 = (r2 - e2) % 6 + e2; i2 <= r2; n2 = i2, i2 += 6) {
      let e3 = Number(t2.slice(n2, i2));
      Ft *= 1e6, (It = 1e6 * It + e3) >= 4294967296 && (Ft += Math.trunc(It / 4294967296), Ft >>>= 0, It >>>= 0);
    }
    if (e2) {
      let [t3, e3] = jt(It, Ft);
      It = t3, Ft = e3;
    }
  }
}
function jt(t2, e2) {
  return e2 = ~e2, t2 ? t2 = 1 + ~t2 : e2 += 1, [t2, e2];
}
function Vt(t2) {
  return Array.prototype.slice.call(t2);
}
var Ht = "function" == typeof BigInt ? BigInt.asIntN : void 0, Kt = "function" == typeof BigInt ? BigInt.asUintN : void 0, Xt = Number.isSafeInteger, Wt = Number.isFinite, zt = Math.trunc, Yt = At(0);
function qt(t2) {
  if ("number" != typeof t2) throw Error(`Value of float/double field must be a number, found ${typeof t2}: ${t2}`);
  return t2;
}
function Jt(t2) {
  return null == t2 || "number" == typeof t2 ? t2 : "NaN" === t2 || "Infinity" === t2 || "-Infinity" === t2 ? Number(t2) : void 0;
}
function Zt(t2) {
  if ("boolean" != typeof t2) {
    var e2 = typeof t2;
    throw Error(`Expected boolean but got ${"object" != e2 ? e2 : t2 ? Array.isArray(t2) ? "array" : e2 : "null"}: ${t2}`);
  }
  return t2;
}
var Qt = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function te(t2) {
  switch (typeof t2) {
    case "bigint":
      return true;
    case "number":
      return Wt(t2);
    case "string":
      return Qt.test(t2);
    default:
      return false;
  }
}
function ee(t2) {
  if (null != t2) {
    if (!Wt(t2)) throw P("enum");
    t2 |= 0;
  }
  return t2;
}
function re(t2) {
  if (null == t2) return t2;
  if ("string" == typeof t2 && t2) t2 = +t2;
  else if ("number" != typeof t2) return;
  return Wt(t2) ? 0 | t2 : void 0;
}
function ne(t2) {
  if (null == t2) return t2;
  if ("string" == typeof t2 && t2) t2 = +t2;
  else if ("number" != typeof t2) return;
  return Wt(t2) ? t2 >>> 0 : void 0;
}
function ie(t2, e2) {
  if (e2 ?? (e2 = 1024), !te(t2)) throw P("int64");
  var r2 = typeof t2;
  switch (e2) {
    case 512:
      switch (r2) {
        case "string":
          return ce(t2);
        case "bigint":
          return String(Ht(64, t2));
        default:
          return ue(t2);
      }
    case 1024:
      switch (r2) {
        case "string":
          return le(t2);
        case "bigint":
          return At(Ht(64, t2));
        default:
          return de(t2);
      }
    case 0:
      switch (r2) {
        case "string":
          return ce(t2);
        case "bigint":
          return At(Ht(64, t2));
        default:
          return ae(t2);
      }
    default:
      return function(t3, e3 = `unexpected value ${t3}!`) {
        throw Error(e3);
      }(e2, "Unknown format requested type for int64");
  }
}
function se(t2) {
  var e2 = t2.length;
  return ("-" === t2[0] ? e2 < 20 || 20 === e2 && t2 <= "-9223372036854775808" : e2 < 19 || 19 === e2 && t2 <= "9223372036854775807") ? t2 : (Gt(t2), Bt(It, Ft));
}
function oe(t2) {
  if ("-" === t2[0]) var e2 = false;
  else e2 = (e2 = t2.length) < 20 || 20 === e2 && t2 <= "18446744073709551615";
  return e2 ? t2 : (Gt(t2), $t(It, Ft));
}
function ae(t2) {
  if (t2 = zt(t2), !Xt(t2)) {
    Nt(t2);
    var e2 = It, r2 = Ft;
    (t2 = 2147483648 & r2) && (r2 = ~r2 >>> 0, 0 == (e2 = 1 + ~e2 >>> 0) && (r2 = r2 + 1 >>> 0)), t2 = "number" == typeof (e2 = Ot(e2, r2)) ? t2 ? -e2 : e2 : t2 ? "-" + e2 : e2;
  }
  return t2;
}
function he(t2) {
  return (t2 = zt(t2)) >= 0 && Xt(t2) || (Nt(t2), t2 = Ot(It, Ft)), t2;
}
function ue(t2) {
  return t2 = zt(t2), Xt(t2) ? t2 = String(t2) : (Nt(t2), t2 = Bt(It, Ft)), t2;
}
function ce(t2) {
  var e2 = zt(Number(t2));
  return Xt(e2) ? String(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), se(t2));
}
function le(t2) {
  var e2 = zt(Number(t2));
  return Xt(e2) ? At(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), U() ? At(Ht(64, BigInt(t2))) : At(se(t2)));
}
function de(t2) {
  return Xt(t2) ? At(ae(t2)) : At(ue(t2));
}
function fe(t2) {
  var e2 = typeof t2;
  return null == t2 ? t2 : "bigint" === e2 ? At(Ht(64, t2)) : te(t2) ? "string" === e2 ? le(t2) : de(t2) : void 0;
}
function pe(t2) {
  if (null == t2) return t2;
  var e2 = typeof t2;
  if ("bigint" === e2) return String(Ht(64, t2));
  if (te(t2)) {
    if ("string" === e2) return ce(t2);
    if ("number" === e2) return ae(t2);
  }
}
function ge(t2) {
  if (null == t2 || "string" == typeof t2 || t2 instanceof N) return t2;
}
function me(t2) {
  if ("string" != typeof t2) throw Error();
  return t2;
}
function ve(t2) {
  if (null != t2 && "string" != typeof t2) throw Error();
  return t2;
}
function _e(t2) {
  return null == t2 || "string" == typeof t2 ? t2 : void 0;
}
function ye(t2, e2, r2, n2) {
  return null != t2 && t2[J] === at ? t2 : Array.isArray(t2) ? ((n2 = (r2 = 0 | t2[et]) | 32 & n2 | 2 & n2) !== r2 && it(t2, n2), new e2(t2)) : (r2 ? 2 & n2 ? ((t2 = e2[H]) || (st((t2 = new e2()).A), t2 = e2[H] = t2), e2 = t2) : e2 = new e2() : e2 = void 0, e2);
}
function Ee(t2, e2, r2) {
  return null == (t2 = e2 ? ie(t2, 1024) : fe(t2)) ? r2 ? Yt : void 0 : t2;
}
function Ae(t2) {
  return t2;
}
var we = {}, be = function() {
  try {
    return v(new class extends Map {
      constructor() {
        super();
      }
    }()), false;
  } catch {
    return true;
  }
}();
class Te {
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
var ke = be ? (Object.setPrototypeOf(Te.prototype, Map.prototype), Object.defineProperties(Te.prototype, { size: { value: 0, configurable: true, enumerable: true, writable: true } }), Te) : class extends Map {
  constructor() {
    super();
  }
};
function Se(t2) {
  return t2;
}
function Le(t2) {
  if (2 & t2.M) throw Error("Cannot mutate an immutable Map");
}
var xe, Re = class extends ke {
  constructor(t2, e2, r2 = Se, n2 = Se) {
    super(), this.M = 0 | t2[et], this.N = e2, this.ba = r2, this.na = this.N ? Ie : n2;
    for (let i2 = 0; i2 < t2.length; i2++) {
      let s2 = t2[i2], o2 = r2(s2[0], false, true), a2 = s2[1];
      e2 ? void 0 === a2 && (a2 = null) : a2 = n2(s2[1], false, true, void 0, void 0, this.M), super.set(o2, a2);
    }
  }
  ea(t2) {
    return ot(Array.from(super.entries(), t2));
  }
  clear() {
    Le(this), super.clear();
  }
  delete(t2) {
    return Le(this), super.delete(this.ba(t2, true, false));
  }
  entries() {
    if (this.N) {
      var t2 = super.keys();
      t2 = new lt(t2, Fe, this);
    } else t2 = super.entries();
    return t2;
  }
  values() {
    if (this.N) {
      var t2 = super.keys();
      t2 = new lt(t2, Re.prototype.get, this);
    } else t2 = super.values();
    return t2;
  }
  forEach(t2, e2) {
    this.N ? super.forEach((r2, n2, i2) => {
      t2.call(e2, i2.get(n2), n2, i2);
    }) : super.forEach(t2, e2);
  }
  set(t2, e2) {
    return Le(this), null == (t2 = this.ba(t2, true, false)) ? this : null == e2 ? (super.delete(t2), this) : super.set(t2, this.na(e2, true, true, this.N, false, this.M));
  }
  gb(t2) {
    var e2 = this.ba(t2[0], false, true);
    t2 = t2[1], t2 = this.N ? void 0 === t2 ? null : t2 : this.na(t2, false, true, void 0, false, this.M), super.set(e2, t2);
  }
  has(t2) {
    return super.has(this.ba(t2, false, false));
  }
  get(t2) {
    t2 = this.ba(t2, false, false);
    var e2 = super.get(t2);
    if (void 0 !== e2) {
      var r2 = this.N;
      return r2 ? ((r2 = this.na(e2, false, true, r2, this.Fa, this.M)) !== e2 && super.set(t2, r2), r2) : e2;
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};
function Ie(t2, e2, r2, n2, i2, s2) {
  return t2 = ye(t2, n2, r2, s2), i2 && (t2 = Ze(t2)), t2;
}
function Fe(t2) {
  return [t2, this.get(t2)];
}
function Ce() {
  return xe || (xe = new Re(st([]), void 0, void 0, void 0, we));
}
function Ne(t2) {
  return X ? t2[X] : void 0;
}
function Me(t2, e2) {
  for (let r2 in t2) !isNaN(r2) && e2(t2, +r2, t2[r2]);
}
Re.prototype.toJSON = void 0;
var Oe, De, Pe, $e = class {
}, Ue = { cb: true };
function Be(t2, e2) {
  e2 < 100 || $(z, 1);
}
function Ge(t2, e2, r2, n2) {
  var i2 = void 0 !== n2;
  n2 = !!n2;
  var s2, o2 = X;
  !i2 && B && o2 && (s2 = t2[o2]) && Me(s2, Be), o2 = [];
  var a2 = t2.length;
  s2 = 4294967295;
  var h2 = false, u2 = !!(64 & e2), c2 = u2 ? 128 & e2 ? 0 : -1 : void 0;
  if (!(1 & e2)) {
    var l2 = a2 && t2[a2 - 1];
    null != l2 && "object" == typeof l2 && l2.constructor === Object ? s2 = --a2 : l2 = void 0, !u2 || 128 & e2 || i2 || (h2 = true, s2 = (Oe ?? Ae)(s2 - c2, c2, t2, l2, void 0) + c2);
  }
  e2 = void 0;
  for (var d2 = 0; d2 < a2; d2++) {
    let i3 = t2[d2];
    if (null != i3 && null != (i3 = r2(i3, n2))) if (u2 && d2 >= s2) {
      let t3 = d2 - c2;
      (e2 ?? (e2 = {}))[t3] = i3;
    } else o2[d2] = i3;
  }
  if (l2) for (let t3 in l2) {
    if (null == (a2 = l2[t3]) || null == (a2 = r2(a2, n2))) continue;
    let i3;
    d2 = +t3, u2 && !Number.isNaN(d2) && (i3 = d2 + c2) < s2 ? o2[i3] = a2 : (e2 ?? (e2 = {}))[t3] = a2;
  }
  return e2 && (h2 ? o2.push(e2) : o2[s2] = e2), i2 && X && (t2 = Ne(t2)) && t2 instanceof $e && (o2[X] = function(t3) {
    var e3 = new $e();
    return Me(t3, (t4, r3, n3) => {
      e3[r3] = Vt(n3);
    }), e3.ka = t3.ka, e3;
  }(t2)), o2;
}
function je(t2) {
  return t2[0] = Ve(t2[0]), t2[1] = Ve(t2[1]), t2;
}
function Ve(t2) {
  switch (typeof t2) {
    case "number":
      return Number.isFinite(t2) ? t2 : "" + t2;
    case "bigint":
      return wt(t2) ? Number(t2) : "" + t2;
    case "boolean":
      return t2 ? 1 : 0;
    case "object":
      if (Array.isArray(t2)) {
        var e2 = 0 | t2[et];
        return 0 === t2.length && 1 & e2 ? void 0 : Ge(t2, e2, Ve);
      }
      if (null != t2 && t2[J] === at) return He(t2);
      if (t2 instanceof N) {
        if (null == (e2 = t2.g)) t2 = "";
        else if ("string" == typeof e2) t2 = e2;
        else {
          if (b) {
            for (var r2 = "", n2 = 0, i2 = e2.length - 10240; n2 < i2; ) r2 += String.fromCharCode.apply(null, e2.subarray(n2, n2 += 10240));
            r2 += String.fromCharCode.apply(null, n2 ? e2.subarray(n2) : e2), e2 = btoa(r2);
          } else {
            void 0 === r2 && (r2 = 0), A(), r2 = _[r2], n2 = Array(Math.floor(e2.length / 3)), i2 = r2[64] || "";
            let t3 = 0, u2 = 0;
            for (; t3 < e2.length - 2; t3 += 3) {
              var s2 = e2[t3], o2 = e2[t3 + 1], a2 = e2[t3 + 2], h2 = r2[s2 >> 2];
              s2 = r2[(3 & s2) << 4 | o2 >> 4], o2 = r2[(15 & o2) << 2 | a2 >> 6], a2 = r2[63 & a2], n2[u2++] = h2 + s2 + o2 + a2;
            }
            switch (h2 = 0, a2 = i2, e2.length - t3) {
              case 2:
                a2 = r2[(15 & (h2 = e2[t3 + 1])) << 2] || i2;
              case 1:
                e2 = e2[t3], n2[u2] = r2[e2 >> 2] + r2[(3 & e2) << 4 | h2 >> 4] + a2 + i2;
            }
            e2 = n2.join("");
          }
          t2 = t2.g = e2;
        }
        return t2;
      }
      return t2 instanceof Re ? t2 = 0 !== t2.size ? t2.ea(je) : void 0 : void 0;
  }
  return t2;
}
function He(t2) {
  return Ge(t2 = t2.A, 0 | t2[et], Ve);
}
function Ke(t2, e2) {
  return Xe(t2, e2[0], e2[1]);
}
function Xe(t2, e2, r2, n2 = 0) {
  if (null == t2) {
    var i2 = 32;
    r2 ? (t2 = [r2], i2 |= 128) : t2 = [], e2 && (i2 = -16760833 & i2 | (1023 & e2) << 14);
  } else {
    if (!Array.isArray(t2)) throw Error("narr");
    if (i2 = 0 | t2[et], f && 1 & i2) throw Error("rfarr");
    if (2048 & i2 && !(2 & i2) && function() {
      if (f) throw Error("carr");
      $(q, 5);
    }(), 256 & i2) throw Error("farr");
    if (64 & i2) return (i2 | n2) !== i2 && it(t2, i2 | n2), t2;
    if (r2 && (i2 |= 128, r2 !== t2[0])) throw Error("mid");
    t: {
      i2 |= 64;
      var s2 = (r2 = t2).length;
      if (s2) {
        var o2 = s2 - 1;
        let t3 = r2[o2];
        if (null != t3 && "object" == typeof t3 && t3.constructor === Object) {
          if ((o2 -= e2 = 128 & i2 ? 0 : -1) >= 1024) throw Error("pvtlmt");
          for (var a2 in t3) (s2 = +a2) < o2 && (r2[s2 + e2] = t3[a2], delete t3[a2]);
          i2 = -16760833 & i2 | (1023 & o2) << 14;
          break t;
        }
      }
      if (e2) {
        if ((a2 = Math.max(e2, s2 - (128 & i2 ? 0 : -1))) > 1024) throw Error("spvt");
        i2 = -16760833 & i2 | (1023 & a2) << 14;
      }
    }
  }
  return it(t2, 64 | i2 | n2), t2;
}
function We(t2, e2) {
  if ("object" != typeof t2) return t2;
  if (Array.isArray(t2)) {
    var r2 = 0 | t2[et];
    return 0 === t2.length && 1 & r2 ? void 0 : ze(t2, r2, e2);
  }
  if (null != t2 && t2[J] === at) return qe(t2);
  if (t2 instanceof Re) {
    if (2 & (e2 = t2.M)) return t2;
    if (!t2.size) return;
    if (r2 = st(t2.ea()), t2.N) for (t2 = 0; t2 < r2.length; t2++) {
      let n2 = r2[t2], i2 = n2[1];
      i2 = null == i2 || "object" != typeof i2 ? void 0 : null != i2 && i2[J] === at ? qe(i2) : Array.isArray(i2) ? ze(i2, 0 | i2[et], !!(32 & e2)) : void 0, n2[1] = i2;
    }
    return r2;
  }
  return t2 instanceof N ? t2 : void 0;
}
function ze(t2, e2, r2) {
  return 2 & e2 || (!r2 || 4096 & e2 || 16 & e2 ? t2 = Je(t2, e2, false, r2 && !(16 & e2)) : (nt(t2, 34), 4 & e2 && Object.freeze(t2))), t2;
}
function Ye(t2, e2, r2) {
  return t2 = new t2.constructor(e2), r2 && (t2.h = ut), t2.m = ut, t2;
}
function qe(t2) {
  var e2 = t2.A, r2 = 0 | e2[et];
  return ht(t2, r2) ? t2 : rr(t2, e2, r2) ? Ye(t2, e2) : Je(e2, r2);
}
function Je(t2, e2, r2, n2) {
  return n2 ?? (n2 = !!(34 & e2)), t2 = Ge(t2, e2, We, n2), n2 = 32, r2 && (n2 |= 2), it(t2, e2 = 16769217 & e2 | n2), t2;
}
function Ze(t2) {
  var e2 = t2.A, r2 = 0 | e2[et];
  return ht(t2, r2) ? rr(t2, e2, r2) ? Ye(t2, e2, true) : new t2.constructor(Je(e2, r2, false)) : t2;
}
function Qe(t2) {
  if (t2.h !== ut) return false;
  var e2 = t2.A;
  return nt(e2 = Je(e2, 0 | e2[et]), 2048), t2.A = e2, t2.h = void 0, t2.m = void 0, true;
}
function tr(t2) {
  if (!Qe(t2) && ht(t2, 0 | t2.A[et])) throw Error();
}
function er(t2, e2) {
  void 0 === e2 && (e2 = 0 | t2[et]), 32 & e2 && !(4096 & e2) && it(t2, 4096 | e2);
}
function rr(t2, e2, r2) {
  return !!(2 & r2) || !(!(32 & r2) || 4096 & r2) && (it(e2, 2 | r2), t2.h = ut, true);
}
var nr = At(0), ir = {};
function sr(t2, e2, r2, n2) {
  if (null !== (e2 = or(t2.A, e2, void 0, n2)) || r2 && t2.m !== ut) return e2;
}
function or(t2, e2, r2, n2) {
  if (-1 === e2) return null;
  var i2 = e2 + (r2 ? 0 : -1), s2 = t2.length - 1;
  if (!(s2 < 1 + (r2 ? 0 : -1))) {
    if (i2 >= s2) {
      var o2 = t2[s2];
      if (null != o2 && "object" == typeof o2 && o2.constructor === Object) {
        r2 = o2[e2];
        var a2 = true;
      } else {
        if (i2 !== s2) return;
        r2 = o2;
      }
    } else r2 = t2[i2];
    if (n2 && null != r2) {
      if (null == (n2 = n2(r2))) return n2;
      if (!Object.is(n2, r2)) return a2 ? o2[e2] = n2 : t2[i2] = n2, n2;
    }
    return r2;
  }
}
function ar(t2, e2, r2, n2) {
  tr(t2);
  var i2 = t2.A;
  return hr(i2, 0 | i2[et], e2, r2, n2), t2;
}
function hr(t2, e2, r2, n2, i2) {
  var s2 = r2 + (i2 ? 0 : -1), o2 = t2.length - 1;
  if (o2 >= 1 + (i2 ? 0 : -1) && s2 >= o2) {
    let i3 = t2[o2];
    if (null != i3 && "object" == typeof i3 && i3.constructor === Object) return i3[r2] = n2, e2;
  }
  return s2 <= o2 ? (t2[s2] = n2, e2) : (void 0 !== n2 && (r2 >= (o2 = (e2 ?? (e2 = 0 | t2[et])) >> 14 & 1023 || 536870912) ? null != n2 && (t2[o2 + (i2 ? 0 : -1)] = { [r2]: n2 }) : t2[s2] = n2), e2);
}
function ur(t2, e2, r2, n2) {
  var i2 = t2.A;
  return void 0 !== kr(i2, 0 | i2[et], e2, t2 = Er(t2, n2) === r2 ? r2 : -1);
}
function cr() {
  return void 0 === dt ? 2 : 4;
}
function lr(t2, e2, r2, n2, i2) {
  var s2 = t2.A, o2 = 0 | s2[et];
  n2 = ht(t2, o2) ? 1 : n2, i2 = !!i2 || 3 === n2, 2 === n2 && Qe(t2) && (o2 = 0 | (s2 = t2.A)[et]);
  var a2 = (t2 = fr(s2, e2)) === j ? 7 : 0 | t2[et], h2 = pr(a2, o2), u2 = !(4 & h2);
  if (u2) {
    4 & h2 && (t2 = Vt(t2), a2 = 0, h2 = Nr(h2, o2), o2 = hr(s2, o2, e2, t2));
    let n3 = 0, i3 = 0;
    for (; n3 < t2.length; n3++) {
      let e3 = r2(t2[n3]);
      null != e3 && (t2[i3++] = e3);
    }
    i3 < n3 && (t2.length = i3), r2 = -513 & h2 | 4, h2 = r2 &= -1025, h2 &= -4097;
  }
  return h2 !== a2 && (it(t2, h2), 2 & h2 && Object.freeze(t2)), dr(t2, h2, s2, o2, e2, n2, u2, i2);
}
function dr(t2, e2, r2, n2, i2, s2, o2, a2) {
  var h2 = e2;
  return 1 === s2 || 4 === s2 && (2 & e2 || !(16 & e2) && 32 & n2) ? gr(e2) || ((e2 |= !t2.length || o2 && !(4096 & e2) || 32 & n2 && !(4096 & e2 || 16 & e2) ? 2 : 256) !== h2 && it(t2, e2), Object.freeze(t2)) : (2 === s2 && gr(e2) && (t2 = Vt(t2), h2 = 0, e2 = Nr(e2, n2), n2 = hr(r2, n2, i2, t2)), gr(e2) || (a2 || (e2 |= 16), e2 !== h2 && it(t2, e2))), 2 & e2 || !(4096 & e2 || 16 & e2) || er(r2, n2), t2;
}
function fr(t2, e2, r2) {
  return t2 = or(t2, e2, r2), Array.isArray(t2) ? t2 : j;
}
function pr(t2, e2) {
  return 2 & e2 && (t2 |= 2), 1 | t2;
}
function gr(t2) {
  return !!(2 & t2) && !!(4 & t2) || !!(256 & t2);
}
function mr(t2) {
  return ct(t2, true);
}
function vr(t2) {
  t2 = Vt(t2);
  for (let e2 = 0; e2 < t2.length; e2++) {
    let r2 = t2[e2] = Vt(t2[e2]);
    Array.isArray(r2[1]) && (r2[1] = st(r2[1]));
  }
  return ot(t2);
}
function _r(t2, e2, r2, n2) {
  tr(t2), hr(t2 = t2.A, 0 | t2[et], e2, ("0" === n2 ? 0 === Number(r2) : r2 === n2) ? void 0 : r2);
}
function yr(t2, e2, r2) {
  if (2 & e2) throw Error();
  var n2 = gt(e2), i2 = fr(t2, r2, n2), s2 = i2 === j ? 7 : 0 | i2[et], o2 = pr(s2, e2);
  return (2 & o2 || gr(o2) || 16 & o2) && (o2 === s2 || gr(o2) || it(i2, o2), i2 = Vt(i2), s2 = 0, o2 = Nr(o2, e2), hr(t2, e2, r2, i2, n2)), (o2 &= -13) !== s2 && it(i2, o2), i2;
}
function Er(t2, e2) {
  return br(Ar(t2 = t2.A), t2, void 0, e2);
}
function Ar(t2) {
  if (B) return t2[K] ?? (t2[K] = /* @__PURE__ */ new Map());
  if (K in t2) return t2[K];
  var e2 = /* @__PURE__ */ new Map();
  return Object.defineProperty(t2, K, { value: e2 }), e2;
}
function wr(t2, e2, r2, n2, i2) {
  var s2 = Ar(t2), o2 = br(s2, t2, e2, r2, i2);
  return o2 !== n2 && (o2 && (e2 = hr(t2, e2, o2, void 0, i2)), s2.set(r2, n2)), e2;
}
function br(t2, e2, r2, n2, i2) {
  var s2 = t2.get(n2);
  if (null != s2) return s2;
  s2 = 0;
  for (let t3 = 0; t3 < n2.length; t3++) {
    let o2 = n2[t3];
    null != or(e2, o2, i2) && (0 !== s2 && (r2 = hr(e2, r2, s2, void 0, i2)), s2 = o2);
  }
  return t2.set(n2, s2), s2;
}
function Tr(t2, e2, r2) {
  var n2 = 0 | t2[et], i2 = gt(n2), s2 = or(t2, r2, i2);
  if (null != s2 && s2[J] === at) {
    if (!ht(s2)) return Qe(s2), s2.A;
    var o2 = s2.A;
  } else Array.isArray(s2) && (o2 = s2);
  if (o2) {
    let t3 = 0 | o2[et];
    2 & t3 && (o2 = Je(o2, t3));
  }
  return (o2 = Ke(o2, e2)) !== s2 && hr(t2, n2, r2, o2, i2), o2;
}
function kr(t2, e2, r2, n2, i2) {
  var s2 = false;
  if (null != (n2 = or(t2, n2, i2, (t3) => {
    var n3 = ye(t3, r2, false, e2);
    return s2 = n3 !== t3 && null != n3, n3;
  }))) return s2 && !ht(n2) && er(t2, e2), n2;
}
function Sr(t2, e2, r2, n2) {
  var i2 = t2.A, s2 = 0 | i2[et];
  if (null == (e2 = kr(i2, s2, e2, r2, n2))) return e2;
  if (!ht(t2, s2 = 0 | i2[et])) {
    let o2 = Ze(e2);
    o2 !== e2 && (Qe(t2) && (s2 = 0 | (i2 = t2.A)[et]), er(i2, s2 = hr(i2, s2, r2, e2 = o2, n2)));
  }
  return e2;
}
function Lr(t2, e2, r2, n2, i2, s2, o2, a2) {
  var h2 = ht(t2, r2);
  s2 = h2 ? 1 : s2, o2 = !!o2 || 3 === s2, h2 = a2 && !h2, (2 === s2 || h2) && Qe(t2) && (r2 = 0 | (e2 = t2.A)[et]);
  var u2 = (t2 = fr(e2, i2)) === j ? 7 : 0 | t2[et], c2 = pr(u2, r2);
  if (a2 = !(4 & c2)) {
    var l2 = t2, d2 = r2;
    let e3 = !!(2 & c2);
    e3 && (d2 |= 2);
    let i3 = !e3, s3 = true, o3 = 0, a3 = 0;
    for (; o3 < l2.length; o3++) {
      let t3 = ye(l2[o3], n2, false, d2);
      if (t3 instanceof n2) {
        if (!e3) {
          let e4 = ht(t3);
          i3 && (i3 = !e4), s3 && (s3 = e4);
        }
        l2[a3++] = t3;
      }
    }
    a3 < o3 && (l2.length = a3), c2 |= 4, c2 = s3 ? -4097 & c2 : 4096 | c2, c2 = i3 ? 8 | c2 : -9 & c2;
  }
  if (c2 !== u2 && (it(t2, c2), 2 & c2 && Object.freeze(t2)), h2 && !(8 & c2 || !t2.length && (1 === s2 || 4 === s2 && (2 & c2 || !(16 & c2) && 32 & r2)))) {
    for (gr(c2) && (t2 = Vt(t2), c2 = Nr(c2, r2), r2 = hr(e2, r2, i2, t2)), n2 = t2, h2 = c2, u2 = 0; u2 < n2.length; u2++) (l2 = n2[u2]) !== (c2 = Ze(l2)) && (n2[u2] = c2);
    h2 |= 8, it(t2, c2 = h2 = n2.length ? 4096 | h2 : -4097 & h2);
  }
  return dr(t2, c2, e2, r2, i2, s2, a2, o2);
}
function xr(t2, e2, r2) {
  var n2 = t2.A;
  return Lr(t2, n2, 0 | n2[et], e2, r2, cr(), false, true);
}
function Rr(t2) {
  return null == t2 && (t2 = void 0), t2;
}
function Ir(t2, e2, r2, n2, i2) {
  return ar(t2, r2, n2 = Rr(n2), i2), n2 && !ht(n2) && er(t2.A), t2;
}
function Fr(t2, e2, r2, n2) {
  t: {
    var i2 = n2 = Rr(n2);
    tr(t2);
    let s2 = t2.A, o2 = 0 | s2[et];
    if (null == i2) {
      let t3 = Ar(s2);
      if (br(t3, s2, o2, r2) !== e2) break t;
      t3.set(r2, 0);
    } else o2 = wr(s2, o2, r2, e2);
    hr(s2, o2, e2, i2);
  }
  return n2 && !ht(n2) && er(t2.A), t2;
}
function Cr(t2, e2, r2) {
  tr(t2);
  var n2 = t2.A, i2 = 0 | n2[et];
  if (null == r2) return hr(n2, i2, e2), t2;
  var s2 = r2 === j ? 7 : 0 | r2[et], o2 = s2, a2 = gr(s2), h2 = a2 || Object.isFrozen(r2), u2 = true, c2 = true;
  for (let t3 = 0; t3 < r2.length; t3++) {
    var l2 = r2[t3];
    a2 || (l2 = ht(l2), u2 && (u2 = !l2), c2 && (c2 = l2));
  }
  return a2 || (s2 = u2 ? 13 : 5, s2 = c2 ? -4097 & s2 : 4096 | s2), h2 && s2 === o2 || (r2 = Vt(r2), o2 = 0, s2 = Nr(s2, i2)), s2 !== o2 && it(r2, s2), i2 = hr(n2, i2, e2, r2), 2 & s2 || !(4096 & s2 || 16 & s2) || er(n2, i2), t2;
}
function Nr(t2, e2) {
  return -273 & (2 & e2 ? 2 | t2 : -3 & t2);
}
function Mr(t2, e2, r2, n2) {
  var i2 = n2;
  tr(t2), t2 = Lr(t2, n2 = t2.A, 0 | n2[et], r2, e2, 2, true), i2 = null != i2 ? i2 : new r2(), t2.push(i2), e2 = r2 = t2 === j ? 7 : 0 | t2[et], (i2 = ht(i2)) ? (r2 &= -9, 1 === t2.length && (r2 &= -4097)) : r2 |= 4096, r2 !== e2 && it(t2, r2), i2 || er(n2);
}
function Or(t2, e2, r2) {
  return re(sr(t2, e2, r2));
}
function Dr(t2, e2) {
  return sr(t2, e2, void 0, Jt) ?? 0;
}
function Pr(t2, e2, r2) {
  return Sr(t2, e2, r2 = Er(t2, Uo) === r2 ? r2 : -1, void 0);
}
function $r(t2, e2) {
  _r(t2, 3, null == e2 ? e2 : Zt(e2), false);
}
function Ur(t2, e2, r2) {
  if (null != r2) {
    if ("number" != typeof r2) throw P("int32");
    if (!Wt(r2)) throw P("int32");
    r2 |= 0;
  }
  ar(t2, e2, r2);
}
function Br(t2, e2, r2) {
  return ar(t2, e2, null == r2 ? r2 : ie(r2));
}
function Gr(t2, e2, r2) {
  return ar(t2, e2, null == r2 ? r2 : function(t3) {
    if (!te(t3)) throw P("uint64");
    switch (typeof t3) {
      case "string":
        var e3 = zt(Number(t3));
        return Xt(e3) && e3 >= 0 ? t3 = At(e3) : (-1 !== (e3 = t3.indexOf(".")) && (t3 = t3.substring(0, e3)), t3 = U() ? At(Kt(64, BigInt(t3))) : At(oe(t3))), t3;
      case "bigint":
        return At(Kt(64, t3));
      default:
        return Xt(t3) ? t3 = At(he(t3)) : ((t3 = zt(t3)) >= 0 && Xt(t3) ? t3 = String(t3) : (Nt(t3), t3 = $t(It, Ft)), t3 = At(t3)), t3;
    }
  }(r2));
}
function jr(t2, e2, r2) {
  ar(t2, e2, null == r2 ? r2 : qt(r2));
}
function Vr(t2, e2, r2) {
  _r(t2, e2, null == r2 ? r2 : qt(r2), 0);
}
function Hr(t2, e2, r2) {
  _r(t2, e2, ve(r2), "");
}
function Kr(t2, e2, r2) {
  {
    tr(t2);
    let o2 = t2.A, a2 = 0 | o2[et];
    if (null == r2) hr(o2, a2, e2);
    else {
      var n2 = t2 = r2 === j ? 7 : 0 | r2[et], i2 = gr(t2), s2 = i2 || Object.isFrozen(r2);
      for (i2 || (t2 = 0), s2 || (r2 = Vt(r2), n2 = 0, t2 = Nr(t2, a2), s2 = false), t2 |= 5, t2 |= (4 & t2 ? 512 & t2 ? 512 : 1024 & t2 ? 1024 : 0 : void 0) ?? 1024, i2 = 0; i2 < r2.length; i2++) {
        let e3 = r2[i2], o3 = me(e3);
        Object.is(e3, o3) || (s2 && (r2 = Vt(r2), n2 = 0, t2 = Nr(t2, a2), s2 = false), r2[i2] = o3);
      }
      t2 !== n2 && (s2 && (r2 = Vt(r2), t2 = Nr(t2, a2)), it(r2, t2)), hr(o2, a2, e2, r2);
    }
  }
}
function Xr(t2, e2, r2) {
  tr(t2), lr(t2, e2, _e, 2, true).push(me(r2));
}
var Wr = class {
  constructor(t2, e2, r2) {
    if (this.buffer = t2, r2 && !e2) throw Error();
    this.g = e2;
  }
};
function zr(t2, e2) {
  if ("string" == typeof t2) return new Wr(L(t2), e2);
  if (Array.isArray(t2)) return new Wr(new Uint8Array(t2), e2);
  if (t2.constructor === Uint8Array) return new Wr(t2, false);
  if (t2.constructor === ArrayBuffer) return t2 = new Uint8Array(t2), new Wr(t2, false);
  if (t2.constructor === N) return e2 = F(t2) || new Uint8Array(0), new Wr(e2, true, t2);
  if (t2 instanceof Uint8Array) return t2 = t2.constructor === Uint8Array ? t2 : new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength), new Wr(t2, false);
  throw Error();
}
function Yr(t2, e2) {
  var r2 = 0, n2 = 0, i2 = 0, s2 = t2.h, o2 = t2.g;
  do {
    var a2 = s2[o2++];
    r2 |= (127 & a2) << i2, i2 += 7;
  } while (i2 < 32 && 128 & a2);
  if (i2 > 32) for (n2 |= (127 & a2) >> 4, i2 = 3; i2 < 32 && 128 & a2; i2 += 7) n2 |= (127 & (a2 = s2[o2++])) << i2;
  if (nn(t2, o2), !(128 & a2)) return e2(r2 >>> 0, n2 >>> 0);
  throw Error();
}
function qr(t2) {
  for (var e2 = 0, r2 = t2.g, n2 = r2 + 10, i2 = t2.h; r2 < n2; ) {
    let n3 = i2[r2++];
    if (e2 |= n3, !(128 & n3)) return nn(t2, r2), !!(127 & e2);
  }
  throw Error();
}
function Jr(t2) {
  var e2 = t2.h, r2 = t2.g, n2 = e2[r2++], i2 = 127 & n2;
  if (128 & n2 && (i2 |= (127 & (n2 = e2[r2++])) << 7, 128 & n2 && (i2 |= (127 & (n2 = e2[r2++])) << 14, 128 & n2 && (i2 |= (127 & (n2 = e2[r2++])) << 21, 128 & n2 && (i2 |= (n2 = e2[r2++]) << 28, 128 & n2 && 128 & e2[r2++] && 128 & e2[r2++] && 128 & e2[r2++] && 128 & e2[r2++] && 128 & e2[r2++]))))) throw Error();
  return nn(t2, r2), i2;
}
function Zr(t2) {
  return Jr(t2) >>> 0;
}
function Qr(t2) {
  return Yr(t2, Pt);
}
function tn(t2) {
  var e2 = t2.h, r2 = t2.g, n2 = e2[r2], i2 = e2[r2 + 1], s2 = e2[r2 + 2];
  return e2 = e2[r2 + 3], nn(t2, t2.g + 4), (n2 | i2 << 8 | s2 << 16 | e2 << 24) >>> 0;
}
function en(t2) {
  var e2 = tn(t2);
  t2 = 2 * (e2 >> 31) + 1;
  var r2 = e2 >>> 23 & 255;
  return e2 &= 8388607, 255 == r2 ? e2 ? NaN : t2 * (1 / 0) : 0 == r2 ? 1401298464324817e-60 * t2 * e2 : t2 * Math.pow(2, r2 - 150) * (e2 + 8388608);
}
function rn(t2) {
  return Jr(t2);
}
function nn(t2, e2) {
  if (t2.g = e2, e2 > t2.j) throw Error();
}
function sn(t2, e2) {
  if (e2 < 0) throw Error();
  var r2 = t2.g;
  if ((e2 = r2 + e2) > t2.j) throw Error();
  return t2.g = e2, r2;
}
function on(t2, e2) {
  if (0 == e2) return I();
  var r2 = sn(t2, e2);
  return t2.fa && t2.o ? r2 = t2.h.subarray(r2, r2 + e2) : (t2 = t2.h, r2 = r2 === (e2 = r2 + e2) ? new Uint8Array(0) : Rt ? t2.slice(r2, e2) : new Uint8Array(t2.subarray(r2, e2))), 0 == r2.length ? I() : new N(r2, R);
}
var an = class {
  constructor(t2, e2, r2, n2) {
    this.h = null, this.o = false, this.g = this.j = this.m = 0, this.init(t2, e2, r2, n2);
  }
  init(t2, e2, r2, { fa: n2 = false, ma: i2 = false } = {}) {
    this.fa = n2, this.ma = i2, t2 && (t2 = zr(t2, this.ma), this.h = t2.buffer, this.o = t2.g, this.m = e2 || 0, this.j = void 0 !== r2 ? this.m + r2 : this.h.length, this.g = this.m);
  }
  clear() {
    this.h = null, this.o = false, this.g = this.j = this.m = 0, this.fa = false;
  }
}, hn = [], un = 0;
function cn(t2, e2, r2, n2) {
  if (En.length) {
    let i2 = En.pop();
    return i2.v(n2), i2.g.init(t2, e2, r2, n2), i2;
  }
  return new yn(t2, e2, r2, n2);
}
function ln(t2) {
  t2.g.clear(), t2.j = -1, t2.h = -1, En.length < 100 && En.push(t2);
}
function dn(t2) {
  var e2 = t2.g;
  if (e2.g == e2.j) return false;
  t2.m = t2.g.g;
  var r2 = Zr(t2.g);
  if (e2 = r2 >>> 3, !((r2 &= 7) >= 0 && r2 <= 5)) throw Error();
  if (e2 < 1) throw Error();
  return t2.j = e2, t2.h = r2, true;
}
function fn(t2) {
  try {
    switch (t2.h) {
      case 0:
        0 != t2.h ? fn(t2) : qr(t2.g);
        break;
      case 1:
        var e2 = t2.g;
        nn(e2, e2.g + 8);
        break;
      case 2:
        if (2 != t2.h) fn(t2);
        else {
          var r2 = Zr(t2.g), n2 = t2.g;
          nn(n2, n2.g + r2);
        }
        break;
      case 5:
        var i2 = t2.g;
        nn(i2, i2.g + 4);
        break;
      case 3:
        pn();
        let s2 = t2.j;
        try {
          for (; ; ) {
            if (!dn(t2)) throw Error();
            if (4 == t2.h) {
              if (t2.j != s2) throw Error();
              break;
            }
            fn(t2);
          }
        } catch (t3) {
          if (t3 instanceof RangeError) throw new SyntaxError();
          throw t3;
        } finally {
          un > 0 && un--;
        }
        break;
      default:
        throw Error();
    }
  } catch (t3) {
    if (t3 instanceof RangeError) throw new SyntaxError();
    throw t3;
  }
}
function pn() {
  if (un >= 100) throw new SyntaxError();
  un++;
}
function gn(t2, e2, r2) {
  var n2 = t2.g.j, i2 = Zr(t2.g), s2 = (i2 = t2.g.g + i2) - n2;
  if (s2 <= 0 && (t2.g.j = i2, r2(e2, t2, void 0, void 0, void 0), s2 = i2 - t2.g.g), s2) throw Error();
  return t2.g.g = i2, t2.g.j = n2, e2;
}
function mn(t2) {
  var e2 = Zr(t2.g), r2 = sn(t2 = t2.g, e2);
  if (t2 = t2.h, h) {
    var o2, u2 = t2;
    (o2 = s) || (o2 = s = new TextDecoder("utf-8", { fatal: true })), e2 = r2 + e2, u2 = 0 === r2 && e2 === u2.length ? u2 : u2.subarray(r2, e2);
    try {
      var c2 = o2.decode(u2);
    } catch (t3) {
      if (void 0 === a) {
        try {
          o2.decode(new Uint8Array([128]));
        } catch (t4) {
        }
        try {
          o2.decode(new Uint8Array([97])), a = true;
        } catch (t4) {
          a = false;
        }
      }
      throw !a && (s = void 0), t3;
    }
  } else {
    e2 = (c2 = r2) + e2, r2 = [];
    let s2, a2 = null;
    for (; c2 < e2; ) {
      var l2 = t2[c2++];
      l2 < 128 ? r2.push(l2) : l2 < 224 ? c2 >= e2 ? n() : (s2 = t2[c2++], l2 < 194 || 128 != (192 & s2) ? (c2--, n()) : r2.push((31 & l2) << 6 | 63 & s2)) : l2 < 240 ? c2 >= e2 - 1 ? n() : (s2 = t2[c2++], 128 != (192 & s2) || 224 === l2 && s2 < 160 || 237 === l2 && s2 >= 160 || 128 != (192 & (o2 = t2[c2++])) ? (c2--, n()) : r2.push((15 & l2) << 12 | (63 & s2) << 6 | 63 & o2)) : l2 <= 244 ? c2 >= e2 - 2 ? n() : (s2 = t2[c2++], 128 != (192 & s2) || s2 - 144 + (l2 << 28) >> 30 || 128 != (192 & (o2 = t2[c2++])) || 128 != (192 & (u2 = t2[c2++])) ? (c2--, n()) : (l2 = (7 & l2) << 18 | (63 & s2) << 12 | (63 & o2) << 6 | 63 & u2, l2 -= 65536, r2.push(55296 + (l2 >> 10 & 1023), 56320 + (1023 & l2)))) : n(), r2.length >= 8192 && (a2 = i(a2, r2), r2.length = 0);
    }
    c2 = i(a2, r2);
  }
  return c2;
}
function vn(t2) {
  var e2 = Zr(t2.g);
  return on(t2.g, e2);
}
function _n(t2, e2, r2) {
  var n2 = Zr(t2.g);
  for (n2 = t2.g.g + n2; t2.g.g < n2; ) r2.push(e2(t2.g));
}
var yn = class {
  constructor(t2, e2, r2, n2) {
    if (hn.length) {
      let i2 = hn.pop();
      i2.init(t2, e2, r2, n2), t2 = i2;
    } else t2 = new an(t2, e2, r2, n2);
    this.g = t2, this.m = this.g.g, this.h = this.j = -1, this.v(n2);
  }
  v({ ra: t2 = false } = {}) {
    this.ra = t2;
  }
}, En = [];
function An(t2) {
  return new Tn(4294967295 & t2, Math.floor(t2 / 4294967296));
}
function wn(t2) {
  return t2 ? /^\d+$/.test(t2) ? (Gt(t2), new Tn(It, Ft)) : null : bn || (bn = new Tn(0, 0));
}
var bn, Tn = class {
  constructor(t2, e2) {
    this.h = t2 >>> 0, this.g = e2 >>> 0;
  }
};
function kn(t2) {
  return new On(4294967295 & t2, Math.floor(t2 / 4294967296));
}
function Sn(t2) {
  return t2 ? /^-?\d+$/.test(t2) ? (Gt(t2), new On(It, Ft)) : null : Ln || (Ln = new On(0, 0));
}
var Ln, xn, Rn, In, Fn, Cn, Nn, Mn, On = class {
  constructor(t2, e2) {
    this.h = t2 >>> 0, this.g = e2 >>> 0;
  }
};
function Dn(t2, e2, r2) {
  return "undefined" != typeof BigInt64Array ? (Nn || (Nn = new BigInt64Array(1), Mn = new Uint32Array(Nn.buffer), Nn[0] = BigInt(1), Cn = 1 === Mn[0]), Nn[0] = t2, new e2(Mn[t2 = Cn ? 0 : 1], Mn[1 - t2])) : (Fn || (xn = BigInt(Number.MIN_SAFE_INTEGER), Rn = BigInt(Number.MAX_SAFE_INTEGER), In = BigInt(4294967295), Fn = BigInt(32)), t2 >= xn && t2 <= Rn ? r2(Number(t2)) : (t2 = BigInt.asUintN(64, t2), new e2(Number(t2 & In), Number(t2 >> Fn))));
}
function Pn(t2, e2, r2) {
  for (; r2 > 0 || e2 > 127; ) t2.g.push(127 & e2 | 128), e2 = (e2 >>> 7 | r2 << 25) >>> 0, r2 >>>= 7;
  t2.g.push(e2);
}
function $n(t2, e2) {
  for (; e2 > 127; ) t2.g.push(127 & e2 | 128), e2 >>>= 7;
  t2.g.push(e2);
}
function Un(t2, e2) {
  if (e2 >= 0) $n(t2, e2);
  else {
    for (let r2 = 0; r2 < 9; r2++) t2.g.push(127 & e2 | 128), e2 >>= 7;
    t2.g.push(1);
  }
}
function Bn(t2, e2) {
  Gt(e2), function(t3) {
    var e3 = Ft >> 31;
    t3(It << 1 ^ e3, (Ft << 1 | It >>> 31) ^ e3);
  }((e3, r2) => {
    Pn(t2, e3 >>> 0, r2 >>> 0);
  });
}
function Gn(t2, e2) {
  t2.g.push(e2 >>> 0 & 255), t2.g.push(e2 >>> 8 & 255), t2.g.push(e2 >>> 16 & 255), t2.g.push(e2 >>> 24 & 255);
}
var jn = class {
  constructor() {
    this.g = [];
  }
  length() {
    return this.g.length;
  }
  end() {
    var t2 = this.g;
    return this.g = [], t2;
  }
};
function Vn(t2, e2) {
  0 !== e2.length && (t2.j.push(e2), t2.h += e2.length);
}
function Hn(t2, e2, r2) {
  $n(t2.g, 8 * e2 + r2);
}
function Kn(t2, e2) {
  return Hn(t2, e2, 2), e2 = t2.g.end(), Vn(t2, e2), e2.push(t2.h), e2;
}
function Xn(t2, e2) {
  var r2 = e2.pop();
  for (r2 = t2.h + t2.g.length() - r2; r2 > 127; ) e2.push(127 & r2 | 128), r2 >>>= 7, t2.h++;
  e2.push(r2), t2.h++;
}
function Wn(t2, e2, r2) {
  if (null != r2) switch (Hn(t2, e2, 0), typeof r2) {
    case "number":
      t2 = t2.g, Nt(r2), Pn(t2, It, Ft);
      break;
    case "bigint":
      r2 = Dn(r2, On, kn), Pn(t2.g, r2.h, r2.g);
      break;
    default:
      r2 = Sn(r2), Pn(t2.g, r2.h, r2.g);
  }
}
function zn(t2, e2, r2) {
  Hn(t2, e2, 2), $n(t2.g, r2.length), Vn(t2, t2.g.end()), Vn(t2, r2);
}
function Yn(t2, e2, r2, n2) {
  null != r2 && (e2 = Kn(t2, e2), n2(r2, t2), Xn(t2, e2));
}
var qn = class {
  constructor() {
    this.j = [], this.h = 0, this.g = new jn();
  }
};
function Jn(t2) {
  if ("string" == typeof t2) Sn(t2);
}
function Zn() {
  var t2 = class {
    constructor() {
      throw Error();
    }
  };
  return Object.setPrototypeOf(t2, t2.prototype), t2;
}
var Qn = Zn(), ti = Zn(), ei = Zn(), ri = Zn(), ni = Zn(), ii = Zn(), si = Zn(), oi = Zn(), ai = Zn(), hi = Zn(), ui = Zn(), ci = Zn();
function li(t2, e2, r2) {
  var n2 = t2.A;
  X && X in n2 && (n2 = n2[X]) && delete n2[e2.g], e2.h ? e2.o(t2, e2.h, e2.g, r2, e2.j) : e2.o(t2, e2.g, r2, e2.j);
}
var di = class {
  constructor(t2, e2) {
    this.A = Xe(t2, e2, void 0, 2048);
  }
  toJSON() {
    return He(this);
  }
  o() {
    var _a2;
    var t2 = Ca, e2 = this.A, r2 = t2.g, n2 = X;
    if (B && n2 && null != ((_a2 = e2[n2]) == null ? void 0 : _a2[r2]) && $(W, 3), e2 = t2.g, Z && X && void 0 === Z && (n2 = (r2 = this.A)[X]) && (n2 = n2.ka)) try {
      n2(r2, e2, Ue);
    } catch (t3) {
      l(t3);
    }
    return t2.h ? t2.m(this, t2.h, t2.g, t2.j) : t2.m(this, t2.g, t2.defaultValue, t2.j);
  }
  clone() {
    var t2 = this.A, e2 = 0 | t2[et];
    return rr(this, t2, e2) ? Ye(this, t2, true) : new this.constructor(Je(t2, e2, false));
  }
};
di.prototype[J] = at, di.prototype.toString = function() {
  return this.A.toString();
};
var fi = class {
  constructor(t2, e2, r2) {
    this.g = t2, this.h = e2, t2 = Qn, this.j = !!t2 && r2 === t2 || false;
  }
};
function pi(t2, e2) {
  return new fi(t2, e2, Qn);
}
function gi(t2, e2, r2, n2, i2) {
  Yn(t2, r2, Li(e2, n2), i2);
}
var mi, vi, _i = pi(function(t2, e2, r2, n2, i2) {
  return 2 === t2.h && (gn(t2, Tr(e2, n2, r2), i2), true);
}, gi), yi = pi(function(t2, e2, r2, n2, i2) {
  return 2 === t2.h && (gn(t2, Tr(e2, n2, r2), i2), true);
}, gi), Ei = Symbol(), Ai = Symbol(), wi = Symbol(), bi = Symbol(), Ti = Symbol();
function ki(t2, e2, r2, n2) {
  var i2 = n2[t2];
  if (i2) return i2;
  (i2 = {}).Ea = n2, i2.ca = function(t3) {
    switch (typeof t3) {
      case "boolean":
        return De || (De = [0, void 0, true]);
      case "number":
        return t3 > 0 ? void 0 : 0 === t3 ? Pe || (Pe = [0, void 0]) : [-t3, void 0];
      case "string":
        return [0, t3];
      case "object":
        return t3;
    }
  }(n2[0]);
  var s2 = n2[1], o2 = 1;
  s2 && s2.constructor === Object && (i2.ia = s2, "function" == typeof (s2 = n2[++o2]) && (i2.wa = true, mi ?? (mi = s2), vi ?? (vi = n2[o2 + 1]), s2 = n2[o2 += 2]));
  for (var a2 = {}; s2 && Array.isArray(s2) && s2.length && "number" == typeof s2[0] && s2[0] > 0; ) {
    for (var h2 = 0; h2 < s2.length; h2++) a2[s2[h2]] = s2;
    s2 = n2[++o2];
  }
  for (h2 = 1; void 0 !== s2; ) {
    let t3;
    "number" == typeof s2 && (h2 += s2, s2 = n2[++o2]);
    var u2 = void 0;
    if (s2 instanceof fi ? t3 = s2 : (t3 = _i, o2--), t3 == null ? void 0 : t3.j) {
      s2 = n2[++o2], u2 = n2;
      var c2 = o2;
      "function" == typeof s2 && (s2 = s2(), u2[c2] = s2), u2 = s2;
    }
    for (c2 = h2 + 1, "number" == typeof (s2 = n2[++o2]) && s2 < 0 && (c2 -= s2, s2 = n2[++o2]); h2 < c2; h2++) {
      let n3 = a2[h2];
      u2 ? r2(i2, h2, t3, u2, n3) : e2(i2, h2, t3, n3);
    }
  }
  return n2[t2] = i2;
}
function Si(t2) {
  return Array.isArray(t2) ? t2[0] instanceof fi ? t2 : [yi, t2] : [t2, void 0];
}
function Li(t2, e2) {
  return t2 instanceof di ? t2.A : Array.isArray(t2) ? Ke(t2, e2) : void 0;
}
function xi(t2, e2, r2, n2) {
  var i2 = r2.g;
  t2[e2] = n2 ? (t3, e3, r3) => i2(t3, e3, r3, n2) : i2;
}
function Ri(t2, e2, r2, n2, i2) {
  var s2, o2, a2 = r2.g;
  t2[e2] = (t3, e3, r3) => a2(t3, e3, r3, o2 || (o2 = ki(Ai, xi, Ri, n2).ca), s2 || (s2 = Ii(n2)), i2);
}
function Ii(t2) {
  var e2 = t2[wi];
  if (null != e2) return e2;
  var r2 = ki(Ai, xi, Ri, t2);
  return e2 = r2.wa ? (t3, e3) => mi(t3, e3, r2) : (t3, e3) => {
    t: {
      pn();
      try {
        for (; dn(e3) && 4 != e3.h; ) {
          let h3 = e3.j, u3 = r2[h3];
          if (null == u3) {
            let t4 = r2.ia;
            if (t4) {
              let e4 = t4[h3];
              if (e4) {
                let t5 = Ci(e4);
                null != t5 && (u3 = r2[h3] = t5);
              }
            }
          }
          if (null == u3 || !u3(e3, t3, h3)) {
            var n2 = e3;
            let r3 = n2.m;
            if (fn(n2), n2.ra) var i2 = void 0;
            else {
              let t4 = n2.g.g - r3;
              n2.g.g = r3, i2 = on(n2.g, t4);
            }
            n2 = void 0;
            var s2 = t3, o2 = h3, a2 = i2;
            a2 && ((n2 = s2[X] ?? (s2[X] = new $e()))[o2] ?? (n2[o2] = [])).push(a2);
          }
        }
        let u2 = Ne(t3);
        u2 && (u2.ka = r2.Ea[Ti]);
        var h2 = true;
        break t;
      } catch (t4) {
        if (t4 instanceof RangeError) throw new SyntaxError();
        throw t4;
      } finally {
        un > 0 && un--;
      }
      h2 = void 0;
    }
    return h2;
  }, t2[wi] = e2, t2[Ti] = Fi.bind(t2), e2;
}
function Fi(t2, e2, r2, n2) {
  var i2 = this[Ai], s2 = this[wi], o2 = Ke(void 0, i2.ca), a2 = Ne(t2);
  if (a2) {
    var h2 = false, u2 = i2.ia;
    if (u2) {
      if (i2 = (e3, r3, i3) => {
        if (0 !== i3.length) if (u2[r3]) for (let t3 of i3) {
          e3 = cn(t3);
          try {
            h2 = true, s2(o2, e3);
          } finally {
            ln(e3);
          }
        }
        else n2 == null ? void 0 : n2(t2, r3, i3);
      }, null == e2) Me(a2, i2);
      else if (null != a2) {
        let t3 = a2[e2];
        t3 && i2(a2, e2, t3);
      }
      if (h2) {
        let n3 = 0 | t2[et];
        if (2 & n3 && 2048 & n3 && !(r2 == null ? void 0 : r2.cb)) throw Error();
        let i3 = gt(n3), s3 = (e3, s4) => {
          if (null != or(t2, e3, i3)) {
            if (1 === (r2 == null ? void 0 : r2.lb)) return;
            throw Error();
          }
          null != s4 && (n3 = hr(t2, n3, e3, s4, i3)), delete a2[e3];
        };
        null == e2 ? ft(o2, 0 | o2[et], (t3, e3) => {
          s3(t3, e3);
        }) : s3(e2, or(o2, e2, i3));
      }
    }
  }
}
function Ci(t2) {
  var e2 = (t2 = Si(t2))[0].g;
  if (t2 = t2[1]) {
    let r2 = Ii(t2), n2 = ki(Ai, xi, Ri, t2).ca;
    return (t3, i2, s2) => e2(t3, i2, s2, n2, r2);
  }
  return e2;
}
function Ni(t2, e2, r2) {
  t2[e2] = r2.h;
}
function Mi(t2, e2, r2, n2) {
  var i2, s2, o2 = r2.h;
  t2[e2] = (t3, e3, r3) => o2(t3, e3, r3, s2 || (s2 = ki(Ei, Ni, Mi, n2).ca), i2 || (i2 = Oi(n2)));
}
function Oi(t2) {
  var e2 = t2[bi];
  if (!e2) {
    let r2 = ki(Ei, Ni, Mi, t2);
    e2 = (t3, e3) => Di(t3, e3, r2), t2[bi] = e2;
  }
  return e2;
}
function Di(t2, e2, r2) {
  ft(t2, 0 | t2[et], (t3, n2) => {
    if (null != n2) {
      var i2 = function(t4, e3) {
        var r3 = t4[e3];
        if (r3) return r3;
        if ((r3 = t4.ia) && (r3 = r3[e3])) {
          var n3 = (r3 = Si(r3))[0].h;
          if (r3 = r3[1]) {
            let e4 = Oi(r3), i3 = ki(Ei, Ni, Mi, r3).ca;
            r3 = t4.wa ? vi(i3, e4) : (t5, r4, s2) => n3(t5, r4, s2, i3, e4);
          } else r3 = n3;
          return t4[e3] = r3;
        }
      }(r2, t3);
      i2 ? i2(e2, n2, t3) : t3 < 500 || $(Y, 3);
    }
  }), (t2 = Ne(t2)) && Me(t2, (t3, r3, n2) => {
    for (Vn(e2, e2.g.end()), t3 = 0; t3 < n2.length; t3++) Vn(e2, F(n2[t3]) || new Uint8Array(0));
  });
}
var Pi = At(0);
function $i(t2, e2, r2) {
  if (Array.isArray(e2)) {
    var n2 = 0 | e2[et];
    if (4 & n2) return e2;
    for (var i2 = 0, s2 = 0; i2 < e2.length; i2++) {
      let r3 = t2(e2[i2]);
      null != r3 && (e2[s2++] = r3);
    }
    return s2 < i2 && (e2.length = s2), t2 = 1 | n2, r2 && (t2 = -1537 & t2 | 4), t2 !== n2 && it(e2, t2), r2 && 2 & t2 && Object.freeze(e2), e2;
  }
}
var Ui = (t2, e2) => {
  var r2 = new qn();
  Di(t2.A, r2, ki(Ei, Ni, Mi, e2)), Vn(r2, r2.g.end()), t2 = new Uint8Array(r2.h);
  var n2 = (e2 = r2.j).length, i2 = 0;
  for (let r3 = 0; r3 < n2; r3++) {
    let n3 = e2[r3];
    t2.set(n3, i2), i2 += n3.length;
  }
  return r2.j = [t2], t2;
};
function Bi(t2, e2, r2) {
  return new fi(t2, e2, r2);
}
function Gi(t2, e2, r2) {
  return new fi(t2, e2, r2);
}
function ji(t2, e2, r2) {
  hr(t2, 0 | t2[et], e2, r2, gt(0 | t2[et]));
}
var Vi = pi(function(t2, e2, r2, n2, i2) {
  if (2 !== t2.h) return false;
  if (t2 = Vt(t2 = gn(t2, Ke([void 0, void 0], n2), i2)), i2 = gt(n2 = 0 | e2[et]), 2 & n2) throw Error();
  var s2 = or(e2, r2, i2);
  if (s2 instanceof Re) 2 & s2.M ? ((s2 = s2.ea()).push(t2), hr(e2, n2, r2, s2, i2)) : s2.gb(t2);
  else if (Array.isArray(s2)) {
    var o2 = 0 | s2[et];
    8192 & o2 || it(s2, o2 |= 8192), 2 & o2 && hr(e2, n2, r2, s2 = vr(s2), i2), s2.push(t2);
  } else hr(e2, n2, r2, ot([t2]), i2);
  return true;
}, function(t2, e2, r2, n2, i2) {
  if (e2 instanceof Re) e2.forEach((e3, s2) => {
    Yn(t2, r2, Ke([s2, e3], n2), i2);
  });
  else if (Array.isArray(e2)) {
    for (let s2 = 0; s2 < e2.length; s2++) {
      let o2 = e2[s2];
      Array.isArray(o2) && Yn(t2, r2, Ke(o2, n2), i2);
    }
    ot(e2);
  }
});
function Hi(t2, e2, r2) {
  null != (e2 = Jt(e2)) && (Hn(t2, r2, 5), t2 = t2.g, Mt(e2), Gn(t2, It));
}
function Ki(t2, e2, r2) {
  null != (e2 = pe(e2)) && (Jn(e2), Wn(t2, r2, e2));
}
function Xi(t2, e2, r2) {
  null != (e2 = re(e2)) && null != e2 && (Hn(t2, r2, 0), Un(t2.g, e2));
}
function Wi(t2, e2, r2) {
  null != (e2 = null == e2 || "boolean" == typeof e2 ? e2 : "number" == typeof e2 ? !!e2 : void 0) && (Hn(t2, r2, 0), t2.g.g.push(e2 ? 1 : 0));
}
function zi(t2, e2, r2) {
  null != (e2 = _e(e2)) && zn(t2, r2, c(e2));
}
function Yi(t2, e2, r2, n2, i2) {
  Yn(t2, r2, Li(e2, n2), i2);
}
function qi(t2, e2, r2) {
  null != (e2 = ge(e2)) && zn(t2, r2, zr(e2, true).buffer);
}
function Ji(t2, e2, r2) {
  null != (e2 = ne(e2)) && null != e2 && (Hn(t2, r2, 0), $n(t2.g, e2));
}
function Zi(t2, e2, r2) {
  null != (e2 = re(e2)) && (e2 = parseInt(e2, 10), Hn(t2, r2, 0), Un(t2.g, e2));
}
function Qi(t2, e2, r2) {
  return (5 === t2.h || 2 === t2.h) && (e2 = yr(e2, 0 | e2[et], r2), 2 == t2.h ? _n(t2, en, e2) : e2.push(en(t2.g)), true);
}
function ts(t2, e2, r2) {
  return 0 === t2.h && (ji(e2, r2, Qr(t2.g)), true);
}
function es(t2, e2, r2) {
  return (0 === t2.h || 2 === t2.h) && (e2 = yr(e2, 0 | e2[et], r2), 2 == t2.h ? _n(t2, Jr, e2) : e2.push(Jr(t2.g)), true);
}
function rs(t2, e2, r2) {
  return 2 === t2.h && (ji(e2, r2, (t2 = vn(t2)) === I() ? void 0 : t2), true);
}
var ns = Bi(function(t2, e2, r2) {
  if (1 !== t2.h) return false;
  var n2 = t2.g;
  t2 = tn(n2);
  var i2 = tn(n2);
  n2 = 2 * (i2 >> 31) + 1;
  var s2 = i2 >>> 20 & 2047;
  return t2 = 4294967296 * (1048575 & i2) + t2, ji(e2, r2, 2047 == s2 ? t2 ? NaN : n2 * (1 / 0) : 0 == s2 ? 5e-324 * n2 * t2 : n2 * Math.pow(2, s2 - 1075) * (t2 + 4503599627370496)), true;
}, function(t2, e2, r2) {
  null != (e2 = Jt(e2)) && (Hn(t2, r2, 1), t2 = t2.g, (r2 = xt || (xt = new DataView(new ArrayBuffer(8)))).setFloat64(0, +e2, true), It = r2.getUint32(0, true), Ft = r2.getUint32(4, true), Gn(t2, It), Gn(t2, Ft));
}, hi), is = Bi(function(t2, e2, r2) {
  return 5 === t2.h && (ji(e2, r2, en(t2.g)), true);
}, Hi, ai), ss = Gi(Qi, function(t2, e2, r2) {
  if (null != (e2 = $i(Jt, e2, true))) for (let o2 = 0; o2 < e2.length; o2++) {
    var n2 = t2, i2 = r2, s2 = e2[o2];
    null != s2 && (Hn(n2, i2, 5), n2 = n2.g, Mt(s2), Gn(n2, It));
  }
}, ai), os = Gi(Qi, function(t2, e2, r2) {
  if (null != (e2 = $i(Jt, e2, true)) && e2.length) {
    Hn(t2, r2, 2), $n(t2.g, 4 * e2.length);
    for (let n2 = 0; n2 < e2.length; n2++) r2 = t2.g, Mt(e2[n2]), Gn(r2, It);
  }
}, ai), as = Bi(function(t2, e2, r2) {
  return 5 === t2.h && (ji(e2, r2, 0 === (t2 = en(t2.g)) ? void 0 : t2), true);
}, Hi, ai), hs = Bi(function(t2, e2, r2) {
  return ts(t2, e2, r2);
}, Ki, ii), us = Bi(function(t2, e2, r2) {
  return ts(t2, e2, r2);
}, Ki, ii), cs = Gi(function(t2, e2, r2) {
  return 0 !== t2.h && 2 !== t2.h ? t2 = false : (e2 = yr(e2, 0 | e2[et], r2), 2 == t2.h ? _n(t2, Qr, e2) : e2.push(Qr(t2.g)), t2 = true), t2;
}, function(t2, e2, r2) {
  if (null != (e2 = $i(pe, e2, false))) for (let n2 = 0; n2 < e2.length; n2++) Wn(t2, r2, e2[n2]);
}, ii), ls = Bi(function(t2, e2, r2) {
  return 0 !== t2.h ? e2 = false : (ji(e2, r2, (t2 = Qr(t2.g)) === Pi ? void 0 : t2), e2 = true), e2;
}, Ki, ii), ds = Bi(function(t2, e2, r2) {
  return 0 !== t2.h ? t2 = false : (ji(e2, r2, Yr(t2.g, Dt)), t2 = true), t2;
}, function(t2, e2, r2) {
  if (e2 = function(t3) {
    if (null == t3) return t3;
    var e3 = typeof t3;
    if ("bigint" === e3) return String(Kt(64, t3));
    if (te(t3)) {
      if ("string" === e3) return e3 = zt(Number(t3)), Xt(e3) && e3 >= 0 ? t3 = String(e3) : (-1 !== (e3 = t3.indexOf(".")) && (t3 = t3.substring(0, e3)), t3 = oe(t3)), t3;
      if ("number" === e3) return he(t3);
    }
  }(e2), null != e2) {
    if ("string" == typeof e2) wn(e2);
    if (null != e2) switch (Hn(t2, r2, 0), typeof e2) {
      case "number":
        t2 = t2.g, Nt(e2), Pn(t2, It, Ft);
        break;
      case "bigint":
        r2 = Dn(e2, Tn, An), Pn(t2.g, r2.h, r2.g);
        break;
      default:
        r2 = wn(e2), Pn(t2.g, r2.h, r2.g);
    }
  }
}, si), fs = Bi(function(t2, e2, r2) {
  return 0 === t2.h && (ji(e2, r2, Jr(t2.g)), true);
}, Xi, ri), ps = Gi(es, function(t2, e2, r2) {
  if (null != (e2 = $i(re, e2, true))) for (let o2 = 0; o2 < e2.length; o2++) {
    var n2 = t2, i2 = r2, s2 = e2[o2];
    null != s2 && (Hn(n2, i2, 0), Un(n2.g, s2));
  }
}, ri), gs = Gi(es, function(t2, e2, r2) {
  if (null != (e2 = $i(re, e2, true)) && e2.length) {
    r2 = Kn(t2, r2);
    for (let r3 = 0; r3 < e2.length; r3++) Un(t2.g, e2[r3]);
    Xn(t2, r2);
  }
}, ri), ms = Bi(function(t2, e2, r2) {
  return 0 === t2.h && (ji(e2, r2, 0 === (t2 = Jr(t2.g)) ? void 0 : t2), true);
}, Xi, ri), vs = Bi(function(t2, e2, r2) {
  return 0 === t2.h && (ji(e2, r2, qr(t2.g)), true);
}, Wi, ti), _s = Bi(function(t2, e2, r2) {
  return 0 === t2.h && (ji(e2, r2, false === (t2 = qr(t2.g)) ? void 0 : t2), true);
}, Wi, ti), ys = Gi(function(t2, e2, r2) {
  return 2 === t2.h && (t2 = mn(t2), yr(e2, 0 | e2[et], r2).push(t2), true);
}, function(t2, e2, r2) {
  if (null != (e2 = $i(_e, e2, true))) for (let o2 = 0; o2 < e2.length; o2++) {
    var n2 = t2, i2 = r2, s2 = e2[o2];
    null != s2 && zn(n2, i2, c(s2));
  }
}, ei), Es = Bi(function(t2, e2, r2) {
  return 2 === t2.h && (ji(e2, r2, "" === (t2 = mn(t2)) ? void 0 : t2), true);
}, zi, ei), As = Bi(function(t2, e2, r2) {
  return 2 === t2.h && (ji(e2, r2, mn(t2)), true);
}, zi, ei), ws = function(t2, e2, r2 = Qn) {
  return new fi(t2, e2, r2);
}(function(t2, e2, r2, n2, i2) {
  return 2 === t2.h && (n2 = Ke(void 0, n2), yr(e2, 0 | e2[et], r2).push(n2), gn(t2, n2, i2), true);
}, function(t2, e2, r2, n2, i2) {
  if (Array.isArray(e2)) {
    for (let s2 = 0; s2 < e2.length; s2++) Yi(t2, e2[s2], r2, n2, i2);
    1 & (t2 = 0 | e2[et]) || it(e2, 1 | t2);
  }
}), bs = pi(function(t2, e2, r2, n2, i2, s2) {
  if (2 !== t2.h) return false;
  var o2 = 0 | e2[et];
  return wr(e2, o2, s2, r2, gt(o2)), gn(t2, e2 = Tr(e2, n2, r2), i2), true;
}, Yi), Ts = Bi(function(t2, e2, r2) {
  return 2 === t2.h && (ji(e2, r2, vn(t2)), true);
}, qi, ui), ks = Gi(function(t2, e2, r2) {
  return 2 === t2.h && (t2 = vn(t2), yr(e2, 0 | e2[et], r2).push(t2), true);
}, function(t2, e2, r2) {
  if (null != (e2 = $i(ge, e2, false))) for (let o2 = 0; o2 < e2.length; o2++) {
    var n2 = t2, i2 = r2, s2 = e2[o2];
    null != s2 && zn(n2, i2, zr(s2, true).buffer);
  }
}, ui), Ss = Bi(function(t2, e2, r2) {
  return 0 === t2.h && (ji(e2, r2, Zr(t2.g)), true);
}, Ji, ni), Ls = Gi(function(t2, e2, r2) {
  return (0 === t2.h || 2 === t2.h) && (e2 = yr(e2, 0 | e2[et], r2), 2 == t2.h ? _n(t2, Zr, e2) : e2.push(Zr(t2.g)), true);
}, function(t2, e2, r2) {
  if (null != (e2 = $i(ne, e2, true))) for (let o2 = 0; o2 < e2.length; o2++) {
    var n2 = t2, i2 = r2, s2 = e2[o2];
    null != s2 && (Hn(n2, i2, 0), $n(n2.g, s2));
  }
}, ni), xs = Bi(function(t2, e2, r2) {
  return 0 === t2.h && (ji(e2, r2, 0 === (t2 = Zr(t2.g)) ? void 0 : t2), true);
}, Ji, ni), Rs = Bi(function(t2, e2, r2) {
  return 0 === t2.h && (ji(e2, r2, Jr(t2.g)), true);
}, Zi, ci), Is = Bi(function(t2, e2, r2) {
  return 0 === t2.h && (ji(e2, r2, 0 === (t2 = Jr(t2.g)) ? void 0 : t2), true);
}, Zi, ci), Fs = Bi(function(t2, e2, r2) {
  return 0 !== t2.h ? t2 = false : (ji(e2, r2, function(t3) {
    return Yr(t3, (t4, e3) => {
      var r3 = -(1 & t4);
      return Pt(t4 = (t4 >>> 1 | e3 << 31) ^ r3, e3 >>> 1 ^ r3);
    });
  }(t2.g)), t2 = true), t2;
}, function(t2, e2, r2) {
  if (null != (e2 = pe(e2)) && (Jn(e2), null != e2)) switch (Hn(t2, r2, 0), typeof e2) {
    case "number":
      t2 = t2.g, e2 = (r2 = e2) < 0, Ct(r2 = 2 * Math.abs(r2)), r2 = It;
      let n2 = Ft;
      e2 && (0 == r2 ? 0 == n2 ? n2 = r2 = 4294967295 : (n2--, r2 = 4294967295) : r2--), Pn(t2, It = r2, Ft = n2);
      break;
    case "bigint":
      t2 = t2.g, e2 = e2 << BigInt(1) ^ e2 >> BigInt(63), It = Number(BigInt.asUintN(32, e2)), Ft = Number(BigInt.asUintN(32, e2 >> BigInt(32))), Pn(t2, It, Ft);
      break;
    default:
      Bn(t2.g, e2);
  }
}, oi);
class Cs {
  constructor(t2, e2) {
    var r2 = no;
    this.g = t2, this.h = e2, this.m = Sr, this.o = Ir, this.defaultValue = void 0, this.j = null != r2.jb ? pt : void 0;
  }
  register() {
    v(this);
  }
}
function Ns(t2, e2) {
  return new Cs(t2, e2);
}
function Ms(t2, e2) {
  return (r2, n2) => {
    t: {
      let s2 = { ma: true };
      n2 && Object.assign(s2, n2), r2 = cn(r2, void 0, void 0, s2);
      try {
        let n3 = new t2(), s3 = n3.A;
        Ii(e2)(s3, r2);
        var i2 = n3;
        break t;
      } catch (t3) {
        if (t3 instanceof RangeError) throw new SyntaxError();
        throw t3;
      } finally {
        ln(r2);
      }
      i2 = void 0;
    }
    return i2;
  };
}
function Os(t2) {
  return (e2) => Ui(e2, t2);
}
function Ds(t2) {
  return function() {
    return Ui(this, t2);
  };
}
var Ps = [0, Ts, ks, vs, As], $s = [0, Es, [0, Is, [0, ls, ms], Is, -1, [0, Rs], Is, -1], Bi(rs, qi, ui)];
var Us, Bs = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Gs = [0, Es, Bi(rs, function(t2, e2, r2) {
  if (null != e2) {
    if (e2 instanceof di) {
      let n2 = e2.mb;
      return void (n2 ? (e2 = n2(e2), null != e2 && zn(t2, r2, zr(e2, true).buffer)) : $(Y, 3));
    }
    if (Array.isArray(e2)) return void $(Y, 3);
  }
  qi(t2, e2, r2);
}, ui)], js = [0, 1, [0, 12, fs, 10, vs], [0, 7, [0, fs, -1]]], Vs = globalThis.trustedTypes;
var Hs = class {
  constructor(t2) {
    this.g = t2;
  }
  toString() {
    return this.g + "";
  }
};
function Ks(t2) {
  var e2;
  return void 0 === Us && (Us = function() {
    var t3 = null;
    if (!Vs) return t3;
    try {
      let e3 = (t4) => t4;
      t3 = Vs.createPolicy("goog#html", { createHTML: e3, createScript: e3, createScriptURL: e3 });
    } catch (t4) {
    }
    return t3;
  }()), t2 = (e2 = Us) ? e2.createScriptURL(t2) : t2, new Hs(t2);
}
function Xs(t2, ...e2) {
  if (0 === e2.length) return Ks(t2[0]);
  var r2 = t2[0];
  for (let n2 = 0; n2 < e2.length; n2++) r2 += encodeURIComponent(e2[n2]) + t2[n2 + 1];
  return Ks(r2);
}
var Ws = [0, fs, Rs, vs, -1, gs, Rs, -1, vs, -1], zs = [0, Rs, -1, vs], Ys = class extends di {
  constructor(t2) {
    super(t2);
  }
}, qs = [0, vs, As, vs, Rs, -1, Gi(function(t2, e2, r2) {
  return (0 === t2.h || 2 === t2.h) && (e2 = yr(e2, 0 | e2[et], r2), 2 == t2.h ? _n(t2, rn, e2) : e2.push(Jr(t2.g)), true);
}, function(t2, e2, r2) {
  if (null != (e2 = $i(re, e2, true)) && e2.length) {
    r2 = Kn(t2, r2);
    for (let r3 = 0; r3 < e2.length; r3++) Un(t2.g, e2[r3]);
    Xn(t2, r2);
  }
}, ci), As, -1, [0, vs, -1], Rs, vs, -1, zs], Js = [0, 3, vs, -1, 2, [0, [2], fs, bs, [0, Ss]], [0, Rs, vs, Rs, vs, Rs, 4, [0, vs, As, -1, vs]], [0, [3, 4], As, -1, bs, [0, fs], bs, [0, Rs, -1]], [0]], Zs = [0, As, -2], Qs = class extends di {
  constructor(t2) {
    super(t2);
  }
}, to = [0], eo = class extends di {
  constructor(t2) {
    super(t2);
  }
}, ro = [0, fs, vs, 1, vs, -4], no = class extends di {
  constructor(t2) {
    super(t2, 2);
  }
}, io = {};
io[336783863] = [0, As, vs, -1, fs, [0, [1, 2, 3, 4, 5, 6, 7, 8, 9], bs, to, bs, qs, bs, Zs, bs, ro, bs, Ws, bs, [0, As, -2], bs, [0, As, Rs], bs, Js, bs, zs], [0, As], vs, [0, [1, 3], [2, 4], bs, [0, gs], -1, bs, [0, ys], -1, ws, [0, As, -1]], As];
var so = [0, ls, -1, _s, -3, ls, gs, Es, ms, ls, -1, _s, ms, _s, -2, Es];
function oo(t2, e2) {
  Xr(t2, 3, e2);
}
function ao(t2, e2) {
  Xr(t2, 4, e2);
}
var ho = class extends di {
  constructor(t2) {
    super(t2, 500);
  }
  v(t2) {
    return Ir(this, 0, 7, t2);
  }
}, uo = [-1, {}], co = [0, As, 1, uo], lo = [0, As, ys, uo];
function fo(t2, e2) {
  Mr(t2, 1, ho, e2);
}
function po(t2, e2) {
  Xr(t2, 10, e2);
}
function go(t2, e2) {
  Xr(t2, 15, e2);
}
var mo = class extends di {
  constructor(t2) {
    super(t2, 500);
  }
  v(t2) {
    return Ir(this, 0, 1001, t2);
  }
}, vo = [-500, ws, [-500, Es, -1, ys, -3, [-2, io, vs], ws, Gs, ms, -1, co, lo, ws, [0, Es, _s], Es, so, ms, ys, 987, ys], 4, ws, [-500, As, -1, [-1, {}], 998, As], ws, [-500, As, ys, -1, [-2, {}, vs], 997, ys, -1], ms, ws, [-500, As, ys, uo, 998, ys], ys, ms, co, lo, ws, [0, Es, -1, uo], ys, -2, so, Es, -1, _s, [0, _s, xs], 978, uo, ws, Gs];
mo.prototype.g = Ds(vo);
var _o = Ms(mo, vo), yo = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Eo = class extends di {
  constructor(t2) {
    super(t2);
  }
  g() {
    return xr(this, yo, 1);
  }
}, Ao = [0, ws, [0, fs, is, As, -1]], wo = Ms(Eo, Ao), bo = class extends di {
  constructor(t2) {
    super(t2);
  }
}, To = class extends di {
  constructor(t2) {
    super(t2);
  }
}, ko = class extends di {
  constructor(t2) {
    super(t2);
  }
  j() {
    return Sr(this, bo, 2);
  }
  g() {
    return xr(this, To, 5);
  }
}, So = Ms(class extends di {
  constructor(t2) {
    super(t2);
  }
}, [0, ys, gs, os, [0, Rs, [0, fs, -3], [0, is, -3], [0, fs, -1, [0, ws, [0, fs, -2]]], ws, [0, is, -1, As, is]], As, -1, us, ws, [0, fs, is], ys, us]), Lo = class extends di {
  constructor(t2) {
    super(t2);
  }
}, xo = Ms(class extends di {
  constructor(t2) {
    super(t2);
  }
}, [0, ws, [0, is, -4]]), Ro = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Io = Ms(class extends di {
  constructor(t2) {
    super(t2);
  }
}, [0, ws, [0, is, -4]]), Fo = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Co = [0, fs, -1, os, Rs], No = class extends di {
  constructor(t2) {
    super(t2);
  }
};
No.prototype.g = Ds([0, is, -4, us]);
var Mo = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Oo = Ms(class extends di {
  constructor(t2) {
    super(t2);
  }
}, [0, ws, [0, 1, fs, As, Ao], us]), Do = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Po = class extends di {
  constructor(t2) {
    super(t2);
  }
  g() {
    var t2 = sr(this, 1, void 0, mr);
    return null == t2 ? I() : t2;
  }
}, $o = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Uo = [1, 2], Bo = Ms(class extends di {
  constructor(t2) {
    super(t2);
  }
}, [0, ws, [0, Uo, bs, [0, os], bs, [0, Ts], fs, As], us]), Go = class extends di {
  constructor(t2) {
    super(t2);
  }
}, jo = [0, As, fs, is, ys, -1], Vo = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Ho = [0, vs, -1], Ko = class extends di {
  constructor(t2) {
    super(t2);
  }
  g() {
    return ur(this, Ys, 2, Xo);
  }
}, Xo = [1, 2, 3, 4, 5, 6], Wo = class extends di {
  constructor(t2) {
    super(t2);
  }
  g() {
    return null != sr(this, 1, void 0, mr);
  }
  j() {
    return null != _e(sr(this, 2));
  }
}, zo = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Yo = [0, Ts, As, [0, fs, us, -1], [0, ds, us]], qo = [0, Yo, vs, [0, Xo, bs, ro, bs, qs, bs, Ws, bs, to, bs, Zs, bs, Js], Rs], Jo = Os(qo), Zo = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Qo = [0, qo, is, -1, fs], ta = Ns(502141897, Zo);
io[502141897] = Qo;
var ea = Ms(class extends di {
  constructor(t2) {
    super(t2);
  }
}, [0, [0, Rs, -1, ss, Ls], Co]), ra = class extends di {
  constructor(t2) {
    super(t2);
  }
}, na = class extends di {
  constructor(t2) {
    super(t2);
  }
}, ia = [0, qo, is, [0, qo], vs], sa = Ns(508968150, na);
io[508968150] = [0, qo, Qo, ia, is, [0, [0, Yo]]], io[508968149] = ia;
var oa = class extends di {
  constructor(t2) {
    super(t2);
  }
  j() {
    return Sr(this, Go, 2);
  }
  g() {
    ar(this, 2);
  }
}, aa = [0, qo, jo];
io[478825465] = aa;
var ha = class extends di {
  constructor(t2) {
    super(t2);
  }
}, ua = class extends di {
  constructor(t2) {
    super(t2);
  }
}, ca = class extends di {
  constructor(t2) {
    super(t2);
  }
}, la = class extends di {
  constructor(t2) {
    super(t2);
  }
}, da = class extends di {
  constructor(t2) {
    super(t2);
  }
}, fa = [0, qo, [0, qo], aa, -1], pa = [0, qo, is, fs], ga = [0, qo, is], ma = [0, qo, pa, ga, is], va = Ns(479097054, da);
io[479097054] = [0, qo, ma, fa], io[463370452] = fa, io[464864288] = pa;
var _a = Ns(462713202, la);
io[462713202] = ma, io[474472470] = ga;
var ya = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Ea = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Aa = class extends di {
  constructor(t2) {
    super(t2);
  }
}, wa = class extends di {
  constructor(t2) {
    super(t2);
  }
}, ba = [0, qo, is, -1, fs], Ta = [0, qo, is, vs];
wa.prototype.g = Ds([0, qo, ga, [0, qo], Qo, ia, ba, Ta]);
var ka = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Sa = Ns(456383383, ka);
io[456383383] = [0, qo, jo];
var La = class extends di {
  constructor(t2) {
    super(t2);
  }
}, xa = Ns(476348187, La);
io[476348187] = [0, qo, Ho];
var Ra = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Ia = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Fa = [0, Rs, -1], Ca = Ns(458105876, class extends di {
  constructor(t2) {
    super(t2);
  }
  g() {
    var t2 = this.A, e2 = 0 | t2[et], r2 = ht(this, e2);
    return t2 = function(t3, e3, r3, n2) {
      var i2 = Ia;
      !n2 && Qe(t3) && (r3 = 0 | (e3 = t3.A)[et]);
      var s2 = or(e3, 2);
      if (t3 = false, null == s2) {
        if (n2) return Ce();
        s2 = [];
      } else if (s2.constructor === Re) {
        if (!(2 & s2.M) || n2) return s2;
        s2 = s2.ea();
      } else Array.isArray(s2) ? t3 = !!(2 & s2[et]) : s2 = [];
      if (n2) {
        if (!s2.length) return Ce();
        t3 || (t3 = true, st(s2));
      } else t3 && (t3 = false, ot(s2), s2 = vr(s2));
      return !t3 && 32 & r3 && nt(s2, 32), r3 = hr(e3, r3, 2, n2 = new Re(s2, i2, Ee, void 0)), t3 || er(e3, r3), n2;
    }(this, t2, e2, r2), !r2 && Ia && (t2.Fa = true), t2;
  }
});
io[458105876] = [0, Fa, Vi, [true, us, [0, As, -1, ys]], [0, gs, vs, Rs], vs];
var Na = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Ma = Ns(458105758, Na);
io[458105758] = [0, qo, As, Fa];
var Oa = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Da = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Pa = class extends di {
  constructor(t2) {
    super(t2);
  }
}, $a = Os([0, ws, [0, Is, ws, [0, as, -1], _s]]), Ua = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Ba = [0, as, -1, _s], Ga = class extends di {
  constructor(t2) {
    super(t2);
  }
}, ja = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Va = [1, 2];
ja.prototype.g = Ds([0, Va, bs, Ba, bs, [0, ws, Ba]]);
var Ha = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Ka = Ns(443442058, Ha);
io[443442058] = [0, qo, As, fs, is, ys, -1, vs, is], io[514774813] = ba;
var Xa = class extends di {
  constructor(t2) {
    super(t2);
  }
}, Wa = Ns(516587230, Xa);
function za(t2, e2) {
  return e2 = e2 ? e2.clone() : new Go(), void 0 !== t2.displayNamesLocale ? ar(e2, 1, ve(t2.displayNamesLocale)) : void 0 === t2.displayNamesLocale && ar(e2, 1), void 0 !== t2.maxResults ? Ur(e2, 2, t2.maxResults) : "maxResults" in t2 && ar(e2, 2), void 0 !== t2.scoreThreshold ? jr(e2, 3, t2.scoreThreshold) : "scoreThreshold" in t2 && ar(e2, 3), void 0 !== t2.categoryAllowlist ? Kr(e2, 4, t2.categoryAllowlist) : "categoryAllowlist" in t2 && ar(e2, 4), void 0 !== t2.categoryDenylist ? Kr(e2, 5, t2.categoryDenylist) : "categoryDenylist" in t2 && ar(e2, 5), e2;
}
function Ya(t2) {
  var e2 = Number(t2);
  return Number.isSafeInteger(e2) ? e2 : String(t2);
}
function qa(t2, e2 = -1, r2 = "") {
  return { categories: t2.map((t3) => ({ index: Or(t3, 1) ?? 0 ?? -1, score: Dr(t3, 2) ?? 0, categoryName: _e(sr(t3, 3)) ?? "" ?? "", displayName: _e(sr(t3, 4)) ?? "" ?? "" })), headIndex: e2, headName: r2 };
}
function Ja(t2) {
  var e2 = { classifications: xr(t2, Mo, 1).map((t3) => {
    var _a2;
    return qa(((_a2 = Sr(t3, Eo, 4)) == null ? void 0 : _a2.g()) ?? [], Or(t3, 2) ?? 0, _e(sr(t3, 3)) ?? "");
  }) };
  return null != function(t3) {
    return null == t3 ? t3 : "bigint" == typeof t3 ? (wt(t3) ? t3 = Number(t3) : (t3 = Ht(64, t3), t3 = wt(t3) ? Number(t3) : String(t3)), t3) : te(t3) ? "number" == typeof t3 ? ae(t3) : ce(t3) : void 0;
  }(sr(t2, 2, void 0, fe)) && (e2.timestampMs = Ya(sr(t2, 2, void 0, fe) ?? nr)), e2;
}
function Za(t2) {
  var _a2, _b;
  var e2 = lr(t2, 3, Jt, cr()), r2 = lr(t2, 2, re, cr()), n2 = lr(t2, 1, _e, cr()), i2 = lr(t2, 9, _e, cr()), s2 = { categories: [], keypoints: [] };
  for (let t3 = 0; t3 < e2.length; t3++) s2.categories.push({ score: e2[t3], index: r2[t3] ?? -1, categoryName: n2[t3] ?? "", displayName: i2[t3] ?? "" });
  if ((e2 = (_a2 = Sr(t2, ko, 4)) == null ? void 0 : _a2.j()) && (s2.boundingBox = { originX: Or(e2, 1, ir) ?? 0, originY: Or(e2, 2, ir) ?? 0, width: Or(e2, 3, ir) ?? 0, height: Or(e2, 4, ir) ?? 0, angle: 0 }), (_b = Sr(t2, ko, 4)) == null ? void 0 : _b.g().length) for (let e3 of Sr(t2, ko, 4).g()) s2.keypoints.push({ x: sr(e3, 1, ir, Jt) ?? 0, y: sr(e3, 2, ir, Jt) ?? 0, score: sr(e3, 4, ir, Jt) ?? 0, label: _e(sr(e3, 3, ir)) ?? "" });
  return s2;
}
function Qa(t2) {
  var e2 = [];
  for (let r2 of xr(t2, Ro, 1)) e2.push({ x: Dr(r2, 1) ?? 0, y: Dr(r2, 2) ?? 0, z: Dr(r2, 3) ?? 0, visibility: Dr(r2, 4) ?? 0 });
  return e2;
}
function th(t2) {
  var e2 = [];
  for (let r2 of xr(t2, Lo, 1)) e2.push({ x: Dr(r2, 1) ?? 0, y: Dr(r2, 2) ?? 0, z: Dr(r2, 3) ?? 0, visibility: Dr(r2, 4) ?? 0 });
  return e2;
}
function eh(t2) {
  return Array.from(t2, (t3) => t3 > 127 ? t3 - 256 : t3);
}
function rh(t2, e2) {
  if (t2.length !== e2.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t2.length} vs. ${e2.length}).`);
  var r2 = 0, n2 = 0, i2 = 0;
  for (let s2 = 0; s2 < t2.length; s2++) r2 += t2[s2] * e2[s2], n2 += t2[s2] * t2[s2], i2 += e2[s2] * e2[s2];
  if (n2 <= 0 || i2 <= 0) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
  return r2 / Math.sqrt(n2 * i2);
}
io[516587230] = [0, qo, ba, Ta, is], io[518928384] = Ta;
var nh, ih = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function sh(t2) {
  if (t2) return true;
  if (void 0 === nh) try {
    await WebAssembly.instantiate(ih), nh = true;
  } catch {
    nh = false;
  }
  return nh;
}
async function oh(t2, e2, r2) {
  return { wasmLoaderPath: `${e2}/${t2}_${r2 = `wasm${r2 ? "_module" : ""}${await sh(r2) ? "" : "_nosimd"}_internal`}.js`, wasmBinaryPath: `${e2}/${t2}_${r2}.wasm` };
}
var ah = class {
};
function hh(t2) {
  return ar(new uh(), 1, ee(t2));
}
ah.forVisionTasks = function(t2, e2 = false) {
  return oh("vision", t2 ?? Xs``, e2);
}, ah.forTextTasks = function(t2, e2 = false) {
  return oh("text", t2 ?? Xs``, e2);
}, ah.forGenAiTasks = function(t2, e2 = false) {
  return oh("genai", t2 ?? Xs``, e2);
}, ah.forAudioTasks = function(t2, e2 = false) {
  return oh("audio", t2 ?? Xs``, e2);
}, ah.isSimdSupported = function(t2 = false) {
  return sh(t2);
};
var uh = class extends di {
  constructor(t2) {
    super(t2);
  }
}, ch = class extends di {
  constructor(t2) {
    super(t2);
  }
}, lh = [0, Rs, 2, ds, -2, us, ws, [0, Rs, us]], dh = class extends di {
  constructor(t2) {
    super(t2);
  }
}, fh = class extends di {
  constructor(t2) {
    super(t2);
  }
};
function ph(t2, e2) {
  return ar(t2, 1, ee(e2));
}
function gh(t2, e2) {
  return ar(t2, 2, ee(e2));
}
var mh = class extends di {
  constructor(t2) {
    super(t2);
  }
}, vh = [3, 4, 5, 6, 7], _h = class extends di {
  constructor(t2) {
    super(t2);
  }
}, yh = class extends di {
  constructor(t2) {
    super(t2);
  }
};
yh.prototype.g = Ds([0, [0, Rs, As, -3, Rs], [0, vh, Rs, -1, bs, [0, Rs, As, ds], bs, lh, bs, [0, 1, lh], bs, [0, Rs], bs, [0, Rs, As, ds]]]);
var Eh = class {
  constructor() {
    this.g = "undefined" != typeof AbortController;
  }
  async send(t2, e2, r2) {
    var n2 = this.g ? new AbortController() : void 0, i2 = n2 && t2.la > 0 ? setTimeout(() => {
      n2.abort();
    }, t2.la) : void 0;
    try {
      let i3 = await fetch(t2.url, { method: t2.bb, headers: { ...t2.ab }, ...t2.body && { body: t2.body }, ...t2.withCredentials && { credentials: "include" }, signal: t2.la && n2 ? n2.signal : null });
      200 === i3.status ? e2 == null ? void 0 : e2(await i3.text()) : r2 == null ? void 0 : r2(i3.status);
    } catch (t3) {
      if ("AbortError" === (t3 == null ? void 0 : t3.name)) r2 == null ? void 0 : r2(408);
      else r2 == null ? void 0 : r2(400);
    } finally {
      clearTimeout(i2);
    }
  }
}, Ah = class extends di {
  constructor(t2) {
    super(t2, 37);
  }
}, wh = [-4, {}, js, Rs, $s], bh = [0, As, Rs, 1, As, -1, Rs, 1, Rs, 1, us], Th = [0, Rs, As, -2], kh = [0, As, Rs], Sh = [0, As, Rs], Lh = [0, vs, -3], xh = [0, Rs, As, -1, us, fs, -1, As, -5, ws, [0, As, -4], -1, vs, [0, vs, -3], Rs];
var Rh = class extends di {
  constructor(t2) {
    super(t2, 19);
  }
}, Ih = Os([-19, {}, [0, Rs, 1, [0, As, -6, us, fs, As, -1, us], 1, [0, As, 1, As, -5], As, -1, [0, Rs, As, -8], [0, As, -3], [0, As, Rs, As, -2], [0, As, -1, Rs, As, -1, Rs, As, -1, [0, ws, [0, As, -1], vs, As, -5], [0, Rs, vs, fs, -2]], us, [0, As, -3, us, fs, As, -1], [0, Rs, As, -1], [0, As, -9], [0, As, -6, Rs, As, 1, As, vs, Rs, -1, vs, As, -2, Rs, As, Rs, As, fs, -1], 1, [0, Rs], 1, [0, As, -4], 1, bh, [0, [1, 2, 3, 4, 5, 6], bs, bh, bs, kh, bs, Sh, bs, [0, Rs], bs, xh, bs, Th], kh, Sh, xh, [0, [0, Rs, As, -1, us, fs, -1, As, -4, ws, [0, As, -4], -1, 1, Lh], [0, Rs, As, -1, us, fs, -1, As, -4, Lh]], Th, [0, As, [0, fs, -3, Rs], Rs, -2, [0, fs, -1], vs], 4, [0, As, Rs, As, -1, us, Rs, As, -1, Rs, fs, -1]], Rs, ws, [-37, {}, hs, As, ws, [0, As, -1], Ts, 1, Ts, [0, ys, -1, ps, cs, -1], As, [0, fs, As, -1], vs, fs, us, As, -1, Fs, Ps, hs, Ts, Rs, ps, us, -1, [0, Rs, -1], As, vs, As, gs, As, -1, ns, 1, ns, wh, vs, [0, Rs, [0, is, fs, -2], [0, is]], [0, Rs, us]], hs, ks, As, -1, hs, Rs, -1, [0, vs, -1, Rs, vs], [0, us, -1, As], [0, hs, vs, us], us, 1, Ss, 1, wh]), Fh = class {
  constructor(t2) {
    this.h = [], this.m = new Eh(), this.j = t2 ?? "", this.g = setInterval(() => {
      this.flush();
    }, 6e4);
  }
  close() {
    void 0 !== this.g && (clearInterval(this.g), this.g = void 0), this.flush();
  }
  flush(t2, e2) {
    if (this.error) e2 == null ? void 0 : e2("net-send-failed");
    else if (0 === this.h.length) t2 == null ? void 0 : t2();
    else {
      var r2 = this.h;
      this.h = [], r2 = function(t3) {
        var e3 = new Rh();
        return Cr(e3 = ar(e3, 2, ee(1786)), 3, t3);
      }(r2), r2 = Ih(r2), this.m.send({ url: "https://odml.pa.googleapis.com/v1/log", bb: "POST", la: 1e4, body: r2, hb: 2, ab: { "Content-Type": "application/x-protobuf", "x-goog-api-key": this.j }, withCredentials: false }, () => {
        t2 == null ? void 0 : t2();
      }, (t3) => {
        this.error = Error(`Logging failed with HTTP error: ${t3}`), this.h = [], void 0 !== this.g && (clearInterval(this.g), this.g = void 0), e2 == null ? void 0 : e2("net-send-failed", t3);
      });
    }
  }
};
class Ch {
  constructor() {
    this.aa = this.U = this.X = this.R = this.V = this.T = this.P = 0;
  }
}
function Nh(t2, e2) {
  var r2 = new yh();
  r2 = Ir(r2, 0, 1, t2.B), r2 = Ir(r2, 0, 2, e2), e2 = ar(e2 = new Ah(), 6, ct(r2 = r2.g(), false)), (t2 = t2.l).error || t2.h.push(e2);
}
function Mh(t2, e2) {
  var r2 = { P: e2.P - t2.j.P, T: e2.T - t2.j.T, V: e2.V - t2.j.V, R: e2.R - t2.j.R, X: e2.X - t2.j.X, U: e2.U, aa: e2.aa }, n2 = gh(ph(new mh(), t2.C), 1);
  r2 = Oh(t2, r2), Nh(t2, n2 = Fr(n2, 4, vh, r2)), t2.j = e2;
}
function Oh(t2, e2) {
  var r2 = new ch();
  return t2 = Gr(t2 = Br(t2 = ar(r2, 1, ee(t2.D)), 7, e2.R), 5, e2.U), t2 = Gr(t2, 6, e2.aa), e2.V > 0 && Gr(t2, 4, e2.X / e2.V), 0 !== e2.P && (r2 = Br(r2 = hh(3), 2, e2.P), Mr(t2, 8, uh, r2)), 0 !== e2.T && (e2 = Br(r2 = hh(4), 2, e2.T), Mr(t2, 8, uh, e2)), t2;
}
var Dh = class {
  constructor(t2, e2, r2) {
    this.u = performance.now(), this.m = performance.now(), this.h = /* @__PURE__ */ new Map(), this.o = 0, this.g = new Ch(), this.j = new Ch(), this.l = new Fh(r2), this.C = function(t3) {
      switch (t3) {
        case "AudioClassifier":
          return 4;
        case "AudioEmbedder":
          return 5;
        case "TextClassifier":
          return 6;
        case "TextEmbedder":
          return 7;
        case "GestureRecognizer":
          return 8;
        case "HandDetector":
          return 9;
        case "HandLandmarker":
          return 10;
        case "ImageClassifier":
          return 11;
        case "ImageEmbedder":
          return 12;
        case "ImageSegmenter":
          return 13;
        case "ObjectDetector":
          return 14;
        case "FaceDetector":
          return 15;
        case "FaceLandmarker":
          return 16;
        case "InteractiveSegmenter":
        case "InteractiveSegmenterLegacy":
          return 18;
        case "HolisticLandmarker":
          return 20;
        case "LlmInference":
          return 21;
        case "LanguageDetector":
          return 22;
        case "PoseLandmarker":
          return 23;
        default:
          return 0;
      }
    }(t2), this.D = function(t3) {
      switch (t3) {
        case "IMAGE":
          return 11;
        case "VIDEO":
          return 12;
        case "LIVE_STREAM":
          return 13;
        case "AUDIO_CLIPS":
          return 14;
        case "AUDIO_STREAM":
          return 15;
        default:
          return 10;
      }
    }(e2), t2 = new _h(), "undefined" == typeof window ? e2 = 0 : (e2 = navigator.userAgent, e2 = /Android/i.test(e2) ? 1 : /iPhone|iPad|iPod/i.test(e2) ? 2 : /Windows/i.test(e2) ? 5 : /Macintosh/i.test(e2) ? 4 : /Linux/i.test(e2) ? 3 : 0), t2 = ar(t2, 1, ee(e2)), t2 = ar(t2, 2, ve("")), t2 = ar(t2, 3, ve("")), t2 = ar(t2, 4, ve("1.0.1")), t2 = ar(t2, 5, ve("")), this.B = ar(t2, 6, ee(4));
  }
  ya() {
    var t2 = new fh();
    t2 = Gr(t2 = ar(t2, 1, ee(this.D)), 3, performance.now() - this.u), Nh(this, t2 = Fr(gh(ph(new mh(), this.C), 0), 3, vh, t2)), this.m = performance.now();
  }
  za(t2) {
    var e2 = this.h.get(t2);
    if (void 0 !== e2 && (this.h.delete(t2), t2 = performance.now() - e2, ++this.g.V, this.g.X += t2, this.g.U = Math.max(this.g.U, t2), this.o = Math.max(this.o, t2), performance.now() > this.m + 3e4)) {
      for (let [r2, n2] of this.h.entries()) t2 = r2, n2 < e2 && (this.g.R++, this.h.delete(t2));
      e2 = { ...this.g, aa: performance.now() - this.m }, this.g.U = 0, this.m = performance.now(), Mh(this, e2);
    }
  }
  xa() {
    var t2 = { ...this.g, R: this.g.R + this.h.size, U: this.o, aa: performance.now() - this.u };
    Mh(this, t2);
    var e2 = new dh();
    e2 = Ir(e2, 0, 2, t2 = Oh(this, t2)), Nh(this, e2 = Fr(t2 = gh(ph(new mh(), this.C), 2), 5, vh, e2));
  }
  close() {
    var t2 = this.l;
    "function" == typeof t2.close ? t2.close() : t2.flush();
  }
};
function Ph() {
  var t2 = navigator;
  return "undefined" != typeof OffscreenCanvas && (!function(t3 = navigator) {
    return (t3 = t3.userAgent).includes("Safari") && !t3.includes("Chrome");
  }(t2) || !!((t2 = t2.userAgent.match(/Version\/([\d]+).*Safari/)) && t2.length >= 1 && Number(t2[1]) >= 17));
}
async function $h(t2) {
  if ("function" != typeof importScripts) {
    let e2 = document.createElement("script");
    return e2.src = t2.toString(), e2.crossOrigin = "anonymous", new Promise((t3, r2) => {
      e2.addEventListener("load", () => {
        t3();
      }, false), e2.addEventListener("error", (t4) => {
        r2(t4);
      }, false), document.body.appendChild(e2);
    });
  }
  try {
    importScripts(t2.toString());
  } catch (e2) {
    if (!(e2 instanceof TypeError)) throw e2;
    {
      let e3 = self.import;
      e3 ? await e3(t2.toString()) : await import(t2.toString());
    }
  }
}
function Uh(t2) {
  return void 0 !== t2.videoWidth ? [t2.videoWidth, t2.videoHeight] : void 0 !== t2.naturalWidth ? [t2.naturalWidth, t2.naturalHeight] : void 0 !== t2.displayWidth ? [t2.displayWidth, t2.displayHeight] : [t2.width, t2.height];
}
function Bh(t2, e2, r2) {
  t2.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), r2(e2 = t2.i.stringToNewUTF8(e2)), t2.i._free(e2);
}
function Gh(t2, e2, r2) {
  if (!t2.i.canvas) throw Error("No OpenGL canvas configured.");
  if (r2 ? t2.i._bindTextureToStream(r2) : t2.i._bindTextureToCanvas(), !(r2 = t2.i.canvas.getContext("webgl2") || t2.i.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
  t2.i.gpuOriginForWebTexturesIsBottomLeft && r2.pixelStorei(r2.UNPACK_FLIP_Y_WEBGL, true), r2.texImage2D(r2.TEXTURE_2D, 0, r2.RGBA, r2.RGBA, r2.UNSIGNED_BYTE, e2), t2.i.gpuOriginForWebTexturesIsBottomLeft && r2.pixelStorei(r2.UNPACK_FLIP_Y_WEBGL, false);
  var [n2, i2] = Uh(e2);
  return !t2.j || n2 === t2.i.canvas.width && i2 === t2.i.canvas.height || (t2.i.canvas.width = n2, t2.i.canvas.height = i2), [n2, i2];
}
function jh(t2, e2, r2) {
  t2.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
  var n2 = new Uint32Array(e2.length);
  for (let r3 = 0; r3 < e2.length; r3++) n2[r3] = t2.i.stringToNewUTF8(e2[r3]);
  e2 = t2.i._malloc(4 * n2.length), t2.i.HEAPU32.set(n2, e2 >> 2), r2(e2);
  for (let e3 of n2) t2.i._free(e3);
  t2.i._free(e2);
}
function Vh(t2, e2, r2) {
  t2.i.simpleListeners = t2.i.simpleListeners || {}, t2.i.simpleListeners[e2] = r2;
}
function Hh(t2, e2, r2) {
  var n2 = [];
  t2.i.simpleListeners = t2.i.simpleListeners || {}, t2.i.simpleListeners[e2] = (t3, e3, i2) => {
    e3 ? (r2(n2, i2), n2 = []) : n2.push(t3);
  };
}
var Kh = class {
  constructor(t2, e2) {
    this.j = true, this.i = t2, this.g = null, this.h = 0, this.m = "function" == typeof this.i._addIntToInputStream, void 0 !== e2 ? this.i.canvas = e2 : Ph() ? this.i.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.i.canvas = document.createElement("canvas"));
  }
  async initializeGraph(t2) {
    var e2 = await (await fetch(t2)).arrayBuffer();
    t2 = !(t2.endsWith(".pbtxt") || t2.endsWith(".textproto")), this.setGraph(new Uint8Array(e2), t2);
  }
  setGraphFromString(t2) {
    this.setGraph(new TextEncoder().encode(t2), false);
  }
  setGraph(t2, e2) {
    var r2 = t2.length, n2 = this.i._malloc(r2);
    this.i.HEAPU8.set(t2, n2), e2 ? this.i._changeBinaryGraph(r2, n2) : this.i._changeTextGraph(r2, n2), this.i._free(n2);
  }
  configureAudio(t2, e2, r2, n2, i2) {
    this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), Bh(this, n2 || "input_audio", (n3) => {
      Bh(this, i2 = i2 || "audio_header", (i3) => {
        this.i._configureAudio(n3, i3, t2, e2 ?? 0, r2);
      });
    });
  }
  setAutoResizeCanvas(t2) {
    this.j = t2;
  }
  setAutoRenderToScreen(t2) {
    this.i._setAutoRenderToScreen(t2);
  }
  setGpuBufferVerticalFlip(t2) {
    this.i.gpuOriginForWebTexturesIsBottomLeft = t2;
  }
  ja(t2) {
    Vh(this, "__graph_config__", (e2) => {
      t2(e2);
    }), Bh(this, "__graph_config__", (t3) => {
      this.i._getGraphConfig(t3, void 0);
    }), delete this.i.simpleListeners.__graph_config__;
  }
  attachErrorListener(t2) {
    this.i.errorListener = t2;
  }
  attachEmptyPacketListener(t2, e2) {
    this.i.emptyPacketListeners = this.i.emptyPacketListeners || {}, this.i.emptyPacketListeners[t2] = e2;
  }
  addAudioToStream(t2, e2, r2) {
    this.addAudioToStreamWithShape(t2, 0, 0, e2, r2);
  }
  addAudioToStreamWithShape(t2, e2, r2, n2, i2) {
    var s2 = 4 * t2.length;
    this.h !== s2 && (this.g && this.i._free(this.g), this.g = this.i._malloc(s2), this.h = s2), this.i.HEAPF32.set(t2, this.g / 4), Bh(this, n2, (t3) => {
      this.i._addAudioToInputStream(this.g, e2, r2, t3, i2);
    });
  }
  addGpuBufferToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      var [n2, i2] = Gh(this, t2, e3);
      this.i._addBoundTextureToStream(e3, n2, i2, r2);
    });
  }
  addBoolToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      this.i._addBoolToInputStream(t2, e3, r2);
    });
  }
  addDoubleToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      this.i._addDoubleToInputStream(t2, e3, r2);
    });
  }
  addFloatToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      this.i._addFloatToInputStream(t2, e3, r2);
    });
  }
  addIntToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      this.i._addIntToInputStream(t2, e3, r2);
    });
  }
  addUintToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      this.i._addUintToInputStream(t2, e3, r2);
    });
  }
  addStringToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      Bh(this, t2, (t3) => {
        this.i._addStringToInputStream(t3, e3, r2);
      });
    });
  }
  addStringRecordToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      jh(this, Object.keys(t2), (n2) => {
        jh(this, Object.values(t2), (i2) => {
          this.i._addFlatHashMapToInputStream(n2, i2, Object.keys(t2).length, e3, r2);
        });
      });
    });
  }
  addProtoToStream(t2, e2, r2, n2) {
    Bh(this, r2, (r3) => {
      Bh(this, e2, (e3) => {
        var i2 = this.i._malloc(t2.length);
        this.i.HEAPU8.set(t2, i2), this.i._addProtoToInputStream(i2, t2.length, e3, r3, n2), this.i._free(i2);
      });
    });
  }
  addEmptyPacketToStream(t2, e2) {
    Bh(this, t2, (t3) => {
      this.i._addEmptyPacketToInputStream(t3, e2);
    });
  }
  addBoolVectorToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      var n2 = this.i._allocateBoolVector(t2.length);
      if (!n2) throw Error("Unable to allocate new bool vector on heap.");
      for (let e4 of t2) this.i._addBoolVectorEntry(n2, e4);
      this.i._addBoolVectorToInputStream(n2, e3, r2);
    });
  }
  addDoubleVectorToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      var n2 = this.i._allocateDoubleVector(t2.length);
      if (!n2) throw Error("Unable to allocate new double vector on heap.");
      for (let e4 of t2) this.i._addDoubleVectorEntry(n2, e4);
      this.i._addDoubleVectorToInputStream(n2, e3, r2);
    });
  }
  addFloatVectorToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      var n2 = this.i._allocateFloatVector(t2.length);
      if (!n2) throw Error("Unable to allocate new float vector on heap.");
      for (let e4 of t2) this.i._addFloatVectorEntry(n2, e4);
      this.i._addFloatVectorToInputStream(n2, e3, r2);
    });
  }
  addIntVectorToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      var n2 = this.i._allocateIntVector(t2.length);
      if (!n2) throw Error("Unable to allocate new int vector on heap.");
      for (let e4 of t2) this.i._addIntVectorEntry(n2, e4);
      this.i._addIntVectorToInputStream(n2, e3, r2);
    });
  }
  addUintVectorToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      var n2 = this.i._allocateUintVector(t2.length);
      if (!n2) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (let e4 of t2) this.i._addUintVectorEntry(n2, e4);
      this.i._addUintVectorToInputStream(n2, e3, r2);
    });
  }
  addStringVectorToStream(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      var n2 = this.i._allocateStringVector(t2.length);
      if (!n2) throw Error("Unable to allocate new string vector on heap.");
      for (let e4 of t2) Bh(this, e4, (t3) => {
        this.i._addStringVectorEntry(n2, t3);
      });
      this.i._addStringVectorToInputStream(n2, e3, r2);
    });
  }
  addBoolToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      this.i._addBoolToInputSidePacket(t2, e3);
    });
  }
  addDoubleToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      this.i._addDoubleToInputSidePacket(t2, e3);
    });
  }
  addFloatToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      this.i._addFloatToInputSidePacket(t2, e3);
    });
  }
  addIntToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      this.i._addIntToInputSidePacket(t2, e3);
    });
  }
  addUintToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      this.i._addUintToInputSidePacket(t2, e3);
    });
  }
  addStringToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      Bh(this, t2, (t3) => {
        this.i._addStringToInputSidePacket(t3, e3);
      });
    });
  }
  addProtoToInputSidePacket(t2, e2, r2) {
    Bh(this, r2, (r3) => {
      Bh(this, e2, (e3) => {
        var n2 = this.i._malloc(t2.length);
        this.i.HEAPU8.set(t2, n2), this.i._addProtoToInputSidePacket(n2, t2.length, e3, r3), this.i._free(n2);
      });
    });
  }
  addBoolVectorToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      var r2 = this.i._allocateBoolVector(t2.length);
      if (!r2) throw Error("Unable to allocate new bool vector on heap.");
      for (let e4 of t2) this.i._addBoolVectorEntry(r2, e4);
      this.i._addBoolVectorToInputSidePacket(r2, e3);
    });
  }
  addDoubleVectorToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      var r2 = this.i._allocateDoubleVector(t2.length);
      if (!r2) throw Error("Unable to allocate new double vector on heap.");
      for (let e4 of t2) this.i._addDoubleVectorEntry(r2, e4);
      this.i._addDoubleVectorToInputSidePacket(r2, e3);
    });
  }
  addFloatVectorToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      var r2 = this.i._allocateFloatVector(t2.length);
      if (!r2) throw Error("Unable to allocate new float vector on heap.");
      for (let e4 of t2) this.i._addFloatVectorEntry(r2, e4);
      this.i._addFloatVectorToInputSidePacket(r2, e3);
    });
  }
  addIntVectorToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      var r2 = this.i._allocateIntVector(t2.length);
      if (!r2) throw Error("Unable to allocate new int vector on heap.");
      for (let e4 of t2) this.i._addIntVectorEntry(r2, e4);
      this.i._addIntVectorToInputSidePacket(r2, e3);
    });
  }
  addUintVectorToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      var r2 = this.i._allocateUintVector(t2.length);
      if (!r2) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (let e4 of t2) this.i._addUintVectorEntry(r2, e4);
      this.i._addUintVectorToInputSidePacket(r2, e3);
    });
  }
  addStringVectorToInputSidePacket(t2, e2) {
    Bh(this, e2, (e3) => {
      var r2 = this.i._allocateStringVector(t2.length);
      if (!r2) throw Error("Unable to allocate new string vector on heap.");
      for (let e4 of t2) Bh(this, e4, (t3) => {
        this.i._addStringVectorEntry(r2, t3);
      });
      this.i._addStringVectorToInputSidePacket(r2, e3);
    });
  }
  attachBoolListener(t2, e2) {
    Vh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachBoolListener(t3);
    });
  }
  attachBoolVectorListener(t2, e2) {
    Hh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachBoolVectorListener(t3);
    });
  }
  attachIntListener(t2, e2) {
    Vh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachIntListener(t3);
    });
  }
  attachIntVectorListener(t2, e2) {
    Hh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachIntVectorListener(t3);
    });
  }
  attachUintListener(t2, e2) {
    Vh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachUintListener(t3);
    });
  }
  attachUintVectorListener(t2, e2) {
    Hh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachUintVectorListener(t3);
    });
  }
  attachDoubleListener(t2, e2) {
    Vh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachDoubleListener(t3);
    });
  }
  attachDoubleVectorListener(t2, e2) {
    Hh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachDoubleVectorListener(t3);
    });
  }
  attachFloatListener(t2, e2) {
    Vh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachFloatListener(t3);
    });
  }
  attachFloatVectorListener(t2, e2) {
    Hh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachFloatVectorListener(t3);
    });
  }
  attachStringListener(t2, e2) {
    Vh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachStringListener(t3);
    });
  }
  attachStringVectorListener(t2, e2) {
    Hh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachStringVectorListener(t3);
    });
  }
  attachProtoListener(t2, e2, r2) {
    Vh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachProtoListener(t3, r2 || false);
    });
  }
  attachProtoVectorListener(t2, e2, r2) {
    Hh(this, t2, e2), Bh(this, t2, (t3) => {
      this.i._attachProtoVectorListener(t3, r2 || false);
    });
  }
  attachAudioListener(t2, e2, r2) {
    this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), Vh(this, t2, (t3, r3) => {
      t3 = new Float32Array(t3.buffer, t3.byteOffset, t3.length / 4), e2(t3, r3);
    }), Bh(this, t2, (t3) => {
      this.i._attachAudioListener(t3, r2 || false);
    });
  }
  finishProcessing() {
    this.i._waitUntilIdle();
  }
  closeGraph() {
    this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
  }
};
function Xh(t2) {
  return class extends t2 {
    get pa() {
      return this.i;
    }
    Sa() {
      if ("function" == typeof this.pa._mediapipeLoggerGetEncodedApiKey) {
        let t3 = this.pa._mediapipeLoggerGetEncodedApiKey();
        return this.pa._decodeBase64(t3);
      }
    }
  };
}
function Wh(t2) {
  return class extends t2 {
    Za() {
      this.i._registerModelResourcesGraphService();
    }
  };
}
var zh = Xh(Wh(Kh)), Yh = class extends zh {
};
async function qh(t2, e2, r2, n2) {
  return t2 = await (async (t3, e3, r3, n3, i2) => {
    if (e3 && await $h(e3), !self.ModuleFactory) throw Error("ModuleFactory not set.");
    if (r3 && (await $h(r3), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && i2 && ((e3 = self.Module).locateFile = i2.locateFile, i2.mainScriptUrlOrBlob && (e3.mainScriptUrlOrBlob = i2.mainScriptUrlOrBlob)), i2 = await self.ModuleFactory(self.Module || i2), self.ModuleFactory = self.Module = void 0, new t3(i2, n3);
  })(t2, r2.wasmLoaderPath, r2.assetLoaderPath, e2, { locateFile: (t3) => t3.endsWith(".wasm") ? r2.wasmBinaryPath.toString() : r2.assetBinaryPath && t3.endsWith(".data") ? r2.assetBinaryPath.toString() : t3 }), function(t3, e3) {
    e3 = e3.runningMode ?? "";
    var r3 = t3.g.Sa();
    t3.m = new Dh(t3.C(), e3, r3);
  }(t2, n2), await t2.v(n2), t2;
}
async function Jh(t2, e2, r2, n2) {
  return qh(t2, e2, r2, n2);
}
function Zh(t2, e2) {
  var r2 = Sr(t2.baseOptions, Wo, 1) || new Wo();
  "string" == typeof e2 ? (ar(r2, 2, ve(e2)), ar(r2, 1)) : e2 instanceof Uint8Array && (ar(r2, 1, ct(e2, false)), ar(r2, 2)), Ir(t2.baseOptions, 0, 1, r2);
}
function Qh(t2) {
  try {
    let e2 = t2.K.length;
    if (1 === e2) throw Error(t2.K[0].message);
    if (e2 > 1) throw Error("Encountered multiple errors: " + t2.K.map((t3) => t3.message).join(", "));
  } finally {
    t2.K = [];
  }
}
function tu(t2, e2) {
  t2.I = Math.max(t2.I, e2);
}
function eu(t2, e2) {
  t2.D = new ho(), Hr(t2.D, 2, "PassThroughCalculator"), oo(t2.D, "free_memory"), ao(t2.D, "free_memory_unused_out"), po(e2, "free_memory"), fo(e2, t2.D);
}
function ru(t2, e2) {
  oo(t2.D, e2), ao(t2.D, e2 + "_unused_out");
}
function nu(t2) {
  t2.g.addBoolToStream(true, "free_memory", t2.I);
}
var iu = class {
  constructor(t2) {
    this.g = t2, this.K = [], this.I = 0, this.g.setAutoRenderToScreen(false);
  }
  j(t2, e2 = true) {
    var _a2, _b, _c2, _d, _e2, _f;
    if (e2) {
      let e3 = t2.baseOptions || {};
      if (((_a2 = t2.baseOptions) == null ? void 0 : _a2.modelAssetBuffer) && ((_b = t2.baseOptions) == null ? void 0 : _b.modelAssetPath)) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      if (!(((_c2 = Sr(this.baseOptions, Wo, 1)) == null ? void 0 : _c2.g()) || ((_d = Sr(this.baseOptions, Wo, 1)) == null ? void 0 : _d.j()) || ((_e2 = t2.baseOptions) == null ? void 0 : _e2.modelAssetBuffer) || ((_f = t2.baseOptions) == null ? void 0 : _f.modelAssetPath))) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
      if (function(t3, e4) {
        var r2 = Sr(t3.baseOptions, Ko, 3);
        if (!r2) {
          var n2 = r2 = new Ko(), i2 = new Qs();
          Fr(n2, 4, Xo, i2);
        }
        "delegate" in e4 && ("GPU" === e4.delegate ? (e4 = r2, n2 = new Ys(), Fr(e4, 2, Xo, n2)) : (e4 = r2, n2 = new Qs(), Fr(e4, 4, Xo, n2))), Ir(t3.baseOptions, 0, 3, r2);
      }(this, e3), e3.modelAssetPath) return fetch(e3.modelAssetPath.toString()).then((t3) => {
        if (t3.ok) return t3.arrayBuffer();
        throw Error(`Failed to fetch model: ${e3.modelAssetPath} (${t3.status})`);
      }).then((t3) => {
        try {
          this.g.i.FS_unlink("/model.dat");
        } catch {
        }
        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(t3), true, false, false), Zh(this, "/model.dat"), this.o(), this.L();
      });
      if (e3.modelAssetBuffer instanceof Uint8Array) Zh(this, e3.modelAssetBuffer);
      else if (e3.modelAssetBuffer) return async function(t3) {
        for (var e4 = [], r2 = 0; ; ) {
          let { done: n2, value: i2 } = await t3.read();
          if (n2) break;
          e4.push(i2), r2 += i2.length;
        }
        if (0 === e4.length) return new Uint8Array(0);
        if (1 === e4.length) return e4[0];
        t3 = new Uint8Array(r2), r2 = 0;
        for (let n2 of e4) t3.set(n2, r2), r2 += n2.length;
        return t3;
      }(e3.modelAssetBuffer).then((t3) => {
        Zh(this, t3), this.o(), this.L();
      });
    }
    return this.o(), this.L(), Promise.resolve();
  }
  L() {
  }
  ja() {
    var t2;
    if (this.g.ja((e2) => {
      t2 = _o(e2);
    }), !t2) throw Error("Failed to retrieve CalculatorGraphConfig");
    return t2;
  }
  setGraph(t2, e2) {
    var _a2;
    this.g.attachErrorListener((t3, e3) => {
      this.K.push(Error(e3));
    }), this.g.Za(), this.g.setGraph(t2, e2), (_a2 = this.m) == null ? void 0 : _a2.ya(), this.D = void 0, Qh(this);
  }
  finishProcessing(t2) {
    this.g.finishProcessing(), Qh(this), this.m && void 0 !== t2 && this.m.za(t2);
  }
  close() {
    var _a2, _b;
    this.D = void 0, (_a2 = this.m) == null ? void 0 : _a2.xa(), (_b = this.m) == null ? void 0 : _b.close(), this.g.closeGraph();
  }
};
function su(t2, e2) {
  if (!t2) throw Error(`Unable to obtain required WebGL resource: ${e2}`);
  return t2;
}
iu.prototype.close = iu.prototype.close;
class ou {
  constructor(t2, e2, r2, n2) {
    this.g = t2, this.h = e2, this.m = r2, this.j = n2;
  }
  bind() {
    this.g.bindVertexArray(this.h);
  }
  close() {
    this.g.deleteVertexArray(this.h), this.g.deleteBuffer(this.m), this.g.deleteBuffer(this.j);
  }
}
function au(t2, e2, r2) {
  var n2 = t2.g;
  if (r2 = su(n2.createShader(r2), "Failed to create WebGL shader"), n2.shaderSource(r2, e2), n2.compileShader(r2), !n2.getShaderParameter(r2, n2.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${n2.getShaderInfoLog(r2)}`);
  return n2.attachShader(t2.h, r2), r2;
}
function hu(t2, e2) {
  var r2 = t2.g, n2 = su(r2.createVertexArray(), "Failed to create vertex array");
  r2.bindVertexArray(n2);
  var i2 = su(r2.createBuffer(), "Failed to create buffer");
  r2.bindBuffer(r2.ARRAY_BUFFER, i2), r2.enableVertexAttribArray(t2.F), r2.vertexAttribPointer(t2.F, 2, r2.FLOAT, false, 0, 0), r2.bufferData(r2.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), r2.STATIC_DRAW);
  var s2 = su(r2.createBuffer(), "Failed to create buffer");
  return r2.bindBuffer(r2.ARRAY_BUFFER, s2), r2.enableVertexAttribArray(t2.K), r2.vertexAttribPointer(t2.K, 2, r2.FLOAT, false, 0, 0), r2.bufferData(r2.ARRAY_BUFFER, new Float32Array(e2 ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), r2.STATIC_DRAW), r2.bindBuffer(r2.ARRAY_BUFFER, null), r2.bindVertexArray(null), new ou(r2, n2, i2, s2);
}
function uu(t2, e2) {
  if (t2.g) {
    if (e2 !== t2.g) throw Error("Cannot change GL context once initialized");
  } else t2.g = e2;
}
function cu(t2, e2, r2, n2) {
  return uu(t2, e2), t2.h || (t2.m(), t2.I()), r2 ? (t2.l || (t2.l = hu(t2, true)), r2 = t2.l) : (t2.D || (t2.D = hu(t2, false)), r2 = t2.D), e2.useProgram(t2.h), r2.bind(), t2.j(), t2 = n2(), r2.g.bindVertexArray(null), t2;
}
function lu(t2, e2, r2) {
  return uu(t2, e2), t2 = su(e2.createTexture(), "Failed to create texture"), e2.bindTexture(e2.TEXTURE_2D, t2), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_WRAP_S, e2.CLAMP_TO_EDGE), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_WRAP_T, e2.CLAMP_TO_EDGE), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_MIN_FILTER, r2 ?? e2.LINEAR), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_MAG_FILTER, r2 ?? e2.LINEAR), e2.bindTexture(e2.TEXTURE_2D, null), t2;
}
function du(t2, e2, r2) {
  uu(t2, e2), t2.C || (t2.C = su(e2.createFramebuffer(), "Failed to create framebuffe.")), e2.bindFramebuffer(e2.FRAMEBUFFER, t2.C), e2.framebufferTexture2D(e2.FRAMEBUFFER, e2.COLOR_ATTACHMENT0, e2.TEXTURE_2D, r2, 0);
}
function fu(t2) {
  var _a2;
  (_a2 = t2.g) == null ? void 0 : _a2.bindFramebuffer(t2.g.FRAMEBUFFER, null);
}
var pu = class {
  B() {
    return "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n ";
  }
  m() {
    var t2 = this.g;
    if (this.h = su(t2.createProgram(), "Failed to create WebGL program"), this.da = au(this, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", t2.VERTEX_SHADER), this.Z = au(this, this.B(), t2.FRAGMENT_SHADER), t2.linkProgram(this.h), !t2.getProgramParameter(this.h, t2.LINK_STATUS)) throw Error(`Error during program linking: ${t2.getProgramInfoLog(this.h)}`);
    this.F = t2.getAttribLocation(this.h, "aVertex"), this.K = t2.getAttribLocation(this.h, "aTex");
  }
  I() {
  }
  j() {
  }
  close() {
    if (this.h) {
      let t2 = this.g;
      t2.deleteProgram(this.h), t2.deleteShader(this.da), t2.deleteShader(this.Z);
    }
    this.C && this.g.deleteFramebuffer(this.C), this.D && this.D.close(), this.l && this.l.close();
  }
};
var gu = class extends pu {
  B() {
    return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n ";
  }
  I() {
    var t2 = this.g;
    t2.activeTexture(t2.TEXTURE1), this.u = lu(this, t2, t2.LINEAR), t2.activeTexture(t2.TEXTURE2), this.o = lu(this, t2, t2.NEAREST);
  }
  m() {
    super.m();
    var t2 = this.g;
    this.O = su(t2.getUniformLocation(this.h, "backgroundTexture"), "Uniform location"), this.Y = su(t2.getUniformLocation(this.h, "colorMappingTexture"), "Uniform location"), this.L = su(t2.getUniformLocation(this.h, "maskTexture"), "Uniform location");
  }
  j() {
    super.j();
    var t2 = this.g;
    t2.uniform1i(this.L, 0), t2.uniform1i(this.O, 1), t2.uniform1i(this.Y, 2);
  }
  close() {
    this.u && this.g.deleteTexture(this.u), this.o && this.g.deleteTexture(this.o), super.close();
  }
}, mu = class extends pu {
  B() {
    return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n ";
  }
  I() {
    var t2 = this.g;
    t2.activeTexture(t2.TEXTURE1), this.o = lu(this, t2), t2.activeTexture(t2.TEXTURE2), this.u = lu(this, t2);
  }
  m() {
    super.m();
    var t2 = this.g;
    this.L = su(t2.getUniformLocation(this.h, "defaultTexture"), "Uniform location"), this.O = su(t2.getUniformLocation(this.h, "overlayTexture"), "Uniform location"), this.J = su(t2.getUniformLocation(this.h, "maskTexture"), "Uniform location");
  }
  j() {
    super.j();
    var t2 = this.g;
    t2.uniform1i(this.J, 0), t2.uniform1i(this.L, 1), t2.uniform1i(this.O, 2);
  }
  close() {
    this.o && this.g.deleteTexture(this.o), this.u && this.g.deleteTexture(this.u), super.close();
  }
};
function vu(t2, e2) {
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
function _u(t2) {
  var e2 = vu(t2, 1);
  if (!e2) {
    if (e2 = vu(t2, 0)) e2 = new Float32Array(e2).map((t3) => t3 / 255);
    else {
      e2 = new Float32Array(t2.width * t2.height);
      let n2 = Eu(t2);
      var r2 = wu(t2);
      if (du(r2, n2, yu(t2)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "document" in self && "ontouchend" in self.document) {
        r2 = new Float32Array(t2.width * t2.height * 4), n2.readPixels(0, 0, t2.width, t2.height, n2.RGBA, n2.FLOAT, r2);
        for (let t3 = 0, n3 = 0; t3 < e2.length; ++t3, n3 += 4) e2[t3] = r2[n3];
      } else n2.readPixels(0, 0, t2.width, t2.height, n2.RED, n2.FLOAT, e2);
    }
    t2.g.push(e2);
  }
  return e2;
}
function yu(t2) {
  var e2 = vu(t2, 2);
  if (!e2) {
    let r2 = Eu(t2);
    e2 = bu(t2);
    let n2 = _u(t2), i2 = Au(t2);
    r2.texImage2D(r2.TEXTURE_2D, 0, i2, t2.width, t2.height, 0, r2.RED, r2.FLOAT, n2), Tu(t2);
  }
  return e2;
}
function Eu(t2) {
  if (!t2.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return t2.h || (t2.h = su(t2.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t2.h;
}
function Au(t2) {
  if (t2 = Eu(t2), !ku) if (t2.getExtension("EXT_color_buffer_float") && t2.getExtension("OES_texture_float_linear") && t2.getExtension("EXT_float_blend")) ku = t2.R32F;
  else {
    if (!t2.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
    ku = t2.R16F;
  }
  return ku;
}
function wu(t2) {
  return t2.j || (t2.j = new pu()), t2.j;
}
function bu(t2) {
  var e2 = Eu(t2);
  e2.viewport(0, 0, t2.width, t2.height), e2.activeTexture(e2.TEXTURE0);
  var r2 = vu(t2, 2);
  return r2 || (r2 = lu(wu(t2), e2, t2.m ? e2.LINEAR : e2.NEAREST), t2.g.push(r2), t2.o = true), e2.bindTexture(e2.TEXTURE_2D, r2), r2;
}
function Tu(t2) {
  t2.h.bindTexture(t2.h.TEXTURE_2D, null);
}
var ku, Su = class {
  constructor(t2, e2, r2, n2, i2, s2, o2) {
    this.g = t2, this.m = e2, this.o = r2, this.canvas = n2, this.j = i2, this.width = s2, this.height = o2, this.o && (0 === --Lu && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources."));
  }
  Ua() {
    return !!vu(this, 0);
  }
  ua() {
    return !!vu(this, 1);
  }
  W() {
    return !!vu(this, 2);
  }
  ta() {
    return (e2 = vu(t2 = this, 0)) || (e2 = _u(t2), e2 = new Uint8Array(e2.map((t3) => Math.round(255 * t3))), t2.g.push(e2)), e2;
    var t2, e2;
  }
  sa() {
    return _u(this);
  }
  S() {
    return yu(this);
  }
  clone() {
    var t2 = [];
    for (let e2 of this.g) {
      let r2;
      if (e2 instanceof Uint8Array) r2 = new Uint8Array(e2);
      else if (e2 instanceof Float32Array) r2 = new Float32Array(e2);
      else {
        if (!(e2 instanceof WebGLTexture)) throw Error(`Type is not supported: ${e2}`);
        {
          let t3 = Eu(this), e3 = wu(this);
          t3.activeTexture(t3.TEXTURE1), r2 = lu(e3, t3, this.m ? t3.LINEAR : t3.NEAREST), t3.bindTexture(t3.TEXTURE_2D, r2);
          let n2 = Au(this);
          t3.texImage2D(t3.TEXTURE_2D, 0, n2, this.width, this.height, 0, t3.RED, t3.FLOAT, null), t3.bindTexture(t3.TEXTURE_2D, null), du(e3, t3, r2), cu(e3, t3, false, () => {
            bu(this), t3.clearColor(0, 0, 0, 0), t3.clear(t3.COLOR_BUFFER_BIT), t3.drawArrays(t3.TRIANGLE_FAN, 0, 4), Tu(this);
          }), fu(e3), Tu(this);
        }
      }
      t2.push(r2);
    }
    return new Su(t2, this.m, this.W(), this.canvas, this.j, this.width, this.height);
  }
  close() {
    this.o && Eu(this).deleteTexture(vu(this, 2)), Lu = -1;
  }
};
Su.prototype.close = Su.prototype.close, Su.prototype.clone = Su.prototype.clone, Su.prototype.getAsWebGLTexture = Su.prototype.S, Su.prototype.getAsFloat32Array = Su.prototype.sa, Su.prototype.getAsUint8Array = Su.prototype.ta, Su.prototype.hasWebGLTexture = Su.prototype.W, Su.prototype.hasFloat32Array = Su.prototype.ua, Su.prototype.hasUint8Array = Su.prototype.Ua;
var Lu = 250, xu = { color: "white", lineWidth: 4, radius: 6 };
function Ru(t2) {
  return { ...xu, fillColor: (t2 = t2 || {}).color, ...t2 };
}
function Iu(t2, e2) {
  return t2 instanceof Function ? t2(e2) : t2;
}
function Fu(t2, e2, r2) {
  return Math.max(Math.min(e2, r2), Math.min(Math.max(e2, r2), t2));
}
function Cu(t2) {
  if (!t2.j) throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");
  return t2.j;
}
function Nu(t2) {
  if (!t2.o) throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");
  return t2.o;
}
function Mu(t2, e2, r2) {
  if (e2.W()) r2(e2.S());
  else {
    let n2 = e2.ua() ? e2.sa() : e2.ta();
    t2.m = t2.m ?? new pu();
    let i2 = Nu(t2);
    r2((t2 = new Su([n2], e2.m, false, i2.canvas, t2.m, e2.width, e2.height)).S()), t2.close();
  }
}
function Ou(t2, e2, r2, n2) {
  var i2 = function(t3) {
    return t3.g || (t3.g = new gu()), t3.g;
  }(t2), s2 = Nu(t2), o2 = Array.isArray(r2) ? new ImageData(new Uint8ClampedArray(r2), 1, 1) : r2;
  cu(i2, s2, true, () => {
    !function(t4, e3, r3, n3) {
      var i3 = t4.g;
      if (i3.activeTexture(i3.TEXTURE0), i3.bindTexture(i3.TEXTURE_2D, e3), i3.activeTexture(i3.TEXTURE1), i3.bindTexture(i3.TEXTURE_2D, t4.u), i3.texImage2D(i3.TEXTURE_2D, 0, i3.RGBA, i3.RGBA, i3.UNSIGNED_BYTE, r3), t4.J && function(t5, e4) {
        if (t5 !== e4) return false;
        t5 = t5.entries(), e4 = e4.entries();
        for (let [r4, n4] of t5) {
          t5 = r4;
          let i4 = n4, s3 = e4.next();
          if (s3.done) return false;
          let [o3, a2] = s3.value;
          if (t5 !== o3 || i4[0] !== a2[0] || i4[1] !== a2[1] || i4[2] !== a2[2] || i4[3] !== a2[3]) return false;
        }
        return !!e4.next().done;
      }(t4.J, n3)) i3.activeTexture(i3.TEXTURE2), i3.bindTexture(i3.TEXTURE_2D, t4.o);
      else {
        t4.J = n3;
        let e4 = Array(1024).fill(0);
        n3.forEach((t5, r4) => {
          if (4 !== t5.length) throw Error(`Color at index ${r4} is not a four-channel value.`);
          e4[4 * r4] = t5[0], e4[4 * r4 + 1] = t5[1], e4[4 * r4 + 2] = t5[2], e4[4 * r4 + 3] = t5[3];
        }), i3.activeTexture(i3.TEXTURE2), i3.bindTexture(i3.TEXTURE_2D, t4.o), i3.texImage2D(i3.TEXTURE_2D, 0, i3.RGBA, 256, 1, 0, i3.RGBA, i3.UNSIGNED_BYTE, new Uint8Array(e4));
      }
    }(i2, e2, o2, n2), s2.clearColor(0, 0, 0, 0), s2.clear(s2.COLOR_BUFFER_BIT), s2.drawArrays(s2.TRIANGLE_FAN, 0, 4);
    var t3 = i2.g;
    t3.activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, null);
  });
}
function Du(t2, e2, r2, n2) {
  var i2 = Nu(t2), s2 = function(t3) {
    return t3.h || (t3.h = new mu()), t3.h;
  }(t2), o2 = Array.isArray(r2) ? new ImageData(new Uint8ClampedArray(r2), 1, 1) : r2, a2 = Array.isArray(n2) ? new ImageData(new Uint8ClampedArray(n2), 1, 1) : n2;
  cu(s2, i2, true, () => {
    var t3 = s2.g;
    t3.activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, e2), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, s2.o), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, t3.RGBA, t3.UNSIGNED_BYTE, o2), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, s2.u), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, t3.RGBA, t3.UNSIGNED_BYTE, a2), i2.clearColor(0, 0, 0, 0), i2.clear(i2.COLOR_BUFFER_BIT), i2.drawArrays(i2.TRIANGLE_FAN, 0, 4), i2.bindTexture(i2.TEXTURE_2D, null), (t3 = s2.g).activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, null);
  });
}
var Pu = class {
  constructor(t2, e2) {
    "undefined" != typeof CanvasRenderingContext2D && t2 instanceof CanvasRenderingContext2D || t2 instanceof OffscreenCanvasRenderingContext2D ? (this.j = t2, this.o = e2) : this.o = t2;
  }
  Ma(t2, e2) {
    if (t2) {
      var r2 = Cu(this);
      e2 = Ru(e2), r2.save();
      var n2 = r2.canvas, i2 = 0;
      for (let s2 of t2) r2.fillStyle = Iu(e2.fillColor, { index: i2, from: s2 }), r2.strokeStyle = Iu(e2.color, { index: i2, from: s2 }), r2.lineWidth = Iu(e2.lineWidth, { index: i2, from: s2 }), (t2 = new Path2D()).arc(s2.x * n2.width, s2.y * n2.height, Iu(e2.radius, { index: i2, from: s2 }), 0, 2 * Math.PI), r2.fill(t2), r2.stroke(t2), ++i2;
      r2.restore();
    }
  }
  La(t2, e2, r2) {
    if (t2 && e2) {
      var n2 = Cu(this);
      r2 = Ru(r2), n2.save();
      var i2 = n2.canvas, s2 = 0;
      for (let o2 of e2) {
        n2.beginPath(), e2 = t2[o2.start];
        let a2 = t2[o2.end];
        e2 && a2 && (n2.strokeStyle = Iu(r2.color, { index: s2, from: e2, to: a2 }), n2.lineWidth = Iu(r2.lineWidth, { index: s2, from: e2, to: a2 }), n2.moveTo(e2.x * i2.width, e2.y * i2.height), n2.lineTo(a2.x * i2.width, a2.y * i2.height)), ++s2, n2.stroke();
      }
      n2.restore();
    }
  }
  Ia(t2, e2) {
    var r2 = Cu(this);
    e2 = Ru(e2), r2.save(), r2.beginPath(), r2.lineWidth = Iu(e2.lineWidth, {}), r2.strokeStyle = Iu(e2.color, {}), r2.fillStyle = Iu(e2.fillColor, {}), r2.moveTo(t2.originX, t2.originY), r2.lineTo(t2.originX + t2.width, t2.originY), r2.lineTo(t2.originX + t2.width, t2.originY + t2.height), r2.lineTo(t2.originX, t2.originY + t2.height), r2.lineTo(t2.originX, t2.originY), r2.stroke(), r2.fill(), r2.restore();
  }
  Ja(t2, e2, r2 = [0, 0, 0, 255]) {
    this.j ? function(t3, e3, r3, n2) {
      var i2 = Nu(t3);
      Mu(t3, e3, (e4) => {
        Ou(t3, e4, r3, n2), (e4 = Cu(t3)).drawImage(i2.canvas, 0, 0, e4.canvas.width, e4.canvas.height);
      });
    }(this, t2, r2, e2) : Ou(this, t2.S(), r2, e2);
  }
  Ka(t2, e2, r2) {
    this.j ? function(t3, e3, r3, n2) {
      var i2 = Nu(t3);
      Mu(t3, e3, (e4) => {
        Du(t3, e4, r3, n2), (e4 = Cu(t3)).drawImage(i2.canvas, 0, 0, e4.canvas.width, e4.canvas.height);
      });
    }(this, t2, e2, r2) : Du(this, t2.S(), e2, r2);
  }
  close() {
    var _a2, _b, _c2;
    (_a2 = this.g) == null ? void 0 : _a2.close(), this.g = void 0, (_b = this.h) == null ? void 0 : _b.close(), this.h = void 0, (_c2 = this.m) == null ? void 0 : _c2.close(), this.m = void 0;
  }
};
function $u(t2, e2) {
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
function Uu(t2) {
  var e2 = $u(t2, 0);
  if (!e2) {
    e2 = Gu(t2);
    let r2 = ju(t2), n2 = new Uint8Array(t2.width * t2.height * 4);
    du(r2, e2, Bu(t2)), e2.readPixels(0, 0, t2.width, t2.height, e2.RGBA, e2.UNSIGNED_BYTE, n2), fu(r2), e2 = new ImageData(new Uint8ClampedArray(n2.buffer), t2.width, t2.height), t2.g.push(e2);
  }
  return e2;
}
function Bu(t2) {
  var e2 = $u(t2, 2);
  if (!e2) {
    let r2 = Gu(t2);
    e2 = Vu(t2);
    let n2 = $u(t2, 1) || Uu(t2);
    r2.texImage2D(r2.TEXTURE_2D, 0, r2.RGBA, r2.RGBA, r2.UNSIGNED_BYTE, n2), Hu(t2);
  }
  return e2;
}
function Gu(t2) {
  if (!t2.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return t2.h || (t2.h = su(t2.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t2.h;
}
function ju(t2) {
  return t2.j || (t2.j = new pu()), t2.j;
}
function Vu(t2) {
  var e2 = Gu(t2);
  e2.viewport(0, 0, t2.width, t2.height), e2.activeTexture(e2.TEXTURE0);
  var r2 = $u(t2, 2);
  return r2 || (r2 = lu(ju(t2), e2), t2.g.push(r2), t2.m = true), e2.bindTexture(e2.TEXTURE_2D, r2), r2;
}
function Hu(t2) {
  t2.h.bindTexture(t2.h.TEXTURE_2D, null);
}
function Ku(t2) {
  var e2 = Gu(t2);
  return cu(ju(t2), e2, true, () => function(t3, e3) {
    var r2 = t3.canvas;
    if (r2.width === t3.width && r2.height === t3.height) return e3();
    var n2 = r2.width, i2 = r2.height;
    return r2.width = t3.width, r2.height = t3.height, t3 = e3(), r2.width = n2, r2.height = i2, t3;
  }(t2, () => {
    if (e2.bindFramebuffer(e2.FRAMEBUFFER, null), e2.clearColor(0, 0, 0, 0), e2.clear(e2.COLOR_BUFFER_BIT), e2.drawArrays(e2.TRIANGLE_FAN, 0, 4), !(t2.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
    return t2.canvas.transferToImageBitmap();
  }));
}
Pu.prototype.close = Pu.prototype.close, Pu.prototype.drawConfidenceMask = Pu.prototype.Ka, Pu.prototype.drawCategoryMask = Pu.prototype.Ja, Pu.prototype.drawBoundingBox = Pu.prototype.Ia, Pu.prototype.drawConnectors = Pu.prototype.La, Pu.prototype.drawLandmarks = Pu.prototype.Ma, Pu.lerp = function(t2, e2, r2, n2, i2) {
  return Fu(n2 * (1 - (t2 - e2) / (r2 - e2)) + i2 * (1 - (r2 - t2) / (r2 - e2)), n2, i2);
}, Pu.clamp = Fu;
var Xu = class {
  constructor(t2, e2, r2, n2, i2, s2, o2) {
    this.g = t2, this.o = e2, this.m = r2, this.canvas = n2, this.j = i2, this.width = s2, this.height = o2, (this.o || this.m) && (0 === --Wu && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources."));
  }
  Ta() {
    return !!$u(this, 0);
  }
  va() {
    return !!$u(this, 1);
  }
  W() {
    return !!$u(this, 2);
  }
  Qa() {
    return Uu(this);
  }
  Pa() {
    var t2 = $u(this, 1);
    return t2 || (Bu(this), Vu(this), t2 = Ku(this), Hu(this), this.g.push(t2), this.o = true), t2;
  }
  S() {
    return Bu(this);
  }
  clone() {
    var t2 = [];
    for (let e2 of this.g) {
      let r2;
      if (e2 instanceof ImageData) r2 = new ImageData(e2.data, this.width, this.height);
      else if (e2 instanceof WebGLTexture) {
        let t3 = Gu(this), e3 = ju(this);
        t3.activeTexture(t3.TEXTURE1), r2 = lu(e3, t3), t3.bindTexture(t3.TEXTURE_2D, r2), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, this.width, this.height, 0, t3.RGBA, t3.UNSIGNED_BYTE, null), t3.bindTexture(t3.TEXTURE_2D, null), du(e3, t3, r2), cu(e3, t3, false, () => {
          Vu(this), t3.clearColor(0, 0, 0, 0), t3.clear(t3.COLOR_BUFFER_BIT), t3.drawArrays(t3.TRIANGLE_FAN, 0, 4), Hu(this);
        }), fu(e3), Hu(this);
      } else {
        if (!(e2 instanceof ImageBitmap)) throw Error(`Type is not supported: ${e2}`);
        Bu(this), Vu(this), r2 = Ku(this), Hu(this);
      }
      t2.push(r2);
    }
    return new Xu(t2, this.va(), this.W(), this.canvas, this.j, this.width, this.height);
  }
  close() {
    this.o && $u(this, 1).close(), this.m && Gu(this).deleteTexture($u(this, 2)), Wu = -1;
  }
};
Xu.prototype.close = Xu.prototype.close, Xu.prototype.clone = Xu.prototype.clone, Xu.prototype.getAsWebGLTexture = Xu.prototype.S, Xu.prototype.getAsImageBitmap = Xu.prototype.Pa, Xu.prototype.getAsImageData = Xu.prototype.Qa, Xu.prototype.hasWebGLTexture = Xu.prototype.W, Xu.prototype.hasImageBitmap = Xu.prototype.va, Xu.prototype.hasImageData = Xu.prototype.Ta;
var Wu = 250;
function zu(...t2) {
  return t2.map(([t3, e2]) => ({ start: t3, end: e2 }));
}
var Yu, qu = Wh((Yu = Xh(Kh), class extends Yu {
  get oa() {
    return this.i;
  }
  Da(t2, e2, r2) {
    Bh(this, e2, (e3) => {
      var [n2, i2] = Gh(this, t2, e3);
      this.oa._addBoundTextureAsImageToStream(e3, n2, i2, r2);
    });
  }
  ga(t2, e2) {
    Vh(this, t2, e2), Bh(this, t2, (t3) => {
      this.oa._attachImageListener(t3);
    });
  }
  ha(t2, e2) {
    Hh(this, t2, e2), Bh(this, t2, (t3) => {
      this.oa._attachImageVectorListener(t3);
    });
  }
})), Ju = class extends qu {
};
async function Zu(t2, e2, r2) {
  return Jh(t2, r2.canvas ?? (Ph() ? void 0 : document.createElement("canvas")), e2, r2);
}
function Qu(t2, e2, r2, n2) {
  var _a2;
  if (t2.m && void 0 !== n2) if ((_a2 = Sr(t2.baseOptions, Ko, 3)) == null ? void 0 : _a2.g()) {
    var i2 = t2.m;
    ++i2.g.T, i2.h.set(n2, performance.now());
  } else ++(i2 = t2.m).g.P, i2.h.set(n2, performance.now());
  if (t2.qa) {
    if (i2 = new No(), r2 == null ? void 0 : r2.regionOfInterest) {
      if (!t2.Ca) throw Error("This task doesn't support region-of-interest.");
      var s2 = r2.regionOfInterest;
      if (s2.left >= s2.right || s2.top >= s2.bottom) throw Error("Expected RectF with left < right and top < bottom.");
      if (s2.left < 0 || s2.top < 0 || s2.right > 1 || s2.bottom > 1) throw Error("Expected RectF values to be in [0,1].");
      jr(i2, 1, (s2.left + s2.right) / 2), jr(i2, 2, (s2.top + s2.bottom) / 2), jr(i2, 4, s2.right - s2.left), jr(i2, 3, s2.bottom - s2.top);
    } else jr(i2, 1, 0.5), jr(i2, 2, 0.5), jr(i2, 4, 1), jr(i2, 3, 1);
    if (r2 == null ? void 0 : r2.rotationDegrees) {
      if ((r2 == null ? void 0 : r2.rotationDegrees) % 90 != 0) throw Error("Expected rotation to be a multiple of 90°.");
      if (jr(i2, 5, -Math.PI * r2.rotationDegrees / 180), (r2 == null ? void 0 : r2.rotationDegrees) % 180 != 0) {
        let [t3, n3] = Uh(e2);
        r2 = Dr(i2, 3) * n3 / t3, s2 = Dr(i2, 4) * t3 / n3, jr(i2, 4, r2), jr(i2, 3, s2);
      }
    }
    t2.g.addProtoToStream(i2.g(), "mediapipe.NormalizedRect", t2.qa, n2);
  }
  t2.g.Da(e2, t2.Ba, n2 ?? performance.now()), t2.finishProcessing(n2);
}
function tc(t2, e2, r2) {
  if (t2.J) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
  Qu(t2, e2, r2, t2.I + 1);
}
function ec(t2, e2, r2, n2) {
  if (!t2.J) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
  Qu(t2, e2, r2, n2);
}
function rc(t2, e2, r2, n2) {
  var i2 = e2.data, s2 = e2.width, o2 = s2 * (e2 = e2.height);
  if ((i2 instanceof Uint8Array || i2 instanceof Float32Array) && i2.length !== o2) throw Error("Unsupported channel count: " + i2.length / o2);
  return t2 = new Su([i2], r2, false, t2.g.i.canvas, t2.da, s2, e2), n2 ? t2.clone() : t2;
}
var nc = class extends iu {
  constructor(t2, e2, r2, n2) {
    super(t2), this.g = t2, this.Ba = e2, this.qa = r2, this.Ca = n2, this.da = new pu(), this.J = false;
  }
  j(t2, e2 = true) {
    if ("runningMode" in t2) {
      var r2 = this.J = !!t2.runningMode && "IMAGE" !== t2.runningMode;
      ar(this.baseOptions, 2, null == r2 ? r2 : Zt(r2));
    }
    if (void 0 !== t2.canvas && this.g.i.canvas !== t2.canvas) throw Error("You must create a new task to reset the canvas.");
    return super.j(t2, e2);
  }
  close() {
    this.da.close(), super.close();
  }
};
nc.prototype.close = nc.prototype.close;
var ic = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "image_in", "norm_rect_in", false), this.l = { detections: [] }, Ir(t2 = this.h = new Zo(), 0, 1, e2 = new zo()), jr(this.h, 2, 0.5), jr(this.h, 3, 0.3);
  }
  C() {
    return "FaceDetector";
  }
  get baseOptions() {
    return Sr(this.h, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.h, 0, 1, t2);
  }
  v(t2) {
    return "minDetectionConfidence" in t2 && jr(this.h, 2, t2.minDetectionConfidence ?? 0.5), "minSuppressionThreshold" in t2 && jr(this.h, 3, t2.minSuppressionThreshold ?? 0.3), this.j(t2);
  }
  G(t2, e2) {
    return this.l = { detections: [] }, tc(this, t2, e2), this.l;
  }
  H(t2, e2, r2) {
    return this.l = { detections: [] }, ec(this, t2, r2, e2), this.l;
  }
  o() {
    var t2 = new mo();
    po(t2, "image_in"), po(t2, "norm_rect_in"), go(t2, "detections");
    var e2 = new no();
    li(e2, ta, this.h);
    var r2 = new ho();
    Hr(r2, 2, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect_in"), ao(r2, "DETECTIONS:detections"), r2.v(e2), fo(t2, r2), this.g.attachProtoVectorListener("detections", (t3, e3) => {
      for (let e4 of t3) t3 = So(e4), this.l.detections.push(Za(t3));
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("detections", (t3) => {
      tu(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
ic.prototype.detectForVideo = ic.prototype.H, ic.prototype.detect = ic.prototype.G, ic.prototype.setOptions = ic.prototype.v, ic.createFromModelPath = async function(t2, e2) {
  return Zu(ic, t2, { baseOptions: { modelAssetPath: e2 } });
}, ic.createFromModelBuffer = function(t2, e2) {
  return Zu(ic, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, ic.createFromOptions = function(t2, e2) {
  return Zu(ic, t2, e2);
};
var sc = zu([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]), oc = zu([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]), ac = zu([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]), hc = zu([474, 475], [475, 476], [476, 477], [477, 474]), uc = zu([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]), cc = zu([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]), lc = zu([469, 470], [470, 471], [471, 472], [472, 469]), dc = zu([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]), fc = [...sc, ...oc, ...ac, ...uc, ...cc, ...dc], pc = zu([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function gc(t2) {
  t2.l = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] };
}
var mc = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "image_in", "norm_rect", false), this.l = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = false, Ir(t2 = this.h = new na(), 0, 1, e2 = new zo()), this.B = new ra(), Ir(this.h, 0, 3, this.B), this.u = new Zo(), Ir(this.h, 0, 2, this.u), Ur(this.u, 4, 1), jr(this.u, 2, 0.5), jr(this.B, 2, 0.5), jr(this.h, 4, 0.5);
  }
  C() {
    return "FaceLandmarker";
  }
  get baseOptions() {
    return Sr(this.h, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.h, 0, 1, t2);
  }
  v(t2) {
    return "numFaces" in t2 && Ur(this.u, 4, t2.numFaces ?? 1), "minFaceDetectionConfidence" in t2 && jr(this.u, 2, t2.minFaceDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && jr(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minFacePresenceConfidence" in t2 && jr(this.B, 2, t2.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in t2 && (this.outputFaceBlendshapes = !!t2.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in t2 && (this.outputFacialTransformationMatrixes = !!t2.outputFacialTransformationMatrixes), this.j(t2);
  }
  G(t2, e2) {
    return gc(this), tc(this, t2, e2), this.l;
  }
  H(t2, e2, r2) {
    return gc(this), ec(this, t2, r2, e2), this.l;
  }
  o() {
    var t2 = new mo();
    po(t2, "image_in"), po(t2, "norm_rect"), go(t2, "face_landmarks");
    var e2 = new no();
    li(e2, sa, this.h);
    var r2 = new ho();
    Hr(r2, 2, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "NORM_LANDMARKS:face_landmarks"), r2.v(e2), fo(t2, r2), this.g.attachProtoVectorListener("face_landmarks", (t3, e3) => {
      for (let e4 of t3) t3 = Io(e4), this.l.faceLandmarks.push(Qa(t3));
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("face_landmarks", (t3) => {
      tu(this, t3);
    }), this.outputFaceBlendshapes && (go(t2, "blendshapes"), ao(r2, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", (t3, e3) => {
      if (this.outputFaceBlendshapes) for (let e4 of t3) t3 = wo(e4), this.l.faceBlendshapes.push(qa(t3.g() ?? []));
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("blendshapes", (t3) => {
      tu(this, t3);
    })), this.outputFacialTransformationMatrixes && (go(t2, "face_geometry"), ao(r2, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", (t3, e3) => {
      if (this.outputFacialTransformationMatrixes) for (let e4 of t3) (t3 = Sr(t3 = ea(e4), Fo, 2)) && this.l.facialTransformationMatrixes.push({ rows: Or(t3, 1) ?? 0 ?? 0, columns: Or(t3, 2) ?? 0 ?? 0, data: lr(t3, 3, Jt, cr()).slice() ?? [] });
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("face_geometry", (t3) => {
      tu(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
mc.prototype.detectForVideo = mc.prototype.H, mc.prototype.detect = mc.prototype.G, mc.prototype.setOptions = mc.prototype.v, mc.createFromModelPath = function(t2, e2) {
  return Zu(mc, t2, { baseOptions: { modelAssetPath: e2 } });
}, mc.createFromModelBuffer = function(t2, e2) {
  return Zu(mc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, mc.createFromOptions = function(t2, e2) {
  return Zu(mc, t2, e2);
}, mc.FACE_LANDMARKS_LIPS = sc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LIPS", mc.FACE_LANDMARKS_LIPS), mc.FACE_LANDMARKS_LEFT_EYE = oc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE", mc.FACE_LANDMARKS_LEFT_EYE), mc.FACE_LANDMARKS_LEFT_EYEBROW = ac, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW", mc.FACE_LANDMARKS_LEFT_EYEBROW), mc.FACE_LANDMARKS_LEFT_IRIS = hc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS", mc.FACE_LANDMARKS_LEFT_IRIS), mc.FACE_LANDMARKS_RIGHT_EYE = uc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE", mc.FACE_LANDMARKS_RIGHT_EYE), mc.FACE_LANDMARKS_RIGHT_EYEBROW = cc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW", mc.FACE_LANDMARKS_RIGHT_EYEBROW), mc.FACE_LANDMARKS_RIGHT_IRIS = lc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS", mc.FACE_LANDMARKS_RIGHT_IRIS), mc.FACE_LANDMARKS_FACE_OVAL = dc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_FACE_OVAL", mc.FACE_LANDMARKS_FACE_OVAL), mc.FACE_LANDMARKS_CONTOURS = fc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_CONTOURS", mc.FACE_LANDMARKS_CONTOURS), mc.FACE_LANDMARKS_TESSELATION = pc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_TESSELATION", mc.FACE_LANDMARKS_TESSELATION);
var vc = zu([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function _c(t2) {
  t2.gestures = [], t2.landmarks = [], t2.worldLandmarks = [], t2.handedness = [];
}
function yc(t2) {
  return 0 === t2.gestures.length ? { gestures: [], landmarks: [], worldLandmarks: [], handedness: [], handednesses: [] } : { gestures: t2.gestures, landmarks: t2.landmarks, worldLandmarks: t2.worldLandmarks, handedness: t2.handedness, handednesses: t2.handedness };
}
function Ec(t2, e2 = true) {
  var r2 = [];
  for (let i2 of t2) {
    var n2 = wo(i2);
    t2 = [];
    for (let r3 of n2.g()) n2 = e2 && null != Or(r3, 1) ? Or(r3, 1) ?? 0 : -1, t2.push({ score: Dr(r3, 2) ?? 0, index: n2, categoryName: _e(sr(r3, 3)) ?? "" ?? "", displayName: _e(sr(r3, 4)) ?? "" ?? "" });
    r2.push(t2);
  }
  return r2;
}
var Ac = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "image_in", "norm_rect", false), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Ir(t2 = this.l = new da(), 0, 1, e2 = new zo()), this.u = new la(), Ir(this.l, 0, 2, this.u), this.F = new ca(), Ir(this.u, 0, 3, this.F), this.B = new ua(), Ir(this.u, 0, 2, this.B), this.h = new ha(), Ir(this.l, 0, 3, this.h), jr(this.B, 2, 0.5), jr(this.u, 4, 0.5), jr(this.F, 2, 0.5);
  }
  C() {
    return "GestureRecognizer";
  }
  get baseOptions() {
    return Sr(this.l, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.l, 0, 1, t2);
  }
  v(t2) {
    var _a2, _b, _c2, _d;
    if (Ur(this.B, 3, t2.numHands ?? 1), "minHandDetectionConfidence" in t2 && jr(this.B, 2, t2.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && jr(this.u, 4, t2.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in t2 && jr(this.F, 2, t2.minHandPresenceConfidence ?? 0.5), t2.cannedGesturesClassifierOptions) {
      var e2 = new oa(), r2 = e2, n2 = za(t2.cannedGesturesClassifierOptions, (_a2 = Sr(this.h, oa, 3)) == null ? void 0 : _a2.j());
      Ir(r2, 0, 2, n2), Ir(this.h, 0, 3, e2);
    } else void 0 === t2.cannedGesturesClassifierOptions && ((_b = Sr(this.h, oa, 3)) == null ? void 0 : _b.g());
    return t2.customGesturesClassifierOptions ? (Ir(r2 = e2 = new oa(), 0, 2, n2 = za(t2.customGesturesClassifierOptions, (_c2 = Sr(this.h, oa, 4)) == null ? void 0 : _c2.j())), Ir(this.h, 0, 4, e2)) : void 0 === t2.customGesturesClassifierOptions && ((_d = Sr(this.h, oa, 4)) == null ? void 0 : _d.g()), this.j(t2);
  }
  Xa(t2, e2) {
    return _c(this), tc(this, t2, e2), yc(this);
  }
  Ya(t2, e2, r2) {
    return _c(this), ec(this, t2, r2, e2), yc(this);
  }
  o() {
    var t2 = new mo();
    po(t2, "image_in"), po(t2, "norm_rect"), go(t2, "hand_gestures"), go(t2, "hand_landmarks"), go(t2, "world_hand_landmarks"), go(t2, "handedness");
    var e2 = new no();
    li(e2, va, this.l);
    var r2 = new ho();
    Hr(r2, 2, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "HAND_GESTURES:hand_gestures"), ao(r2, "LANDMARKS:hand_landmarks"), ao(r2, "WORLD_LANDMARKS:world_hand_landmarks"), ao(r2, "HANDEDNESS:handedness"), r2.v(e2), fo(t2, r2), this.g.attachProtoVectorListener("hand_landmarks", (t3, e3) => {
      for (let e4 of t3) {
        t3 = Io(e4);
        let r3 = [];
        for (let e5 of xr(t3, Ro, 1)) r3.push({ x: Dr(e5, 1) ?? 0, y: Dr(e5, 2) ?? 0, z: Dr(e5, 3) ?? 0, visibility: Dr(e5, 4) ?? 0 });
        this.landmarks.push(r3);
      }
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("hand_landmarks", (t3) => {
      tu(this, t3);
    }), this.g.attachProtoVectorListener("world_hand_landmarks", (t3, e3) => {
      for (let e4 of t3) {
        t3 = xo(e4);
        let r3 = [];
        for (let e5 of xr(t3, Lo, 1)) r3.push({ x: Dr(e5, 1) ?? 0, y: Dr(e5, 2) ?? 0, z: Dr(e5, 3) ?? 0, visibility: Dr(e5, 4) ?? 0 });
        this.worldLandmarks.push(r3);
      }
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("world_hand_landmarks", (t3) => {
      tu(this, t3);
    }), this.g.attachProtoVectorListener("hand_gestures", (t3, e3) => {
      this.gestures.push(...Ec(t3, false)), tu(this, e3);
    }), this.g.attachEmptyPacketListener("hand_gestures", (t3) => {
      tu(this, t3);
    }), this.g.attachProtoVectorListener("handedness", (t3, e3) => {
      this.handedness.push(...Ec(t3)), tu(this, e3);
    }), this.g.attachEmptyPacketListener("handedness", (t3) => {
      tu(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
function wc(t2) {
  return { landmarks: t2.landmarks, worldLandmarks: t2.worldLandmarks, handednesses: t2.handedness, handedness: t2.handedness };
}
Ac.prototype.recognizeForVideo = Ac.prototype.Ya, Ac.prototype.recognize = Ac.prototype.Xa, Ac.prototype.setOptions = Ac.prototype.v, Ac.createFromModelPath = function(t2, e2) {
  return Zu(Ac, t2, { baseOptions: { modelAssetPath: e2 } });
}, Ac.createFromModelBuffer = function(t2, e2) {
  return Zu(Ac, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Ac.createFromOptions = function(t2, e2) {
  return Zu(Ac, t2, e2);
}, Ac.HAND_CONNECTIONS = vc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$gesture_recognizer$gesture_recognizer.GestureRecognizer.HAND_CONNECTIONS", Ac.HAND_CONNECTIONS);
var bc = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "image_in", "norm_rect", false), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Ir(t2 = this.h = new la(), 0, 1, e2 = new zo()), this.u = new ca(), Ir(this.h, 0, 3, this.u), this.l = new ua(), Ir(this.h, 0, 2, this.l), Ur(this.l, 3, 1), jr(this.l, 2, 0.5), jr(this.u, 2, 0.5), jr(this.h, 4, 0.5);
  }
  C() {
    return "HandLandmarker";
  }
  get baseOptions() {
    return Sr(this.h, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.h, 0, 1, t2);
  }
  v(t2) {
    return "numHands" in t2 && Ur(this.l, 3, t2.numHands ?? 1), "minHandDetectionConfidence" in t2 && jr(this.l, 2, t2.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && jr(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in t2 && jr(this.u, 2, t2.minHandPresenceConfidence ?? 0.5), this.j(t2);
  }
  G(t2, e2) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], tc(this, t2, e2), wc(this);
  }
  H(t2, e2, r2) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], ec(this, t2, r2, e2), wc(this);
  }
  o() {
    var t2 = new mo();
    po(t2, "image_in"), po(t2, "norm_rect"), go(t2, "hand_landmarks"), go(t2, "world_hand_landmarks"), go(t2, "handedness");
    var e2 = new no();
    li(e2, _a, this.h);
    var r2 = new ho();
    Hr(r2, 2, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "LANDMARKS:hand_landmarks"), ao(r2, "WORLD_LANDMARKS:world_hand_landmarks"), ao(r2, "HANDEDNESS:handedness"), r2.v(e2), fo(t2, r2), this.g.attachProtoVectorListener("hand_landmarks", (t3, e3) => {
      for (let e4 of t3) t3 = Io(e4), this.landmarks.push(Qa(t3));
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("hand_landmarks", (t3) => {
      tu(this, t3);
    }), this.g.attachProtoVectorListener("world_hand_landmarks", (t3, e3) => {
      for (let e4 of t3) t3 = xo(e4), this.worldLandmarks.push(th(t3));
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("world_hand_landmarks", (t3) => {
      tu(this, t3);
    }), this.g.attachProtoVectorListener("handedness", (t3, e3) => {
      var r3 = this.handedness, n2 = r3.push, i2 = [];
      for (let e4 of t3) {
        t3 = wo(e4);
        let r4 = [];
        for (let e5 of t3.g()) r4.push({ score: Dr(e5, 2) ?? 0, index: Or(e5, 1) ?? 0 ?? -1, categoryName: _e(sr(e5, 3)) ?? "" ?? "", displayName: _e(sr(e5, 4)) ?? "" ?? "" });
        i2.push(r4);
      }
      n2.call(r3, ...i2), tu(this, e3);
    }), this.g.attachEmptyPacketListener("handedness", (t3) => {
      tu(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
bc.prototype.detectForVideo = bc.prototype.H, bc.prototype.detect = bc.prototype.G, bc.prototype.setOptions = bc.prototype.v, bc.createFromModelPath = function(t2, e2) {
  return Zu(bc, t2, { baseOptions: { modelAssetPath: e2 } });
}, bc.createFromModelBuffer = function(t2, e2) {
  return Zu(bc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, bc.createFromOptions = function(t2, e2) {
  return Zu(bc, t2, e2);
}, bc.HAND_CONNECTIONS = vc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$hand_landmarker$hand_landmarker.HandLandmarker.HAND_CONNECTIONS", bc.HAND_CONNECTIONS);
var Tc = zu([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
function kc(t2) {
  t2.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] };
}
function Sc(t2) {
  try {
    if (!t2.F) return t2.h;
    t2.F(t2.h);
  } finally {
    nu(t2);
  }
}
function Lc(t2, e2) {
  t2 = Io(t2), e2.push(Qa(t2));
}
var xc = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "input_frames_image", null, false), this.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = false, Ir(t2 = this.l = new wa(), 0, 1, e2 = new zo()), this.Y = new ca(), Ir(this.l, 0, 2, this.Y), this.Aa = new ya(), Ir(this.l, 0, 3, this.Aa), this.u = new Zo(), Ir(this.l, 0, 4, this.u), this.O = new ra(), Ir(this.l, 0, 5, this.O), this.B = new Ea(), Ir(this.l, 0, 6, this.B), this.Z = new Aa(), Ir(this.l, 0, 7, this.Z), jr(this.u, 2, 0.5), jr(this.u, 3, 0.3), jr(this.O, 2, 0.5), jr(this.B, 2, 0.5), jr(this.B, 3, 0.3), jr(this.Z, 2, 0.5), jr(this.Y, 2, 0.5);
  }
  C() {
    return "HolisticLandmarker";
  }
  get baseOptions() {
    return Sr(this.l, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.l, 0, 1, t2);
  }
  v(t2) {
    return "minFaceDetectionConfidence" in t2 && jr(this.u, 2, t2.minFaceDetectionConfidence ?? 0.5), "minFaceSuppressionThreshold" in t2 && jr(this.u, 3, t2.minFaceSuppressionThreshold ?? 0.3), "minFacePresenceConfidence" in t2 && jr(this.O, 2, t2.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in t2 && (this.outputFaceBlendshapes = !!t2.outputFaceBlendshapes), "minPoseDetectionConfidence" in t2 && jr(this.B, 2, t2.minPoseDetectionConfidence ?? 0.5), "minPoseSuppressionThreshold" in t2 && jr(this.B, 3, t2.minPoseSuppressionThreshold ?? 0.3), "minPosePresenceConfidence" in t2 && jr(this.Z, 2, t2.minPosePresenceConfidence ?? 0.5), "outputPoseSegmentationMasks" in t2 && (this.outputPoseSegmentationMasks = !!t2.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in t2 && jr(this.Y, 2, t2.minHandLandmarksConfidence ?? 0.5), this.j(t2);
  }
  G(t2, e2, r2) {
    var n2 = "function" != typeof e2 ? e2 : {};
    return this.F = "function" == typeof e2 ? e2 : r2, kc(this), tc(this, t2, n2), Sc(this);
  }
  H(t2, e2, r2, n2) {
    var i2 = "function" != typeof r2 ? r2 : {};
    return this.F = "function" == typeof r2 ? r2 : n2, kc(this), ec(this, t2, i2, e2), Sc(this);
  }
  o() {
    var t2 = new mo();
    po(t2, "input_frames_image"), go(t2, "pose_landmarks"), go(t2, "pose_world_landmarks"), go(t2, "face_landmarks"), go(t2, "left_hand_landmarks"), go(t2, "left_hand_world_landmarks"), go(t2, "right_hand_landmarks"), go(t2, "right_hand_world_landmarks");
    var e2 = new no(), r2 = new Bs();
    Hr(r2, 1, "type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), function(t3, e3) {
      if (null != e3) if (Array.isArray(e3)) ar(t3, 2, Ge(e3, 0, Ve));
      else {
        if (!("string" == typeof e3 || e3 instanceof N || x(e3))) throw Error("invalid value in Any.value field: " + e3 + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
        _r(t3, 2, ct(e3, false), I());
      }
    }(r2, this.l.g());
    var n2 = new ho();
    Hr(n2, 2, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), Mr(n2, 8, Bs, r2), oo(n2, "IMAGE:input_frames_image"), ao(n2, "POSE_LANDMARKS:pose_landmarks"), ao(n2, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), ao(n2, "FACE_LANDMARKS:face_landmarks"), ao(n2, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), ao(n2, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), ao(n2, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), ao(n2, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), n2.v(e2), fo(t2, n2), eu(this, t2), this.g.attachProtoListener("pose_landmarks", (t3, e3) => {
      Lc(t3, this.h.poseLandmarks), tu(this, e3);
    }), this.g.attachEmptyPacketListener("pose_landmarks", (t3) => {
      tu(this, t3);
    }), this.g.attachProtoListener("pose_world_landmarks", (t3, e3) => {
      var r3 = this.h.poseWorldLandmarks;
      t3 = xo(t3), r3.push(th(t3)), tu(this, e3);
    }), this.g.attachEmptyPacketListener("pose_world_landmarks", (t3) => {
      tu(this, t3);
    }), this.outputPoseSegmentationMasks && (ao(n2, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), ru(this, "pose_segmentation_mask"), this.g.ga("pose_segmentation_mask", (t3, e3) => {
      this.h.poseSegmentationMasks = [rc(this, t3, true, !this.F)], tu(this, e3);
    }), this.g.attachEmptyPacketListener("pose_segmentation_mask", (t3) => {
      this.h.poseSegmentationMasks = [], tu(this, t3);
    })), this.g.attachProtoListener("face_landmarks", (t3, e3) => {
      Lc(t3, this.h.faceLandmarks), tu(this, e3);
    }), this.g.attachEmptyPacketListener("face_landmarks", (t3) => {
      tu(this, t3);
    }), this.outputFaceBlendshapes && (go(t2, "extra_blendshapes"), ao(n2, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", (t3, e3) => {
      var r3 = this.h.faceBlendshapes;
      this.outputFaceBlendshapes && (t3 = wo(t3), r3.push(qa(t3.g() ?? []))), tu(this, e3);
    }), this.g.attachEmptyPacketListener("extra_blendshapes", (t3) => {
      tu(this, t3);
    })), this.g.attachProtoListener("left_hand_landmarks", (t3, e3) => {
      Lc(t3, this.h.leftHandLandmarks), tu(this, e3);
    }), this.g.attachEmptyPacketListener("left_hand_landmarks", (t3) => {
      tu(this, t3);
    }), this.g.attachProtoListener("left_hand_world_landmarks", (t3, e3) => {
      var r3 = this.h.leftHandWorldLandmarks;
      t3 = xo(t3), r3.push(th(t3)), tu(this, e3);
    }), this.g.attachEmptyPacketListener("left_hand_world_landmarks", (t3) => {
      tu(this, t3);
    }), this.g.attachProtoListener("right_hand_landmarks", (t3, e3) => {
      Lc(t3, this.h.rightHandLandmarks), tu(this, e3);
    }), this.g.attachEmptyPacketListener("right_hand_landmarks", (t3) => {
      tu(this, t3);
    }), this.g.attachProtoListener("right_hand_world_landmarks", (t3, e3) => {
      var r3 = this.h.rightHandWorldLandmarks;
      t3 = xo(t3), r3.push(th(t3)), tu(this, e3);
    }), this.g.attachEmptyPacketListener("right_hand_world_landmarks", (t3) => {
      tu(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
xc.prototype.detectForVideo = xc.prototype.H, xc.prototype.detect = xc.prototype.G, xc.prototype.setOptions = xc.prototype.v, xc.createFromModelPath = function(t2, e2) {
  return Zu(xc, t2, { baseOptions: { modelAssetPath: e2 } });
}, xc.createFromModelBuffer = function(t2, e2) {
  return Zu(xc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, xc.createFromOptions = function(t2, e2) {
  return Zu(xc, t2, e2);
}, xc.HAND_CONNECTIONS = vc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.HAND_CONNECTIONS", xc.HAND_CONNECTIONS), xc.POSE_CONNECTIONS = Tc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.POSE_CONNECTIONS", xc.POSE_CONNECTIONS), xc.FACE_LANDMARKS_LIPS = sc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LIPS", xc.FACE_LANDMARKS_LIPS), xc.FACE_LANDMARKS_LEFT_EYE = oc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_EYE", xc.FACE_LANDMARKS_LEFT_EYE), xc.FACE_LANDMARKS_LEFT_EYEBROW = ac, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_EYEBROW", xc.FACE_LANDMARKS_LEFT_EYEBROW), xc.FACE_LANDMARKS_LEFT_IRIS = hc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_IRIS", xc.FACE_LANDMARKS_LEFT_IRIS), xc.FACE_LANDMARKS_RIGHT_EYE = uc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_EYE", xc.FACE_LANDMARKS_RIGHT_EYE), xc.FACE_LANDMARKS_RIGHT_EYEBROW = cc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW", xc.FACE_LANDMARKS_RIGHT_EYEBROW), xc.FACE_LANDMARKS_RIGHT_IRIS = lc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_IRIS", xc.FACE_LANDMARKS_RIGHT_IRIS), xc.FACE_LANDMARKS_FACE_OVAL = dc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_FACE_OVAL", xc.FACE_LANDMARKS_FACE_OVAL), xc.FACE_LANDMARKS_CONTOURS = fc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_CONTOURS", xc.FACE_LANDMARKS_CONTOURS), xc.FACE_LANDMARKS_TESSELATION = pc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_TESSELATION", xc.FACE_LANDMARKS_TESSELATION);
var Rc = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "input_image", "norm_rect", true), this.l = { classifications: [] }, Ir(t2 = this.h = new ka(), 0, 1, e2 = new zo());
  }
  C() {
    return "ImageClassifier";
  }
  get baseOptions() {
    return Sr(this.h, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.h, 0, 1, t2);
  }
  v(t2) {
    return Ir(this.h, 0, 2, za(t2, Sr(this.h, Go, 2))), this.j(t2);
  }
  Ga(t2, e2) {
    return this.l = { classifications: [] }, tc(this, t2, e2), this.l;
  }
  Ha(t2, e2, r2) {
    return this.l = { classifications: [] }, ec(this, t2, r2, e2), this.l;
  }
  o() {
    var t2 = new mo();
    po(t2, "input_image"), po(t2, "norm_rect"), go(t2, "classifications");
    var e2 = new no();
    li(e2, Sa, this.h);
    var r2 = new ho();
    Hr(r2, 2, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), oo(r2, "IMAGE:input_image"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "CLASSIFICATIONS:classifications"), r2.v(e2), fo(t2, r2), this.g.attachProtoListener("classifications", (t3, e3) => {
      this.l = Ja(Oo(t3)), tu(this, e3);
    }), this.g.attachEmptyPacketListener("classifications", (t3) => {
      tu(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Rc.prototype.classifyForVideo = Rc.prototype.Ha, Rc.prototype.classify = Rc.prototype.Ga, Rc.prototype.setOptions = Rc.prototype.v, Rc.createFromModelPath = function(t2, e2) {
  return Zu(Rc, t2, { baseOptions: { modelAssetPath: e2 } });
}, Rc.createFromModelBuffer = function(t2, e2) {
  return Zu(Rc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Rc.createFromOptions = function(t2, e2) {
  return Zu(Rc, t2, e2);
};
var Ic = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "image_in", "norm_rect", true), this.h = new La(), this.embeddings = { embeddings: [] }, Ir(t2 = this.h, 0, 1, e2 = new zo());
  }
  C() {
    return "ImageEmbedder";
  }
  get baseOptions() {
    return Sr(this.h, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.h, 0, 1, t2);
  }
  v(t2) {
    var e2 = this.h, r2 = Sr(this.h, Vo, 2);
    if (r2 = r2 ? r2.clone() : new Vo(), void 0 !== t2.l2Normalize) {
      var n2 = t2.l2Normalize;
      ar(r2, 1, null == n2 ? n2 : Zt(n2));
    } else "l2Normalize" in t2 && ar(r2, 1);
    return void 0 !== t2.quantize ? ar(r2, 2, null == (n2 = t2.quantize) ? n2 : Zt(n2)) : "quantize" in t2 && ar(r2, 2), Ir(e2, 0, 2, r2), this.j(t2);
  }
  Na(t2, e2) {
    return tc(this, t2, e2), this.embeddings;
  }
  Oa(t2, e2, r2) {
    return ec(this, t2, r2, e2), this.embeddings;
  }
  o() {
    var t2 = new mo();
    po(t2, "image_in"), po(t2, "norm_rect"), go(t2, "embeddings_out");
    var e2 = new no();
    li(e2, xa, this.h);
    var r2 = new ho();
    Hr(r2, 2, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "EMBEDDINGS:embeddings_out"), r2.v(e2), fo(t2, r2), this.g.attachProtoListener("embeddings_out", (t3, e3) => {
      t3 = Bo(t3), this.embeddings = function(t4) {
        return { embeddings: xr(t4, $o, 1).map((t5) => {
          var _a2, _b;
          var e4 = { headIndex: Or(t5, 3) ?? 0 ?? -1, headName: _e(sr(t5, 4)) ?? "" ?? "" };
          if (ur(t5, Do, 1, Uo)) t5 = lr(t5 = Pr(t5, Do, 1), 1, Jt, cr()), e4.floatEmbedding = t5.slice();
          else {
            let r3 = new Uint8Array(0);
            e4.quantizedEmbedding = ((_b = (_a2 = Pr(t5, Po, 2)) == null ? void 0 : _a2.g()) == null ? void 0 : _b.h()) ?? r3;
          }
          return e4;
        }), timestampMs: Ya(sr(t4, 2, void 0, fe) ?? nr) };
      }(t3), tu(this, e3);
    }), this.g.attachEmptyPacketListener("embeddings_out", (t3) => {
      tu(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Ic.cosineSimilarity = function(t2, e2) {
  if (t2.floatEmbedding && e2.floatEmbedding) t2 = rh(t2.floatEmbedding, e2.floatEmbedding);
  else {
    if (!t2.quantizedEmbedding || !e2.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
    t2 = rh(eh(t2.quantizedEmbedding), eh(e2.quantizedEmbedding));
  }
  return t2;
}, Ic.prototype.embedForVideo = Ic.prototype.Oa, Ic.prototype.embed = Ic.prototype.Na, Ic.prototype.setOptions = Ic.prototype.v, Ic.createFromModelPath = function(t2, e2) {
  return Zu(Ic, t2, { baseOptions: { modelAssetPath: e2 } });
}, Ic.createFromModelBuffer = function(t2, e2) {
  return Zu(Ic, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Ic.createFromOptions = function(t2, e2) {
  return Zu(Ic, t2, e2);
};
var Fc = class {
  constructor(t2, e2, r2) {
    this.confidenceMasks = t2, this.categoryMask = e2, this.qualityScores = r2;
  }
  close() {
    var _a2, _b;
    (_a2 = this.confidenceMasks) == null ? void 0 : _a2.forEach((t2) => {
      t2.close();
    }), (_b = this.categoryMask) == null ? void 0 : _b.close();
  }
};
function Cc(t2) {
  var _a2, _b;
  var e2 = function(t3) {
    return xr(t3, ho, 1);
  }(t2.ja()).filter((t3) => (_e(sr(t3, 1)) ?? "").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));
  if (t2.u = [], e2.length > 1) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
  1 === e2.length && (((_b = (_a2 = Sr(e2[0], no, 7)) == null ? void 0 : _a2.o()) == null ? void 0 : _b.g()) ?? /* @__PURE__ */ new Map()).forEach((e3, r2) => {
    t2.u[Number(r2)] = _e(sr(e3, 1)) ?? "";
  });
}
function Nc(t2) {
  t2.categoryMask = void 0, t2.confidenceMasks = void 0, t2.qualityScores = void 0;
}
function Mc(t2) {
  try {
    let e2 = new Fc(t2.confidenceMasks, t2.categoryMask, t2.qualityScores);
    if (!t2.l) return e2;
    t2.l(e2);
  } finally {
    nu(t2);
  }
}
Fc.prototype.close = Fc.prototype.close;
var Oc = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "image_in", "norm_rect", false), this.u = [], this.outputCategoryMask = false, this.outputConfidenceMasks = true, this.h = new Na(), this.B = new Ra(), Ir(this.h, 0, 3, this.B), Ir(t2 = this.h, 0, 1, e2 = new zo());
  }
  C() {
    return "ImageSegmenter";
  }
  get baseOptions() {
    return Sr(this.h, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.h, 0, 1, t2);
  }
  v(t2) {
    return void 0 !== t2.displayNamesLocale ? ar(this.h, 2, ve(t2.displayNamesLocale)) : "displayNamesLocale" in t2 && ar(this.h, 2), "outputCategoryMask" in t2 && (this.outputCategoryMask = t2.outputCategoryMask ?? false), "outputConfidenceMasks" in t2 && (this.outputConfidenceMasks = t2.outputConfidenceMasks ?? true), super.j(t2);
  }
  L() {
    Cc(this);
  }
  segment(t2, e2, r2) {
    var n2 = "function" != typeof e2 ? e2 : {};
    return this.l = "function" == typeof e2 ? e2 : r2, Nc(this), tc(this, t2, n2), Mc(this);
  }
  eb(t2, e2, r2, n2) {
    var i2 = "function" != typeof r2 ? r2 : {};
    return this.l = "function" == typeof r2 ? r2 : n2, Nc(this), ec(this, t2, i2, e2), Mc(this);
  }
  Ra() {
    return this.u;
  }
  o() {
    var t2 = new mo();
    po(t2, "image_in"), po(t2, "norm_rect");
    var e2 = new no();
    li(e2, Ma, this.h);
    var r2 = new ho();
    Hr(r2, 2, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), r2.v(e2), fo(t2, r2), eu(this, t2), this.outputConfidenceMasks && (go(t2, "confidence_masks"), ao(r2, "CONFIDENCE_MASKS:confidence_masks"), ru(this, "confidence_masks"), this.g.ha("confidence_masks", (t3, e3) => {
      this.confidenceMasks = t3.map((t4) => rc(this, t4, true, !this.l)), tu(this, e3);
    }), this.g.attachEmptyPacketListener("confidence_masks", (t3) => {
      this.confidenceMasks = [], tu(this, t3);
    })), this.outputCategoryMask && (go(t2, "category_mask"), ao(r2, "CATEGORY_MASK:category_mask"), ru(this, "category_mask"), this.g.ga("category_mask", (t3, e3) => {
      this.categoryMask = rc(this, t3, false, !this.l), tu(this, e3);
    }), this.g.attachEmptyPacketListener("category_mask", (t3) => {
      this.categoryMask = void 0, tu(this, t3);
    })), go(t2, "quality_scores"), ao(r2, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", (t3, e3) => {
      this.qualityScores = t3, tu(this, e3);
    }), this.g.attachEmptyPacketListener("quality_scores", (t3) => {
      this.categoryMask = void 0, tu(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Oc.prototype.getLabels = Oc.prototype.Ra, Oc.prototype.segmentForVideo = Oc.prototype.eb, Oc.prototype.segment = Oc.prototype.segment, Oc.prototype.setOptions = Oc.prototype.v, Oc.createFromModelPath = function(t2, e2) {
  return Zu(Oc, t2, { baseOptions: { modelAssetPath: e2 } });
}, Oc.createFromModelBuffer = function(t2, e2) {
  return Zu(Oc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Oc.createFromOptions = function(t2, e2) {
  return Zu(Oc, t2, e2);
};
var Dc = { 0: 0, 1: 1, 2: 2, 3: 3 };
function Pc() {
  return Ph() ? void 0 : document.createElement("canvas");
}
var $c = class extends iu {
  constructor(t2, e2) {
    super(new Yh(t2, e2)), this.u = new pu(), this.delegate = "CPU", this.h = 0, this.baseOptions = new zo(), this.B = this.l = 0;
  }
  C() {
    return "InteractiveSegmenter";
  }
  get i() {
    return this.g.i;
  }
  v(t2) {
    var _a2;
    return this.delegate = ((_a2 = t2.baseOptions) == null ? void 0 : _a2.delegate) ?? "CPU", super.j(t2);
  }
  fb(t2) {
    if (0 === this.h) throw Error("Segmenter is not initialized.");
    var e2;
    if (0 !== this.l && (this.i._free(this.l), this.l = 0), !(e2 = "undefined" != typeof ImageData && t2 instanceof ImageData)) if ("object" != typeof t2 || null === t2) e2 = false;
    else {
      e2 = t2.data;
      var r2 = t2.width, n2 = t2.height;
      e2 = Number.isInteger(r2) && r2 > 0 && Number.isInteger(n2) && n2 > 0 && (e2 instanceof Uint8ClampedArray || e2 instanceof Uint8Array);
    }
    if (e2) e2 = t2.width, r2 = t2.height, t2 = t2.data;
    else {
      if ([e2, r2] = Uh(t2), "undefined" != typeof OffscreenCanvas) n2 = new OffscreenCanvas(e2, r2);
      else {
        if ("undefined" == typeof document) throw Error("Canvas is not supported in this environment.");
        n2 = document.createElement("canvas");
      }
      if (n2.width = e2, n2.height = r2, !(n2 = n2.getContext("2d"))) throw Error("Canvas 2D context is not supported in this environment.");
      n2.drawImage(t2, 0, 0), t2 = n2.getImageData(0, 0, e2, r2).data;
    }
    if (!t2) throw Error("Unsupported image source or failed to extract image pixels.");
    n2 = function({ Wa: t3, width: e3, height: r3 }) {
      if (e3 <= 0 || r3 <= 0) throw Error(`Invalid image dimensions: ${e3}x${r3}. Dimensions must be positive.`);
      if (t3 % (e3 * r3) !== 0) throw Error(`Invalid image dimensions or pixel data length. Pixel data length ${t3} is not a multiple of the number of pixels (${e3 * r3}).`);
      if (4 !== (t3 /= e3 * r3) && 3 !== t3 && 1 !== t3) throw Error(`Invalid image dimensions or pixel data length. Calculated channels: ${t3}. Expected 1, 3, or 4.`);
      return t3;
    }({ Wa: t2.length, width: e2, height: r2 });
    var i2 = this.i._malloc(t2.length);
    if (this.i.HEAPU8.set(t2, i2), this.l = i2, !this.i._interactive_segmenter_set_image(this.h, i2, e2, r2, n2)) throw Error("Failed to set image on native engine.");
  }
  segment(t2) {
    var _a2;
    if (0 === this.h) throw Error("Segmenter is not initialized.");
    var e2 = function(t3) {
      t3 = t3.map(({ isCompleted: t4, brushMode: e4, point: r3 }) => {
        e4 = Dc[e4] ?? 0, r3 = r3.map(({ x: t5, y: e5 }) => {
          var r4 = new Oa();
          return Vr(r4, 1, t5), Vr(r4, 2, e5), r4;
        });
        var n3 = new Da();
        return $r(n3, t4), _r(n3, 1, ee(e4), 0), Cr(n3, 2, r3), n3;
      });
      var e3 = new Pa();
      return Cr(e3, 1, t3), $a(e3);
    }(t2);
    t2 = this.i._malloc(e2.length), this.i.HEAPU8.set(e2, t2);
    var r2 = this.i._malloc(12), n2 = r2 + 4, i2 = r2 + 8, s2 = 0, o2 = this.B++;
    try {
      if (this.m) if ("GPU" === this.delegate) {
        var a2 = this.m;
        ++a2.g.T, a2.h.set(o2, performance.now());
      } else {
        var h2 = this.m;
        ++h2.g.P, h2.h.set(o2, performance.now());
      }
      if (0 === (s2 = this.i._interactive_segmenter_segment(this.h, t2, e2.length, r2, n2, i2))) throw Error("Segmentation failed.");
      (_a2 = this.m) == null ? void 0 : _a2.za(o2);
      let c2 = this.i.HEAPU32[r2 / 4], l2 = this.i.HEAPU32[n2 / 4], d2 = new Float32Array(this.i.HEAPU8.buffer, s2, this.i.HEAPU32[i2 / 4] / 4);
      var u2 = new Float32Array(d2);
      if (a2 = c2 * l2, (u2 instanceof Uint8Array || u2 instanceof Float32Array) && u2.length !== a2) throw Error("Unsupported channel count: " + u2.length / a2);
      return new Su([u2], true, false, this.g.i.canvas ?? void 0, this.u, c2, l2);
    } finally {
      0 !== t2 && this.i._free(t2), 0 !== r2 && this.i._free(r2), 0 !== s2 && this.i._free(s2);
    }
  }
  o() {
    var _a2, _b;
    0 !== this.h && ((_a2 = this.m) == null ? void 0 : _a2.xa(), this.i._interactive_segmenter_close(this.h), this.h = 0), 0 !== this.l && (this.i._free(this.l), this.l = 0);
    var t2 = new Ko();
    if ("GPU" === this.delegate) {
      var e2 = new Ys();
      Fr(t2, 2, Xo, e2);
    } else Ur(e2 = new eo(), 1, 4), Fr(t2, 1, Xo, e2);
    if (Ir(this.baseOptions, 0, 3, t2), t2 = Jo(this.baseOptions), e2 = this.i._malloc(t2.length), this.i.HEAPU8.set(t2, e2), this.h = this.i._interactive_segmenter_create(e2, t2.length), this.i._free(e2), 0 === this.h) throw Error("Failed to create native InteractiveSegmenter engine.");
    (_b = this.m) == null ? void 0 : _b.ya();
  }
  close() {
    0 !== this.h && (this.i._interactive_segmenter_close(this.h), this.h = 0), 0 !== this.l && (this.i._free(this.l), this.l = 0), this.u.close(), super.close();
  }
};
$c.prototype.close = $c.prototype.close, $c.prototype.segment = $c.prototype.segment, $c.prototype.setImage = $c.prototype.fb, $c.prototype.setOptions = $c.prototype.v, $c.createFromModelPath = function(t2, e2) {
  return Jh($c, Pc(), t2, { baseOptions: { modelAssetPath: e2 } });
}, $c.createFromModelBuffer = function(t2, e2) {
  return Jh($c, Pc(), t2, { baseOptions: { modelAssetBuffer: e2 } });
}, $c.createFromOptions = function(t2, e2) {
  var r2 = e2.canvas ?? Pc();
  return Jh($c, r2, t2, e2);
};
var Uc = class {
  constructor(t2, e2, r2) {
    this.confidenceMasks = t2, this.categoryMask = e2, this.qualityScores = r2;
  }
  close() {
    var _a2, _b;
    (_a2 = this.confidenceMasks) == null ? void 0 : _a2.forEach((t2) => {
      t2.close();
    }), (_b = this.categoryMask) == null ? void 0 : _b.close();
  }
};
Uc.prototype.close = Uc.prototype.close;
var Bc = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "image_in", "norm_rect_in", false), this.outputCategoryMask = false, this.outputConfidenceMasks = true, this.h = new Na(), this.u = new Ra(), Ir(this.h, 0, 3, this.u), Ir(t2 = this.h, 0, 1, e2 = new zo());
  }
  C() {
    return "InteractiveSegmenterLegacy";
  }
  get baseOptions() {
    return Sr(this.h, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.h, 0, 1, t2);
  }
  v(t2) {
    return "outputCategoryMask" in t2 && (this.outputCategoryMask = t2.outputCategoryMask ?? false), "outputConfidenceMasks" in t2 && (this.outputConfidenceMasks = t2.outputConfidenceMasks ?? true), super.j(t2);
  }
  segment(t2, e2, r2, n2) {
    var i2 = "function" != typeof r2 ? r2 : {};
    if (this.l = "function" == typeof r2 ? r2 : n2, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, r2 = this.I + 1, n2 = new ja(), e2.keypoint && e2.scribble) throw Error("Cannot provide both keypoint and scribble.");
    if (e2.keypoint) {
      var s2 = new Ua();
      $r(s2, true), Vr(s2, 1, e2.keypoint.x), Vr(s2, 2, e2.keypoint.y), Fr(n2, 1, Va, s2);
    } else {
      if (!e2.scribble) throw Error("Must provide either a keypoint or a scribble.");
      {
        let t3 = new Ga();
        for (s2 of e2.scribble) $r(e2 = new Ua(), true), Vr(e2, 1, s2.x), Vr(e2, 2, s2.y), Mr(t3, 1, Ua, e2);
        Fr(n2, 2, Va, t3);
      }
    }
    this.g.addProtoToStream(n2.g(), "mediapipe.tasks.vision.interactive_segmenter_legacy.proto.RegionOfInterest", "roi_in", r2), tc(this, t2, i2);
    t: {
      try {
        let t3 = new Uc(this.confidenceMasks, this.categoryMask, this.qualityScores);
        if (!this.l) {
          var o2 = t3;
          break t;
        }
        this.l(t3);
      } finally {
        nu(this);
      }
      o2 = void 0;
    }
    return o2;
  }
  o() {
    var t2 = new mo();
    po(t2, "image_in"), po(t2, "roi_in"), po(t2, "norm_rect_in");
    var e2 = new no();
    li(e2, Ma, this.h);
    var r2 = new ho();
    Hr(r2, 2, "mediapipe.tasks.vision.interactive_segmenter_legacy.InteractiveSegmenterGraphV2"), oo(r2, "IMAGE:image_in"), oo(r2, "ROI:roi_in"), oo(r2, "NORM_RECT:norm_rect_in"), r2.v(e2), fo(t2, r2), eu(this, t2), this.outputConfidenceMasks && (go(t2, "confidence_masks"), ao(r2, "CONFIDENCE_MASKS:confidence_masks"), ru(this, "confidence_masks"), this.g.ha("confidence_masks", (t3, e3) => {
      this.confidenceMasks = t3.map((t4) => rc(this, t4, true, !this.l)), tu(this, e3);
    }), this.g.attachEmptyPacketListener("confidence_masks", (t3) => {
      this.confidenceMasks = [], tu(this, t3);
    })), this.outputCategoryMask && (go(t2, "category_mask"), ao(r2, "CATEGORY_MASK:category_mask"), ru(this, "category_mask"), this.g.ga("category_mask", (t3, e3) => {
      this.categoryMask = rc(this, t3, false, !this.l), tu(this, e3);
    }), this.g.attachEmptyPacketListener("category_mask", (t3) => {
      this.categoryMask = void 0, tu(this, t3);
    })), go(t2, "quality_scores"), ao(r2, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", (t3, e3) => {
      this.qualityScores = t3, tu(this, e3);
    }), this.g.attachEmptyPacketListener("quality_scores", (t3) => {
      this.categoryMask = void 0, tu(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Bc.prototype.segment = Bc.prototype.segment, Bc.prototype.setOptions = Bc.prototype.v, Bc.createFromModelPath = function(t2, e2) {
  return Zu(Bc, t2, { baseOptions: { modelAssetPath: e2 } });
}, Bc.createFromModelBuffer = function(t2, e2) {
  return Zu(Bc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Bc.createFromOptions = function(t2, e2) {
  return Zu(Bc, t2, e2);
};
var Gc = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "input_frame_gpu", "norm_rect", false), this.l = { detections: [] }, Ir(t2 = this.h = new Ha(), 0, 1, e2 = new zo());
  }
  C() {
    return "ObjectDetector";
  }
  get baseOptions() {
    return Sr(this.h, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.h, 0, 1, t2);
  }
  v(t2) {
    return void 0 !== t2.displayNamesLocale ? ar(this.h, 2, ve(t2.displayNamesLocale)) : "displayNamesLocale" in t2 && ar(this.h, 2), void 0 !== t2.maxResults ? Ur(this.h, 3, t2.maxResults) : "maxResults" in t2 && ar(this.h, 3), void 0 !== t2.scoreThreshold ? jr(this.h, 4, t2.scoreThreshold) : "scoreThreshold" in t2 && ar(this.h, 4), void 0 !== t2.categoryAllowlist ? Kr(this.h, 5, t2.categoryAllowlist) : "categoryAllowlist" in t2 && ar(this.h, 5), void 0 !== t2.categoryDenylist ? Kr(this.h, 6, t2.categoryDenylist) : "categoryDenylist" in t2 && ar(this.h, 6), this.j(t2);
  }
  G(t2, e2) {
    return this.l = { detections: [] }, tc(this, t2, e2), this.l;
  }
  H(t2, e2, r2) {
    return this.l = { detections: [] }, ec(this, t2, r2, e2), this.l;
  }
  o() {
    var t2 = new mo();
    po(t2, "input_frame_gpu"), po(t2, "norm_rect"), go(t2, "detections");
    var e2 = new no();
    li(e2, Ka, this.h);
    var r2 = new ho();
    Hr(r2, 2, "mediapipe.tasks.vision.ObjectDetectorGraph"), oo(r2, "IMAGE:input_frame_gpu"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "DETECTIONS:detections"), r2.v(e2), fo(t2, r2), this.g.attachProtoVectorListener("detections", (t3, e3) => {
      for (let e4 of t3) t3 = So(e4), this.l.detections.push(Za(t3));
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("detections", (t3) => {
      tu(this, t3);
    }), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Gc.prototype.detectForVideo = Gc.prototype.H, Gc.prototype.detect = Gc.prototype.G, Gc.prototype.setOptions = Gc.prototype.v, Gc.createFromModelPath = async function(t2, e2) {
  return Zu(Gc, t2, { baseOptions: { modelAssetPath: e2 } });
}, Gc.createFromModelBuffer = function(t2, e2) {
  return Zu(Gc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Gc.createFromOptions = function(t2, e2) {
  return Zu(Gc, t2, e2);
};
var jc = class {
  constructor(t2, e2, r2) {
    this.landmarks = t2, this.worldLandmarks = e2, this.segmentationMasks = r2;
  }
  close() {
    var _a2;
    (_a2 = this.segmentationMasks) == null ? void 0 : _a2.forEach((t2) => {
      t2.close();
    });
  }
};
function Vc(t2) {
  t2.landmarks = [], t2.worldLandmarks = [], t2.segmentationMasks = void 0;
}
function Hc(t2) {
  try {
    let e2 = new jc(t2.landmarks, t2.worldLandmarks, t2.segmentationMasks);
    if (!t2.u) return e2;
    t2.u(e2);
  } finally {
    nu(t2);
  }
}
jc.prototype.close = jc.prototype.close;
var Kc = class extends nc {
  constructor(t2, e2) {
    super(new Ju(t2, e2), "image_in", "norm_rect", false), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = false, Ir(t2 = this.h = new Xa(), 0, 1, e2 = new zo()), this.B = new Aa(), Ir(this.h, 0, 3, this.B), this.l = new Ea(), Ir(this.h, 0, 2, this.l), Ur(this.l, 4, 1), jr(this.l, 2, 0.5), jr(this.B, 2, 0.5), jr(this.h, 4, 0.5);
  }
  C() {
    return "PoseLandmarker";
  }
  get baseOptions() {
    return Sr(this.h, zo, 1);
  }
  set baseOptions(t2) {
    Ir(this.h, 0, 1, t2);
  }
  v(t2) {
    return "numPoses" in t2 && Ur(this.l, 4, t2.numPoses ?? 1), "minPoseDetectionConfidence" in t2 && jr(this.l, 2, t2.minPoseDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && jr(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minPosePresenceConfidence" in t2 && jr(this.B, 2, t2.minPosePresenceConfidence ?? 0.5), "outputSegmentationMasks" in t2 && (this.outputSegmentationMasks = t2.outputSegmentationMasks ?? false), this.j(t2);
  }
  G(t2, e2, r2) {
    var n2 = "function" != typeof e2 ? e2 : {};
    return this.u = "function" == typeof e2 ? e2 : r2, Vc(this), tc(this, t2, n2), Hc(this);
  }
  H(t2, e2, r2, n2) {
    var i2 = "function" != typeof r2 ? r2 : {};
    return this.u = "function" == typeof r2 ? r2 : n2, Vc(this), ec(this, t2, i2, e2), Hc(this);
  }
  o() {
    var t2 = new mo();
    po(t2, "image_in"), po(t2, "norm_rect"), go(t2, "normalized_landmarks"), go(t2, "world_landmarks"), go(t2, "segmentation_masks");
    var e2 = new no();
    li(e2, Wa, this.h);
    var r2 = new ho();
    Hr(r2, 2, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "NORM_LANDMARKS:normalized_landmarks"), ao(r2, "WORLD_LANDMARKS:world_landmarks"), r2.v(e2), fo(t2, r2), eu(this, t2), this.g.attachProtoVectorListener("normalized_landmarks", (t3, e3) => {
      this.landmarks = [];
      for (let e4 of t3) t3 = Io(e4), this.landmarks.push(Qa(t3));
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("normalized_landmarks", (t3) => {
      this.landmarks = [], tu(this, t3);
    }), this.g.attachProtoVectorListener("world_landmarks", (t3, e3) => {
      this.worldLandmarks = [];
      for (let e4 of t3) t3 = xo(e4), this.worldLandmarks.push(th(t3));
      tu(this, e3);
    }), this.g.attachEmptyPacketListener("world_landmarks", (t3) => {
      this.worldLandmarks = [], tu(this, t3);
    }), this.outputSegmentationMasks && (ao(r2, "SEGMENTATION_MASK:segmentation_masks"), ru(this, "segmentation_masks"), this.g.ha("segmentation_masks", (t3, e3) => {
      this.segmentationMasks = t3.map((t4) => rc(this, t4, true, !this.u)), tu(this, e3);
    }), this.g.attachEmptyPacketListener("segmentation_masks", (t3) => {
      this.segmentationMasks = [], tu(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Kc.prototype.detectForVideo = Kc.prototype.H, Kc.prototype.detect = Kc.prototype.G, Kc.prototype.setOptions = Kc.prototype.v, Kc.createFromModelPath = function(t2, e2) {
  return Zu(Kc, t2, { baseOptions: { modelAssetPath: e2 } });
}, Kc.createFromModelBuffer = function(t2, e2) {
  return Zu(Kc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Kc.createFromOptions = function(t2, e2) {
  return Zu(Kc, t2, e2);
}, Kc.POSE_CONNECTIONS = Tc, r("module$exports$google3$third_party$mediapipe$tasks$web$vision$pose_landmarker$pose_landmarker.PoseLandmarker.POSE_CONNECTIONS", Kc.POSE_CONNECTIONS);
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
  const vision = await ah.forVisionTasks(wasm_path);
  let faceLandmarker = await mc.createFromOptions(vision, {
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
        mc.FACE_LANDMARKS_TESSELATION,
        { color: "#C0C0C070", lineWidth: 1 }
      );
      drawingUtils.drawConnectors(
        landmarks,
        mc.FACE_LANDMARKS_RIGHT_EYE,
        { color: "#FF3030" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        mc.FACE_LANDMARKS_RIGHT_EYEBROW,
        { color: "#FF3030" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        mc.FACE_LANDMARKS_LEFT_EYE,
        { color: "#30FF30" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        mc.FACE_LANDMARKS_LEFT_EYEBROW,
        { color: "#30FF30" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        mc.FACE_LANDMARKS_FACE_OVAL,
        { color: "#E0E0E0" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        mc.FACE_LANDMARKS_LIPS,
        { color: "#E0E0E0" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        mc.FACE_LANDMARKS_RIGHT_IRIS,
        { color: "#FF3030" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        mc.FACE_LANDMARKS_LEFT_IRIS,
        { color: "#30FF30" }
      );
    }
  }
}
let faceDetectorModelTypes = {
  // Selfie distance (128x128 input). The default.
  "shortrange": "./mediapipe/models/face_detection/blaze_face_short_range.tflite",
  // Smaller, farther faces (192x192 input, 2304 anchors); supported since
  // MediaPipe 0.10.33. Select with Fdmodeltype=fullrange.
  "fullrange": "./mediapipe/models/face_detection/blaze_face_full_range.tflite"
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
  const vision = await ah.forVisionTasks(wasm_path);
  let faceDetector = await ic.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: faceDetectorState.modelPath,
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    minSuppressionThreshold: parseFloat(faceDetectorState.minSuppressionThreshold),
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
  const vision = await ah.forVisionTasks(WASM_PATH2);
  let handGestures = await Ac.createFromOptions(vision, {
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
        Ac.HAND_CONNECTIONS,
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
  const vision = await ah.forVisionTasks(WASM_PATH2);
  console.log("numPoses", parseInt(poseState.numPoses));
  let poseLandmarker = await Kc.createFromOptions(vision, {
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
        radius: (data) => Pu.lerp(data.from.z, -0.15, 0.1, 5, 1)
      });
      drawingUtils.drawConnectors(
        landmark,
        Kc.POSE_CONNECTIONS
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
  const vision = await ah.forVisionTasks(WASM_PATH2);
  let objectDetector = await Gc.createFromOptions(vision, {
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
  const vision = await ah.forVisionTasks(WASM_PATH2);
  let imageClassifier = await Rc.createFromOptions(vision, {
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
const SEGMENTATION_MAGIC = [77, 80, 83, 71];
const SEGMENTATION_HEADER_BYTES = 72;
const SEGMENTATION_PROTOCOL_VERSION = 2;
const DTYPE_UINT8 = 1;
const DTYPE_FLOAT32 = 2;
const LAYOUT_HWC = 3;
const MAX_GPU_COLOR_MASKS = 6;
const COLORED_OUTPUT_FLOAT32 = "float32";
const COLORED_OUTPUT_UINT8 = "uint8";
const SEGMENTATION_MODE_CONFIDENCE = 1;
const SEGMENTATION_MODE_COLORED = 2;
const FLAG_ZLIB = 1;
const MIN_COMPRESSION_SAVING = 0.1;
const COMPRESSION_RETRY_INTERVAL = 30;
async function deflate(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}
function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Segmentation compositor shader failed: ${message}`);
  }
  return shader;
}
function createGpuCompositor(canvas, width, height, outputFormat) {
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    console.warn("WebGL2 segmentation compositor is unavailable");
    return void 0;
  }
  if (outputFormat === COLORED_OUTPUT_FLOAT32 && !gl.getExtension("EXT_color_buffer_float")) {
    console.warn("RGBA32F rendering is unavailable; using CPU composition");
    return void 0;
  }
  const vertexShader = compileShader(
    gl,
    gl.VERTEX_SHADER,
    `#version 300 es
        precision highp float;
        out vec2 textureCoords;

        void main() {
            vec2 position = vec2(
                float((gl_VertexID << 1) & 2),
                float(gl_VertexID & 2)
            );
            // Keep the raw MediaPipe/NumPy row orientation. TouchDesigner can
            // apply the same downstream Y flip for every segmentation mode.
            textureCoords = position;
            gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
        }
        `
  );
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    `#version 300 es
        precision highp float;
        in vec2 textureCoords;
        uniform sampler2D masks[${MAX_GPU_COLOR_MASKS}];
        uniform vec4 colors[${MAX_GPU_COLOR_MASKS}];
        uniform int maskCount;
        out vec4 outputColor;

        void main() {
            vec4 color = vec4(0.0);
            if (maskCount > 0) color += texture(masks[0], textureCoords).r * colors[0];
            if (maskCount > 1) color += texture(masks[1], textureCoords).r * colors[1];
            if (maskCount > 2) color += texture(masks[2], textureCoords).r * colors[2];
            if (maskCount > 3) color += texture(masks[3], textureCoords).r * colors[3];
            if (maskCount > 4) color += texture(masks[4], textureCoords).r * colors[4];
            if (maskCount > 5) color += texture(masks[5], textureCoords).r * colors[5];
            outputColor = color;
        }
        `
  );
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Segmentation compositor program failed: ${message}`);
  }
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const isFloat32 = outputFormat === COLORED_OUTPUT_FLOAT32;
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    isFloat32 ? gl.RGBA32F : gl.RGBA8,
    width,
    height,
    0,
    gl.RGBA,
    isFloat32 ? gl.FLOAT : gl.UNSIGNED_BYTE,
    null
  );
  const framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0
  );
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    gl.deleteFramebuffer(framebuffer);
    gl.deleteTexture(texture);
    gl.deleteProgram(program);
    throw new Error("Segmentation compositor framebuffer is incomplete");
  }
  const vertexArray = gl.createVertexArray();
  const readback = isFloat32 ? new Float32Array(width * height * 4) : new Uint8Array(width * height * 4);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  return {
    gl,
    width,
    height,
    outputFormat,
    program,
    framebuffer,
    vertexArray,
    readback,
    masksLocation: gl.getUniformLocation(program, "masks[0]"),
    colorsLocation: gl.getUniformLocation(program, "colors[0]"),
    maskCountLocation: gl.getUniformLocation(program, "maskCount")
  };
}
function resampleFloatMask(mask, width, height) {
  const source = mask.getAsFloat32Array();
  if (mask.width === width && mask.height === height) {
    return source;
  }
  const output = new Float32Array(width * height);
  const scaleX = mask.width / width;
  const scaleY = mask.height / height;
  for (let y2 = 0; y2 < height; y2++) {
    const sourceY = Math.min(mask.height - 1, (y2 + 0.5) * scaleY - 0.5);
    const y0 = Math.max(0, Math.floor(sourceY));
    const y1 = Math.min(mask.height - 1, y0 + 1);
    const yMix = Math.max(0, sourceY - y0);
    for (let x2 = 0; x2 < width; x2++) {
      const sourceX = Math.min(mask.width - 1, (x2 + 0.5) * scaleX - 0.5);
      const x0 = Math.max(0, Math.floor(sourceX));
      const x1 = Math.min(mask.width - 1, x0 + 1);
      const xMix = Math.max(0, sourceX - x0);
      const top = source[y0 * mask.width + x0] * (1 - xMix) + source[y0 * mask.width + x1] * xMix;
      const bottom = source[y1 * mask.width + x0] * (1 - xMix) + source[y1 * mask.width + x1] * xMix;
      output[y2 * width + x2] = top * (1 - yMix) + bottom * yMix;
    }
  }
  return output;
}
function buildConfidenceOutput(confidenceMasks, width, height) {
  const pixelCount = width * height;
  if (confidenceMasks.length === 1) {
    return {
      data: resampleFloatMask(confidenceMasks[0], width, height),
      channels: 1,
      dtype: DTYPE_FLOAT32,
      mode: SEGMENTATION_MODE_CONFIDENCE
    };
  }
  const background = resampleFloatMask(confidenceMasks[0], width, height);
  const foreground = new Float32Array(pixelCount);
  for (let i2 = 0; i2 < pixelCount; i2++) {
    foreground[i2] = 1 - Math.min(1, Math.max(0, background[i2]));
  }
  return {
    data: foreground,
    channels: 1,
    dtype: DTYPE_FLOAT32,
    mode: SEGMENTATION_MODE_CONFIDENCE
  };
}
function buildColoredOutput(confidenceMasks, width, height, legendColors) {
  const pixelCount = width * height;
  const rgba = new Float32Array(pixelCount * 4);
  for (let maskIndex = 0; maskIndex < confidenceMasks.length; maskIndex++) {
    const mask = resampleFloatMask(
      confidenceMasks[maskIndex],
      width,
      height
    );
    const color = legendColors[maskIndex] ?? [1, 1, 1, 1];
    for (let pixel = 0; pixel < pixelCount; pixel++) {
      const confidence = mask[pixel];
      const outputIndex = pixel * 4;
      rgba[outputIndex] += confidence * color[0];
      rgba[outputIndex + 1] += confidence * color[1];
      rgba[outputIndex + 2] += confidence * color[2];
      rgba[outputIndex + 3] += confidence * color[3];
    }
  }
  return {
    data: rgba,
    channels: 4,
    dtype: DTYPE_FLOAT32,
    mode: SEGMENTATION_MODE_COLORED
  };
}
function copyPayload(target, data, byteOffset, dtype) {
  if (dtype === DTYPE_UINT8) {
    target.set(data, byteOffset);
    return;
  }
  const endianProbe = new Uint16Array([1]);
  const isLittleEndian = new Uint8Array(endianProbe.buffer)[0] === 1;
  if (isLittleEndian) {
    target.set(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
      byteOffset
    );
    return;
  }
  const view = new DataView(target.buffer);
  for (let i2 = 0; i2 < data.length; i2++) {
    view.setFloat32(byteOffset + i2 * 4, data[i2], true);
  }
}
class SegmentationProcessor {
  constructor(options) {
    this.wasmPath = options.wasmPath;
    this.modelPath = options.modelPath;
    this.width = options.width;
    this.height = options.height;
    this.coloredOutputFormat = options.coloredOutputFormat;
    this.legendColors = options.legendColors;
    this.maxInFlight = options.maxInFlight;
    this.ackTimeoutMs = options.ackTimeoutMs;
    this.send = options.send;
    this.wasmModule = options.wasmModule === true;
    this.compressionEnabled = options.compression === true && typeof CompressionStream === "function";
    this.peerSupportsZlib = false;
    this.compressionPausedUntil = 0;
    this.deliveryChain = Promise.resolve();
    this.pendingDeliveries = 0;
    this.reportTimeOriginMs = options.reportTimeOriginMs;
    this.clockOffsetMs = performance.timeOrigin - this.reportTimeOriginMs;
    this.segmenter = void 0;
    this.labels = [];
    this.processingCanvas = void 0;
    this.gpuCompositor = void 0;
    this.gpuCompositorDisabled = false;
    this.packetSequence = 0;
    this.inFlightPackets = /* @__PURE__ */ new Map();
    this.stats = {
      attemptedPackets: 0,
      sentPackets: 0,
      sendErrors: 0,
      packTimeMs: 0,
      acknowledgedPackets: 0,
      skippedInFlight: 0,
      ackTimeouts: 0,
      ackRoundTripMs: 0,
      packetBytes: 0,
      // Size before compression, and how many packets went compressed.
      rawPacketBytes: 0,
      compressedPackets: 0,
      inFlight: 0
    };
  }
  now() {
    return performance.now() + this.clockOffsetMs;
  }
  async init() {
    const vision = await ah.forVisionTasks(
      this.wasmPath,
      this.wasmModule
    );
    this.processingCanvas = new OffscreenCanvas(1, 1);
    this.segmenter = await Oc.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: this.modelPath,
        delegate: "GPU"
      },
      canvas: this.processingCanvas,
      runningMode: "VIDEO",
      // Confidence masks retain the model's floating-point
      // probabilities. A category mask is uint8 and would discard the
      // soft edges of the mask.
      outputCategoryMask: false,
      outputConfidenceMasks: true
    });
    this.labels = this.segmenter.getLabels();
    try {
      this.gpuCompositor = createGpuCompositor(
        this.processingCanvas,
        this.width,
        this.height,
        this.coloredOutputFormat
      );
      this.gpuCompositorDisabled = !this.gpuCompositor;
    } catch (error) {
      this.gpuCompositor = void 0;
      this.gpuCompositorDisabled = true;
      console.warn(
        "GPU segmentation compositor initialization failed",
        error
      );
    }
    return this.labels;
  }
  // Drops packets that were never acknowledged, then reports whether
  // another packet may be sent.
  canAccept() {
    const now = this.now();
    for (const [sequence, sentAtMs] of this.inFlightPackets) {
      if (now - sentAtMs >= this.ackTimeoutMs) {
        this.stats.ackTimeouts++;
        this.inFlightPackets.delete(sequence);
      }
    }
    this.stats.inFlight = this.inFlightPackets.size;
    if (this.inFlightPackets.size + this.pendingDeliveries >= this.maxInFlight) {
      this.stats.skippedInFlight++;
      return false;
    }
    return true;
  }
  acknowledge(packetSequence) {
    if (!Number.isInteger(packetSequence)) {
      return;
    }
    const sequence = packetSequence >>> 0;
    const sentAtMs = this.inFlightPackets.get(sequence);
    if (sentAtMs === void 0) {
      return;
    }
    this.stats.acknowledgedPackets++;
    this.stats.ackRoundTripMs = Math.max(0, this.now() - sentAtMs);
    this.inFlightPackets.delete(sequence);
    this.stats.inFlight = this.inFlightPackets.size;
  }
  // Handles a text message from TouchDesigner on the segmentation socket.
  handleSocketText(text) {
    if (text === "ping" || text === "pong") {
      return;
    }
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      console.warn("Ignoring invalid segmentation socket message", error);
      return;
    }
    if (Object.prototype.hasOwnProperty.call(data, "segAck")) {
      this.acknowledge(Number(data.segAck));
    }
    if (data.segCapabilities) {
      this.peerSupportsZlib = Boolean(data.segCapabilities.zlib);
    }
  }
  // A new connection may be an older TouchDesigner without zlib support.
  resetConnection() {
    this.peerSupportsZlib = false;
    this.resetInFlight();
  }
  resetInFlight() {
    this.inFlightPackets.clear();
    this.stats.inFlight = 0;
  }
  // image must already be at the model's native size (width x height). It
  // is only read synchronously, so the caller may release it and submit the
  // next frame as soon as this returns; the returned promise settles once
  // the packet has been sent.
  process(image, frame) {
    const segmentationStartedMs = this.now();
    let packet = null;
    let completedMs = 0;
    let sequence = 0;
    this.segmenter.segmentForVideo(
      image,
      frame.mediaPipeTimestampMs,
      (results) => {
        this.stats.attemptedPackets++;
        try {
          completedMs = this.now();
          this.packetSequence = this.packetSequence + 1 >>> 0;
          sequence = this.packetSequence;
          packet = this.formatBinary(results, {
            sourceFrame: frame.sourceFrame,
            packetSequence: sequence,
            sourceMediaTimeMs: frame.sourceMediaTimeMs,
            mediaPipeTimestampMs: frame.mediaPipeTimestampMs,
            segmentationStartedMs,
            completedMs,
            showMultiClassBackgroundOnly: frame.showMultiClassBackgroundOnly
          });
        } catch (error) {
          this.stats.sendErrors++;
          console.error("Failed to pack segmentation output", error);
        }
      }
    );
    if (!packet) {
      return Promise.resolve();
    }
    this.pendingDeliveries++;
    this.deliveryChain = this.deliveryChain.then(() => this.deliver(packet, sequence, completedMs)).finally(() => {
      this.pendingDeliveries--;
    });
    return this.deliveryChain;
  }
  async deliver(packet, sequence, completedMs) {
    try {
      this.stats.rawPacketBytes = packet.byteLength;
      packet = await this.maybeCompress(packet, sequence);
      this.stats.packTimeMs = this.now() - completedMs;
      const packetBytes = packet.byteLength;
      if (this.send(packet)) {
        this.stats.sentPackets++;
        this.stats.packetBytes = packetBytes;
        this.inFlightPackets.set(sequence, this.now());
        this.stats.inFlight = this.inFlightPackets.size;
      }
    } catch (error) {
      this.stats.sendErrors++;
      console.error("Failed to send segmentation output", error);
    }
  }
  async maybeCompress(packet, sequence) {
    if (!this.compressionEnabled || !this.peerSupportsZlib || sequence < this.compressionPausedUntil) {
      return packet;
    }
    const payload = new Uint8Array(packet, SEGMENTATION_HEADER_BYTES);
    const compressed = await deflate(payload);
    if (compressed.byteLength > payload.byteLength * (1 - MIN_COMPRESSION_SAVING)) {
      this.compressionPausedUntil = sequence + COMPRESSION_RETRY_INTERVAL;
      return packet;
    }
    const output = new Uint8Array(
      SEGMENTATION_HEADER_BYTES + compressed.byteLength
    );
    output.set(new Uint8Array(packet, 0, SEGMENTATION_HEADER_BYTES), 0);
    output.set(compressed, SEGMENTATION_HEADER_BYTES);
    const header = new DataView(output.buffer);
    header.setUint16(14, header.getUint16(14, true) | FLAG_ZLIB, true);
    header.setFloat64(56, this.now(), true);
    this.stats.compressedPackets++;
    return output.buffer;
  }
  buildGpuColoredOutput(confidenceMasks, width, height) {
    if (this.gpuCompositorDisabled || confidenceMasks.length > MAX_GPU_COLOR_MASKS) {
      return null;
    }
    let compositor = this.gpuCompositor;
    if (!compositor || compositor.width !== width || compositor.height !== height || compositor.outputFormat !== this.coloredOutputFormat) {
      compositor = createGpuCompositor(
        this.processingCanvas,
        width,
        height,
        this.coloredOutputFormat
      );
      this.gpuCompositor = compositor;
      this.gpuCompositorDisabled = !compositor;
    }
    if (!compositor) {
      return null;
    }
    const {
      gl,
      program,
      framebuffer,
      vertexArray,
      readback,
      masksLocation,
      colorsLocation,
      maskCountLocation
    } = compositor;
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.viewport(0, 0, width, height);
    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.useProgram(program);
    gl.bindVertexArray(vertexArray);
    for (let i2 = 0; i2 < 16 && gl.getError() !== gl.NO_ERROR; i2++) {
    }
    const colors = new Float32Array(MAX_GPU_COLOR_MASKS * 4);
    for (let i2 = 0; i2 < confidenceMasks.length; i2++) {
      const maskTexture = confidenceMasks[i2].getAsWebGLTexture();
      gl.activeTexture(gl.TEXTURE0 + i2);
      gl.bindTexture(gl.TEXTURE_2D, maskTexture);
      colors.set(this.legendColors[i2] ?? [1, 1, 1, 1], i2 * 4);
    }
    gl.uniform1iv(
      masksLocation,
      new Int32Array(
        Array.from({ length: MAX_GPU_COLOR_MASKS }, (_2, index) => index)
      )
    );
    gl.uniform4fv(colorsLocation, colors);
    gl.uniform1i(maskCountLocation, confidenceMasks.length);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    const isFloat32 = this.coloredOutputFormat === COLORED_OUTPUT_FLOAT32;
    gl.readPixels(
      0,
      0,
      width,
      height,
      gl.RGBA,
      isFloat32 ? gl.FLOAT : gl.UNSIGNED_BYTE,
      readback
    );
    const error = gl.getError();
    gl.bindVertexArray(null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.activeTexture(gl.TEXTURE0);
    if (error !== gl.NO_ERROR) {
      throw new Error(`Segmentation compositor readback failed: ${error}`);
    }
    return {
      data: readback,
      channels: 4,
      dtype: isFloat32 ? DTYPE_FLOAT32 : DTYPE_UINT8,
      mode: SEGMENTATION_MODE_COLORED
    };
  }
  formatBinary(results, timing) {
    const confidenceMasks = results.confidenceMasks;
    if (!(confidenceMasks == null ? void 0 : confidenceMasks.length)) {
      return null;
    }
    const width = this.width;
    const height = this.height;
    if (width > 65535 || height > 65535) {
      throw new RangeError("Segmentation dimensions exceed uint16");
    }
    if (confidenceMasks.length > 255) {
      throw new RangeError("Segmentation mask count exceeds uint8");
    }
    const useColoredOutput = confidenceMasks.length > 1 && !timing.showMultiClassBackgroundOnly;
    let output;
    if (useColoredOutput) {
      try {
        output = this.buildGpuColoredOutput(
          confidenceMasks,
          width,
          height
        );
      } catch (error) {
        this.gpuCompositor = void 0;
        this.gpuCompositorDisabled = true;
        console.warn("GPU segmentation composition failed", error);
      }
      output ?? (output = buildColoredOutput(
        confidenceMasks,
        width,
        height,
        this.legendColors
      ));
    } else {
      output = buildConfidenceOutput(confidenceMasks, width, height);
    }
    const packet = new Uint8Array(
      SEGMENTATION_HEADER_BYTES + output.data.byteLength
    );
    packet.set(SEGMENTATION_MAGIC, 0);
    const header = new DataView(packet.buffer);
    header.setUint8(4, SEGMENTATION_PROTOCOL_VERSION);
    header.setUint8(5, output.dtype);
    header.setUint8(6, LAYOUT_HWC);
    header.setUint8(7, output.mode);
    header.setUint16(8, height, true);
    header.setUint16(10, width, true);
    header.setUint8(12, output.channels);
    header.setUint8(13, confidenceMasks.length);
    header.setUint16(14, 0, true);
    header.setUint32(16, timing.sourceFrame >>> 0, true);
    header.setUint32(20, timing.packetSequence >>> 0, true);
    header.setFloat64(24, timing.sourceMediaTimeMs, true);
    header.setFloat64(32, timing.mediaPipeTimestampMs, true);
    header.setFloat64(40, timing.segmentationStartedMs, true);
    header.setFloat64(48, timing.completedMs, true);
    copyPayload(packet, output.data, SEGMENTATION_HEADER_BYTES, output.dtype);
    header.setFloat64(56, this.now(), true);
    header.setFloat64(64, this.reportTimeOriginMs, true);
    return packet.buffer;
  }
}
const MAX_WORKER_FRAMES = 2;
const EMPTY_STATS = {
  attemptedPackets: 0,
  sentPackets: 0,
  sendErrors: 0,
  packTimeMs: 0,
  acknowledgedPackets: 0,
  skippedInFlight: 0,
  ackTimeouts: 0,
  ackRoundTripMs: 0,
  packetBytes: 0,
  rawPacketBytes: 0,
  compressedPackets: 0,
  inFlight: 0,
  bufferedBytes: 0
};
function captureModelInput(source, width, height) {
  return createImageBitmap(source, {
    resizeWidth: width,
    resizeHeight: height,
    resizeQuality: "high"
  });
}
class WorkerSegmentationClient {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.labels = [];
    this.stats = { ...EMPTY_STATS };
    this.framesInWorker = 0;
    this.open = false;
    this.worker = new Worker(
      new URL(
        /* @vite-ignore */
        "/assets/segmentationWorker-mQXs3daP.js",
        import.meta.url
      ),
      { type: "module" }
    );
    this.ready = new Promise((resolve, reject) => {
      this.worker.addEventListener("message", (event) => {
        const message = event.data;
        if (message.type === "ready") {
          this.labels = message.labels;
          resolve(this);
        } else if (message.type === "initError") {
          this.worker.terminate();
          reject(new Error(message.message));
        } else {
          this.handleWorkerMessage(message);
        }
      });
      this.worker.addEventListener("error", (event) => {
        this.open = false;
        reject(event.error ?? new Error(event.message));
      });
    });
    this.worker.postMessage({
      type: "init",
      socketURL: options.socketURL,
      processorOptions: {
        wasmPath: options.wasmPath,
        modelPath: options.modelPath,
        width: options.width,
        height: options.height,
        coloredOutputFormat: options.coloredOutputFormat,
        legendColors: options.legendColors,
        maxInFlight: options.maxInFlight,
        ackTimeoutMs: options.ackTimeoutMs,
        compression: options.compression,
        reportTimeOriginMs: performance.timeOrigin
      }
    });
  }
  handleWorkerMessage(message) {
    if (message.type === "stats") {
      Object.assign(this.stats, message.stats);
      if (message.frameDone) {
        this.framesInWorker = Math.max(0, this.framesInWorker - 1);
      }
    } else if (message.type === "open") {
      console.log("Segmentation WebSocket connection opened (worker)");
      this.open = true;
    } else if (message.type === "close") {
      console.log("Segmentation socket connection closed");
      this.open = false;
      this.framesInWorker = 0;
    } else if (message.type === "error") {
      console.error("Error in segmentation websocket connection");
    }
  }
  // Frames arriving while the worker already holds MAX_WORKER_FRAMES are
  // skipped, so it never falls more than one frame behind.
  canSubmit() {
    return this.open && this.framesInWorker < MAX_WORKER_FRAMES;
  }
  submit(source, frame) {
    this.framesInWorker++;
    captureModelInput(source, this.width, this.height).then((image) => {
      this.worker.postMessage({ type: "frame", image, frame }, [image]);
    }).catch((error) => {
      this.framesInWorker = Math.max(0, this.framesInWorker - 1);
      this.stats.sendErrors++;
      console.error("Failed to capture segmentation input", error);
    });
  }
}
class MainThreadSegmentationClient {
  constructor(options) {
    this.width = options.width;
    this.height = options.height;
    this.labels = [];
    this.busy = false;
    this.ws = void 0;
    this.processor = new SegmentationProcessor({
      wasmPath: options.wasmPath,
      modelPath: options.modelPath,
      width: options.width,
      height: options.height,
      coloredOutputFormat: options.coloredOutputFormat,
      legendColors: options.legendColors,
      maxInFlight: options.maxInFlight,
      ackTimeoutMs: options.ackTimeoutMs,
      compression: options.compression,
      reportTimeOriginMs: performance.timeOrigin,
      send: (packet) => {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
          return false;
        }
        this.ws.send(packet);
        return true;
      }
    });
    this.ready = this.processor.init().then((labels) => {
      this.labels = labels;
      this.connect(options.socketURL);
      return this;
    });
  }
  get stats() {
    var _a2;
    return {
      ...this.processor.stats,
      bufferedBytes: ((_a2 = this.ws) == null ? void 0 : _a2.bufferedAmount) ?? 0
    };
  }
  connect(url) {
    this.ws = new WebSocket(url);
    this.ws.addEventListener("open", () => {
      console.log("Segmentation WebSocket connection opened");
      this.processor.resetConnection();
    });
    this.ws.addEventListener("message", (event) => {
      if (typeof event.data === "string") {
        this.processor.handleSocketText(event.data);
      }
    });
    this.ws.addEventListener("error", (error) => {
      console.error("Error in segmentation websocket connection", error);
    });
    this.ws.addEventListener("close", () => {
      console.log("Segmentation socket connection closed");
      this.processor.resetConnection();
    });
  }
  canSubmit() {
    var _a2;
    return ((_a2 = this.ws) == null ? void 0 : _a2.readyState) === WebSocket.OPEN && !this.busy;
  }
  submit(source, frame) {
    this.busy = true;
    captureModelInput(source, this.width, this.height).then((image) => {
      try {
        if (this.processor.canAccept()) {
          this.processor.process(image, frame);
        }
      } finally {
        image.close();
        this.busy = false;
      }
    }).catch((error) => {
      this.busy = false;
      this.processor.stats.sendErrors++;
      console.error("Segmentation failed", error);
    });
  }
}
async function createSegmentationClient(options) {
  try {
    return await new WorkerSegmentationClient(options).ready;
  } catch (error) {
    console.warn(
      "Segmentation worker unavailable; running segmentation on the main thread",
      error
    );
  }
  return new MainThreadSegmentationClient(options).ready;
}
const DEFAULT_COLORED_OUTPUT_FORMAT = COLORED_OUTPUT_UINT8;
const SEGMENTATION_MAX_IN_FLIGHT = 2;
const SEGMENTATION_ACK_TIMEOUT_MS = 1e3;
const SEGMENTATION_COMPRESSION = true;
const segmentationModelTypes = {
  selfieSquare: "./mediapipe/models/image_segmentation/selfie_segmenter.tflite",
  selfieLandscape: "./mediapipe/models/image_segmentation/selfie_segmenter_landscape.tflite",
  hairSegmenter: "./mediapipe/models/image_segmentation/hair_segmenter.tflite",
  selfieMulticlass: "./mediapipe/models/image_segmentation/selfie_multiclass_256x256.tflite",
  deepLabV3: "./mediapipe/models/image_segmentation/deeplab_v3.tflite"
};
const segmentationModelResolutions = {
  selfieSquare: { width: 256, height: 256 },
  selfieLandscape: { width: 256, height: 144 },
  hairSegmenter: { width: 512, height: 512 },
  selfieMulticlass: { width: 256, height: 256 },
  deepLabV3: { width: 257, height: 257 }
};
const segmenterState = {
  modelTypes: segmentationModelTypes,
  detect: false,
  modelPath: segmentationModelTypes.selfieMulticlass,
  // The segmentation client (worker or main-thread fallback) once created.
  landmarker: void 0,
  // Whole-person confidence output always remains float32. If the GPU
  // compositor fails, the CPU fallback also emits float32.
  coloredOutputFormat: DEFAULT_COLORED_OUTPUT_FORMAT,
  labels: [],
  resultsName: "segmenterResults",
  // Frames not submitted because the previous one was still processing.
  skippedBusy: 0,
  legendColors: [
    [0, 0, 0, 0],
    // Background
    [193, 0, 32, 255],
    // Hair
    [255, 0, 255, 255],
    // Body skin
    [255, 197, 0, 255],
    // Face skin
    [0, 255, 0, 255],
    // Clothes
    [0, 225, 225, 255],
    // Accessories
    [255, 255, 255, 255],
    // Selfie
    [0, 0, 255, 255],
    [0, 0, 0, 255],
    [0, 125, 52, 255],
    [0, 83, 138, 255],
    [128, 62, 117, 255],
    [255, 104, 0, 255],
    [166, 189, 215, 255],
    [206, 162, 98, 255],
    [129, 112, 102, 255],
    [246, 118, 142, 255],
    [255, 112, 92, 255],
    [83, 55, 112, 255],
    [255, 142, 0, 255],
    [179, 40, 81, 255],
    [244, 200, 0, 255],
    [127, 24, 13, 255],
    [147, 170, 0, 255],
    [89, 51, 21, 255],
    [241, 58, 19, 255],
    [35, 44, 22, 255]
  ].map((color) => color.map((channel) => channel / 255)),
  showMultiClassBackgroundOnly: false
};
async function createImageSegmenter(WASM_PATH2, socketURL) {
  var _a2;
  console.log("Starting image segmentation");
  const selectedModel = (_a2 = Object.entries(segmenterState.modelTypes).find(
    ([, path]) => path === segmenterState.modelPath
  )) == null ? void 0 : _a2[0];
  const nativeResolution = segmentationModelResolutions[selectedModel] ?? segmentationModelResolutions.selfieMulticlass;
  const client = await createSegmentationClient({
    socketURL,
    // Absolute URLs: a worker resolves relative paths against its own
    // script location, not the page.
    wasmPath: new URL(WASM_PATH2, document.baseURI).href,
    modelPath: new URL(segmenterState.modelPath, document.baseURI).href,
    width: nativeResolution.width,
    height: nativeResolution.height,
    coloredOutputFormat: segmenterState.coloredOutputFormat,
    legendColors: segmenterState.legendColors,
    maxInFlight: SEGMENTATION_MAX_IN_FLIGHT,
    ackTimeoutMs: SEGMENTATION_ACK_TIMEOUT_MS,
    compression: SEGMENTATION_COMPRESSION
  });
  segmenterState.labels = client.labels;
  console.log(segmenterState.labels);
  return client;
}
function getSegmentationStats() {
  var _a2;
  return ((_a2 = segmenterState.landmarker) == null ? void 0 : _a2.stats) ?? EMPTY_STATS;
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
  const vision = await ah.forVisionTasks(WASM_PATH2);
  let imageEmbedder2 = await Ic.createFromOptions(vision, {
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
    const similarity = Ic.cosineSimilarity(
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
const FRAME_RATE_TOLERANCE = 0.98;
const offscreenCanvas = document.createElement("canvas");
const offscreenCtx = offscreenCanvas.getContext("2d");
let webcamState = {
  videoElement: "",
  webcamRunning: false,
  webcamDevices: [],
  webcamLabel: "",
  webcamId: "default",
  lastVideoTime: -1,
  sourceFrame: 0,
  targetFrameRate: 60,
  width: window.innerWidth,
  height: window.innerHeight,
  frameRate: 60,
  flipped: 0,
  offscreenCanvas,
  offscreenCtx,
  drawingUtils: new Pu(canvasCtx),
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
  width: window.innerWidth,
  height: window.innerHeight
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
        devices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        webcamState.webcamDevices = devices;
        devices.forEach((device) => {
          if (device.label == webcam) {
            webcamState.webcamId = device.deviceId;
            console.log("Found webcam: " + device.label);
            console.log(
              "Reported capabilities:",
              device.getCapabilities()
            );
            webcamFound = true;
          }
        });
        if (!webcamFound) {
          console.log(
            "Can't find webcam: " + webcamState.webcamLabel
          );
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
  var _a2;
  const requestedFrameRate = Number.isFinite(Number(webcamState.targetFrameRate)) ? Number(webcamState.targetFrameRate) : 60;
  const constraints = {
    video: {
      deviceId: {
        exact: webcamState.webcamId
      },
      width: {
        ideal: window.innerWidth
        // exact: webcamState.width,
      },
      height: {
        ideal: window.innerHeight
        // exact: webcamState.height,
      },
      // aspectRatio: 1.7777777777777777,
      frameRate: {
        ideal: requestedFrameRate
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
    let stream;
    try {
      constraints.video.frameRate.min = requestedFrameRate * FRAME_RATE_TOLERANCE;
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (preferredFrameRateError) {
      console.warn(
        `Webcam cannot run at ${requestedFrameRate} FPS; using its closest supported rate`,
        preferredFrameRateError
      );
      delete constraints.video.frameRate.min;
      stream = await navigator.mediaDevices.getUserMedia(constraints);
    }
    webcamState.videoElement.srcObject = stream;
    const trackSettings = ((_a2 = stream.getVideoTracks()[0]) == null ? void 0 : _a2.getSettings()) ?? {};
    webcamState.frameRate = trackSettings.frameRate;
    console.log("Webcam started with following settings: ", trackSettings);
    webcamState.webcamRunning = true;
    webcamState.videoElement.height = webcamState.height;
    socketState.ws.send(JSON.stringify({
      success: "webcamStarted",
      requestedFrameRate,
      frameRate: trackSettings.frameRate ?? 0,
      width: trackSettings.width ?? 0,
      height: trackSettings.height ?? 0
    }));
  } catch (err) {
    console.log("Error starting webcam: " + err.name + ": " + err.message);
    socketState.ws.send(JSON.stringify({ error: "webcamStartFail" }));
  }
  offscreenCanvas.width = webcamState.width;
  offscreenCanvas.height = webcamState.height;
}
const handTracking = { hands: false, gestures: gestureState.detect };
function setHandTracking(key, value) {
  handTracking[key] = parseInt(value) === 1;
  detectSwitch(gestureState, handTracking.hands || handTracking.gestures);
}
const configMap = {
  "Wsaddress": (value) => socketState.adddress = value,
  "Wsport": (value) => socketState.port = value,
  "Webcam": (value) => webcamState.changeWebcam(value),
  "Wheight": (value) => webcamState.height = value,
  "Wwidth": (value) => webcamState.width = value,
  "Wtargetframerate": (value) => webcamState.targetFrameRate = parseFloat(value),
  "Wflip": (value) => {
    webcamState.flipped = parseInt(value) === 1;
    webcamState.changeWebcam(webcamState.webcamLabel);
  },
  "Oheight": (value) => outputState.height = value,
  "Owidth": (value) => outputState.width = value,
  "Detectfacelandmarks": (value) => detectSwitch(faceLandmarkState, parseInt(value) === 1),
  "Detectfaces": (value) => detectSwitch(faceDetectorState, parseInt(value) === 1),
  "Detectgestures": (value) => setHandTracking("gestures", value),
  "Detecthands": (value) => setHandTracking("hands", value),
  "Detectposes": (value) => detectSwitch(poseState, parseInt(value) === 1),
  "Detectobjects": (value) => detectSwitch(objectState, parseInt(value) === 1),
  "Detectimages": (value) => detectSwitch(imageState, parseInt(value) === 1),
  "Detectsegments": (value) => detectSwitch(segmenterState, parseInt(value) === 1),
  "Detectimageembeddings": (value) => detectSwitch(imageEmbedderState, parseInt(value) === 1),
  "Showoverlays": (value) => overlaySwitch(parseInt(value) === 1),
  // TouchDesigner's hand tracking page sends the H* confidences and Gnumhands;
  // both prefixes configure the gesture recognizer.
  "Hnumhands": (value) => gestureState.numHands = value,
  "Hdetectconf": (value) => gestureState.minDetectionConfidence = value,
  "Hpresconf": (value) => gestureState.minPresenceConfidence = value,
  "Htrackconf": (value) => gestureState.minTrackingConfidence = value,
  "Gnumhands": (value) => gestureState.numHands = value,
  "Gdetectconf": (value) => gestureState.minDetectionConfidence = value,
  "Gpresconf": (value) => gestureState.minPresenceConfidence = value,
  "Gtrackconf": (value) => gestureState.minTrackingConfidence = value,
  "Gnumgestures": (value) => gestureState.maxResults = value,
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
  // TouchDesigner sends Fdmodeltype; Fdtype kept for older URLs.
  "Fdmodeltype": (value) => modelCheck(faceDetectorState, value),
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
}
const WASM_PATH = "./mediapipe/wasm";
const video$1 = document.getElementById("webcam");
let flippedVideo = null;
webcamState.videoElement = video$1;
const canvasElement = document.getElementById("output_canvas");
const canvasContext = canvasElement.getContext("2d");
const objectsDiv = document.getElementById("objects");
const facesDiv = document.getElementById("faces");
const webcamCanvas = document.getElementById("webcam_canvas");
const webcamCanvasContext = webcamCanvas.getContext("2d", { alpha: false });
const frameMarkerCanvas = document.getElementById("frame_marker");
const frameMarkerContext = frameMarkerCanvas.getContext("2d", { alpha: false });
const frameMarkerPixel = frameMarkerContext.createImageData(1, 1);
const CONTROL_MAX_FRAMES_IN_FLIGHT = 3;
const CONTROL_ACK_STALL_MS = 1e3;
const FRAME_MARKER_MASK = 16777215;
const FRAME_MARKER_DEBUG_RED = false;
let allModelState = [faceLandmarkState, faceDetectorState, gestureState, poseState, objectState, imageState, segmenterState, imageEmbedderState];
let landmarkerModelState = [faceLandmarkState, gestureState, poseState];
const controlTransport = {
  timersSent: 0,
  timersAcked: 0,
  // Stays false with older TouchDesigner callbacks that never acknowledge, so
  // they keep receiving every result as before.
  ackSupported: false,
  lastAckAtMs: 0,
  droppedResults: 0,
  sendResultsThisFrame: true
};
let outputSizeKey = "";
(async function setup() {
  handleQueryParams();
  const socketURL = socketState.adddress + ":" + socketState.port;
  setupWebSocket(socketURL, socketState);
  const segmentationSocketURL = socketURL.replace(/\/$/, "") + "/segmentation";
  webcamState.webcamDevices = await getWebcamDevices();
  await new Promise(r => setTimeout(r, 2000));
  gestureState.landmarker = await createGestureLandmarker(WASM_PATH);
  faceLandmarkState.landmarker = await createFaceLandmarker(WASM_PATH);
  faceDetectorState.landmarker = await createFaceDetector(WASM_PATH, facesDiv);
  poseState.landmarker = await createPoseLandmarker(WASM_PATH);
  objectState.landmarker = await createObjectDetector(WASM_PATH, objectsDiv);
  imageState.landmarker = await createImageClassifier(WASM_PATH);
  segmenterState.landmarker = await createImageSegmenter(WASM_PATH, segmentationSocketURL);
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
  if (!ws2 || ws2.readyState !== WebSocket.OPEN) {
    return false;
  }
  try {
    ws2.send(data);
    return true;
  } catch (error) {
    console.error("WebSocket send failed", error);
    return false;
  }
}
function canSendResults() {
  if (!controlTransport.ackSupported) {
    return true;
  }
  const framesInFlight = controlTransport.timersSent - controlTransport.timersAcked;
  if (framesInFlight < CONTROL_MAX_FRAMES_IN_FLIGHT) {
    return true;
  }
  if (performance.now() - controlTransport.lastAckAtMs > CONTROL_ACK_STALL_MS) {
    controlTransport.ackSupported = false;
    return true;
  }
  return false;
}
function acknowledgeTimers(count) {
  if (!Number.isFinite(count)) {
    return;
  }
  controlTransport.timersAcked = Math.max(controlTransport.timersAcked, count);
  controlTransport.ackSupported = true;
  controlTransport.lastAckAtMs = performance.now();
}
function resizeOutputElements() {
  const width = outputState.width;
  const height = outputState.height;
  const sizeKey = `${width}x${height}`;
  if (sizeKey === outputSizeKey) {
    return false;
  }
  outputSizeKey = sizeKey;
  canvasElement.style.width = width;
  canvasElement.style.height = height;
  canvasElement.width = width;
  canvasElement.height = height;
  objectsDiv.style.width = width;
  objectsDiv.style.height = height;
  objectsDiv.width = width;
  objectsDiv.height = height;
  facesDiv.style.width = width;
  facesDiv.style.height = height;
  facesDiv.width = width;
  facesDiv.height = height;
  webcamState.offscreenCanvas.width = width;
  webcamState.offscreenCanvas.height = height;
  return true;
}
function clearOutputCanvas() {
  if (typeof canvasContext.reset === "function") {
    canvasContext.reset();
    return;
  }
  canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
}
async function predictWebcam(allModelState2, objectState2, webcamState2, video2) {
  let timeToDetect = 0;
  let timeToDraw = 0;
  if (!webcamState2.webcamRunning || video2.videoWidth === 0 || video2.videoHeight === 0) {
    window.requestAnimationFrame(() => predictWebcam(allModelState2, objectState2, webcamState2, video2));
    return;
  }
  if (!resizeOutputElements()) {
    clearOutputCanvas();
  }
  let startTimeMs = performance.now();
  const hasNewFrame = webcamState2.lastVideoTime !== video2.currentTime;
  controlTransport.sendResultsThisFrame = canSendResults();
  if (hasNewFrame) {
    if (!controlTransport.sendResultsThisFrame) {
      controlTransport.droppedResults++;
    }
    const sourceFrame = getSourceFrame(video2, webcamState2);
    const sourceMediaTimeMs = video2.currentTime * 1e3;
    if (webcamState2.webcamRunning && !(video2.videoWidth === 0 || video2.videoHeight === 0)) {
      flippedVideo = captureAndFlipWebcam(video2, webcamState2, sourceFrame);
    }
    const segmentationClient = segmenterState.landmarker;
    if (segmenterState.detect && segmentationClient && flippedVideo) {
      if (segmentationClient.canSubmit()) {
        segmentationClient.submit(flippedVideo, {
          sourceFrame,
          sourceMediaTimeMs,
          mediaPipeTimestampMs: startTimeMs,
          showMultiClassBackgroundOnly: segmenterState.showMultiClassBackgroundOnly
        });
      } else {
        segmenterState.skippedBusy++;
      }
    }
    let startDetect = Date.now();
    webcamState2.lastVideoTime = video2.currentTime;
    for (let landmarker of allModelState2) {
      if (landmarker.detect && landmarker.landmarker) {
        let marker = landmarker.landmarker;
        if (landmarker.resultsName === "segmenterResults") {
          continue;
        } else if (landmarker.resultsName === "gestureResults") {
          landmarker.results = await marker.recognizeForVideo(flippedVideo, startTimeMs);
          sendLandmarkerResults(landmarker, video2);
        } else if (landmarker.resultsName === "imageResults") {
          landmarker.results = await marker.classifyForVideo(flippedVideo, startTimeMs);
          sendLandmarkerResults(landmarker, video2);
        } else if (landmarker.resultsName === "imageEmbedderResults") {
          landmarker.results = await marker.embedForVideo(flippedVideo, startTimeMs);
          sendLandmarkerResults(landmarker, video2);
        } else {
          landmarker.results = await marker.detectForVideo(flippedVideo, startTimeMs);
          sendLandmarkerResults(landmarker, video2);
        }
      }
      let endDetect = Date.now();
      timeToDetect = Math.round(endDetect - startDetect);
    }
  }
  let startDraw = Date.now();
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
  const segmentationStats = getSegmentationStats();
  const sendTimers = controlTransport.sendResultsThisFrame && (hasNewFrame || segmentationStats.inFlight > 0);
  if (sendTimers && safeSocketSend(socketState.ws, JSON.stringify({
    timers: {
      // Must stay the first key: TouchDesigner echoes it back as timersSeq
      // without parsing the whole message.
      seq: controlTransport.timersSent + 1,
      detectTime: timeToDetect,
      drawTime: timeToDraw,
      sourceFrameRate: webcamState2.frameRate,
      segmentationTransport: {
        enabled: Number(segmenterState.detect),
        attemptedPackets: segmentationStats.attemptedPackets,
        sentPackets: segmentationStats.sentPackets,
        sendErrors: segmentationStats.sendErrors,
        bufferedBytes: segmentationStats.bufferedBytes,
        packTimeMs: segmentationStats.packTimeMs,
        acknowledgedPackets: segmentationStats.acknowledgedPackets,
        skippedInFlight: segmentationStats.skippedInFlight,
        ackTimeouts: segmentationStats.ackTimeouts,
        inFlight: segmentationStats.inFlight,
        ackRoundTripMs: segmentationStats.ackRoundTripMs,
        packetBytes: segmentationStats.packetBytes,
        rawPacketBytes: segmentationStats.rawPacketBytes,
        compressedPackets: segmentationStats.compressedPackets,
        skippedBusy: segmenterState.skippedBusy
      },
      controlTransport: {
        ackSupported: Number(controlTransport.ackSupported),
        framesInFlight: controlTransport.timersSent - controlTransport.timersAcked,
        droppedResultFrames: controlTransport.droppedResults
      }
    }
  }))) {
    controlTransport.timersSent++;
  }
  window.requestAnimationFrame(() => predictWebcam(allModelState2, objectState2, webcamState2, video2));
}
function sendLandmarkerResults(landmarker, video2) {
  if (!controlTransport.sendResultsThisFrame) {
    return;
  }
  safeSocketSend(socketState.ws, JSON.stringify({
    [landmarker.resultsName]: landmarker.results,
    resolution: { width: video2.videoWidth, height: video2.videoHeight }
  }));
}
function getSourceFrame(video2, webcamState2) {
  var _a2;
  const videoQuality = (_a2 = video2.getVideoPlaybackQuality) == null ? void 0 : _a2.call(video2);
  if (Number.isFinite(videoQuality == null ? void 0 : videoQuality.totalVideoFrames)) {
    return videoQuality.totalVideoFrames >>> 0;
  }
  webcamState2.sourceFrame = webcamState2.sourceFrame + 1 >>> 0;
  return webcamState2.sourceFrame;
}
function writeFrameMarker(sourceFrame) {
  const markerFrame = sourceFrame >>> 0 & FRAME_MARKER_MASK;
  const pixel = frameMarkerPixel.data;
  pixel[0] = FRAME_MARKER_DEBUG_RED ? 255 : markerFrame & 255;
  pixel[1] = FRAME_MARKER_DEBUG_RED ? 0 : markerFrame >>> 8 & 255;
  pixel[2] = FRAME_MARKER_DEBUG_RED ? 0 : markerFrame >>> 16 & 255;
  pixel[3] = 255;
  frameMarkerContext.putImageData(frameMarkerPixel, 0, 0);
}
function setupWebSocket(socketURL, socketState2) {
  socketState2.ws = new WebSocket(socketURL);
  socketState2.ws.addEventListener("open", () => {
    console.log("WebSocket connection opened");
    controlTransport.timersSent = 0;
    controlTransport.timersAcked = 0;
    controlTransport.ackSupported = false;
    socketState2.ws.send("pong");
    getWebcamDevices().then((devices) => {
      socketState2.ws.send(JSON.stringify({ type: "webcamDevices", devices }));
    });
  });
  socketState2.ws.addEventListener("message", async (event) => {
    if (event.data === "ping" || event.data === "pong") return;
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      console.warn("Ignoring invalid control socket message", error);
      return;
    }
    if (Object.prototype.hasOwnProperty.call(data, "timersAck")) {
      acknowledgeTimers(Number(data.timersSeq ?? data.timersAck));
      return;
    }
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
function captureAndFlipWebcam(video2, webcamState2, sourceFrame) {
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
  if (webcamCanvas.width !== offscreenCanvas2.width || webcamCanvas.height !== offscreenCanvas2.height) {
    webcamCanvas.width = offscreenCanvas2.width;
    webcamCanvas.height = offscreenCanvas2.height;
  }
  webcamCanvasContext.drawImage(offscreenCanvas2, 0, 0);
  writeFrameMarker(sourceFrame);
  return offscreenCanvas2;
}
