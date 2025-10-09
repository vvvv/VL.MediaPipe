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
function e(e2, n2) {
  t: {
    for (var r2 = ["CLOSURE_FLAGS"], i2 = t, s2 = 0; s2 < r2.length; s2++) if (null == (i2 = i2[r2[s2]])) {
      r2 = null;
      break t;
    }
    r2 = i2;
  }
  return null != (e2 = r2 && r2[e2]) ? e2 : n2;
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
const c = "undefined" != typeof TextEncoder;
function h(t2) {
  if (c) t2 = (a || (a = new TextEncoder())).encode(t2);
  else {
    let n2 = 0;
    const r2 = new Uint8Array(3 * t2.length);
    for (let i2 = 0; i2 < t2.length; i2++) {
      var e2 = t2.charCodeAt(i2);
      if (e2 < 128) r2[n2++] = e2;
      else {
        if (e2 < 2048) r2[n2++] = e2 >> 6 | 192;
        else {
          if (e2 >= 55296 && e2 <= 57343) {
            if (e2 <= 56319 && i2 < t2.length) {
              const s2 = t2.charCodeAt(++i2);
              if (s2 >= 56320 && s2 <= 57343) {
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
var u, l = e(610401301, false), f = e(653718497, e(1, true));
const d = t.navigator;
function p(t2) {
  return !!l && (!!u && u.brands.some((({ brand: e2 }) => e2 && -1 != e2.indexOf(t2))));
}
function g(e2) {
  var n2;
  return (n2 = t.navigator) && (n2 = n2.userAgent) || (n2 = ""), -1 != n2.indexOf(e2);
}
function m() {
  return !!l && (!!u && u.brands.length > 0);
}
function y() {
  return m() ? p("Chromium") : (g("Chrome") || g("CriOS")) && !(!m() && g("Edge")) || g("Silk");
}
function _(t2) {
  return _[" "](t2), t2;
}
u = d && d.userAgentData || null, _[" "] = function() {
};
var v = !m() && (g("Trident") || g("MSIE"));
!g("Android") || y(), y(), g("Safari") && (y() || !m() && g("Coast") || !m() && g("Opera") || !m() && g("Edge") || (m() ? p("Microsoft Edge") : g("Edg/")) || m() && p("Opera"));
var E = {}, w = null;
function T(t2) {
  var e2 = t2.length, n2 = 3 * e2 / 4;
  n2 % 3 ? n2 = Math.floor(n2) : -1 != "=.".indexOf(t2[e2 - 1]) && (n2 = -1 != "=.".indexOf(t2[e2 - 2]) ? n2 - 2 : n2 - 1);
  var r2 = new Uint8Array(n2), i2 = 0;
  return (function(t3, e3) {
    function n3(e4) {
      for (; r3 < t3.length; ) {
        var n4 = t3.charAt(r3++), i4 = w[n4];
        if (null != i4) return i4;
        if (!/^[\s\xa0]*$/.test(n4)) throw Error("Unknown base64 encoding at char: " + n4);
      }
      return e4;
    }
    b();
    for (var r3 = 0; ; ) {
      var i3 = n3(-1), s2 = n3(0), o2 = n3(64), a2 = n3(64);
      if (64 === a2 && -1 === i3) break;
      e3(i3 << 2 | s2 >> 4), 64 != o2 && (e3(s2 << 4 & 240 | o2 >> 2), 64 != a2 && e3(o2 << 6 & 192 | a2));
    }
  })(t2, (function(t3) {
    r2[i2++] = t3;
  })), i2 !== n2 ? r2.subarray(0, i2) : r2;
}
function b() {
  if (!w) {
    w = {};
    for (var t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e2 = ["+/=", "+/", "-_=", "-_.", "-_"], n2 = 0; n2 < 5; n2++) {
      var r2 = t2.concat(e2[n2].split(""));
      E[n2] = r2;
      for (var i2 = 0; i2 < r2.length; i2++) {
        var s2 = r2[i2];
        void 0 === w[s2] && (w[s2] = i2);
      }
    }
  }
}
var A = "undefined" != typeof Uint8Array, k = !v && "function" == typeof btoa;
function S(t2) {
  if (!k) {
    var e2;
    void 0 === e2 && (e2 = 0), b(), e2 = E[e2];
    var n2 = Array(Math.floor(t2.length / 3)), r2 = e2[64] || "";
    let c2 = 0, h2 = 0;
    for (; c2 < t2.length - 2; c2 += 3) {
      var i2 = t2[c2], s2 = t2[c2 + 1], o2 = t2[c2 + 2], a2 = e2[i2 >> 2];
      i2 = e2[(3 & i2) << 4 | s2 >> 4], s2 = e2[(15 & s2) << 2 | o2 >> 6], o2 = e2[63 & o2], n2[h2++] = a2 + i2 + s2 + o2;
    }
    switch (a2 = 0, o2 = r2, t2.length - c2) {
      case 2:
        o2 = e2[(15 & (a2 = t2[c2 + 1])) << 2] || r2;
      case 1:
        t2 = t2[c2], n2[h2] = e2[t2 >> 2] + e2[(3 & t2) << 4 | a2 >> 4] + o2 + r2;
    }
    return n2.join("");
  }
  for (e2 = "", n2 = 0, r2 = t2.length - 10240; n2 < r2; ) e2 += String.fromCharCode.apply(null, t2.subarray(n2, n2 += 10240));
  return e2 += String.fromCharCode.apply(null, n2 ? t2.subarray(n2) : t2), btoa(e2);
}
const x = /[-_.]/g, L = { "-": "+", _: "/", ".": "=" };
function R(t2) {
  return L[t2] || "";
}
function F(t2) {
  if (!k) return T(t2);
  x.test(t2) && (t2 = t2.replace(x, R)), t2 = atob(t2);
  const e2 = new Uint8Array(t2.length);
  for (let n2 = 0; n2 < t2.length; n2++) e2[n2] = t2.charCodeAt(n2);
  return e2;
}
function M(t2) {
  return A && null != t2 && t2 instanceof Uint8Array;
}
var I = {};
let P;
function O(t2) {
  if (t2 !== I) throw Error("illegal external caller");
}
function C() {
  return P || (P = new U(null, I));
}
function N(t2) {
  O(I);
  var e2 = t2.g;
  return null == (e2 = null == e2 || M(e2) ? e2 : "string" == typeof e2 ? F(e2) : null) ? e2 : t2.g = e2;
}
var U = class {
  constructor(t2, e2) {
    if (O(e2), this.g = t2, null != t2 && 0 === t2.length) throw Error("ByteString should be constructed with non-empty values");
  }
  h() {
    return new Uint8Array(N(this) || 0);
  }
};
function D(t2, e2) {
  t2.__closure__error__context__984382 || (t2.__closure__error__context__984382 = {}), t2.__closure__error__context__984382.severity = e2;
}
let B;
function G() {
  const e2 = Error();
  D(e2, "incident"), (function(e3) {
    t.setTimeout((() => {
      throw e3;
    }), 0);
  })(e2);
}
function j(t2) {
  return D(t2 = Error(t2), "warning"), t2;
}
function V() {
  return "function" == typeof BigInt;
}
function X(t2) {
  return Array.prototype.slice.call(t2);
}
var H = "function" == typeof Symbol && "symbol" == typeof Symbol();
function W(t2) {
  return "function" == typeof Symbol && "symbol" == typeof Symbol() ? Symbol() : t2;
}
var z = W(), K = W("0di"), Y = W("2ex"), $ = W("1oa"), q = W("0dg"), J = H ? (t2, e2) => {
  t2[z] |= e2;
} : (t2, e2) => {
  void 0 !== t2.G ? t2.G |= e2 : Object.defineProperties(t2, { G: { value: e2, configurable: true, writable: true, enumerable: false } });
}, Z = H ? (t2, e2) => {
  t2[z] &= ~e2;
} : (t2, e2) => {
  void 0 !== t2.G && (t2.G &= ~e2);
}, Q = H ? (t2) => 0 | t2[z] : (t2) => 0 | t2.G, tt = H ? (t2) => t2[z] : (t2) => t2.G, et = H ? (t2, e2) => {
  t2[z] = e2;
} : (t2, e2) => {
  void 0 !== t2.G ? t2.G = e2 : Object.defineProperties(t2, { G: { value: e2, configurable: true, writable: true, enumerable: false } });
};
function nt(t2) {
  return J(t2, 34), t2;
}
function rt(t2, e2) {
  et(e2, -30975 & (0 | t2));
}
function it(t2, e2) {
  et(e2, -30941 & (34 | t2));
}
var st, ot = {}, at = {};
function ct(t2) {
  return !(!t2 || "object" != typeof t2 || t2.Ja !== at);
}
function ht(t2) {
  return null !== t2 && "object" == typeof t2 && !Array.isArray(t2) && t2.constructor === Object;
}
function ut(t2, e2, n2) {
  if (null != t2) {
    if ("string" == typeof t2) t2 = t2 ? new U(t2, I) : C();
    else if (t2.constructor !== U) if (M(t2)) t2 = t2.length ? new U(n2 ? t2 : new Uint8Array(t2), I) : C();
    else {
      if (!e2) throw Error();
      t2 = void 0;
    }
  }
  return t2;
}
function lt(t2) {
  return !(!Array.isArray(t2) || t2.length) && !!(1 & Q(t2));
}
const ft = [];
function dt(t2) {
  if (2 & t2) throw Error();
}
et(ft, 55), st = Object.freeze(ft);
class pt {
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
    return new pt(this.g, this.h, this.m);
  }
}
let gt;
function mt(t2, e2) {
  (e2 = gt ? e2[gt] : void 0) && (t2[gt] = X(e2));
}
var yt = Object.freeze({}), _t = Object.freeze({}), vt = Object.freeze({});
function Et(t2) {
  return t2.Qa = true, t2;
}
var wt = Et(((t2) => "number" == typeof t2)), Tt = Et(((t2) => "string" == typeof t2)), bt = Et(((t2) => "boolean" == typeof t2)), At = "function" == typeof t.BigInt && "bigint" == typeof t.BigInt(0), kt = Et(((t2) => At ? t2 >= xt && t2 <= Rt : "-" === t2[0] ? Ft(t2, St) : Ft(t2, Lt)));
const St = Number.MIN_SAFE_INTEGER.toString(), xt = At ? BigInt(Number.MIN_SAFE_INTEGER) : void 0, Lt = Number.MAX_SAFE_INTEGER.toString(), Rt = At ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
function Ft(t2, e2) {
  if (t2.length > e2.length) return false;
  if (t2.length < e2.length || t2 === e2) return true;
  for (let n2 = 0; n2 < t2.length; n2++) {
    const r2 = t2[n2], i2 = e2[n2];
    if (r2 > i2) return false;
    if (r2 < i2) return true;
  }
}
const Mt = "function" == typeof Uint8Array.prototype.slice;
let It, Pt = 0, Ot = 0;
function Ct(t2) {
  const e2 = t2 >>> 0;
  Pt = e2, Ot = (t2 - e2) / 4294967296 >>> 0;
}
function Nt(t2) {
  if (t2 < 0) {
    Ct(-t2);
    const [e2, n2] = Xt(Pt, Ot);
    Pt = e2 >>> 0, Ot = n2 >>> 0;
  } else Ct(t2);
}
function Ut(t2) {
  const e2 = It || (It = new DataView(new ArrayBuffer(8)));
  e2.setFloat32(0, +t2, true), Ot = 0, Pt = e2.getUint32(0, true);
}
function Dt(t2, e2) {
  return 4294967296 * e2 + (t2 >>> 0);
}
function Bt(t2, e2) {
  const n2 = 2147483648 & e2;
  return n2 && (e2 = ~e2 >>> 0, 0 == (t2 = 1 + ~t2 >>> 0) && (e2 = e2 + 1 >>> 0)), t2 = Dt(t2, e2), n2 ? -t2 : t2;
}
function Gt(t2, e2) {
  if (t2 >>>= 0, (e2 >>>= 0) <= 2097151) var n2 = "" + (4294967296 * e2 + t2);
  else V() ? n2 = "" + (BigInt(e2) << BigInt(32) | BigInt(t2)) : (t2 = (16777215 & t2) + 6777216 * (n2 = 16777215 & (t2 >>> 24 | e2 << 8)) + 6710656 * (e2 = e2 >> 16 & 65535), n2 += 8147497 * e2, e2 *= 2, t2 >= 1e7 && (n2 += t2 / 1e7 >>> 0, t2 %= 1e7), n2 >= 1e7 && (e2 += n2 / 1e7 >>> 0, n2 %= 1e7), n2 = e2 + jt(n2) + jt(t2));
  return n2;
}
function jt(t2) {
  return t2 = String(t2), "0000000".slice(t2.length) + t2;
}
function Vt(t2) {
  if (t2.length < 16) Nt(Number(t2));
  else if (V()) t2 = BigInt(t2), Pt = Number(t2 & BigInt(4294967295)) >>> 0, Ot = Number(t2 >> BigInt(32) & BigInt(4294967295));
  else {
    const e2 = +("-" === t2[0]);
    Ot = Pt = 0;
    const n2 = t2.length;
    for (let r2 = e2, i2 = (n2 - e2) % 6 + e2; i2 <= n2; r2 = i2, i2 += 6) {
      const e3 = Number(t2.slice(r2, i2));
      Ot *= 1e6, Pt = 1e6 * Pt + e3, Pt >= 4294967296 && (Ot += Math.trunc(Pt / 4294967296), Ot >>>= 0, Pt >>>= 0);
    }
    if (e2) {
      const [t3, e3] = Xt(Pt, Ot);
      Pt = t3, Ot = e3;
    }
  }
}
function Xt(t2, e2) {
  return e2 = ~e2, t2 ? t2 = 1 + ~t2 : e2 += 1, [t2, e2];
}
function Ht(t2) {
  return null == t2 || "number" == typeof t2 ? t2 : "NaN" === t2 || "Infinity" === t2 || "-Infinity" === t2 ? Number(t2) : void 0;
}
function Wt(t2) {
  return null == t2 || "boolean" == typeof t2 ? t2 : "number" == typeof t2 ? !!t2 : void 0;
}
const zt = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function Kt(t2) {
  const e2 = typeof t2;
  switch (e2) {
    case "bigint":
      return true;
    case "number":
      return Number.isFinite(t2);
  }
  return "string" === e2 && zt.test(t2);
}
function Yt(t2) {
  if (null == t2) return t2;
  if ("string" == typeof t2) {
    if (!t2) return;
    t2 = +t2;
  }
  return "number" == typeof t2 && Number.isFinite(t2) ? 0 | t2 : void 0;
}
function $t(t2) {
  if (null == t2) return t2;
  if ("string" == typeof t2) {
    if (!t2) return;
    t2 = +t2;
  }
  return "number" == typeof t2 && Number.isFinite(t2) ? t2 >>> 0 : void 0;
}
function qt(t2) {
  return "-" !== t2[0] && (t2.length < 20 || 20 === t2.length && Number(t2.substring(0, 6)) < 184467);
}
function Jt(t2) {
  return t2 = Math.trunc(t2), Number.isSafeInteger(t2) || (Nt(t2), t2 = Bt(Pt, Ot)), t2;
}
function Zt(t2) {
  var e2 = Math.trunc(Number(t2));
  if (Number.isSafeInteger(e2)) return String(e2);
  if (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), !("-" === t2[0] ? t2.length < 20 || 20 === t2.length && Number(t2.substring(0, 7)) > -922337 : t2.length < 19 || 19 === t2.length && Number(t2.substring(0, 6)) < 922337)) if (Vt(t2), t2 = Pt, 2147483648 & (e2 = Ot)) if (V()) t2 = "" + (BigInt(0 | e2) << BigInt(32) | BigInt(t2 >>> 0));
  else {
    const [n2, r2] = Xt(t2, e2);
    t2 = "-" + Gt(n2, r2);
  }
  else t2 = Gt(t2, e2);
  return t2;
}
function Qt(t2) {
  return null == t2 ? t2 : "bigint" == typeof t2 ? (kt(t2) ? t2 = Number(t2) : (t2 = BigInt.asIntN(64, t2), t2 = kt(t2) ? Number(t2) : String(t2)), t2) : Kt(t2) ? "number" == typeof t2 ? Jt(t2) : Zt(t2) : void 0;
}
function te(t2) {
  if (null == t2) return t2;
  var e2 = typeof t2;
  if ("bigint" === e2) return String(BigInt.asUintN(64, t2));
  if (Kt(t2)) {
    if ("string" === e2) return e2 = Math.trunc(Number(t2)), Number.isSafeInteger(e2) && e2 >= 0 ? t2 = String(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), qt(t2) || (Vt(t2), t2 = Gt(Pt, Ot))), t2;
    if ("number" === e2) return (t2 = Math.trunc(t2)) >= 0 && Number.isSafeInteger(t2) ? t2 : (function(t3) {
      if (t3 < 0) {
        Nt(t3);
        const e3 = Gt(Pt, Ot);
        return t3 = Number(e3), Number.isSafeInteger(t3) ? t3 : e3;
      }
      return qt(String(t3)) ? t3 : (Nt(t3), Dt(Pt, Ot));
    })(t2);
  }
}
function ee(t2) {
  if ("string" != typeof t2) throw Error();
  return t2;
}
function ne(t2) {
  if (null != t2 && "string" != typeof t2) throw Error();
  return t2;
}
function re(t2) {
  return null == t2 || "string" == typeof t2 ? t2 : void 0;
}
function ie(t2, e2, n2, r2) {
  if (null != t2 && "object" == typeof t2 && t2.X === ot) return t2;
  if (!Array.isArray(t2)) return n2 ? 2 & r2 ? (t2 = e2[K]) ? e2 = t2 : (nt((t2 = new e2()).u), e2 = e2[K] = t2) : e2 = new e2() : e2 = void 0, e2;
  let i2 = n2 = Q(t2);
  return 0 === i2 && (i2 |= 32 & r2), i2 |= 2 & r2, i2 !== n2 && et(t2, i2), new e2(t2);
}
function se(t2, e2, n2) {
  if (e2) t: {
    if (!Kt(e2 = t2)) throw j("int64");
    switch (typeof e2) {
      case "string":
        e2 = Zt(e2);
        break t;
      case "bigint":
        if (t2 = e2 = BigInt.asIntN(64, e2), Tt(t2)) {
          if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t2)) throw Error(String(t2));
        } else if (wt(t2) && !Number.isSafeInteger(t2)) throw Error(String(t2));
        e2 = At ? BigInt(e2) : bt(e2) ? e2 ? "1" : "0" : Tt(e2) ? e2.trim() || "0" : String(e2);
        break t;
      default:
        e2 = Jt(e2);
    }
  }
  else e2 = Qt(t2);
  return "string" == typeof (n2 = null == (t2 = e2) ? n2 ? 0 : void 0 : t2) && (e2 = +n2, Number.isSafeInteger(e2)) ? e2 : n2;
}
function oe(t2) {
  if (void 0 === he && (he = "function" == typeof Proxy ? ye(Proxy) : null), !he || !me()) return t2;
  let e2 = ae == null ? void 0 : ae.get(t2);
  return e2 || (Math.random() > 0.01 ? t2 : ((function(t3) {
    if (void 0 === le) {
      const t4 = new he([], {});
      le = 1 === Array.prototype.concat.call([], t4).length;
    }
    le && "function" == typeof Symbol && Symbol.isConcatSpreadable && (t3[Symbol.isConcatSpreadable] = true);
  })(t2), e2 = new he(t2, { set: (t3, e3, n2) => (G(), t3[e3] = n2, true) }), (function(t3, e3) {
    (ae || (ae = new ue())).set(t3, e3), (ce || (ce = new ue())).set(e3, t3);
  })(t2, e2), e2));
}
let ae, ce, he, ue, le, fe, de, pe, ge;
function me() {
  return void 0 === ue && (ue = "function" == typeof WeakMap ? ye(WeakMap) : null), ue;
}
function ye(t2) {
  try {
    return -1 !== t2.toString().indexOf("[native code]") ? t2 : null;
  } catch {
    return null;
  }
}
function _e(t2, e2, n2) {
  var _a2;
  if (me()) {
    if ((_a2 = fe == null ? void 0 : fe.get(e2)) == null ? void 0 : _a2.get(t2)) {
      if (n2) return;
    } else if (Math.random() > 0.01) return;
    var r2 = t2.length;
    n2 = { length: r2 };
    for (var i2 = 0; i2 < Math.min(r2, 10); i2++) {
      if (r2 <= 10) var s2 = i2;
      else {
        s2 = r2 / 10;
        const t3 = Math.floor(i2 * s2);
        s2 = t3 + Math.floor(Math.random() * (Math.floor((i2 + 1) * s2) - t3));
      }
      n2[s2] = t2[s2];
    }
    Ee(t2, n2) ? ((i2 = (r2 = fe || (fe = new ue())).get(e2)) || (i2 = new ue(), r2.set(e2, i2)), i2.set(t2, n2)) : (G(), Te(t2, e2));
  }
}
function ve(t2, e2) {
  var _a2;
  const n2 = (_a2 = fe == null ? void 0 : fe.get(e2)) == null ? void 0 : _a2.get(t2);
  n2 && !Ee(t2, n2) && (G(), Te(t2, e2));
}
function Ee(t2, e2) {
  if (t2.length !== e2.length) return false;
  for (const i2 in e2) {
    var n2, r2 = Number(i2);
    if ((n2 = Number.isInteger(r2)) && (n2 = t2[r2], r2 = e2[r2], n2 = !(Number.isNaN(n2) ? Number.isNaN(r2) : n2 === r2)), n2) return false;
  }
  return true;
}
function we(t2) {
  if (t2 && (fe == null ? void 0 : fe.has(t2))) {
    var e2 = t2.u;
    if (e2) for (let n2 = 0; n2 < e2.length; n2++) {
      const r2 = e2[n2];
      if (n2 === e2.length - 1 && ht(r2)) for (const e3 in r2) {
        const n3 = r2[e3];
        Array.isArray(n3) && ve(n3, t2);
      }
      else Array.isArray(r2) && ve(r2, t2);
    }
  }
}
function Te(t2, e2) {
  var _a2;
  (_a2 = fe == null ? void 0 : fe.get(e2)) == null ? void 0 : _a2.delete(t2);
}
function be(t2, e2, n2) {
  return t2 = Ae(t2, e2[0], e2[1], n2 ? 1 : 2), e2 !== pe && n2 && J(t2, 16384), t2;
}
function Ae(t2, e2, n2, r2) {
  if (r2 = r2 ?? 0, null == t2 && (t2 = de), de = void 0, null == t2) {
    var i2 = 96;
    n2 ? (t2 = [n2], i2 |= 512) : t2 = [], e2 && (i2 = -33521665 & i2 | (1023 & e2) << 15);
  } else {
    if (!Array.isArray(t2)) throw Error("narr");
    if (2048 & (i2 = Q(t2))) throw Error("farr");
    if (64 & i2) return t2;
    if (1 === r2 || 2 === r2 || (i2 |= 64), n2 && (i2 |= 512, n2 !== t2[0])) throw Error("mid");
    t: {
      if (r2 = (n2 = t2).length) {
        const t3 = r2 - 1;
        if (ht(n2[t3])) {
          if ((e2 = t3 - (+!!(512 & (i2 |= 256)) - 1)) >= 1024) throw Error("pvtlmt");
          i2 = -33521665 & i2 | (1023 & e2) << 15;
          break t;
        }
      }
      if (e2) {
        if ((e2 = Math.max(e2, r2 - (+!!(512 & i2) - 1))) > 1024) throw Error("spvt");
        i2 = -33521665 & i2 | (1023 & e2) << 15;
      }
    }
  }
  return et(t2, i2), t2;
}
const ke = {};
let Se = (function() {
  try {
    return _(new class extends Map {
      constructor() {
        super();
      }
    }()), false;
  } catch {
    return true;
  }
})();
class xe {
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
const Le = Se ? (Object.setPrototypeOf(xe.prototype, Map.prototype), Object.defineProperties(xe.prototype, { size: { value: 0, configurable: true, enumerable: true, writable: true } }), xe) : class extends Map {
  constructor() {
    super();
  }
};
function Re(t2) {
  return t2;
}
function Fe(t2) {
  if (2 & t2.M) throw Error("Cannot mutate an immutable Map");
}
var Me = class extends Le {
  constructor(t2, e2, n2 = Re, r2 = Re) {
    super();
    let i2 = Q(t2);
    i2 |= 64, et(t2, i2), this.M = i2, this.T = e2, this.S = n2, this.Z = this.T ? Ie : r2;
    for (let s2 = 0; s2 < t2.length; s2++) {
      const o2 = t2[s2], a2 = n2(o2[0], false, true);
      let c2 = o2[1];
      e2 ? void 0 === c2 && (c2 = null) : c2 = r2(o2[1], false, true, void 0, void 0, i2), super.set(a2, c2);
    }
  }
  pa(t2 = Pe) {
    if (0 !== this.size) return this.Y(t2);
  }
  Y(t2 = Pe) {
    const e2 = [], n2 = super.entries();
    for (var r2; !(r2 = n2.next()).done; ) (r2 = r2.value)[0] = t2(r2[0]), r2[1] = t2(r2[1]), e2.push(r2);
    return e2;
  }
  clear() {
    Fe(this), super.clear();
  }
  delete(t2) {
    return Fe(this), super.delete(this.S(t2, true, false));
  }
  entries() {
    var t2 = this.oa();
    return new pt(t2, Oe, this);
  }
  keys() {
    return this.Ia();
  }
  values() {
    var t2 = this.oa();
    return new pt(t2, Me.prototype.get, this);
  }
  forEach(t2, e2) {
    super.forEach(((n2, r2) => {
      t2.call(e2, this.get(r2), r2, this);
    }));
  }
  set(t2, e2) {
    return Fe(this), null == (t2 = this.S(t2, true, false)) ? this : null == e2 ? (super.delete(t2), this) : super.set(t2, this.Z(e2, true, true, this.T, false, this.M));
  }
  Oa(t2) {
    const e2 = this.S(t2[0], false, true);
    t2 = t2[1], t2 = this.T ? void 0 === t2 ? null : t2 : this.Z(t2, false, true, void 0, false, this.M), super.set(e2, t2);
  }
  has(t2) {
    return super.has(this.S(t2, false, false));
  }
  get(t2) {
    t2 = this.S(t2, false, false);
    const e2 = super.get(t2);
    if (void 0 !== e2) {
      var n2 = this.T;
      return n2 ? ((n2 = this.Z(e2, false, true, n2, this.ta, this.M)) !== e2 && super.set(t2, n2), n2) : e2;
    }
  }
  oa() {
    return Array.from(super.keys());
  }
  Ia() {
    return super.keys();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};
function Ie(t2, e2, n2, r2, i2, s2) {
  return t2 = ie(t2, r2, n2, s2), i2 && (t2 = He(t2)), t2;
}
function Pe(t2) {
  return t2;
}
function Oe(t2) {
  return [t2, this.get(t2)];
}
let Ce;
function Ne() {
  return Ce || (Ce = new Me(nt([]), void 0, void 0, void 0, ke));
}
function Ue(t2, e2, n2, r2, i2) {
  if (null != t2) {
    if (Array.isArray(t2)) t2 = lt(t2) ? void 0 : i2 && 2 & Q(t2) ? t2 : De(t2, e2, n2, void 0 !== r2, i2);
    else if (ht(t2)) {
      const s2 = {};
      for (let o2 in t2) s2[o2] = Ue(t2[o2], e2, n2, r2, i2);
      t2 = s2;
    } else t2 = e2(t2, r2);
    return t2;
  }
}
function De(t2, e2, n2, r2, i2) {
  const s2 = r2 || n2 ? Q(t2) : 0;
  r2 = r2 ? !!(32 & s2) : void 0;
  const o2 = X(t2);
  for (let t3 = 0; t3 < o2.length; t3++) o2[t3] = Ue(o2[t3], e2, n2, r2, i2);
  return n2 && (mt(o2, t2), n2(s2, o2)), o2;
}
function Be(t2) {
  return Ue(t2, Ge, void 0, void 0, false);
}
function Ge(t2) {
  return t2.X === ot ? t2.toJSON() : t2 instanceof Me ? t2.pa(Be) : (function(t3) {
    switch (typeof t3) {
      case "number":
        return isFinite(t3) ? t3 : String(t3);
      case "bigint":
        return kt(t3) ? Number(t3) : String(t3);
      case "boolean":
        return t3 ? 1 : 0;
      case "object":
        if (t3) if (Array.isArray(t3)) {
          if (lt(t3)) return;
        } else {
          if (M(t3)) return S(t3);
          if (t3 instanceof U) {
            const e2 = t3.g;
            return null == e2 ? "" : "string" == typeof e2 ? e2 : t3.g = S(e2);
          }
          if (t3 instanceof Me) return t3.pa();
        }
    }
    return t3;
  })(t2);
}
function je(t2, e2, n2 = it) {
  if (null != t2) {
    if (A && t2 instanceof Uint8Array) return e2 ? t2 : new Uint8Array(t2);
    if (Array.isArray(t2)) {
      var r2 = Q(t2);
      return 2 & r2 ? t2 : (e2 && (e2 = 0 === r2 || !!(32 & r2) && !(64 & r2 || !(16 & r2))), e2 ? (et(t2, -12293 & (34 | r2)), t2) : De(t2, je, 4 & r2 ? it : n2, true, true));
    }
    return t2.X === ot ? (n2 = t2.u, t2 = 2 & (r2 = tt(n2)) ? t2 : Ve(t2, n2, r2, true)) : t2 instanceof Me && !(2 & t2.M) && (n2 = nt(t2.Y(je)), t2 = new Me(n2, t2.T, t2.S, t2.Z)), t2;
  }
}
function Ve(t2, e2, n2, r2) {
  return we(t2), t2 = t2.constructor, de = e2 = Xe(e2, n2, r2), e2 = new t2(e2), de = void 0, e2;
}
function Xe(t2, e2, n2) {
  const r2 = n2 || 2 & e2 ? it : rt, i2 = !!(32 & e2);
  return t2 = (function(t3, e3, n3) {
    const r3 = X(t3);
    var i3 = r3.length;
    const s2 = 256 & e3 ? r3[i3 - 1] : void 0;
    for (i3 += s2 ? -1 : 0, e3 = 512 & e3 ? 1 : 0; e3 < i3; e3++) r3[e3] = n3(r3[e3]);
    if (s2) {
      e3 = r3[e3] = {};
      for (const t4 in s2) e3[t4] = n3(s2[t4]);
    }
    return mt(r3, t3), r3;
  })(t2, e2, ((t3) => je(t3, i2, r2))), J(t2, 32 | (n2 ? 2 : 0)), t2;
}
function He(t2) {
  const e2 = t2.u, n2 = tt(e2);
  return 2 & n2 ? Ve(t2, e2, n2, false) : t2;
}
function We(t2, e2, n2, r2) {
  return !(4 & e2) || null != n2 && (!r2 && 0 === n2 && (4096 & e2 || 8192 & e2) && (t2.constructor[q] = 1 + (0 | t2.constructor[q])) < 5 && G(), 0 !== n2 && !(n2 & e2));
}
function ze(t2, e2) {
  return Ye(t2 = t2.u, tt(t2), e2);
}
function Ke(t2, e2, n2, r2) {
  if (!((e2 = r2 + (+!!(512 & e2) - 1)) < 0 || e2 >= t2.length || e2 >= n2)) return t2[e2];
}
function Ye(t2, e2, n2, r2) {
  if (-1 === n2) return null;
  const i2 = e2 >> 15 & 1023 || 536870912;
  if (!(n2 >= i2)) {
    var s2 = t2.length;
    return r2 && 256 & e2 && null != (r2 = t2[s2 - 1][n2]) ? (Ke(t2, e2, i2, n2) && null != Y && ((e2 = (t2 = B ?? (B = {}))[Y] || 0) >= 4 || (t2[Y] = e2 + 1, G())), r2) : Ke(t2, e2, i2, n2);
  }
  return 256 & e2 ? t2[t2.length - 1][n2] : void 0;
}
function $e(t2, e2, n2) {
  const r2 = t2.u;
  let i2 = tt(r2);
  return dt(i2), qe(r2, i2, e2, n2), t2;
}
function qe(t2, e2, n2, r2) {
  const i2 = e2 >> 15 & 1023 || 536870912;
  if (n2 >= i2) {
    let s2, o2 = e2;
    if (256 & e2) s2 = t2[t2.length - 1];
    else {
      if (null == r2) return o2;
      s2 = t2[i2 + (+!!(512 & e2) - 1)] = {}, o2 |= 256;
    }
    return s2[n2] = r2, n2 < i2 && (t2[n2 + (+!!(512 & e2) - 1)] = void 0), o2 !== e2 && et(t2, o2), o2;
  }
  return t2[n2 + (+!!(512 & e2) - 1)] = r2, 256 & e2 && (n2 in (t2 = t2[t2.length - 1]) && delete t2[n2]), e2;
}
function Je(t2, e2, n2, r2, i2) {
  var s2 = 2 & e2;
  i2 = Ye(t2, e2, n2, i2), Array.isArray(i2) || (i2 = st);
  const o2 = !(2 & r2);
  r2 = !(1 & r2);
  const a2 = !!(32 & e2);
  let c2 = Q(i2);
  return 0 !== c2 || !a2 || s2 || o2 ? 1 & c2 || (c2 |= 1, et(i2, c2)) : (c2 |= 33, et(i2, c2)), s2 ? (t2 = false, 2 & c2 || (nt(i2), t2 = !!(4 & c2)), (r2 || t2) && Object.freeze(i2)) : (s2 = !!(2 & c2) || !!(2048 & c2), r2 && s2 ? (i2 = X(i2), s2 = 1, a2 && !o2 && (s2 |= 32), et(i2, s2), qe(t2, e2, n2, i2)) : o2 && 32 & c2 && !s2 && Z(i2, 32)), i2;
}
function Ze(t2, e2) {
  t2 = t2.u;
  let n2 = tt(t2);
  const r2 = Ye(t2, n2, e2), i2 = Ht(r2);
  return null != i2 && i2 !== r2 && qe(t2, n2, e2, i2), i2;
}
function Qe(t2) {
  t2 = t2.u;
  let e2 = tt(t2);
  const n2 = Ye(t2, e2, 1), r2 = ut(n2, true, !!(34 & e2));
  return null != r2 && r2 !== n2 && qe(t2, e2, 1, r2), r2;
}
function tn() {
  return void 0 === yt ? 2 : 5;
}
function en(t2, e2, n2, r2, i2, s2) {
  const o2 = t2.u;
  let a2 = tt(o2);
  r2 = 2 & a2 ? 1 : r2, s2 = !!s2, i2 = nn(o2, a2, e2, i2);
  var c2 = Q(i2), h2 = i2;
  if (ve(h2, t2), 2 !== r2 && 1 !== r2 || Te(h2, t2), We(t2, c2, void 0, s2)) {
    4 & c2 && (i2 = X(i2), c2 = vn(c2, a2), a2 = qe(o2, a2, e2, i2));
    let t3 = h2 = 0;
    for (; h2 < i2.length; h2++) {
      const e3 = n2(i2[h2]);
      null != e3 && (i2[t3++] = e3);
    }
    t3 < h2 && (i2.length = t3), c2 = -4097 & (20 | (c2 = rn(c2, a2))), et(i2, c2 &= -8193), 2 & c2 && Object.freeze(i2);
  }
  let u2;
  return 1 === r2 || 4 === r2 && 32 & c2 ? sn(c2) || (t2 = c2, (c2 |= 2) !== t2 && et(i2, c2), Object.freeze(i2)) : (n2 = 5 === r2 && (!!(32 & c2) || sn(c2) || !!(ae == null ? void 0 : ae.get(i2))), (2 === r2 || n2) && sn(c2) && (i2 = X(i2), c2 = En(c2 = vn(c2, a2), a2, s2), et(i2, c2), a2 = qe(o2, a2, e2, i2)), sn(c2) || (e2 = c2, (c2 = En(c2, a2, s2)) !== e2 && et(i2, c2)), n2 ? (u2 = oe(i2), _e(i2, t2, true)) : 2 !== r2 || s2 || (ae == null ? void 0 : ae.delete(i2))), u2 || i2;
}
function nn(t2, e2, n2, r2) {
  return t2 = Ye(t2, e2, n2, r2), Array.isArray(t2) ? t2 : st;
}
function rn(t2, e2) {
  return 0 === t2 && (t2 = vn(t2, e2)), 1 | t2;
}
function sn(t2) {
  return !!(2 & t2) && !!(4 & t2) || !!(2048 & t2);
}
function on(t2) {
  t2 = X(t2);
  for (let e2 = 0; e2 < t2.length; e2++) {
    const n2 = t2[e2] = X(t2[e2]);
    Array.isArray(n2[1]) && (n2[1] = nt(n2[1]));
  }
  return t2;
}
function an(t2, e2, n2, r2) {
  t2 = t2.u;
  let i2 = tt(t2);
  dt(i2), qe(t2, i2, e2, ("0" === r2 ? 0 === Number(n2) : n2 === r2) ? void 0 : n2);
}
function cn(t2, e2) {
  var n2 = Rs;
  return ln(hn(t2 = t2.u), t2, tt(t2), n2) === e2 ? e2 : -1;
}
function hn(t2) {
  if (H) return t2[$] ?? (t2[$] = /* @__PURE__ */ new Map());
  if ($ in t2) return t2[$];
  const e2 = /* @__PURE__ */ new Map();
  return Object.defineProperty(t2, $, { value: e2 }), e2;
}
function un(t2, e2, n2, r2) {
  const i2 = hn(t2), s2 = ln(i2, t2, e2, n2);
  return s2 !== r2 && (s2 && (e2 = qe(t2, e2, s2)), i2.set(n2, r2)), e2;
}
function ln(t2, e2, n2, r2) {
  let i2 = t2.get(r2);
  if (null != i2) return i2;
  i2 = 0;
  for (let t3 = 0; t3 < r2.length; t3++) {
    const s2 = r2[t3];
    null != Ye(e2, n2, s2) && (0 !== i2 && (n2 = qe(e2, n2, i2)), i2 = s2);
  }
  return t2.set(r2, i2), i2;
}
function fn(t2, e2, n2, r2) {
  let i2, s2 = tt(t2);
  if (null != (r2 = Ye(t2, s2, n2, r2)) && r2.X === ot) return (e2 = He(r2)) !== r2 && qe(t2, s2, n2, e2), e2.u;
  if (Array.isArray(r2)) {
    const t3 = Q(r2);
    i2 = 2 & t3 ? be(Xe(r2, t3, false), e2, true) : 64 & t3 ? r2 : be(i2, e2, true);
  } else i2 = be(void 0, e2, true);
  return i2 !== r2 && qe(t2, s2, n2, i2), i2;
}
function dn(t2, e2, n2, r2) {
  t2 = t2.u;
  let i2 = tt(t2);
  return (e2 = ie(r2 = Ye(t2, i2, n2, r2), e2, false, i2)) !== r2 && null != e2 && qe(t2, i2, n2, e2), e2;
}
function pn(t2, e2, n2, r2 = false) {
  if (null == (e2 = dn(t2, e2, n2, r2))) return e2;
  if (t2 = t2.u, !(2 & (r2 = tt(t2)))) {
    const i2 = He(e2);
    i2 !== e2 && qe(t2, r2, n2, e2 = i2);
  }
  return e2;
}
function gn(t2, e2, n2, r2, i2, s2, o2) {
  const a2 = t2.u;
  var c2 = !!(2 & e2);
  i2 = c2 ? 1 : i2, s2 = !!s2, o2 && (o2 = !c2), c2 = nn(a2, e2, r2);
  var h2 = Q(c2), u2 = c2;
  if (ve(u2, t2), 2 !== i2 && 1 !== i2 || Te(u2, t2), !(u2 = !!(4 & h2))) {
    var l2 = c2, f2 = e2;
    const t3 = !!(2 & (h2 = rn(h2, e2)));
    t3 && (f2 |= 2);
    let r3 = !t3, i3 = true, s3 = 0, o3 = 0;
    for (; s3 < l2.length; s3++) {
      const e3 = ie(l2[s3], n2, false, f2);
      if (e3 instanceof n2) {
        if (!t3) {
          const t4 = !!(2 & Q(e3.u));
          r3 && (r3 = !t4), i3 && (i3 = t4);
        }
        l2[o3++] = e3;
      }
    }
    o3 < s3 && (l2.length = o3), h2 |= 4, h2 = i3 ? 16 | h2 : -17 & h2, et(l2, h2 = r3 ? 8 | h2 : -9 & h2), t3 && Object.freeze(l2);
  }
  if (o2 && !(8 & h2 || !c2.length && (1 === i2 || 4 === i2 && 32 & h2))) {
    for (sn(h2) ? (c2 = X(c2), h2 = vn(h2, e2), e2 = qe(a2, e2, r2, c2)) : Te(c2, t2), n2 = c2, o2 = h2, l2 = 0; l2 < n2.length; l2++) (h2 = n2[l2]) !== (f2 = He(h2)) && (n2[l2] = f2);
    o2 |= 8, o2 = n2.length ? -17 & o2 : 16 | o2, et(n2, o2), h2 = o2;
  }
  let d2;
  return 1 === i2 || 4 === i2 && 32 & h2 ? sn(h2) || (t2 = h2, (h2 |= !c2.length || 16 & h2 && (!u2 || 32 & h2) ? 2 : 2048) !== t2 && et(c2, h2), Object.freeze(c2)) : (u2 = 5 === i2 && (!!(32 & h2) || sn(h2) || !!(ae == null ? void 0 : ae.get(c2))), (2 === i2 || u2) && sn(h2) && (c2 = X(c2), h2 = En(h2 = vn(h2, e2), e2, s2), et(c2, h2), e2 = qe(a2, e2, r2, c2)), sn(h2) || (r2 = h2, (h2 = En(h2, e2, s2)) !== r2 && et(c2, h2)), u2 ? (d2 = oe(c2), _e(c2, t2, true)) : 2 !== i2 || s2 || (ae == null ? void 0 : ae.delete(c2))), d2 || c2;
}
function mn(t2, e2, n2) {
  const r2 = tt(t2.u);
  return gn(t2, r2, e2, n2, tn(), false, !(2 & r2));
}
function yn(t2, e2, n2, r2) {
  return null == r2 && (r2 = void 0), $e(t2, n2, r2);
}
function _n(t2, e2, n2, r2) {
  null == r2 && (r2 = void 0);
  t: {
    t2 = t2.u;
    let i2 = tt(t2);
    if (dt(i2), null == r2) {
      const r3 = hn(t2);
      if (ln(r3, t2, i2, n2) !== e2) break t;
      r3.set(n2, 0);
    } else i2 = un(t2, i2, n2, e2);
    qe(t2, i2, e2, r2);
  }
}
function vn(t2, e2) {
  return -2049 & (t2 = 32 | (2 & e2 ? 2 | t2 : -3 & t2));
}
function En(t2, e2, n2) {
  return 32 & e2 && n2 || (t2 &= -33), t2;
}
function wn(t2, e2, n2, r2) {
  const i2 = tt(t2.u);
  dt(i2), t2 = gn(t2, i2, n2, e2, 2, true), r2 = null != r2 ? r2 : new n2(), t2.push(r2), 2 & Q(r2.u) ? Z(t2, 8) : Z(t2, 16);
}
function Tn(t2, e2) {
  return t2 ?? e2;
}
function bn(t2, e2) {
  return Yt(ze(t2, e2));
}
function An(t2, e2) {
  return Tn(Ze(t2, e2), 0);
}
function kn(t2, e2) {
  return Tn(re(ze(t2, e2)), "");
}
function Sn(t2, e2, n2) {
  if (null != n2 && "boolean" != typeof n2) throw t2 = typeof n2, Error(`Expected boolean but got ${"object" != t2 ? t2 : n2 ? Array.isArray(n2) ? "array" : t2 : "null"}: ${n2}`);
  $e(t2, e2, n2);
}
function xn(t2, e2, n2) {
  if (null != n2) {
    if ("number" != typeof n2) throw j("int32");
    if (!Number.isFinite(n2)) throw j("int32");
    n2 |= 0;
  }
  $e(t2, e2, n2);
}
function Ln(t2, e2, n2) {
  if (null != n2 && "number" != typeof n2) throw Error(`Value of float/double field must be a number, found ${typeof n2}: ${n2}`);
  $e(t2, e2, n2);
}
function Rn(t2, e2, n2) {
  {
    const a2 = t2.u;
    let c2 = tt(a2);
    if (dt(c2), null == n2) qe(a2, c2, e2);
    else {
      n2 = (ce == null ? void 0 : ce.get(n2)) || n2;
      var r2, i2 = Q(n2), s2 = i2, o2 = !!(2 & i2) || Object.isFrozen(n2);
      if ((r2 = !o2) && ((r2 = void 0 === vt) || (r2 = !!f && void 0 !== _t)), We(t2, i2)) {
        i2 = 21, o2 && (n2 = X(n2), s2 = 0, i2 = En(i2 = vn(i2, c2), c2, true));
        for (let t3 = 0; t3 < n2.length; t3++) n2[t3] = ee(n2[t3]);
      }
      r2 ? (n2 = X(n2), s2 = 0, i2 = En(i2 = vn(i2, c2), c2, true)) : o2 || _e(n2, t2), i2 !== s2 && et(n2, i2), qe(a2, c2, e2, n2);
    }
  }
}
function Fn(t2, e2, n2) {
  dt(tt(t2.u)), en(t2, e2, re, 2, void 0, true).push(ee(n2));
}
function Mn(t2, e2) {
  return Error(`Invalid wire type: ${t2} (at position ${e2})`);
}
function In() {
  return Error("Failed to read varint, encoding is invalid.");
}
function Pn(t2, e2) {
  return Error(`Tried to read past the end of the data ${e2} > ${t2}`);
}
function On(t2) {
  if ("string" == typeof t2) return { buffer: F(t2), O: false };
  if (Array.isArray(t2)) return { buffer: new Uint8Array(t2), O: false };
  if (t2.constructor === Uint8Array) return { buffer: t2, O: false };
  if (t2.constructor === ArrayBuffer) return { buffer: new Uint8Array(t2), O: false };
  if (t2.constructor === U) return { buffer: N(t2) || new Uint8Array(0), O: true };
  if (t2 instanceof Uint8Array) return { buffer: new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength), O: false };
  throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
function Cn(t2, e2) {
  let n2, r2 = 0, i2 = 0, s2 = 0;
  const o2 = t2.h;
  let a2 = t2.g;
  do {
    n2 = o2[a2++], r2 |= (127 & n2) << s2, s2 += 7;
  } while (s2 < 32 && 128 & n2);
  for (s2 > 32 && (i2 |= (127 & n2) >> 4), s2 = 3; s2 < 32 && 128 & n2; s2 += 7) n2 = o2[a2++], i2 |= (127 & n2) << s2;
  if (Xn(t2, a2), n2 < 128) return e2(r2 >>> 0, i2 >>> 0);
  throw In();
}
function Nn(t2) {
  let e2 = 0, n2 = t2.g;
  const r2 = n2 + 10, i2 = t2.h;
  for (; n2 < r2; ) {
    const r3 = i2[n2++];
    if (e2 |= r3, 0 == (128 & r3)) return Xn(t2, n2), !!(127 & e2);
  }
  throw In();
}
function Un(t2) {
  const e2 = t2.h;
  let n2 = t2.g, r2 = e2[n2++], i2 = 127 & r2;
  if (128 & r2 && (r2 = e2[n2++], i2 |= (127 & r2) << 7, 128 & r2 && (r2 = e2[n2++], i2 |= (127 & r2) << 14, 128 & r2 && (r2 = e2[n2++], i2 |= (127 & r2) << 21, 128 & r2 && (r2 = e2[n2++], i2 |= r2 << 28, 128 & r2 && 128 & e2[n2++] && 128 & e2[n2++] && 128 & e2[n2++] && 128 & e2[n2++] && 128 & e2[n2++]))))) throw In();
  return Xn(t2, n2), i2;
}
function Dn(t2) {
  return Un(t2) >>> 0;
}
function Bn(t2) {
  var e2 = t2.h;
  const n2 = t2.g, r2 = e2[n2], i2 = e2[n2 + 1], s2 = e2[n2 + 2];
  return e2 = e2[n2 + 3], Xn(t2, t2.g + 4), (r2 << 0 | i2 << 8 | s2 << 16 | e2 << 24) >>> 0;
}
function Gn(t2) {
  var e2 = Bn(t2);
  t2 = 2 * (e2 >> 31) + 1;
  const n2 = e2 >>> 23 & 255;
  return e2 &= 8388607, 255 == n2 ? e2 ? NaN : t2 * (1 / 0) : 0 == n2 ? 1401298464324817e-60 * t2 * e2 : t2 * Math.pow(2, n2 - 150) * (e2 + 8388608);
}
function jn(t2) {
  return Un(t2);
}
function Vn(t2, e2, { ca: n2 = false } = {}) {
  t2.ca = n2, e2 && (e2 = On(e2), t2.h = e2.buffer, t2.m = e2.O, t2.j = 0, t2.l = t2.h.length, t2.g = t2.j);
}
function Xn(t2, e2) {
  if (t2.g = e2, e2 > t2.l) throw Pn(t2.l, e2);
}
function Hn(t2, e2) {
  if (e2 < 0) throw Error(`Tried to read a negative byte length: ${e2}`);
  const n2 = t2.g, r2 = n2 + e2;
  if (r2 > t2.l) throw Pn(e2, t2.l - n2);
  return t2.g = r2, n2;
}
function Wn(t2, e2) {
  if (0 == e2) return C();
  var n2 = Hn(t2, e2);
  return t2.ca && t2.m ? n2 = t2.h.subarray(n2, n2 + e2) : (t2 = t2.h, n2 = n2 === (e2 = n2 + e2) ? new Uint8Array(0) : Mt ? t2.slice(n2, e2) : new Uint8Array(t2.subarray(n2, e2))), 0 == n2.length ? C() : new U(n2, I);
}
Me.prototype.toJSON = void 0, Me.prototype.Ja = at;
var zn = [];
function Kn(t2) {
  var e2 = t2.g;
  if (e2.g == e2.l) return false;
  t2.l = t2.g.g;
  var n2 = Dn(t2.g);
  if (e2 = n2 >>> 3, !((n2 &= 7) >= 0 && n2 <= 5)) throw Mn(n2, t2.l);
  if (e2 < 1) throw Error(`Invalid field number: ${e2} (at position ${t2.l})`);
  return t2.m = e2, t2.h = n2, true;
}
function Yn(t2) {
  switch (t2.h) {
    case 0:
      0 != t2.h ? Yn(t2) : Nn(t2.g);
      break;
    case 1:
      Xn(t2 = t2.g, t2.g + 8);
      break;
    case 2:
      if (2 != t2.h) Yn(t2);
      else {
        var e2 = Dn(t2.g);
        Xn(t2 = t2.g, t2.g + e2);
      }
      break;
    case 5:
      Xn(t2 = t2.g, t2.g + 4);
      break;
    case 3:
      for (e2 = t2.m; ; ) {
        if (!Kn(t2)) throw Error("Unmatched start-group tag: stream EOF");
        if (4 == t2.h) {
          if (t2.m != e2) throw Error("Unmatched end-group tag");
          break;
        }
        Yn(t2);
      }
      break;
    default:
      throw Mn(t2.h, t2.l);
  }
}
function $n(t2, e2, n2) {
  const r2 = t2.g.l, i2 = Dn(t2.g), s2 = t2.g.g + i2;
  let o2 = s2 - r2;
  if (o2 <= 0 && (t2.g.l = s2, n2(e2, t2, void 0, void 0, void 0), o2 = s2 - t2.g.g), o2) throw Error(`Message parsing ended unexpectedly. Expected to read ${i2} bytes, instead read ${i2 - o2} bytes, either the data ended unexpectedly or the message misreported its own length`);
  return t2.g.g = s2, t2.g.l = r2, e2;
}
function qn(t2) {
  var e2 = Dn(t2.g), a2 = Hn(t2 = t2.g, e2);
  if (t2 = t2.h, o) {
    var c2, h2 = t2;
    (c2 = s) || (c2 = s = new TextDecoder("utf-8", { fatal: true })), e2 = a2 + e2, h2 = 0 === a2 && e2 === h2.length ? h2 : h2.subarray(a2, e2);
    try {
      var u2 = c2.decode(h2);
    } catch (t3) {
      if (void 0 === i) {
        try {
          c2.decode(new Uint8Array([128]));
        } catch (t4) {
        }
        try {
          c2.decode(new Uint8Array([97])), i = true;
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
      l2 < 128 ? a2.push(l2) : l2 < 224 ? u2 >= e2 ? n() : (i2 = t2[u2++], l2 < 194 || 128 != (192 & i2) ? (u2--, n()) : a2.push((31 & l2) << 6 | 63 & i2)) : l2 < 240 ? u2 >= e2 - 1 ? n() : (i2 = t2[u2++], 128 != (192 & i2) || 224 === l2 && i2 < 160 || 237 === l2 && i2 >= 160 || 128 != (192 & (c2 = t2[u2++])) ? (u2--, n()) : a2.push((15 & l2) << 12 | (63 & i2) << 6 | 63 & c2)) : l2 <= 244 ? u2 >= e2 - 2 ? n() : (i2 = t2[u2++], 128 != (192 & i2) || i2 - 144 + (l2 << 28) >> 30 != 0 || 128 != (192 & (c2 = t2[u2++])) || 128 != (192 & (h2 = t2[u2++])) ? (u2--, n()) : (l2 = (7 & l2) << 18 | (63 & i2) << 12 | (63 & c2) << 6 | 63 & h2, l2 -= 65536, a2.push(55296 + (l2 >> 10 & 1023), 56320 + (1023 & l2)))) : n(), a2.length >= 8192 && (s2 = r(s2, a2), a2.length = 0);
    }
    u2 = r(s2, a2);
  }
  return u2;
}
function Jn(t2) {
  const e2 = Dn(t2.g);
  return Wn(t2.g, e2);
}
function Zn(t2, e2, n2) {
  var r2 = Dn(t2.g);
  for (r2 = t2.g.g + r2; t2.g.g < r2; ) n2.push(e2(t2.g));
}
var Qn = [];
let tr;
function er(t2, e2, n2) {
  e2.g ? e2.m(t2, e2.g, e2.h, n2, true) : e2.m(t2, e2.h, n2, true);
}
var nr = class {
  constructor(t2, e2) {
    this.u = Ae(t2, e2);
  }
  toJSON() {
    return rr(this);
  }
  l() {
    var t2 = ko;
    return t2.g ? t2.l(this, t2.g, t2.h, true) : t2.l(this, t2.h, t2.defaultValue, true);
  }
  clone() {
    const t2 = this.u;
    return Ve(this, t2, tt(t2), false);
  }
  O() {
    return !!(2 & Q(this.u));
  }
};
function rr(t2) {
  we(t2), t2 = tr ? t2.u : De(t2.u, Ge, void 0, void 0, false);
  {
    var e2 = !tr;
    let h2 = t2.length;
    if (h2) {
      var n2 = t2[h2 - 1], r2 = ht(n2);
      r2 ? h2-- : n2 = void 0;
      var i2 = t2;
      if (r2) {
        t: {
          var s2, o2 = n2, a2 = false;
          if (o2) for (let t3 in o2) isNaN(+t3) ? (s2 ?? (s2 = {}))[t3] = o2[t3] : (r2 = o2[t3], Array.isArray(r2) && (lt(r2) || ct(r2) && 0 === r2.size) && (r2 = null), null == r2 && (a2 = true), null != r2 && ((s2 ?? (s2 = {}))[t3] = r2));
          if (a2 || (s2 = o2), s2) for (let t3 in s2) {
            a2 = s2;
            break t;
          }
          a2 = null;
        }
        o2 = null == a2 ? null != n2 : a2 !== n2;
      }
      for (; h2 > 0 && (null == (s2 = i2[h2 - 1]) || lt(s2) || ct(s2) && 0 === s2.size); h2--) var c2 = true;
      (i2 !== t2 || o2 || c2) && (e2 ? (c2 || o2 || a2) && (i2.length = h2) : i2 = Array.prototype.slice.call(i2, 0, h2), a2 && i2.push(a2)), c2 = i2;
    } else c2 = t2;
  }
  return c2;
}
function ir(t2) {
  return t2 ? /^\d+$/.test(t2) ? (Vt(t2), new sr(Pt, Ot)) : null : or || (or = new sr(0, 0));
}
nr.prototype.X = ot, nr.prototype.toString = function() {
  try {
    return tr = true, rr(this).toString();
  } finally {
    tr = false;
  }
};
var sr = class {
  constructor(t2, e2) {
    this.h = t2 >>> 0, this.g = e2 >>> 0;
  }
};
let or;
function ar(t2) {
  return t2 ? /^-?\d+$/.test(t2) ? (Vt(t2), new cr(Pt, Ot)) : null : hr || (hr = new cr(0, 0));
}
var cr = class {
  constructor(t2, e2) {
    this.h = t2 >>> 0, this.g = e2 >>> 0;
  }
};
let hr;
function ur(t2, e2, n2) {
  for (; n2 > 0 || e2 > 127; ) t2.g.push(127 & e2 | 128), e2 = (e2 >>> 7 | n2 << 25) >>> 0, n2 >>>= 7;
  t2.g.push(e2);
}
function lr(t2, e2) {
  for (; e2 > 127; ) t2.g.push(127 & e2 | 128), e2 >>>= 7;
  t2.g.push(e2);
}
function fr(t2, e2) {
  if (e2 >= 0) lr(t2, e2);
  else {
    for (let n2 = 0; n2 < 9; n2++) t2.g.push(127 & e2 | 128), e2 >>= 7;
    t2.g.push(1);
  }
}
function dr(t2, e2) {
  t2.g.push(e2 >>> 0 & 255), t2.g.push(e2 >>> 8 & 255), t2.g.push(e2 >>> 16 & 255), t2.g.push(e2 >>> 24 & 255);
}
function pr(t2, e2) {
  0 !== e2.length && (t2.l.push(e2), t2.h += e2.length);
}
function gr(t2, e2, n2) {
  lr(t2.g, 8 * e2 + n2);
}
function mr(t2, e2) {
  return gr(t2, e2, 2), e2 = t2.g.end(), pr(t2, e2), e2.push(t2.h), e2;
}
function yr(t2, e2) {
  var n2 = e2.pop();
  for (n2 = t2.h + t2.g.length() - n2; n2 > 127; ) e2.push(127 & n2 | 128), n2 >>>= 7, t2.h++;
  e2.push(n2), t2.h++;
}
function _r(t2, e2, n2) {
  gr(t2, e2, 2), lr(t2.g, n2.length), pr(t2, t2.g.end()), pr(t2, n2);
}
function vr(t2, e2, n2, r2) {
  null != n2 && (e2 = mr(t2, e2), r2(n2, t2), yr(t2, e2));
}
function Er() {
  const t2 = class {
    constructor() {
      throw Error();
    }
  };
  return Object.setPrototypeOf(t2, t2.prototype), t2;
}
var wr = Er(), Tr = Er(), br = Er(), Ar = Er(), kr = Er(), Sr = Er(), xr = Er(), Lr = Er(), Rr = class {
  constructor(t2, e2, n2) {
    this.g = t2, this.h = e2, t2 = wr, this.l = !!t2 && n2 === t2 || false;
  }
};
function Fr(t2, e2) {
  return new Rr(t2, e2, wr);
}
function Mr(t2, e2, n2, r2, i2) {
  vr(t2, n2, Vr(e2, r2), i2);
}
const Ir = Fr((function(t2, e2, n2, r2, i2) {
  return 2 === t2.h && ($n(t2, fn(e2, r2, n2), i2), true);
}), Mr), Pr = Fr((function(t2, e2, n2, r2, i2) {
  return 2 === t2.h && ($n(t2, fn(e2, r2, n2, true), i2), true);
}), Mr);
var Or = Symbol(), Cr = Symbol(), Nr = Symbol(), Ur = Symbol();
let Dr, Br;
function Gr(t2, e2, n2, r2) {
  var i2 = r2[t2];
  if (i2) return i2;
  (i2 = {}).W = (function(t3) {
    switch (typeof t3) {
      case "boolean":
        return pe || (pe = [0, void 0, true]);
      case "number":
        return t3 > 0 ? void 0 : 0 === t3 ? ge || (ge = [0, void 0]) : [-t3, void 0];
      case "string":
        return [0, t3];
      case "object":
        return t3;
    }
  })(r2[0]);
  var s2 = r2[1];
  let o2 = 1;
  s2 && s2.constructor === Object && (i2.ia = s2, "function" == typeof (s2 = r2[++o2]) && (i2.na = true, Dr ?? (Dr = s2), Br ?? (Br = r2[o2 + 1]), s2 = r2[o2 += 2]));
  const a2 = {};
  for (; s2 && Array.isArray(s2) && s2.length && "number" == typeof s2[0] && s2[0] > 0; ) {
    for (var c2 = 0; c2 < s2.length; c2++) a2[s2[c2]] = s2;
    s2 = r2[++o2];
  }
  for (c2 = 1; void 0 !== s2; ) {
    let t3;
    "number" == typeof s2 && (c2 += s2, s2 = r2[++o2]);
    var h2 = void 0;
    if (s2 instanceof Rr ? t3 = s2 : (t3 = Ir, o2--), t3 == null ? void 0 : t3.l) {
      s2 = r2[++o2], h2 = r2;
      var u2 = o2;
      "function" == typeof s2 && (s2 = s2(), h2[u2] = s2), h2 = s2;
    }
    for (u2 = c2 + 1, "number" == typeof (s2 = r2[++o2]) && s2 < 0 && (u2 -= s2, s2 = r2[++o2]); c2 < u2; c2++) {
      const r3 = a2[c2];
      h2 ? n2(i2, c2, t3, h2, r3) : e2(i2, c2, t3, r3);
    }
  }
  return r2[t2] = i2;
}
function jr(t2) {
  return Array.isArray(t2) ? t2[0] instanceof Rr ? t2 : [Pr, t2] : [t2, void 0];
}
function Vr(t2, e2) {
  return t2 instanceof nr ? (we(t2), t2.u) : Array.isArray(t2) ? be(t2, e2, false) : void 0;
}
function Xr(t2, e2, n2, r2) {
  const i2 = n2.g;
  t2[e2] = r2 ? (t3, e3, n3) => i2(t3, e3, n3, r2) : i2;
}
function Hr(t2, e2, n2, r2, i2) {
  const s2 = n2.g;
  let o2, a2;
  t2[e2] = (t3, e3, n3) => s2(t3, e3, n3, a2 || (a2 = Gr(Cr, Xr, Hr, r2).W), o2 || (o2 = Wr(r2)), i2);
}
function Wr(t2) {
  let e2 = t2[Nr];
  if (null != e2) return e2;
  const n2 = Gr(Cr, Xr, Hr, t2);
  return e2 = n2.na ? (t3, e3) => Dr(t3, e3, n2) : (t3, e3) => {
    const r2 = tt(t3);
    for (; Kn(e3) && 4 != e3.h; ) {
      var i2 = e3.m, s2 = n2[i2];
      if (null == s2) {
        var o2 = n2.ia;
        o2 && (o2 = o2[i2]) && (null != (o2 = zr(o2)) && (s2 = n2[i2] = o2));
      }
      null != s2 && s2(e3, t3, i2) || (i2 = (s2 = e3).l, Yn(s2), s2.ha ? s2 = void 0 : (o2 = s2.g.g - i2, s2.g.g = i2, s2 = Wn(s2.g, o2)), i2 = t3, s2 && (gt || (gt = Symbol()), (o2 = i2[gt]) ? o2.push(s2) : i2[gt] = [s2]));
    }
    return 16384 & r2 && nt(t3), true;
  }, t2[Nr] = e2;
}
function zr(t2) {
  const e2 = (t2 = jr(t2))[0].g;
  if (t2 = t2[1]) {
    const n2 = Wr(t2), r2 = Gr(Cr, Xr, Hr, t2).W;
    return (t3, i2, s2) => e2(t3, i2, s2, r2, n2);
  }
  return e2;
}
function Kr(t2, e2, n2) {
  t2[e2] = n2.h;
}
function Yr(t2, e2, n2, r2) {
  let i2, s2;
  const o2 = n2.h;
  t2[e2] = (t3, e3, n3) => o2(t3, e3, n3, s2 || (s2 = Gr(Or, Kr, Yr, r2).W), i2 || (i2 = $r(r2)));
}
function $r(t2) {
  let e2 = t2[Ur];
  if (!e2) {
    const n2 = Gr(Or, Kr, Yr, t2);
    e2 = (t3, e3) => qr(t3, e3, n2), t2[Ur] = e2;
  }
  return e2;
}
function qr(t2, e2, n2) {
  for (var r2 = Q(t2), i2 = +!!(512 & r2) - 1, s2 = t2.length, o2 = 512 & r2 ? 1 : 0, a2 = s2 + (256 & r2 ? -1 : 0); o2 < a2; o2++) {
    const r3 = t2[o2];
    if (null == r3) continue;
    const s3 = o2 - i2, a3 = Jr(n2, s3);
    a3 && a3(e2, r3, s3);
  }
  if (256 & r2) {
    r2 = t2[s2 - 1];
    for (const t3 in r2) i2 = +t3, Number.isNaN(i2) || null != (s2 = r2[i2]) && (a2 = Jr(n2, i2)) && a2(e2, s2, i2);
  }
  if (t2 = gt ? t2[gt] : void 0) for (pr(e2, e2.g.end()), n2 = 0; n2 < t2.length; n2++) pr(e2, N(t2[n2]) || new Uint8Array(0));
}
function Jr(t2, e2) {
  var n2 = t2[e2];
  if (n2) return n2;
  if ((n2 = t2.ia) && (n2 = n2[e2])) {
    var r2 = (n2 = jr(n2))[0].h;
    if (n2 = n2[1]) {
      const e3 = $r(n2), i2 = Gr(Or, Kr, Yr, n2).W;
      n2 = t2.na ? Br(i2, e3) : (t3, n3, s2) => r2(t3, n3, s2, i2, e3);
    } else n2 = r2;
    return t2[e2] = n2;
  }
}
function Zr(t2, e2) {
  if (Array.isArray(e2)) {
    var n2 = Q(e2);
    if (4 & n2) return e2;
    for (var r2 = 0, i2 = 0; r2 < e2.length; r2++) {
      const n3 = t2(e2[r2]);
      null != n3 && (e2[i2++] = n3);
    }
    return i2 < r2 && (e2.length = i2), et(e2, -12289 & (5 | n2)), 2 & n2 && Object.freeze(e2), e2;
  }
}
function Qr(t2, e2, n2) {
  return new Rr(t2, e2, n2);
}
function ti(t2, e2, n2) {
  return new Rr(t2, e2, n2);
}
function ei(t2, e2, n2) {
  qe(t2, tt(t2), e2, n2);
}
var ni = Fr((function(t2, e2, n2, r2, i2) {
  return 2 === t2.h && (t2 = $n(t2, be([void 0, void 0], r2, true), i2), dt(r2 = tt(e2)), (i2 = Ye(e2, r2, n2)) instanceof Me ? 0 != (2 & i2.M) ? ((i2 = i2.Y()).push(t2), qe(e2, r2, n2, i2)) : i2.Oa(t2) : Array.isArray(i2) ? (2 & Q(i2) && qe(e2, r2, n2, i2 = on(i2)), i2.push(t2)) : qe(e2, r2, n2, [t2]), true);
}), (function(t2, e2, n2, r2, i2) {
  if (e2 instanceof Me) e2.forEach(((e3, s2) => {
    vr(t2, n2, be([s2, e3], r2, false), i2);
  }));
  else if (Array.isArray(e2)) for (let s2 = 0; s2 < e2.length; s2++) {
    const o2 = e2[s2];
    Array.isArray(o2) && vr(t2, n2, be(o2, r2, false), i2);
  }
}));
function ri(t2, e2, n2) {
  if (e2 = (function(t3) {
    if (null == t3) return t3;
    const e3 = typeof t3;
    if ("bigint" === e3) return String(BigInt.asIntN(64, t3));
    if (Kt(t3)) {
      if ("string" === e3) return Zt(t3);
      if ("number" === e3) return Jt(t3);
    }
  })(e2), null != e2) {
    if ("string" == typeof e2) ar(e2);
    if (null != e2) switch (gr(t2, n2, 0), typeof e2) {
      case "number":
        t2 = t2.g, Nt(e2), ur(t2, Pt, Ot);
        break;
      case "bigint":
        n2 = BigInt.asUintN(64, e2), n2 = new cr(Number(n2 & BigInt(4294967295)), Number(n2 >> BigInt(32))), ur(t2.g, n2.h, n2.g);
        break;
      default:
        n2 = ar(e2), ur(t2.g, n2.h, n2.g);
    }
  }
}
function ii(t2, e2, n2) {
  null != (e2 = Yt(e2)) && null != e2 && (gr(t2, n2, 0), fr(t2.g, e2));
}
function si(t2, e2, n2) {
  null != (e2 = Wt(e2)) && (gr(t2, n2, 0), t2.g.g.push(e2 ? 1 : 0));
}
function oi(t2, e2, n2) {
  null != (e2 = re(e2)) && _r(t2, n2, h(e2));
}
function ai(t2, e2, n2, r2, i2) {
  vr(t2, n2, Vr(e2, r2), i2);
}
function ci(t2, e2, n2) {
  null != (e2 = null == e2 || "string" == typeof e2 || M(e2) || e2 instanceof U ? e2 : void 0) && _r(t2, n2, On(e2).buffer);
}
function hi(t2, e2, n2) {
  return (5 === t2.h || 2 === t2.h) && (e2 = Je(e2, tt(e2), n2, 2, false), 2 == t2.h ? Zn(t2, Gn, e2) : e2.push(Gn(t2.g)), true);
}
var ui = Qr((function(t2, e2, n2) {
  if (1 !== t2.h) return false;
  var r2 = t2.g;
  t2 = Bn(r2);
  const i2 = Bn(r2);
  r2 = 2 * (i2 >> 31) + 1;
  const s2 = i2 >>> 20 & 2047;
  return t2 = 4294967296 * (1048575 & i2) + t2, ei(e2, n2, 2047 == s2 ? t2 ? NaN : r2 * (1 / 0) : 0 == s2 ? 5e-324 * r2 * t2 : r2 * Math.pow(2, s2 - 1075) * (t2 + 4503599627370496)), true;
}), (function(t2, e2, n2) {
  null != (e2 = Ht(e2)) && (gr(t2, n2, 1), t2 = t2.g, (n2 = It || (It = new DataView(new ArrayBuffer(8)))).setFloat64(0, +e2, true), Pt = n2.getUint32(0, true), Ot = n2.getUint32(4, true), dr(t2, Pt), dr(t2, Ot));
}), Er()), li = Qr((function(t2, e2, n2) {
  return 5 === t2.h && (ei(e2, n2, Gn(t2.g)), true);
}), (function(t2, e2, n2) {
  null != (e2 = Ht(e2)) && (gr(t2, n2, 5), t2 = t2.g, Ut(e2), dr(t2, Pt));
}), Sr), fi = ti(hi, (function(t2, e2, n2) {
  if (null != (e2 = Zr(Ht, e2))) for (let o2 = 0; o2 < e2.length; o2++) {
    var r2 = t2, i2 = n2, s2 = e2[o2];
    null != s2 && (gr(r2, i2, 5), r2 = r2.g, Ut(s2), dr(r2, Pt));
  }
}), Sr), di = ti(hi, (function(t2, e2, n2) {
  if (null != (e2 = Zr(Ht, e2)) && e2.length) {
    gr(t2, n2, 2), lr(t2.g, 4 * e2.length);
    for (let r2 = 0; r2 < e2.length; r2++) n2 = t2.g, Ut(e2[r2]), dr(n2, Pt);
  }
}), Sr), pi = Qr((function(t2, e2, n2) {
  return 0 === t2.h && (ei(e2, n2, Cn(t2.g, Bt)), true);
}), ri, kr), gi = Qr((function(t2, e2, n2) {
  return 0 === t2.h && (ei(e2, n2, 0 === (t2 = Cn(t2.g, Bt)) ? void 0 : t2), true);
}), ri, kr), mi = Qr((function(t2, e2, n2) {
  return 0 === t2.h && (ei(e2, n2, Cn(t2.g, Dt)), true);
}), (function(t2, e2, n2) {
  if (null != (e2 = te(e2))) {
    if ("string" == typeof e2) ir(e2);
    if (null != e2) switch (gr(t2, n2, 0), typeof e2) {
      case "number":
        t2 = t2.g, Nt(e2), ur(t2, Pt, Ot);
        break;
      case "bigint":
        n2 = BigInt.asUintN(64, e2), n2 = new sr(Number(n2 & BigInt(4294967295)), Number(n2 >> BigInt(32))), ur(t2.g, n2.h, n2.g);
        break;
      default:
        n2 = ir(e2), ur(t2.g, n2.h, n2.g);
    }
  }
}), Er()), yi = Qr((function(t2, e2, n2) {
  return 0 === t2.h && (ei(e2, n2, Un(t2.g)), true);
}), ii, Ar), _i = ti((function(t2, e2, n2) {
  return (0 === t2.h || 2 === t2.h) && (e2 = Je(e2, tt(e2), n2, 2, false), 2 == t2.h ? Zn(t2, Un, e2) : e2.push(Un(t2.g)), true);
}), (function(t2, e2, n2) {
  if (null != (e2 = Zr(Yt, e2)) && e2.length) {
    n2 = mr(t2, n2);
    for (let n3 = 0; n3 < e2.length; n3++) fr(t2.g, e2[n3]);
    yr(t2, n2);
  }
}), Ar), vi = Qr((function(t2, e2, n2) {
  return 0 === t2.h && (ei(e2, n2, 0 === (t2 = Un(t2.g)) ? void 0 : t2), true);
}), ii, Ar), Ei = Qr((function(t2, e2, n2) {
  return 0 === t2.h && (ei(e2, n2, Nn(t2.g)), true);
}), si, Tr), wi = Qr((function(t2, e2, n2) {
  return 0 === t2.h && (ei(e2, n2, false === (t2 = Nn(t2.g)) ? void 0 : t2), true);
}), si, Tr), Ti = ti((function(t2, e2, n2) {
  if (2 !== t2.h) return false;
  t2 = qn(t2);
  const r2 = tt(e2);
  return dt(r2), Je(e2, r2, n2, 2).push(t2), true;
}), (function(t2, e2, n2) {
  if (null != (e2 = Zr(re, e2))) for (let o2 = 0; o2 < e2.length; o2++) {
    var r2 = t2, i2 = n2, s2 = e2[o2];
    null != s2 && _r(r2, i2, h(s2));
  }
}), br), bi = Qr((function(t2, e2, n2) {
  return 2 === t2.h && (ei(e2, n2, "" === (t2 = qn(t2)) ? void 0 : t2), true);
}), oi, br), Ai = Qr((function(t2, e2, n2) {
  return 2 === t2.h && (ei(e2, n2, qn(t2)), true);
}), oi, br), ki = (function(t2, e2, n2 = wr) {
  return new Rr(t2, e2, n2);
})((function(t2, e2, n2, r2, i2) {
  if (2 !== t2.h) return false;
  r2 = be(void 0, r2, true);
  let s2 = tt(e2);
  dt(s2);
  let o2 = Je(e2, s2, n2, 3);
  return s2 = tt(e2), 4 & Q(o2) && (o2 = X(o2), et(o2, -2079 & (1 | Q(o2))), qe(e2, s2, n2, o2)), o2.push(r2), $n(t2, r2, i2), true;
}), (function(t2, e2, n2, r2, i2) {
  if (Array.isArray(e2)) for (let s2 = 0; s2 < e2.length; s2++) ai(t2, e2[s2], n2, r2, i2);
})), Si = Fr((function(t2, e2, n2, r2, i2, s2) {
  return 2 === t2.h && (un(e2, Q(e2), s2, n2), $n(t2, e2 = fn(e2, r2, n2), i2), true);
}), ai), xi = Qr((function(t2, e2, n2) {
  return 2 === t2.h && (ei(e2, n2, Jn(t2)), true);
}), ci, xr), Li = ti((function(t2, e2, n2) {
  return (0 === t2.h || 2 === t2.h) && (e2 = Je(e2, tt(e2), n2, 2, false), 2 == t2.h ? Zn(t2, Dn, e2) : e2.push(Dn(t2.g)), true);
}), (function(t2, e2, n2) {
  if (null != (e2 = Zr($t, e2))) for (let o2 = 0; o2 < e2.length; o2++) {
    var r2 = t2, i2 = n2, s2 = e2[o2];
    null != s2 && (gr(r2, i2, 0), lr(r2.g, s2));
  }
}), Er()), Ri = Qr((function(t2, e2, n2) {
  return 0 === t2.h && (ei(e2, n2, Un(t2.g)), true);
}), (function(t2, e2, n2) {
  null != (e2 = Yt(e2)) && (e2 = parseInt(e2, 10), gr(t2, n2, 0), fr(t2.g, e2));
}), Lr);
class Fi {
  constructor(t2, e2) {
    this.h = t2, this.g = e2, this.l = pn, this.m = yn, this.defaultValue = void 0;
  }
}
function Mi(t2, e2) {
  return new Fi(t2, e2);
}
function Ii(t2, e2) {
  return (n2, r2) => {
    if (Qn.length) {
      const t3 = Qn.pop();
      t3.o(r2), Vn(t3.g, n2, r2), n2 = t3;
    } else n2 = new class {
      constructor(t3, e3) {
        if (zn.length) {
          const n3 = zn.pop();
          Vn(n3, t3, e3), t3 = n3;
        } else t3 = new class {
          constructor(t4, e4) {
            this.h = null, this.m = false, this.g = this.l = this.j = 0, Vn(this, t4, e4);
          }
          clear() {
            this.h = null, this.m = false, this.g = this.l = this.j = 0, this.ca = false;
          }
        }(t3, e3);
        this.g = t3, this.l = this.g.g, this.h = this.m = -1, this.o(e3);
      }
      o({ ha: t3 = false } = {}) {
        this.ha = t3;
      }
    }(n2, r2);
    try {
      const r3 = new t2(), s2 = r3.u;
      Wr(e2)(s2, n2);
      var i2 = r3;
    } finally {
      n2.g.clear(), n2.m = -1, n2.h = -1, Qn.length < 100 && Qn.push(n2);
    }
    return i2;
  };
}
function Pi(t2) {
  return function() {
    we(this);
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
    qr(this.u, e2, Gr(Or, Kr, Yr, t2)), pr(e2, e2.g.end());
    const n2 = new Uint8Array(e2.h), r2 = e2.l, i2 = r2.length;
    let s2 = 0;
    for (let t3 = 0; t3 < i2; t3++) {
      const e3 = r2[t3];
      n2.set(e3, s2), s2 += e3.length;
    }
    return e2.l = [n2], n2;
  };
}
var Oi = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Ci = [0, bi, Qr((function(t2, e2, n2) {
  return 2 === t2.h && (ei(e2, n2, (t2 = Jn(t2)) === C() ? void 0 : t2), true);
}), (function(t2, e2, n2) {
  if (null != e2) {
    if (e2 instanceof nr) {
      const r2 = e2.Ra;
      return void (r2 && (e2 = r2(e2), null != e2 && _r(t2, n2, On(e2).buffer)));
    }
    if (Array.isArray(e2)) return;
  }
  ci(t2, e2, n2);
}), xr)];
let Ni, Ui = globalThis.trustedTypes;
function Di(t2) {
  void 0 === Ni && (Ni = (function() {
    let t3 = null;
    if (!Ui) return t3;
    try {
      const e3 = (t4) => t4;
      t3 = Ui.createPolicy("goog#html", { createHTML: e3, createScript: e3, createScriptURL: e3 });
    } catch (t4) {
    }
    return t3;
  })());
  var e2 = Ni;
  return new class {
    constructor(t3) {
      this.g = t3;
    }
    toString() {
      return this.g + "";
    }
  }(e2 ? e2.createScriptURL(t2) : t2);
}
function Bi(t2, ...e2) {
  if (0 === e2.length) return Di(t2[0]);
  let n2 = t2[0];
  for (let r2 = 0; r2 < e2.length; r2++) n2 += encodeURIComponent(e2[r2]) + t2[r2 + 1];
  return Di(n2);
}
var Gi = [0, yi, Ri, Ei, -1, _i, Ri, -1], ji = class extends nr {
  constructor() {
    super();
  }
}, Vi = [0, Ei, Ai, Ei, Ri, -1, ti((function(t2, e2, n2) {
  return (0 === t2.h || 2 === t2.h) && (e2 = Je(e2, tt(e2), n2, 2, false), 2 == t2.h ? Zn(t2, jn, e2) : e2.push(Un(t2.g)), true);
}), (function(t2, e2, n2) {
  if (null != (e2 = Zr(Yt, e2)) && e2.length) {
    n2 = mr(t2, n2);
    for (let n3 = 0; n3 < e2.length; n3++) fr(t2.g, e2[n3]);
    yr(t2, n2);
  }
}), Lr), Ai, -1, [0, Ei, -1], Ri, Ei, -1], Xi = [0, Ai, -2], Hi = class extends nr {
  constructor() {
    super();
  }
}, Wi = [0], zi = [0, yi, Ei, 1, Ei, -3], Ki = class extends nr {
  constructor(t2) {
    super(t2, 2);
  }
}, Yi = {};
Yi[336783863] = [0, Ai, Ei, -1, yi, [0, [1, 2, 3, 4, 5, 6, 7], Si, Wi, Si, Vi, Si, Xi, Si, zi, Si, Gi, Si, [0, Ai, -2], Si, [0, Ai, Ri]], [0, Ai], Ei, [0, [1, 3], [2, 4], Si, [0, _i], -1, Si, [0, Ti], -1, ki, [0, Ai, -1]], Ai];
var $i = [0, gi, -1, wi, -3, gi, _i, bi, vi, gi, -1, wi, vi, wi, -2, bi];
function qi(t2, e2) {
  an(t2, 2, ne(e2), "");
}
function Ji(t2, e2) {
  Fn(t2, 3, e2);
}
function Zi(t2, e2) {
  Fn(t2, 4, e2);
}
var Qi = class extends nr {
  constructor(t2) {
    super(t2, 500);
  }
  o(t2) {
    return yn(this, 0, 7, t2);
  }
}, ts = [-1, {}], es = [0, Ai, 1, ts], ns = [0, Ai, Ti, ts];
function rs(t2, e2) {
  wn(t2, 1, Qi, e2);
}
function is(t2, e2) {
  Fn(t2, 10, e2);
}
function ss(t2, e2) {
  Fn(t2, 15, e2);
}
var os = class extends nr {
  constructor(t2) {
    super(t2, 500);
  }
  o(t2) {
    return yn(this, 0, 1001, t2);
  }
}, as = [-500, ki, [-500, bi, -1, Ti, -3, [-2, Yi, Ei], ki, Ci, vi, -1, es, ns, ki, [0, bi, wi], bi, $i, vi, Ti, 987, Ti], 4, ki, [-500, Ai, -1, [-1, {}], 998, Ai], ki, [-500, Ai, Ti, -1, [-2, {}, Ei], 997, Ti, -1], vi, ki, [-500, Ai, Ti, ts, 998, Ti], Ti, vi, es, ns, ki, [0, bi, -1, ts], Ti, -2, $i, bi, -1, wi, 979, ts, ki, Ci];
os.prototype.g = Pi(as);
var cs = Ii(os, as), hs = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, us = class extends nr {
  constructor(t2) {
    super(t2);
  }
  g() {
    return mn(this, hs, 1);
  }
}, ls = [0, ki, [0, yi, li, Ai, -1]], fs = Ii(us, ls), ds = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, ps = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, gs = class extends nr {
  constructor(t2) {
    super(t2);
  }
  h() {
    return pn(this, ds, 2);
  }
  g() {
    return mn(this, ps, 5);
  }
}, ms = Ii(class extends nr {
  constructor(t2) {
    super(t2);
  }
}, [0, Ti, _i, di, [0, Ri, [0, yi, -3], [0, li, -3], [0, yi, -1, [0, ki, [0, yi, -2]]], ki, [0, li, -1, Ai, li]], Ai, -1, pi, ki, [0, yi, li], Ti, pi]), ys = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, _s = Ii(class extends nr {
  constructor(t2) {
    super(t2);
  }
}, [0, ki, [0, li, -4]]), vs = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Es = Ii(class extends nr {
  constructor(t2) {
    super(t2);
  }
}, [0, ki, [0, li, -4]]), ws = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Ts = [0, yi, -1, di, Ri], bs = class extends nr {
  constructor() {
    super();
  }
};
bs.prototype.g = Pi([0, li, -4, pi]);
var As = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, ks = Ii(class extends nr {
  constructor(t2) {
    super(t2);
  }
}, [0, ki, [0, 1, yi, Ai, ls], pi]), Ss = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, xs = class extends nr {
  constructor(t2) {
    super(t2);
  }
  qa() {
    const t2 = Qe(this);
    return null == t2 ? C() : t2;
  }
}, Ls = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Rs = [1, 2], Fs = Ii(class extends nr {
  constructor(t2) {
    super(t2);
  }
}, [0, ki, [0, Rs, Si, [0, di], Si, [0, xi], yi, Ai], pi]), Ms = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Is = [0, Ai, yi, li, Ti, -1], Ps = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Os = [0, Ei, -1], Cs = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Ns = [1, 2, 3, 4, 5], Us = class extends nr {
  constructor(t2) {
    super(t2);
  }
  g() {
    return null != Qe(this);
  }
  h() {
    return null != re(ze(this, 2));
  }
}, Ds = class extends nr {
  constructor(t2) {
    super(t2);
  }
  g() {
    return Wt(ze(this, 2)) ?? false;
  }
}, Bs = [0, xi, Ai, [0, yi, pi, -1], [0, mi, pi]], Gs = [0, Bs, Ei, [0, Ns, Si, zi, Si, Vi, Si, Gi, Si, Wi, Si, Xi], Ri], js = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Vs = [0, Gs, li, -1, yi], Xs = Mi(502141897, js);
Yi[502141897] = Vs;
var Hs = Ii(class extends nr {
  constructor(t2) {
    super(t2);
  }
}, [0, [0, Ri, -1, fi, Li], Ts]), Ws = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, zs = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Ks = [0, Gs, li, [0, Gs], Ei], Ys = [0, Gs, Vs, Ks, li, [0, [0, Bs]]], $s = Mi(508968150, zs);
Yi[508968150] = Ys, Yi[508968149] = Ks;
var qs = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Js = Mi(513916220, qs);
Yi[513916220] = [0, Gs, Ys, yi];
var Zs = class extends nr {
  constructor(t2) {
    super(t2);
  }
  h() {
    return pn(this, Ms, 2);
  }
  g() {
    $e(this, 2);
  }
}, Qs = [0, Gs, Is];
Yi[478825465] = Qs;
var to = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, eo = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, no = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, ro = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, io = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, so = [0, Gs, [0, Gs], Qs, -1], oo = [0, Gs, li, yi], ao = [0, Gs, li], co = [0, Gs, oo, ao, li], ho = Mi(479097054, io);
Yi[479097054] = [0, Gs, co, so], Yi[463370452] = so, Yi[464864288] = oo;
var uo = Mi(462713202, ro);
Yi[462713202] = co, Yi[474472470] = ao;
var lo = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, fo = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, po = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, go = class extends nr {
  constructor() {
    super();
  }
}, mo = [0, Gs, li, -1, yi], yo = [0, Gs, li, Ei];
go.prototype.g = Pi([0, Gs, ao, [0, Gs], Vs, Ks, mo, yo]);
var _o = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, vo = Mi(456383383, _o);
Yi[456383383] = [0, Gs, Is];
var Eo = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, wo = Mi(476348187, Eo);
Yi[476348187] = [0, Gs, Os];
var To = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, bo = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Ao = [0, Ri, -1], ko = Mi(458105876, class extends nr {
  constructor(t2) {
    super(t2);
  }
  g() {
    var t2 = this.u;
    const e2 = tt(t2);
    const n2 = 2 & e2;
    return t2 = (function(t3, e3, n3) {
      var r2 = bo;
      const i2 = 2 & e3;
      let s2 = false;
      if (null == n3) {
        if (i2) return Ne();
        n3 = [];
      } else if (n3.constructor === Me) {
        if (0 == (2 & n3.M) || i2) return n3;
        n3 = n3.Y();
      } else Array.isArray(n3) ? s2 = !!(2 & Q(n3)) : n3 = [];
      if (i2) {
        if (!n3.length) return Ne();
        s2 || (s2 = true, nt(n3));
      } else s2 && (s2 = false, n3 = on(n3));
      return s2 || (64 & Q(n3) ? Z(n3, 32) : 32 & e3 && J(n3, 32)), qe(t3, e3, 2, r2 = new Me(n3, r2, se, void 0)), r2;
    })(t2, e2, Ye(t2, e2, 2)), !n2 && bo && (t2.ta = true), t2;
  }
});
Yi[458105876] = [0, Ao, ni, [true, pi, [0, Ai, -1, Ti]]];
var So = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, xo = Mi(458105758, So);
Yi[458105758] = [0, Gs, Ai, Ao];
var Lo = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Ro = Mi(443442058, Lo);
Yi[443442058] = [0, Gs, Ai, yi, li, Ti, -1], Yi[514774813] = mo;
var Fo = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Mo = Mi(516587230, Fo);
function Io(t2, e2) {
  return e2 = e2 ? e2.clone() : new Ms(), void 0 !== t2.displayNamesLocale ? $e(e2, 1, ne(t2.displayNamesLocale)) : void 0 === t2.displayNamesLocale && $e(e2, 1), void 0 !== t2.maxResults ? xn(e2, 2, t2.maxResults) : "maxResults" in t2 && $e(e2, 2), void 0 !== t2.scoreThreshold ? Ln(e2, 3, t2.scoreThreshold) : "scoreThreshold" in t2 && $e(e2, 3), void 0 !== t2.categoryAllowlist ? Rn(e2, 4, t2.categoryAllowlist) : "categoryAllowlist" in t2 && $e(e2, 4), void 0 !== t2.categoryDenylist ? Rn(e2, 5, t2.categoryDenylist) : "categoryDenylist" in t2 && $e(e2, 5), e2;
}
function Po(t2, e2 = -1, n2 = "") {
  return { categories: t2.map(((t3) => ({ index: Tn(bn(t3, 1), 0) ?? -1, score: An(t3, 2) ?? 0, categoryName: kn(t3, 3) ?? "", displayName: kn(t3, 4) ?? "" }))), headIndex: e2, headName: n2 };
}
function Oo(t2) {
  var _a2, _b;
  var e2 = en(t2, 3, Ht, tn()), n2 = en(t2, 2, Yt, tn()), r2 = en(t2, 1, re, tn()), i2 = en(t2, 9, re, tn());
  const s2 = { categories: [], keypoints: [] };
  for (let t3 = 0; t3 < e2.length; t3++) s2.categories.push({ score: e2[t3], index: n2[t3] ?? -1, categoryName: r2[t3] ?? "", displayName: i2[t3] ?? "" });
  if ((e2 = (_a2 = pn(t2, gs, 4)) == null ? void 0 : _a2.h()) && (s2.boundingBox = { originX: bn(e2, 1) ?? 0, originY: bn(e2, 2) ?? 0, width: bn(e2, 3) ?? 0, height: bn(e2, 4) ?? 0, angle: 0 }), (_b = pn(t2, gs, 4)) == null ? void 0 : _b.g().length) for (const e3 of pn(t2, gs, 4).g()) s2.keypoints.push({ x: Ze(e3, 1) ?? 0, y: Ze(e3, 2) ?? 0, score: Ze(e3, 4) ?? 0, label: re(ze(e3, 3)) ?? "" });
  return s2;
}
function Co(t2) {
  const e2 = [];
  for (const n2 of mn(t2, vs, 1)) e2.push({ x: An(n2, 1) ?? 0, y: An(n2, 2) ?? 0, z: An(n2, 3) ?? 0, visibility: An(n2, 4) ?? 0 });
  return e2;
}
function No(t2) {
  const e2 = [];
  for (const n2 of mn(t2, ys, 1)) e2.push({ x: An(n2, 1) ?? 0, y: An(n2, 2) ?? 0, z: An(n2, 3) ?? 0, visibility: An(n2, 4) ?? 0 });
  return e2;
}
function Uo(t2) {
  return Array.from(t2, ((t3) => t3 > 127 ? t3 - 256 : t3));
}
function Do(t2, e2) {
  if (t2.length !== e2.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t2.length} vs. ${e2.length}).`);
  let n2 = 0, r2 = 0, i2 = 0;
  for (let s2 = 0; s2 < t2.length; s2++) n2 += t2[s2] * e2[s2], r2 += t2[s2] * t2[s2], i2 += e2[s2] * e2[s2];
  if (r2 <= 0 || i2 <= 0) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
  return n2 / Math.sqrt(r2 * i2);
}
let Bo;
Yi[516587230] = [0, Gs, mo, yo, li], Yi[518928384] = yo;
const Go = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function jo() {
  if (void 0 === Bo) try {
    await WebAssembly.instantiate(Go), Bo = true;
  } catch {
    Bo = false;
  }
  return Bo;
}
async function Vo(t2, e2 = Bi``) {
  const n2 = await jo() ? "wasm_internal" : "wasm_nosimd_internal";
  return { wasmLoaderPath: `${e2}/${t2}_${n2}.js`, wasmBinaryPath: `${e2}/${t2}_${n2}.wasm` };
}
var Xo = class {
};
function Ho() {
  var t2 = navigator;
  return "undefined" != typeof OffscreenCanvas && (!(function(t3 = navigator) {
    return (t3 = t3.userAgent).includes("Safari") && !t3.includes("Chrome");
  })(t2) || !!((t2 = t2.userAgent.match(/Version\/([\d]+).*Safari/)) && t2.length >= 1 && Number(t2[1]) >= 17));
}
async function Wo(t2) {
  if ("function" != typeof importScripts) {
    const e2 = document.createElement("script");
    return e2.src = t2.toString(), e2.crossOrigin = "anonymous", new Promise(((t3, n2) => {
      e2.addEventListener("load", (() => {
        t3();
      }), false), e2.addEventListener("error", ((t4) => {
        n2(t4);
      }), false), document.body.appendChild(e2);
    }));
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
  const n2 = pn(t2.baseOptions, Us, 1) || new Us();
  "string" == typeof e2 ? ($e(n2, 2, ne(e2)), $e(n2, 1)) : e2 instanceof Uint8Array && ($e(n2, 1, ut(e2, false, false)), $e(n2, 2)), yn(t2.baseOptions, 0, 1, n2);
}
function ta(t2) {
  try {
    const e2 = t2.H.length;
    if (1 === e2) throw Error(t2.H[0].message);
    if (e2 > 1) throw Error("Encountered multiple errors: " + t2.H.map(((t3) => t3.message)).join(", "));
  } finally {
    t2.H = [];
  }
}
function ea(t2, e2) {
  t2.B = Math.max(t2.B, e2);
}
function na(t2, e2) {
  t2.A = new Qi(), qi(t2.A, "PassThroughCalculator"), Ji(t2.A, "free_memory"), Zi(t2.A, "free_memory_unused_out"), is(e2, "free_memory"), rs(e2, t2.A);
}
function ra(t2, e2) {
  Ji(t2.A, e2), Zi(t2.A, e2 + "_unused_out");
}
function ia(t2) {
  t2.g.addBoolToStream(true, "free_memory", t2.B);
}
var sa = class {
  constructor(t2) {
    this.g = t2, this.H = [], this.B = 0, this.g.setAutoRenderToScreen(false);
  }
  l(t2, e2 = true) {
    var _a2, _b, _c2, _d, _e2, _f;
    if (e2) {
      const e3 = t2.baseOptions || {};
      if (((_a2 = t2.baseOptions) == null ? void 0 : _a2.modelAssetBuffer) && ((_b = t2.baseOptions) == null ? void 0 : _b.modelAssetPath)) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      if (!(((_c2 = pn(this.baseOptions, Us, 1)) == null ? void 0 : _c2.g()) || ((_d = pn(this.baseOptions, Us, 1)) == null ? void 0 : _d.h()) || ((_e2 = t2.baseOptions) == null ? void 0 : _e2.modelAssetBuffer) || ((_f = t2.baseOptions) == null ? void 0 : _f.modelAssetPath))) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
      if ((function(t3, e4) {
        let n2 = pn(t3.baseOptions, Cs, 3);
        if (!n2) {
          var r2 = n2 = new Cs(), i2 = new Hi();
          _n(r2, 4, Ns, i2);
        }
        "delegate" in e4 && ("GPU" === e4.delegate ? (e4 = n2, r2 = new ji(), _n(e4, 2, Ns, r2)) : (e4 = n2, r2 = new Hi(), _n(e4, 4, Ns, r2))), yn(t3.baseOptions, 0, 3, n2);
      })(this, e3), e3.modelAssetPath) return fetch(e3.modelAssetPath.toString()).then(((t3) => {
        if (t3.ok) return t3.arrayBuffer();
        throw Error(`Failed to fetch model: ${e3.modelAssetPath} (${t3.status})`);
      })).then(((t3) => {
        try {
          this.g.i.FS_unlink("/model.dat");
        } catch {
        }
        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(t3), true, false, false), Qo(this, "/model.dat"), this.m(), this.J();
      }));
      if (e3.modelAssetBuffer instanceof Uint8Array) Qo(this, e3.modelAssetBuffer);
      else if (e3.modelAssetBuffer) return (async function(t3) {
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
      })(e3.modelAssetBuffer).then(((t3) => {
        Qo(this, t3), this.m(), this.J();
      }));
    }
    return this.m(), this.J(), Promise.resolve();
  }
  J() {
  }
  ea() {
    let t2;
    if (this.g.ea(((e2) => {
      t2 = cs(e2);
    })), !t2) throw Error("Failed to retrieve CalculatorGraphConfig");
    return t2;
  }
  setGraph(t2, e2) {
    this.g.attachErrorListener(((t3, e3) => {
      this.H.push(Error(e3));
    })), this.g.Ma(), this.g.setGraph(t2, e2), this.A = void 0, ta(this);
  }
  finishProcessing() {
    this.g.finishProcessing(), ta(this);
  }
  close() {
    this.A = void 0, this.g.closeGraph();
  }
};
function oa(t2, e2) {
  if (!t2) throw Error(`Unable to obtain required WebGL resource: ${e2}`);
  return t2;
}
sa.prototype.close = sa.prototype.close, (function(e2, n2) {
  e2 = e2.split(".");
  var r2, i2 = t;
  e2[0] in i2 || void 0 === i2.execScript || i2.execScript("var " + e2[0]);
  for (; e2.length && (r2 = e2.shift()); ) e2.length || void 0 === n2 ? i2 = i2[r2] && i2[r2] !== Object.prototype[r2] ? i2[r2] : i2[r2] = {} : i2[r2] = n2;
})("TaskRunner", sa);
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
function ca(t2, e2, n2) {
  const r2 = t2.g;
  if (n2 = oa(r2.createShader(n2), "Failed to create WebGL shader"), r2.shaderSource(n2, e2), r2.compileShader(n2), !r2.getShaderParameter(n2, r2.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${r2.getShaderInfoLog(n2)}`);
  return r2.attachShader(t2.h, n2), n2;
}
function ha(t2, e2) {
  const n2 = t2.g, r2 = oa(n2.createVertexArray(), "Failed to create vertex array");
  n2.bindVertexArray(r2);
  const i2 = oa(n2.createBuffer(), "Failed to create buffer");
  n2.bindBuffer(n2.ARRAY_BUFFER, i2), n2.enableVertexAttribArray(t2.P), n2.vertexAttribPointer(t2.P, 2, n2.FLOAT, false, 0, 0), n2.bufferData(n2.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n2.STATIC_DRAW);
  const s2 = oa(n2.createBuffer(), "Failed to create buffer");
  return n2.bindBuffer(n2.ARRAY_BUFFER, s2), n2.enableVertexAttribArray(t2.J), n2.vertexAttribPointer(t2.J, 2, n2.FLOAT, false, 0, 0), n2.bufferData(n2.ARRAY_BUFFER, new Float32Array(e2 ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), n2.STATIC_DRAW), n2.bindBuffer(n2.ARRAY_BUFFER, null), n2.bindVertexArray(null), new aa(n2, r2, i2, s2);
}
function ua(t2, e2) {
  if (t2.g) {
    if (e2 !== t2.g) throw Error("Cannot change GL context once initialized");
  } else t2.g = e2;
}
function la(t2, e2, n2, r2) {
  return ua(t2, e2), t2.h || (t2.m(), t2.C()), n2 ? (t2.s || (t2.s = ha(t2, true)), n2 = t2.s) : (t2.v || (t2.v = ha(t2, false)), n2 = t2.v), e2.useProgram(t2.h), n2.bind(), t2.l(), t2 = r2(), n2.g.bindVertexArray(null), t2;
}
function fa(t2, e2, n2) {
  return ua(t2, e2), t2 = oa(e2.createTexture(), "Failed to create texture"), e2.bindTexture(e2.TEXTURE_2D, t2), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_WRAP_S, e2.CLAMP_TO_EDGE), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_WRAP_T, e2.CLAMP_TO_EDGE), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_MIN_FILTER, n2 ?? e2.LINEAR), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_MAG_FILTER, n2 ?? e2.LINEAR), e2.bindTexture(e2.TEXTURE_2D, null), t2;
}
function da(t2, e2, n2) {
  ua(t2, e2), t2.A || (t2.A = oa(e2.createFramebuffer(), "Failed to create framebuffe.")), e2.bindFramebuffer(e2.FRAMEBUFFER, t2.A), e2.framebufferTexture2D(e2.FRAMEBUFFER, e2.COLOR_ATTACHMENT0, e2.TEXTURE_2D, n2, 0);
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
    if (this.h = oa(t2.createProgram(), "Failed to create WebGL program"), this.ba = ca(this, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", t2.VERTEX_SHADER), this.aa = ca(this, this.H(), t2.FRAGMENT_SHADER), t2.linkProgram(this.h), !t2.getProgramParameter(this.h, t2.LINK_STATUS)) throw Error(`Error during program linking: ${t2.getProgramInfoLog(this.h)}`);
    this.P = t2.getAttribLocation(this.h, "aVertex"), this.J = t2.getAttribLocation(this.h, "aTex");
  }
  C() {
  }
  l() {
  }
  close() {
    if (this.h) {
      const t2 = this.g;
      t2.deleteProgram(this.h), t2.deleteShader(this.ba), t2.deleteShader(this.aa);
    }
    this.A && this.g.deleteFramebuffer(this.A), this.v && this.v.close(), this.s && this.s.close();
  }
};
var ma = class extends ga {
  H() {
    return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n ";
  }
  C() {
    const t2 = this.g;
    t2.activeTexture(t2.TEXTURE1), this.B = fa(this, t2, t2.LINEAR), t2.activeTexture(t2.TEXTURE2), this.j = fa(this, t2, t2.NEAREST);
  }
  m() {
    super.m();
    const t2 = this.g;
    this.L = oa(t2.getUniformLocation(this.h, "backgroundTexture"), "Uniform location"), this.U = oa(t2.getUniformLocation(this.h, "colorMappingTexture"), "Uniform location"), this.K = oa(t2.getUniformLocation(this.h, "maskTexture"), "Uniform location");
  }
  l() {
    super.l();
    const t2 = this.g;
    t2.uniform1i(this.K, 0), t2.uniform1i(this.L, 1), t2.uniform1i(this.U, 2);
  }
  close() {
    this.B && this.g.deleteTexture(this.B), this.j && this.g.deleteTexture(this.j), super.close();
  }
}, ya = class extends ga {
  H() {
    return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n ";
  }
  C() {
    const t2 = this.g;
    t2.activeTexture(t2.TEXTURE1), this.j = fa(this, t2), t2.activeTexture(t2.TEXTURE2), this.B = fa(this, t2);
  }
  m() {
    super.m();
    const t2 = this.g;
    this.K = oa(t2.getUniformLocation(this.h, "defaultTexture"), "Uniform location"), this.L = oa(t2.getUniformLocation(this.h, "overlayTexture"), "Uniform location"), this.I = oa(t2.getUniformLocation(this.h, "maskTexture"), "Uniform location");
  }
  l() {
    super.l();
    const t2 = this.g;
    t2.uniform1i(this.I, 0), t2.uniform1i(this.K, 1), t2.uniform1i(this.L, 2);
  }
  close() {
    this.j && this.g.deleteTexture(this.j), this.B && this.g.deleteTexture(this.B), super.close();
  }
};
function _a(t2, e2) {
  switch (e2) {
    case 0:
      return t2.g.find(((t3) => t3 instanceof Uint8Array));
    case 1:
      return t2.g.find(((t3) => t3 instanceof Float32Array));
    case 2:
      return t2.g.find(((t3) => "undefined" != typeof WebGLTexture && t3 instanceof WebGLTexture));
    default:
      throw Error(`Type is not supported: ${e2}`);
  }
}
function va(t2) {
  var e2 = _a(t2, 1);
  if (!e2) {
    if (e2 = _a(t2, 0)) e2 = new Float32Array(e2).map(((t3) => t3 / 255));
    else {
      e2 = new Float32Array(t2.width * t2.height);
      const r2 = wa(t2);
      var n2 = ba(t2);
      if (da(n2, r2, Ea(t2)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "document" in self && "ontouchend" in self.document) {
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
    e2 = Aa(t2);
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
  if (t2 = wa(t2), !Sa) if (t2.getExtension("EXT_color_buffer_float") && t2.getExtension("OES_texture_float_linear") && t2.getExtension("EXT_float_blend")) Sa = t2.R32F;
  else {
    if (!t2.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
    Sa = t2.R16F;
  }
  return Sa;
}
function ba(t2) {
  return t2.l || (t2.l = new ga()), t2.l;
}
function Aa(t2) {
  const e2 = wa(t2);
  e2.viewport(0, 0, t2.width, t2.height), e2.activeTexture(e2.TEXTURE0);
  let n2 = _a(t2, 2);
  return n2 || (n2 = fa(ba(t2), e2, t2.m ? e2.LINEAR : e2.NEAREST), t2.g.push(n2), t2.j = true), e2.bindTexture(e2.TEXTURE_2D, n2), n2;
}
function ka(t2) {
  t2.h.bindTexture(t2.h.TEXTURE_2D, null);
}
var Sa, xa = class {
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
    return (e2 = _a(t2 = this, 0)) || (e2 = va(t2), e2 = new Uint8Array(e2.map(((t3) => 255 * t3))), t2.g.push(e2)), e2;
    var t2, e2;
  }
  ja() {
    return va(this);
  }
  N() {
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
          const t3 = wa(this), e3 = ba(this);
          t3.activeTexture(t3.TEXTURE1), n2 = fa(e3, t3, this.m ? t3.LINEAR : t3.NEAREST), t3.bindTexture(t3.TEXTURE_2D, n2);
          const r2 = Ta(this);
          t3.texImage2D(t3.TEXTURE_2D, 0, r2, this.width, this.height, 0, t3.RED, t3.FLOAT, null), t3.bindTexture(t3.TEXTURE_2D, null), da(e3, t3, n2), la(e3, t3, false, (() => {
            Aa(this), t3.clearColor(0, 0, 0, 0), t3.clear(t3.COLOR_BUFFER_BIT), t3.drawArrays(t3.TRIANGLE_FAN, 0, 4), ka(this);
          })), pa(e3), ka(this);
        }
      }
      t2.push(n2);
    }
    return new xa(t2, this.m, this.R(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && wa(this).deleteTexture(_a(this, 2)), La = -1;
  }
};
xa.prototype.close = xa.prototype.close, xa.prototype.clone = xa.prototype.clone, xa.prototype.getAsWebGLTexture = xa.prototype.N, xa.prototype.getAsFloat32Array = xa.prototype.ja, xa.prototype.getAsUint8Array = xa.prototype.ka, xa.prototype.hasWebGLTexture = xa.prototype.R, xa.prototype.hasFloat32Array = xa.prototype.la, xa.prototype.hasUint8Array = xa.prototype.Ha;
var La = 250;
const Ra = { color: "white", lineWidth: 4, radius: 6 };
function Fa(t2) {
  return { ...Ra, fillColor: (t2 = t2 || {}).color, ...t2 };
}
function Ma(t2, e2) {
  return t2 instanceof Function ? t2(e2) : t2;
}
function Ia(t2, e2, n2) {
  return Math.max(Math.min(e2, n2), Math.min(Math.max(e2, n2), t2));
}
function Pa(t2) {
  if (!t2.l) throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");
  return t2.l;
}
function Oa(t2) {
  if (!t2.j) throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");
  return t2.j;
}
function Ca(t2, e2, n2) {
  if (e2.R()) n2(e2.N());
  else {
    const r2 = e2.la() ? e2.ja() : e2.ka();
    t2.m = t2.m ?? new ga();
    const i2 = Oa(t2);
    n2((t2 = new xa([r2], e2.m, false, i2.canvas, t2.m, e2.width, e2.height)).N()), t2.close();
  }
}
function Na(t2, e2, n2, r2) {
  const i2 = (function(t3) {
    return t3.g || (t3.g = new ma()), t3.g;
  })(t2), s2 = Oa(t2), o2 = Array.isArray(n2) ? new ImageData(new Uint8ClampedArray(n2), 1, 1) : n2;
  la(i2, s2, true, (() => {
    !(function(t4, e3, n3, r3) {
      const i3 = t4.g;
      if (i3.activeTexture(i3.TEXTURE0), i3.bindTexture(i3.TEXTURE_2D, e3), i3.activeTexture(i3.TEXTURE1), i3.bindTexture(i3.TEXTURE_2D, t4.B), i3.texImage2D(i3.TEXTURE_2D, 0, i3.RGBA, i3.RGBA, i3.UNSIGNED_BYTE, n3), t4.I && (function(t5, e4) {
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
      })(t4.I, r3)) i3.activeTexture(i3.TEXTURE2), i3.bindTexture(i3.TEXTURE_2D, t4.j);
      else {
        t4.I = r3;
        const e4 = Array(1024).fill(0);
        r3.forEach(((t5, n4) => {
          if (4 !== t5.length) throw Error(`Color at index ${n4} is not a four-channel value.`);
          e4[4 * n4] = t5[0], e4[4 * n4 + 1] = t5[1], e4[4 * n4 + 2] = t5[2], e4[4 * n4 + 3] = t5[3];
        })), i3.activeTexture(i3.TEXTURE2), i3.bindTexture(i3.TEXTURE_2D, t4.j), i3.texImage2D(i3.TEXTURE_2D, 0, i3.RGBA, 256, 1, 0, i3.RGBA, i3.UNSIGNED_BYTE, new Uint8Array(e4));
      }
    })(i2, e2, o2, r2), s2.clearColor(0, 0, 0, 0), s2.clear(s2.COLOR_BUFFER_BIT), s2.drawArrays(s2.TRIANGLE_FAN, 0, 4);
    const t3 = i2.g;
    t3.activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, null);
  }));
}
function Ua(t2, e2, n2, r2) {
  const i2 = Oa(t2), s2 = (function(t3) {
    return t3.h || (t3.h = new ya()), t3.h;
  })(t2), o2 = Array.isArray(n2) ? new ImageData(new Uint8ClampedArray(n2), 1, 1) : n2, a2 = Array.isArray(r2) ? new ImageData(new Uint8ClampedArray(r2), 1, 1) : r2;
  la(s2, i2, true, (() => {
    var t3 = s2.g;
    t3.activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, e2), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, s2.j), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, t3.RGBA, t3.UNSIGNED_BYTE, o2), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, s2.B), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, t3.RGBA, t3.UNSIGNED_BYTE, a2), i2.clearColor(0, 0, 0, 0), i2.clear(i2.COLOR_BUFFER_BIT), i2.drawArrays(i2.TRIANGLE_FAN, 0, 4), i2.bindTexture(i2.TEXTURE_2D, null), (t3 = s2.g).activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, null);
  }));
}
var Da = class {
  constructor(t2, e2) {
    t2 instanceof CanvasRenderingContext2D || t2 instanceof OffscreenCanvasRenderingContext2D ? (this.l = t2, this.j = e2) : this.j = t2;
  }
  Aa(t2, e2) {
    if (t2) {
      var n2 = Pa(this);
      e2 = Fa(e2), n2.save();
      var r2 = n2.canvas, i2 = 0;
      for (const s2 of t2) n2.fillStyle = Ma(e2.fillColor, { index: i2, from: s2 }), n2.strokeStyle = Ma(e2.color, { index: i2, from: s2 }), n2.lineWidth = Ma(e2.lineWidth, { index: i2, from: s2 }), (t2 = new Path2D()).arc(s2.x * r2.width, s2.y * r2.height, Ma(e2.radius, { index: i2, from: s2 }), 0, 2 * Math.PI), n2.fill(t2), n2.stroke(t2), ++i2;
      n2.restore();
    }
  }
  za(t2, e2, n2) {
    if (t2 && e2) {
      var r2 = Pa(this);
      n2 = Fa(n2), r2.save();
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
    const n2 = Pa(this);
    e2 = Fa(e2), n2.save(), n2.beginPath(), n2.lineWidth = Ma(e2.lineWidth, {}), n2.strokeStyle = Ma(e2.color, {}), n2.fillStyle = Ma(e2.fillColor, {}), n2.moveTo(t2.originX, t2.originY), n2.lineTo(t2.originX + t2.width, t2.originY), n2.lineTo(t2.originX + t2.width, t2.originY + t2.height), n2.lineTo(t2.originX, t2.originY + t2.height), n2.lineTo(t2.originX, t2.originY), n2.stroke(), n2.fill(), n2.restore();
  }
  xa(t2, e2, n2 = [0, 0, 0, 255]) {
    this.l ? (function(t3, e3, n3, r2) {
      const i2 = Oa(t3);
      Ca(t3, e3, ((e4) => {
        Na(t3, e4, n3, r2), (e4 = Pa(t3)).drawImage(i2.canvas, 0, 0, e4.canvas.width, e4.canvas.height);
      }));
    })(this, t2, n2, e2) : Na(this, t2.N(), n2, e2);
  }
  ya(t2, e2, n2) {
    this.l ? (function(t3, e3, n3, r2) {
      const i2 = Oa(t3);
      Ca(t3, e3, ((e4) => {
        Ua(t3, e4, n3, r2), (e4 = Pa(t3)).drawImage(i2.canvas, 0, 0, e4.canvas.width, e4.canvas.height);
      }));
    })(this, t2, e2, n2) : Ua(this, t2.N(), e2, n2);
  }
  close() {
    var _a2, _b, _c2;
    (_a2 = this.g) == null ? void 0 : _a2.close(), this.g = void 0, (_b = this.h) == null ? void 0 : _b.close(), this.h = void 0, (_c2 = this.m) == null ? void 0 : _c2.close(), this.m = void 0;
  }
};
function Ba(t2, e2) {
  switch (e2) {
    case 0:
      return t2.g.find(((t3) => t3 instanceof ImageData));
    case 1:
      return t2.g.find(((t3) => "undefined" != typeof ImageBitmap && t3 instanceof ImageBitmap));
    case 2:
      return t2.g.find(((t3) => "undefined" != typeof WebGLTexture && t3 instanceof WebGLTexture));
    default:
      throw Error(`Type is not supported: ${e2}`);
  }
}
function Ga(t2) {
  var e2 = Ba(t2, 0);
  if (!e2) {
    e2 = Va(t2);
    const n2 = Xa(t2), r2 = new Uint8Array(t2.width * t2.height * 4);
    da(n2, e2, ja(t2)), e2.readPixels(0, 0, t2.width, t2.height, e2.RGBA, e2.UNSIGNED_BYTE, r2), pa(n2), e2 = new ImageData(new Uint8ClampedArray(r2.buffer), t2.width, t2.height), t2.g.push(e2);
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
  return n2 || (n2 = fa(Xa(t2), e2), t2.g.push(n2), t2.m = true), e2.bindTexture(e2.TEXTURE_2D, n2), n2;
}
function Wa(t2) {
  t2.h.bindTexture(t2.h.TEXTURE_2D, null);
}
function za(t2) {
  const e2 = Va(t2);
  return la(Xa(t2), e2, true, (() => (function(t3, e3) {
    const n2 = t3.canvas;
    if (n2.width === t3.width && n2.height === t3.height) return e3();
    const r2 = n2.width, i2 = n2.height;
    return n2.width = t3.width, n2.height = t3.height, t3 = e3(), n2.width = r2, n2.height = i2, t3;
  })(t2, (() => {
    if (e2.bindFramebuffer(e2.FRAMEBUFFER, null), e2.clearColor(0, 0, 0, 0), e2.clear(e2.COLOR_BUFFER_BIT), e2.drawArrays(e2.TRIANGLE_FAN, 0, 4), !(t2.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
    return t2.canvas.transferToImageBitmap();
  }))));
}
Da.prototype.close = Da.prototype.close, Da.prototype.drawConfidenceMask = Da.prototype.ya, Da.prototype.drawCategoryMask = Da.prototype.xa, Da.prototype.drawBoundingBox = Da.prototype.wa, Da.prototype.drawConnectors = Da.prototype.za, Da.prototype.drawLandmarks = Da.prototype.Aa, Da.lerp = function(t2, e2, n2, r2, i2) {
  return Ia(r2 * (1 - (t2 - e2) / (n2 - e2)) + i2 * (1 - (n2 - t2) / (n2 - e2)), r2, i2);
}, Da.clamp = Ia;
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
  N() {
    return ja(this);
  }
  clone() {
    const t2 = [];
    for (const e2 of this.g) {
      let n2;
      if (e2 instanceof ImageData) n2 = new ImageData(e2.data, this.width, this.height);
      else if (e2 instanceof WebGLTexture) {
        const t3 = Va(this), e3 = Xa(this);
        t3.activeTexture(t3.TEXTURE1), n2 = fa(e3, t3), t3.bindTexture(t3.TEXTURE_2D, n2), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, this.width, this.height, 0, t3.RGBA, t3.UNSIGNED_BYTE, null), t3.bindTexture(t3.TEXTURE_2D, null), da(e3, t3, n2), la(e3, t3, false, (() => {
          Ha(this), t3.clearColor(0, 0, 0, 0), t3.clear(t3.COLOR_BUFFER_BIT), t3.drawArrays(t3.TRIANGLE_FAN, 0, 4), Wa(this);
        })), pa(e3), Wa(this);
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
Ka.prototype.close = Ka.prototype.close, Ka.prototype.clone = Ka.prototype.clone, Ka.prototype.getAsWebGLTexture = Ka.prototype.N, Ka.prototype.getAsImageBitmap = Ka.prototype.Da, Ka.prototype.getAsImageData = Ka.prototype.Ea, Ka.prototype.hasWebGLTexture = Ka.prototype.R, Ka.prototype.hasImageBitmap = Ka.prototype.ma, Ka.prototype.hasImageData = Ka.prototype.Ga;
var Ya = 250;
function $a(...t2) {
  return t2.map((([t3, e2]) => ({ start: t3, end: e2 })));
}
const qa = /* @__PURE__ */ (function(t2) {
  return class extends t2 {
    Ma() {
      this.i._registerModelResourcesGraphService();
    }
  };
})((Ja = class {
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
    this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), Ko(this, r2 || "input_audio", ((r3) => {
      Ko(this, i2 = i2 || "audio_header", ((i3) => {
        this.i._configureAudio(r3, i3, t2, e2 ?? 0, n2);
      }));
    }));
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
  ea(t2) {
    qo(this, "__graph_config__", ((e2) => {
      t2(e2);
    })), Ko(this, "__graph_config__", ((t3) => {
      this.i._getGraphConfig(t3, void 0);
    })), delete this.i.simpleListeners.__graph_config__;
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
    this.h !== s2 && (this.g && this.i._free(this.g), this.g = this.i._malloc(s2), this.h = s2), this.i.HEAPF32.set(t2, this.g / 4), Ko(this, r2, ((t3) => {
      this.i._addAudioToInputStream(this.g, e2, n2, t3, i2);
    }));
  }
  addGpuBufferToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      const [r2, i2] = Yo(this, t2, e3);
      this.i._addBoundTextureToStream(e3, r2, i2, n2);
    }));
  }
  addBoolToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      this.i._addBoolToInputStream(t2, e3, n2);
    }));
  }
  addDoubleToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      this.i._addDoubleToInputStream(t2, e3, n2);
    }));
  }
  addFloatToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      this.i._addFloatToInputStream(t2, e3, n2);
    }));
  }
  addIntToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      this.i._addIntToInputStream(t2, e3, n2);
    }));
  }
  addUintToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      this.i._addUintToInputStream(t2, e3, n2);
    }));
  }
  addStringToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      Ko(this, t2, ((t3) => {
        this.i._addStringToInputStream(t3, e3, n2);
      }));
    }));
  }
  addStringRecordToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      $o(this, Object.keys(t2), ((r2) => {
        $o(this, Object.values(t2), ((i2) => {
          this.i._addFlatHashMapToInputStream(r2, i2, Object.keys(t2).length, e3, n2);
        }));
      }));
    }));
  }
  addProtoToStream(t2, e2, n2, r2) {
    Ko(this, n2, ((n3) => {
      Ko(this, e2, ((e3) => {
        const i2 = this.i._malloc(t2.length);
        this.i.HEAPU8.set(t2, i2), this.i._addProtoToInputStream(i2, t2.length, e3, n3, r2), this.i._free(i2);
      }));
    }));
  }
  addEmptyPacketToStream(t2, e2) {
    Ko(this, t2, ((t3) => {
      this.i._addEmptyPacketToInputStream(t3, e2);
    }));
  }
  addBoolVectorToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      const r2 = this.i._allocateBoolVector(t2.length);
      if (!r2) throw Error("Unable to allocate new bool vector on heap.");
      for (const e4 of t2) this.i._addBoolVectorEntry(r2, e4);
      this.i._addBoolVectorToInputStream(r2, e3, n2);
    }));
  }
  addDoubleVectorToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      const r2 = this.i._allocateDoubleVector(t2.length);
      if (!r2) throw Error("Unable to allocate new double vector on heap.");
      for (const e4 of t2) this.i._addDoubleVectorEntry(r2, e4);
      this.i._addDoubleVectorToInputStream(r2, e3, n2);
    }));
  }
  addFloatVectorToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      const r2 = this.i._allocateFloatVector(t2.length);
      if (!r2) throw Error("Unable to allocate new float vector on heap.");
      for (const e4 of t2) this.i._addFloatVectorEntry(r2, e4);
      this.i._addFloatVectorToInputStream(r2, e3, n2);
    }));
  }
  addIntVectorToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      const r2 = this.i._allocateIntVector(t2.length);
      if (!r2) throw Error("Unable to allocate new int vector on heap.");
      for (const e4 of t2) this.i._addIntVectorEntry(r2, e4);
      this.i._addIntVectorToInputStream(r2, e3, n2);
    }));
  }
  addUintVectorToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      const r2 = this.i._allocateUintVector(t2.length);
      if (!r2) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const e4 of t2) this.i._addUintVectorEntry(r2, e4);
      this.i._addUintVectorToInputStream(r2, e3, n2);
    }));
  }
  addStringVectorToStream(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      const r2 = this.i._allocateStringVector(t2.length);
      if (!r2) throw Error("Unable to allocate new string vector on heap.");
      for (const e4 of t2) Ko(this, e4, ((t3) => {
        this.i._addStringVectorEntry(r2, t3);
      }));
      this.i._addStringVectorToInputStream(r2, e3, n2);
    }));
  }
  addBoolToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      this.i._addBoolToInputSidePacket(t2, e3);
    }));
  }
  addDoubleToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      this.i._addDoubleToInputSidePacket(t2, e3);
    }));
  }
  addFloatToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      this.i._addFloatToInputSidePacket(t2, e3);
    }));
  }
  addIntToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      this.i._addIntToInputSidePacket(t2, e3);
    }));
  }
  addUintToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      this.i._addUintToInputSidePacket(t2, e3);
    }));
  }
  addStringToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      Ko(this, t2, ((t3) => {
        this.i._addStringToInputSidePacket(t3, e3);
      }));
    }));
  }
  addProtoToInputSidePacket(t2, e2, n2) {
    Ko(this, n2, ((n3) => {
      Ko(this, e2, ((e3) => {
        const r2 = this.i._malloc(t2.length);
        this.i.HEAPU8.set(t2, r2), this.i._addProtoToInputSidePacket(r2, t2.length, e3, n3), this.i._free(r2);
      }));
    }));
  }
  addBoolVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      const n2 = this.i._allocateBoolVector(t2.length);
      if (!n2) throw Error("Unable to allocate new bool vector on heap.");
      for (const e4 of t2) this.i._addBoolVectorEntry(n2, e4);
      this.i._addBoolVectorToInputSidePacket(n2, e3);
    }));
  }
  addDoubleVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      const n2 = this.i._allocateDoubleVector(t2.length);
      if (!n2) throw Error("Unable to allocate new double vector on heap.");
      for (const e4 of t2) this.i._addDoubleVectorEntry(n2, e4);
      this.i._addDoubleVectorToInputSidePacket(n2, e3);
    }));
  }
  addFloatVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      const n2 = this.i._allocateFloatVector(t2.length);
      if (!n2) throw Error("Unable to allocate new float vector on heap.");
      for (const e4 of t2) this.i._addFloatVectorEntry(n2, e4);
      this.i._addFloatVectorToInputSidePacket(n2, e3);
    }));
  }
  addIntVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      const n2 = this.i._allocateIntVector(t2.length);
      if (!n2) throw Error("Unable to allocate new int vector on heap.");
      for (const e4 of t2) this.i._addIntVectorEntry(n2, e4);
      this.i._addIntVectorToInputSidePacket(n2, e3);
    }));
  }
  addUintVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      const n2 = this.i._allocateUintVector(t2.length);
      if (!n2) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const e4 of t2) this.i._addUintVectorEntry(n2, e4);
      this.i._addUintVectorToInputSidePacket(n2, e3);
    }));
  }
  addStringVectorToInputSidePacket(t2, e2) {
    Ko(this, e2, ((e3) => {
      const n2 = this.i._allocateStringVector(t2.length);
      if (!n2) throw Error("Unable to allocate new string vector on heap.");
      for (const e4 of t2) Ko(this, e4, ((t3) => {
        this.i._addStringVectorEntry(n2, t3);
      }));
      this.i._addStringVectorToInputSidePacket(n2, e3);
    }));
  }
  attachBoolListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachBoolListener(t3);
    }));
  }
  attachBoolVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachBoolVectorListener(t3);
    }));
  }
  attachIntListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachIntListener(t3);
    }));
  }
  attachIntVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachIntVectorListener(t3);
    }));
  }
  attachUintListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachUintListener(t3);
    }));
  }
  attachUintVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachUintVectorListener(t3);
    }));
  }
  attachDoubleListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachDoubleListener(t3);
    }));
  }
  attachDoubleVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachDoubleVectorListener(t3);
    }));
  }
  attachFloatListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachFloatListener(t3);
    }));
  }
  attachFloatVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachFloatVectorListener(t3);
    }));
  }
  attachStringListener(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachStringListener(t3);
    }));
  }
  attachStringVectorListener(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachStringVectorListener(t3);
    }));
  }
  attachProtoListener(t2, e2, n2) {
    qo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachProtoListener(t3, n2 || false);
    }));
  }
  attachProtoVectorListener(t2, e2, n2) {
    Jo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.i._attachProtoVectorListener(t3, n2 || false);
    }));
  }
  attachAudioListener(t2, e2, n2) {
    this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), qo(this, t2, ((t3, n3) => {
      t3 = new Float32Array(t3.buffer, t3.byteOffset, t3.length / 4), e2(t3, n3);
    })), Ko(this, t2, ((t3) => {
      this.i._attachAudioListener(t3, n2 || false);
    }));
  }
  finishProcessing() {
    this.i._waitUntilIdle();
  }
  closeGraph() {
    this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
  }
}, class extends Ja {
  get ga() {
    return this.i;
  }
  sa(t2, e2, n2) {
    Ko(this, e2, ((e3) => {
      const [r2, i2] = Yo(this, t2, e3);
      this.ga._addBoundTextureAsImageToStream(e3, r2, i2, n2);
    }));
  }
  V(t2, e2) {
    qo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.ga._attachImageListener(t3);
    }));
  }
  da(t2, e2) {
    Jo(this, t2, e2), Ko(this, t2, ((t3) => {
      this.ga._attachImageVectorListener(t3);
    }));
  }
}));
var Ja, Za = class extends qa {
};
async function Qa(t2, e2, n2) {
  return (async function(t3, e3, n3, r2) {
    return Zo(t3, e3, n3, r2);
  })(t2, n2.canvas ?? (Ho() ? void 0 : document.createElement("canvas")), e2, n2);
}
function tc(t2, e2, n2, r2) {
  if (t2.U) {
    const s2 = new bs();
    if (n2 == null ? void 0 : n2.regionOfInterest) {
      if (!t2.ra) throw Error("This task doesn't support region-of-interest.");
      var i2 = n2.regionOfInterest;
      if (i2.left >= i2.right || i2.top >= i2.bottom) throw Error("Expected RectF with left < right and top < bottom.");
      if (i2.left < 0 || i2.top < 0 || i2.right > 1 || i2.bottom > 1) throw Error("Expected RectF values to be in [0,1].");
      Ln(s2, 1, (i2.left + i2.right) / 2), Ln(s2, 2, (i2.top + i2.bottom) / 2), Ln(s2, 4, i2.right - i2.left), Ln(s2, 3, i2.bottom - i2.top);
    } else Ln(s2, 1, 0.5), Ln(s2, 2, 0.5), Ln(s2, 4, 1), Ln(s2, 3, 1);
    if (n2 == null ? void 0 : n2.rotationDegrees) {
      if ((n2 == null ? void 0 : n2.rotationDegrees) % 90 != 0) throw Error("Expected rotation to be a multiple of 90°.");
      if (Ln(s2, 5, -Math.PI * n2.rotationDegrees / 180), (n2 == null ? void 0 : n2.rotationDegrees) % 180 != 0) {
        const [t3, r3] = zo(e2);
        n2 = An(s2, 3) * r3 / t3, i2 = An(s2, 4) * t3 / r3, Ln(s2, 4, n2), Ln(s2, 3, i2);
      }
    }
    t2.g.addProtoToStream(s2.g(), "mediapipe.NormalizedRect", t2.U, r2);
  }
  t2.g.sa(e2, t2.ba, r2 ?? performance.now()), t2.finishProcessing();
}
function ec(t2, e2, n2) {
  var _a2;
  if ((_a2 = t2.baseOptions) == null ? void 0 : _a2.g()) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
  tc(t2, e2, n2, t2.B + 1);
}
function nc(t2, e2, n2, r2) {
  var _a2;
  if (!((_a2 = t2.baseOptions) == null ? void 0 : _a2.g())) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
  tc(t2, e2, n2, r2);
}
function rc(t2, e2, n2, r2) {
  var i2 = e2.data;
  const s2 = e2.width, o2 = s2 * (e2 = e2.height);
  if ((i2 instanceof Uint8Array || i2 instanceof Float32Array) && i2.length !== o2) throw Error("Unsupported channel count: " + i2.length / o2);
  return t2 = new xa([i2], n2, false, t2.g.i.canvas, t2.P, s2, e2), r2 ? t2.clone() : t2;
}
var ic = class extends sa {
  constructor(t2, e2, n2, r2) {
    super(t2), this.g = t2, this.ba = e2, this.U = n2, this.ra = r2, this.P = new ga();
  }
  l(t2, e2 = true) {
    if ("runningMode" in t2 && Sn(this.baseOptions, 2, !!t2.runningMode && "IMAGE" !== t2.runningMode), void 0 !== t2.canvas && this.g.i.canvas !== t2.canvas) throw Error("You must create a new task to reset the canvas.");
    return super.l(t2, e2);
  }
  close() {
    this.P.close(), super.close();
  }
};
ic.prototype.close = ic.prototype.close;
var sc = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect_in", false), this.j = { detections: [] }, yn(t2 = this.h = new js(), 0, 1, e2 = new Ds()), Ln(this.h, 2, 0.5), Ln(this.h, 3, 0.3);
  }
  get baseOptions() {
    return pn(this.h, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.h, 0, 1, t2);
  }
  o(t2) {
    return "minDetectionConfidence" in t2 && Ln(this.h, 2, t2.minDetectionConfidence ?? 0.5), "minSuppressionThreshold" in t2 && Ln(this.h, 3, t2.minSuppressionThreshold ?? 0.3), this.l(t2);
  }
  D(t2, e2) {
    return this.j = { detections: [] }, ec(this, t2, e2), this.j;
  }
  F(t2, e2, n2) {
    return this.j = { detections: [] }, nc(this, t2, n2, e2), this.j;
  }
  m() {
    var t2 = new os();
    is(t2, "image_in"), is(t2, "norm_rect_in"), ss(t2, "detections");
    const e2 = new Ki();
    er(e2, Xs, this.h);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), Ji(n2, "IMAGE:image_in"), Ji(n2, "NORM_RECT:norm_rect_in"), Zi(n2, "DETECTIONS:detections"), n2.o(e2), rs(t2, n2), this.g.attachProtoVectorListener("detections", ((t3, e3) => {
      for (const e4 of t3) t3 = ms(e4), this.j.detections.push(Oo(t3));
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("detections", ((t3) => {
      ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
sc.prototype.detectForVideo = sc.prototype.F, sc.prototype.detect = sc.prototype.D, sc.prototype.setOptions = sc.prototype.o, sc.createFromModelPath = async function(t2, e2) {
  return Qa(sc, t2, { baseOptions: { modelAssetPath: e2 } });
}, sc.createFromModelBuffer = function(t2, e2) {
  return Qa(sc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, sc.createFromOptions = function(t2, e2) {
  return Qa(sc, t2, e2);
};
var oc = $a([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]), ac = $a([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]), cc = $a([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]), hc = $a([474, 475], [475, 476], [476, 477], [477, 474]), uc = $a([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]), lc = $a([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]), fc = $a([469, 470], [470, 471], [471, 472], [472, 469]), dc = $a([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]), pc = [...oc, ...ac, ...cc, ...uc, ...lc, ...dc], gc = $a([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function mc(t2) {
  t2.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] };
}
var yc = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", false), this.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = false, yn(t2 = this.h = new zs(), 0, 1, e2 = new Ds()), this.v = new Ws(), yn(this.h, 0, 3, this.v), this.s = new js(), yn(this.h, 0, 2, this.s), xn(this.s, 4, 1), Ln(this.s, 2, 0.5), Ln(this.v, 2, 0.5), Ln(this.h, 4, 0.5);
  }
  get baseOptions() {
    return pn(this.h, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.h, 0, 1, t2);
  }
  o(t2) {
    return "numFaces" in t2 && xn(this.s, 4, t2.numFaces ?? 1), "minFaceDetectionConfidence" in t2 && Ln(this.s, 2, t2.minFaceDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Ln(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minFacePresenceConfidence" in t2 && Ln(this.v, 2, t2.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in t2 && (this.outputFaceBlendshapes = !!t2.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in t2 && (this.outputFacialTransformationMatrixes = !!t2.outputFacialTransformationMatrixes), this.l(t2);
  }
  D(t2, e2) {
    return mc(this), ec(this, t2, e2), this.j;
  }
  F(t2, e2, n2) {
    return mc(this), nc(this, t2, n2, e2), this.j;
  }
  m() {
    var t2 = new os();
    is(t2, "image_in"), is(t2, "norm_rect"), ss(t2, "face_landmarks");
    const e2 = new Ki();
    er(e2, $s, this.h);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), Ji(n2, "IMAGE:image_in"), Ji(n2, "NORM_RECT:norm_rect"), Zi(n2, "NORM_LANDMARKS:face_landmarks"), n2.o(e2), rs(t2, n2), this.g.attachProtoVectorListener("face_landmarks", ((t3, e3) => {
      for (const e4 of t3) t3 = Es(e4), this.j.faceLandmarks.push(Co(t3));
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("face_landmarks", ((t3) => {
      ea(this, t3);
    })), this.outputFaceBlendshapes && (ss(t2, "blendshapes"), Zi(n2, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", ((t3, e3) => {
      if (this.outputFaceBlendshapes) for (const e4 of t3) t3 = fs(e4), this.j.faceBlendshapes.push(Po(t3.g() ?? []));
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("blendshapes", ((t3) => {
      ea(this, t3);
    }))), this.outputFacialTransformationMatrixes && (ss(t2, "face_geometry"), Zi(n2, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", ((t3, e3) => {
      if (this.outputFacialTransformationMatrixes) for (const e4 of t3) (t3 = pn(Hs(e4), ws, 2)) && this.j.facialTransformationMatrixes.push({ rows: Tn(bn(t3, 1), 0) ?? 0, columns: Tn(bn(t3, 2), 0) ?? 0, data: en(t3, 3, Ht, tn()).slice() ?? [] });
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("face_geometry", ((t3) => {
      ea(this, t3);
    }))), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
yc.prototype.detectForVideo = yc.prototype.F, yc.prototype.detect = yc.prototype.D, yc.prototype.setOptions = yc.prototype.o, yc.createFromModelPath = function(t2, e2) {
  return Qa(yc, t2, { baseOptions: { modelAssetPath: e2 } });
}, yc.createFromModelBuffer = function(t2, e2) {
  return Qa(yc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, yc.createFromOptions = function(t2, e2) {
  return Qa(yc, t2, e2);
}, yc.FACE_LANDMARKS_LIPS = oc, yc.FACE_LANDMARKS_LEFT_EYE = ac, yc.FACE_LANDMARKS_LEFT_EYEBROW = cc, yc.FACE_LANDMARKS_LEFT_IRIS = hc, yc.FACE_LANDMARKS_RIGHT_EYE = uc, yc.FACE_LANDMARKS_RIGHT_EYEBROW = lc, yc.FACE_LANDMARKS_RIGHT_IRIS = fc, yc.FACE_LANDMARKS_FACE_OVAL = dc, yc.FACE_LANDMARKS_CONTOURS = pc, yc.FACE_LANDMARKS_TESSELATION = gc;
var _c = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", true), yn(t2 = this.j = new qs(), 0, 1, e2 = new Ds());
  }
  get baseOptions() {
    return pn(this.j, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.j, 0, 1, t2);
  }
  o(t2) {
    return super.l(t2);
  }
  Pa(t2, e2, n2) {
    const r2 = "function" != typeof e2 ? e2 : {};
    if (this.h = "function" == typeof e2 ? e2 : n2, ec(this, t2, r2 ?? {}), !this.h) return this.s;
  }
  m() {
    var t2 = new os();
    is(t2, "image_in"), is(t2, "norm_rect"), ss(t2, "stylized_image");
    const e2 = new Ki();
    er(e2, Js, this.j);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"), Ji(n2, "IMAGE:image_in"), Ji(n2, "NORM_RECT:norm_rect"), Zi(n2, "STYLIZED_IMAGE:stylized_image"), n2.o(e2), rs(t2, n2), this.g.V("stylized_image", ((t3, e3) => {
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
      i2 = new Ka([r2], false, false, this.g.i.canvas, this.P, i2, t3), this.s = n3 = n3 ? i2.clone() : i2, this.h && this.h(n3), ea(this, e3);
    })), this.g.attachEmptyPacketListener("stylized_image", ((t3) => {
      this.s = null, this.h && this.h(null), ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
_c.prototype.stylize = _c.prototype.Pa, _c.prototype.setOptions = _c.prototype.o, _c.createFromModelPath = function(t2, e2) {
  return Qa(_c, t2, { baseOptions: { modelAssetPath: e2 } });
}, _c.createFromModelBuffer = function(t2, e2) {
  return Qa(_c, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, _c.createFromOptions = function(t2, e2) {
  return Qa(_c, t2, e2);
};
var vc = $a([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function Ec(t2) {
  t2.gestures = [], t2.landmarks = [], t2.worldLandmarks = [], t2.handedness = [];
}
function wc(t2) {
  return 0 === t2.gestures.length ? { gestures: [], landmarks: [], worldLandmarks: [], handedness: [], handednesses: [] } : { gestures: t2.gestures, landmarks: t2.landmarks, worldLandmarks: t2.worldLandmarks, handedness: t2.handedness, handednesses: t2.handedness };
}
function Tc(t2, e2 = true) {
  const n2 = [];
  for (const i2 of t2) {
    var r2 = fs(i2);
    t2 = [];
    for (const n3 of r2.g()) r2 = e2 && null != bn(n3, 1) ? Tn(bn(n3, 1), 0) : -1, t2.push({ score: An(n3, 2) ?? 0, index: r2, categoryName: kn(n3, 3) ?? "", displayName: kn(n3, 4) ?? "" });
    n2.push(t2);
  }
  return n2;
}
var bc = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", false), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], yn(t2 = this.j = new io(), 0, 1, e2 = new Ds()), this.s = new ro(), yn(this.j, 0, 2, this.s), this.C = new no(), yn(this.s, 0, 3, this.C), this.v = new eo(), yn(this.s, 0, 2, this.v), this.h = new to(), yn(this.j, 0, 3, this.h), Ln(this.v, 2, 0.5), Ln(this.s, 4, 0.5), Ln(this.C, 2, 0.5);
  }
  get baseOptions() {
    return pn(this.j, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.j, 0, 1, t2);
  }
  o(t2) {
    var _a2, _b, _c2, _d;
    if (xn(this.v, 3, t2.numHands ?? 1), "minHandDetectionConfidence" in t2 && Ln(this.v, 2, t2.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Ln(this.s, 4, t2.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in t2 && Ln(this.C, 2, t2.minHandPresenceConfidence ?? 0.5), t2.cannedGesturesClassifierOptions) {
      var e2 = new Zs(), n2 = e2, r2 = Io(t2.cannedGesturesClassifierOptions, (_a2 = pn(this.h, Zs, 3)) == null ? void 0 : _a2.h());
      yn(n2, 0, 2, r2), yn(this.h, 0, 3, e2);
    } else void 0 === t2.cannedGesturesClassifierOptions && ((_b = pn(this.h, Zs, 3)) == null ? void 0 : _b.g());
    return t2.customGesturesClassifierOptions ? (yn(n2 = e2 = new Zs(), 0, 2, r2 = Io(t2.customGesturesClassifierOptions, (_c2 = pn(this.h, Zs, 4)) == null ? void 0 : _c2.h())), yn(this.h, 0, 4, e2)) : void 0 === t2.customGesturesClassifierOptions && ((_d = pn(this.h, Zs, 4)) == null ? void 0 : _d.g()), this.l(t2);
  }
  Ka(t2, e2) {
    return Ec(this), ec(this, t2, e2), wc(this);
  }
  La(t2, e2, n2) {
    return Ec(this), nc(this, t2, n2, e2), wc(this);
  }
  m() {
    var t2 = new os();
    is(t2, "image_in"), is(t2, "norm_rect"), ss(t2, "hand_gestures"), ss(t2, "hand_landmarks"), ss(t2, "world_hand_landmarks"), ss(t2, "handedness");
    const e2 = new Ki();
    er(e2, ho, this.j);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), Ji(n2, "IMAGE:image_in"), Ji(n2, "NORM_RECT:norm_rect"), Zi(n2, "HAND_GESTURES:hand_gestures"), Zi(n2, "LANDMARKS:hand_landmarks"), Zi(n2, "WORLD_LANDMARKS:world_hand_landmarks"), Zi(n2, "HANDEDNESS:handedness"), n2.o(e2), rs(t2, n2), this.g.attachProtoVectorListener("hand_landmarks", ((t3, e3) => {
      for (const e4 of t3) {
        t3 = Es(e4);
        const n3 = [];
        for (const e5 of mn(t3, vs, 1)) n3.push({ x: An(e5, 1) ?? 0, y: An(e5, 2) ?? 0, z: An(e5, 3) ?? 0, visibility: An(e5, 4) ?? 0 });
        this.landmarks.push(n3);
      }
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("hand_landmarks", ((t3) => {
      ea(this, t3);
    })), this.g.attachProtoVectorListener("world_hand_landmarks", ((t3, e3) => {
      for (const e4 of t3) {
        t3 = _s(e4);
        const n3 = [];
        for (const e5 of mn(t3, ys, 1)) n3.push({ x: An(e5, 1) ?? 0, y: An(e5, 2) ?? 0, z: An(e5, 3) ?? 0, visibility: An(e5, 4) ?? 0 });
        this.worldLandmarks.push(n3);
      }
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((t3) => {
      ea(this, t3);
    })), this.g.attachProtoVectorListener("hand_gestures", ((t3, e3) => {
      this.gestures.push(...Tc(t3, false)), ea(this, e3);
    })), this.g.attachEmptyPacketListener("hand_gestures", ((t3) => {
      ea(this, t3);
    })), this.g.attachProtoVectorListener("handedness", ((t3, e3) => {
      this.handedness.push(...Tc(t3)), ea(this, e3);
    })), this.g.attachEmptyPacketListener("handedness", ((t3) => {
      ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
function Ac(t2) {
  return { landmarks: t2.landmarks, worldLandmarks: t2.worldLandmarks, handednesses: t2.handedness, handedness: t2.handedness };
}
bc.prototype.recognizeForVideo = bc.prototype.La, bc.prototype.recognize = bc.prototype.Ka, bc.prototype.setOptions = bc.prototype.o, bc.createFromModelPath = function(t2, e2) {
  return Qa(bc, t2, { baseOptions: { modelAssetPath: e2 } });
}, bc.createFromModelBuffer = function(t2, e2) {
  return Qa(bc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, bc.createFromOptions = function(t2, e2) {
  return Qa(bc, t2, e2);
}, bc.HAND_CONNECTIONS = vc;
var kc = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", false), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], yn(t2 = this.h = new ro(), 0, 1, e2 = new Ds()), this.s = new no(), yn(this.h, 0, 3, this.s), this.j = new eo(), yn(this.h, 0, 2, this.j), xn(this.j, 3, 1), Ln(this.j, 2, 0.5), Ln(this.s, 2, 0.5), Ln(this.h, 4, 0.5);
  }
  get baseOptions() {
    return pn(this.h, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.h, 0, 1, t2);
  }
  o(t2) {
    return "numHands" in t2 && xn(this.j, 3, t2.numHands ?? 1), "minHandDetectionConfidence" in t2 && Ln(this.j, 2, t2.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Ln(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in t2 && Ln(this.s, 2, t2.minHandPresenceConfidence ?? 0.5), this.l(t2);
  }
  D(t2, e2) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], ec(this, t2, e2), Ac(this);
  }
  F(t2, e2, n2) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], nc(this, t2, n2, e2), Ac(this);
  }
  m() {
    var t2 = new os();
    is(t2, "image_in"), is(t2, "norm_rect"), ss(t2, "hand_landmarks"), ss(t2, "world_hand_landmarks"), ss(t2, "handedness");
    const e2 = new Ki();
    er(e2, uo, this.h);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), Ji(n2, "IMAGE:image_in"), Ji(n2, "NORM_RECT:norm_rect"), Zi(n2, "LANDMARKS:hand_landmarks"), Zi(n2, "WORLD_LANDMARKS:world_hand_landmarks"), Zi(n2, "HANDEDNESS:handedness"), n2.o(e2), rs(t2, n2), this.g.attachProtoVectorListener("hand_landmarks", ((t3, e3) => {
      for (const e4 of t3) t3 = Es(e4), this.landmarks.push(Co(t3));
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("hand_landmarks", ((t3) => {
      ea(this, t3);
    })), this.g.attachProtoVectorListener("world_hand_landmarks", ((t3, e3) => {
      for (const e4 of t3) t3 = _s(e4), this.worldLandmarks.push(No(t3));
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("world_hand_landmarks", ((t3) => {
      ea(this, t3);
    })), this.g.attachProtoVectorListener("handedness", ((t3, e3) => {
      var n3 = this.handedness, r2 = n3.push;
      const i2 = [];
      for (const e4 of t3) {
        t3 = fs(e4);
        const n4 = [];
        for (const e5 of t3.g()) n4.push({ score: An(e5, 2) ?? 0, index: Tn(bn(e5, 1), 0) ?? -1, categoryName: kn(e5, 3) ?? "", displayName: kn(e5, 4) ?? "" });
        i2.push(n4);
      }
      r2.call(n3, ...i2), ea(this, e3);
    })), this.g.attachEmptyPacketListener("handedness", ((t3) => {
      ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
kc.prototype.detectForVideo = kc.prototype.F, kc.prototype.detect = kc.prototype.D, kc.prototype.setOptions = kc.prototype.o, kc.createFromModelPath = function(t2, e2) {
  return Qa(kc, t2, { baseOptions: { modelAssetPath: e2 } });
}, kc.createFromModelBuffer = function(t2, e2) {
  return Qa(kc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, kc.createFromOptions = function(t2, e2) {
  return Qa(kc, t2, e2);
}, kc.HAND_CONNECTIONS = vc;
var Sc = $a([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
function xc(t2) {
  t2.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] };
}
function Lc(t2) {
  try {
    if (!t2.C) return t2.h;
    t2.C(t2.h);
  } finally {
    ia(t2);
  }
}
function Rc(t2, e2) {
  t2 = Es(t2), e2.push(Co(t2));
}
var Fc = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "input_frames_image", null, false), this.h = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = false, yn(t2 = this.j = new go(), 0, 1, e2 = new Ds()), this.K = new no(), yn(this.j, 0, 2, this.K), this.aa = new lo(), yn(this.j, 0, 3, this.aa), this.s = new js(), yn(this.j, 0, 4, this.s), this.I = new Ws(), yn(this.j, 0, 5, this.I), this.v = new fo(), yn(this.j, 0, 6, this.v), this.L = new po(), yn(this.j, 0, 7, this.L), Ln(this.s, 2, 0.5), Ln(this.s, 3, 0.3), Ln(this.I, 2, 0.5), Ln(this.v, 2, 0.5), Ln(this.v, 3, 0.3), Ln(this.L, 2, 0.5), Ln(this.K, 2, 0.5);
  }
  get baseOptions() {
    return pn(this.j, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.j, 0, 1, t2);
  }
  o(t2) {
    return "minFaceDetectionConfidence" in t2 && Ln(this.s, 2, t2.minFaceDetectionConfidence ?? 0.5), "minFaceSuppressionThreshold" in t2 && Ln(this.s, 3, t2.minFaceSuppressionThreshold ?? 0.3), "minFacePresenceConfidence" in t2 && Ln(this.I, 2, t2.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in t2 && (this.outputFaceBlendshapes = !!t2.outputFaceBlendshapes), "minPoseDetectionConfidence" in t2 && Ln(this.v, 2, t2.minPoseDetectionConfidence ?? 0.5), "minPoseSuppressionThreshold" in t2 && Ln(this.v, 3, t2.minPoseSuppressionThreshold ?? 0.3), "minPosePresenceConfidence" in t2 && Ln(this.L, 2, t2.minPosePresenceConfidence ?? 0.5), "outputPoseSegmentationMasks" in t2 && (this.outputPoseSegmentationMasks = !!t2.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in t2 && Ln(this.K, 2, t2.minHandLandmarksConfidence ?? 0.5), this.l(t2);
  }
  D(t2, e2, n2) {
    const r2 = "function" != typeof e2 ? e2 : {};
    return this.C = "function" == typeof e2 ? e2 : n2, xc(this), ec(this, t2, r2), Lc(this);
  }
  F(t2, e2, n2, r2) {
    const i2 = "function" != typeof n2 ? n2 : {};
    return this.C = "function" == typeof n2 ? n2 : r2, xc(this), nc(this, t2, i2, e2), Lc(this);
  }
  m() {
    var t2 = new os();
    is(t2, "input_frames_image"), ss(t2, "pose_landmarks"), ss(t2, "pose_world_landmarks"), ss(t2, "face_landmarks"), ss(t2, "left_hand_landmarks"), ss(t2, "left_hand_world_landmarks"), ss(t2, "right_hand_landmarks"), ss(t2, "right_hand_world_landmarks");
    const e2 = new Ki(), n2 = new Oi();
    an(n2, 1, ne("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""), (function(t3, e3) {
      if (null != e3) if (Array.isArray(e3)) $e(t3, 2, De(e3, Ge, void 0, void 0, false));
      else {
        if (!("string" == typeof e3 || e3 instanceof U || M(e3))) throw Error("invalid value in Any.value field: " + e3 + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
        an(t3, 2, ut(e3, false, false), C());
      }
    })(n2, this.j.g());
    const r2 = new Qi();
    qi(r2, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), wn(r2, 8, Oi, n2), Ji(r2, "IMAGE:input_frames_image"), Zi(r2, "POSE_LANDMARKS:pose_landmarks"), Zi(r2, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), Zi(r2, "FACE_LANDMARKS:face_landmarks"), Zi(r2, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), Zi(r2, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), Zi(r2, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), Zi(r2, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), r2.o(e2), rs(t2, r2), na(this, t2), this.g.attachProtoListener("pose_landmarks", ((t3, e3) => {
      Rc(t3, this.h.poseLandmarks), ea(this, e3);
    })), this.g.attachEmptyPacketListener("pose_landmarks", ((t3) => {
      ea(this, t3);
    })), this.g.attachProtoListener("pose_world_landmarks", ((t3, e3) => {
      var n3 = this.h.poseWorldLandmarks;
      t3 = _s(t3), n3.push(No(t3)), ea(this, e3);
    })), this.g.attachEmptyPacketListener("pose_world_landmarks", ((t3) => {
      ea(this, t3);
    })), this.outputPoseSegmentationMasks && (Zi(r2, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), ra(this, "pose_segmentation_mask"), this.g.V("pose_segmentation_mask", ((t3, e3) => {
      this.h.poseSegmentationMasks = [rc(this, t3, true, !this.C)], ea(this, e3);
    })), this.g.attachEmptyPacketListener("pose_segmentation_mask", ((t3) => {
      this.h.poseSegmentationMasks = [], ea(this, t3);
    }))), this.g.attachProtoListener("face_landmarks", ((t3, e3) => {
      Rc(t3, this.h.faceLandmarks), ea(this, e3);
    })), this.g.attachEmptyPacketListener("face_landmarks", ((t3) => {
      ea(this, t3);
    })), this.outputFaceBlendshapes && (ss(t2, "extra_blendshapes"), Zi(r2, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", ((t3, e3) => {
      var n3 = this.h.faceBlendshapes;
      this.outputFaceBlendshapes && (t3 = fs(t3), n3.push(Po(t3.g() ?? []))), ea(this, e3);
    })), this.g.attachEmptyPacketListener("extra_blendshapes", ((t3) => {
      ea(this, t3);
    }))), this.g.attachProtoListener("left_hand_landmarks", ((t3, e3) => {
      Rc(t3, this.h.leftHandLandmarks), ea(this, e3);
    })), this.g.attachEmptyPacketListener("left_hand_landmarks", ((t3) => {
      ea(this, t3);
    })), this.g.attachProtoListener("left_hand_world_landmarks", ((t3, e3) => {
      var n3 = this.h.leftHandWorldLandmarks;
      t3 = _s(t3), n3.push(No(t3)), ea(this, e3);
    })), this.g.attachEmptyPacketListener("left_hand_world_landmarks", ((t3) => {
      ea(this, t3);
    })), this.g.attachProtoListener("right_hand_landmarks", ((t3, e3) => {
      Rc(t3, this.h.rightHandLandmarks), ea(this, e3);
    })), this.g.attachEmptyPacketListener("right_hand_landmarks", ((t3) => {
      ea(this, t3);
    })), this.g.attachProtoListener("right_hand_world_landmarks", ((t3, e3) => {
      var n3 = this.h.rightHandWorldLandmarks;
      t3 = _s(t3), n3.push(No(t3)), ea(this, e3);
    })), this.g.attachEmptyPacketListener("right_hand_world_landmarks", ((t3) => {
      ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Fc.prototype.detectForVideo = Fc.prototype.F, Fc.prototype.detect = Fc.prototype.D, Fc.prototype.setOptions = Fc.prototype.o, Fc.createFromModelPath = function(t2, e2) {
  return Qa(Fc, t2, { baseOptions: { modelAssetPath: e2 } });
}, Fc.createFromModelBuffer = function(t2, e2) {
  return Qa(Fc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Fc.createFromOptions = function(t2, e2) {
  return Qa(Fc, t2, e2);
}, Fc.HAND_CONNECTIONS = vc, Fc.POSE_CONNECTIONS = Sc, Fc.FACE_LANDMARKS_LIPS = oc, Fc.FACE_LANDMARKS_LEFT_EYE = ac, Fc.FACE_LANDMARKS_LEFT_EYEBROW = cc, Fc.FACE_LANDMARKS_LEFT_IRIS = hc, Fc.FACE_LANDMARKS_RIGHT_EYE = uc, Fc.FACE_LANDMARKS_RIGHT_EYEBROW = lc, Fc.FACE_LANDMARKS_RIGHT_IRIS = fc, Fc.FACE_LANDMARKS_FACE_OVAL = dc, Fc.FACE_LANDMARKS_CONTOURS = pc, Fc.FACE_LANDMARKS_TESSELATION = gc;
var Mc = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "input_image", "norm_rect", true), this.j = { classifications: [] }, yn(t2 = this.h = new _o(), 0, 1, e2 = new Ds());
  }
  get baseOptions() {
    return pn(this.h, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.h, 0, 1, t2);
  }
  o(t2) {
    return yn(this.h, 0, 2, Io(t2, pn(this.h, Ms, 2))), this.l(t2);
  }
  ua(t2, e2) {
    return this.j = { classifications: [] }, ec(this, t2, e2), this.j;
  }
  va(t2, e2, n2) {
    return this.j = { classifications: [] }, nc(this, t2, n2, e2), this.j;
  }
  m() {
    var t2 = new os();
    is(t2, "input_image"), is(t2, "norm_rect"), ss(t2, "classifications");
    const e2 = new Ki();
    er(e2, vo, this.h);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), Ji(n2, "IMAGE:input_image"), Ji(n2, "NORM_RECT:norm_rect"), Zi(n2, "CLASSIFICATIONS:classifications"), n2.o(e2), rs(t2, n2), this.g.attachProtoListener("classifications", ((t3, e3) => {
      this.j = (function(t4) {
        const e4 = { classifications: mn(t4, As, 1).map(((t5) => {
          var _a2;
          return Po(((_a2 = pn(t5, us, 4)) == null ? void 0 : _a2.g()) ?? [], Tn(bn(t5, 2), 0), kn(t5, 3));
        })) };
        return null != Qt(ze(t4, 2)) && (e4.timestampMs = Tn(Qt(ze(t4, 2)), 0)), e4;
      })(ks(t3)), ea(this, e3);
    })), this.g.attachEmptyPacketListener("classifications", ((t3) => {
      ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Mc.prototype.classifyForVideo = Mc.prototype.va, Mc.prototype.classify = Mc.prototype.ua, Mc.prototype.setOptions = Mc.prototype.o, Mc.createFromModelPath = function(t2, e2) {
  return Qa(Mc, t2, { baseOptions: { modelAssetPath: e2 } });
}, Mc.createFromModelBuffer = function(t2, e2) {
  return Qa(Mc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Mc.createFromOptions = function(t2, e2) {
  return Qa(Mc, t2, e2);
};
var Ic = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", true), this.h = new Eo(), this.embeddings = { embeddings: [] }, yn(t2 = this.h, 0, 1, e2 = new Ds());
  }
  get baseOptions() {
    return pn(this.h, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.h, 0, 1, t2);
  }
  o(t2) {
    var e2 = this.h, n2 = pn(this.h, Ps, 2);
    return n2 = n2 ? n2.clone() : new Ps(), void 0 !== t2.l2Normalize ? Sn(n2, 1, t2.l2Normalize) : "l2Normalize" in t2 && $e(n2, 1), void 0 !== t2.quantize ? Sn(n2, 2, t2.quantize) : "quantize" in t2 && $e(n2, 2), yn(e2, 0, 2, n2), this.l(t2);
  }
  Ba(t2, e2) {
    return ec(this, t2, e2), this.embeddings;
  }
  Ca(t2, e2, n2) {
    return nc(this, t2, n2, e2), this.embeddings;
  }
  m() {
    var t2 = new os();
    is(t2, "image_in"), is(t2, "norm_rect"), ss(t2, "embeddings_out");
    const e2 = new Ki();
    er(e2, wo, this.h);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), Ji(n2, "IMAGE:image_in"), Ji(n2, "NORM_RECT:norm_rect"), Zi(n2, "EMBEDDINGS:embeddings_out"), n2.o(e2), rs(t2, n2), this.g.attachProtoListener("embeddings_out", ((t3, e3) => {
      t3 = Fs(t3), this.embeddings = (function(t4) {
        return { embeddings: mn(t4, Ls, 1).map(((t5) => {
          var _a2, _b;
          const e4 = { headIndex: Tn(bn(t5, 3), 0) ?? -1, headName: kn(t5, 4) ?? "" };
          if (void 0 !== dn(t5, Ss, cn(t5, 1))) t5 = en(t5 = pn(t5, Ss, cn(t5, 1)), 1, Ht, tn()), e4.floatEmbedding = t5.slice();
          else {
            const n3 = new Uint8Array(0);
            e4.quantizedEmbedding = ((_b = (_a2 = pn(t5, xs, cn(t5, 2))) == null ? void 0 : _a2.qa()) == null ? void 0 : _b.h()) ?? n3;
          }
          return e4;
        })), timestampMs: Tn(Qt(ze(t4, 2)), 0) };
      })(t3), ea(this, e3);
    })), this.g.attachEmptyPacketListener("embeddings_out", ((t3) => {
      ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Ic.cosineSimilarity = function(t2, e2) {
  if (t2.floatEmbedding && e2.floatEmbedding) t2 = Do(t2.floatEmbedding, e2.floatEmbedding);
  else {
    if (!t2.quantizedEmbedding || !e2.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
    t2 = Do(Uo(t2.quantizedEmbedding), Uo(e2.quantizedEmbedding));
  }
  return t2;
}, Ic.prototype.embedForVideo = Ic.prototype.Ca, Ic.prototype.embed = Ic.prototype.Ba, Ic.prototype.setOptions = Ic.prototype.o, Ic.createFromModelPath = function(t2, e2) {
  return Qa(Ic, t2, { baseOptions: { modelAssetPath: e2 } });
}, Ic.createFromModelBuffer = function(t2, e2) {
  return Qa(Ic, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Ic.createFromOptions = function(t2, e2) {
  return Qa(Ic, t2, e2);
};
var Pc = class {
  constructor(t2, e2, n2) {
    this.confidenceMasks = t2, this.categoryMask = e2, this.qualityScores = n2;
  }
  close() {
    var _a2, _b;
    (_a2 = this.confidenceMasks) == null ? void 0 : _a2.forEach(((t2) => {
      t2.close();
    })), (_b = this.categoryMask) == null ? void 0 : _b.close();
  }
};
function Oc(t2) {
  t2.categoryMask = void 0, t2.confidenceMasks = void 0, t2.qualityScores = void 0;
}
function Cc(t2) {
  try {
    const e2 = new Pc(t2.confidenceMasks, t2.categoryMask, t2.qualityScores);
    if (!t2.j) return e2;
    t2.j(e2);
  } finally {
    ia(t2);
  }
}
Pc.prototype.close = Pc.prototype.close;
var Nc = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", false), this.s = [], this.outputCategoryMask = false, this.outputConfidenceMasks = true, this.h = new So(), this.v = new To(), yn(this.h, 0, 3, this.v), yn(t2 = this.h, 0, 1, e2 = new Ds());
  }
  get baseOptions() {
    return pn(this.h, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.h, 0, 1, t2);
  }
  o(t2) {
    return void 0 !== t2.displayNamesLocale ? $e(this.h, 2, ne(t2.displayNamesLocale)) : "displayNamesLocale" in t2 && $e(this.h, 2), "outputCategoryMask" in t2 && (this.outputCategoryMask = t2.outputCategoryMask ?? false), "outputConfidenceMasks" in t2 && (this.outputConfidenceMasks = t2.outputConfidenceMasks ?? true), super.l(t2);
  }
  J() {
    !(function(t2) {
      var _a2, _b;
      const e2 = mn(t2.ea(), Qi, 1).filter(((t3) => kn(t3, 1).includes("mediapipe.tasks.TensorsToSegmentationCalculator")));
      if (t2.s = [], e2.length > 1) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
      1 === e2.length && (((_b = (_a2 = pn(e2[0], Ki, 7)) == null ? void 0 : _a2.l()) == null ? void 0 : _b.g()) ?? /* @__PURE__ */ new Map()).forEach(((e3, n2) => {
        t2.s[Number(n2)] = kn(e3, 1);
      }));
    })(this);
  }
  fa(t2, e2, n2) {
    const r2 = "function" != typeof e2 ? e2 : {};
    return this.j = "function" == typeof e2 ? e2 : n2, Oc(this), ec(this, t2, r2), Cc(this);
  }
  Na(t2, e2, n2, r2) {
    const i2 = "function" != typeof n2 ? n2 : {};
    return this.j = "function" == typeof n2 ? n2 : r2, Oc(this), nc(this, t2, i2, e2), Cc(this);
  }
  Fa() {
    return this.s;
  }
  m() {
    var t2 = new os();
    is(t2, "image_in"), is(t2, "norm_rect");
    const e2 = new Ki();
    er(e2, xo, this.h);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), Ji(n2, "IMAGE:image_in"), Ji(n2, "NORM_RECT:norm_rect"), n2.o(e2), rs(t2, n2), na(this, t2), this.outputConfidenceMasks && (ss(t2, "confidence_masks"), Zi(n2, "CONFIDENCE_MASKS:confidence_masks"), ra(this, "confidence_masks"), this.g.da("confidence_masks", ((t3, e3) => {
      this.confidenceMasks = t3.map(((t4) => rc(this, t4, true, !this.j))), ea(this, e3);
    })), this.g.attachEmptyPacketListener("confidence_masks", ((t3) => {
      this.confidenceMasks = [], ea(this, t3);
    }))), this.outputCategoryMask && (ss(t2, "category_mask"), Zi(n2, "CATEGORY_MASK:category_mask"), ra(this, "category_mask"), this.g.V("category_mask", ((t3, e3) => {
      this.categoryMask = rc(this, t3, false, !this.j), ea(this, e3);
    })), this.g.attachEmptyPacketListener("category_mask", ((t3) => {
      this.categoryMask = void 0, ea(this, t3);
    }))), ss(t2, "quality_scores"), Zi(n2, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((t3, e3) => {
      this.qualityScores = t3, ea(this, e3);
    })), this.g.attachEmptyPacketListener("quality_scores", ((t3) => {
      this.categoryMask = void 0, ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
Nc.prototype.getLabels = Nc.prototype.Fa, Nc.prototype.segmentForVideo = Nc.prototype.Na, Nc.prototype.segment = Nc.prototype.fa, Nc.prototype.setOptions = Nc.prototype.o, Nc.createFromModelPath = function(t2, e2) {
  return Qa(Nc, t2, { baseOptions: { modelAssetPath: e2 } });
}, Nc.createFromModelBuffer = function(t2, e2) {
  return Qa(Nc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, Nc.createFromOptions = function(t2, e2) {
  return Qa(Nc, t2, e2);
};
var Uc = class {
  constructor(t2, e2, n2) {
    this.confidenceMasks = t2, this.categoryMask = e2, this.qualityScores = n2;
  }
  close() {
    var _a2, _b;
    (_a2 = this.confidenceMasks) == null ? void 0 : _a2.forEach(((t2) => {
      t2.close();
    })), (_b = this.categoryMask) == null ? void 0 : _b.close();
  }
};
Uc.prototype.close = Uc.prototype.close;
var Dc = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Bc = [0, yi, -2], Gc = [0, ui, -3, Ei, ui, -1], jc = [0, Gc], Vc = [0, Gc, yi, -1], Xc = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Hc = [0, ui, -1, Ei], Wc = class extends nr {
  constructor() {
    super();
  }
}, zc = class extends nr {
  constructor(t2) {
    super(t2);
  }
}, Kc = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15], Yc = class extends nr {
  constructor() {
    super();
  }
};
Yc.prototype.g = Pi([0, ki, [0, Kc, Si, Gc, Si, [0, Gc, Bc], Si, jc, Si, [0, jc, Bc], Si, Hc, Si, [0, ui, -3, Ei, Ri], Si, [0, ui, -3, Ei], Si, [0, Ai, ui, -2, Ei, yi, Ei, -1, 2, ui, Bc], Si, Vc, Si, [0, Vc, Bc], ui, Bc, Ai, Si, [0, ui, -3, Ei, Bc, -1], Si, [0, ki, Hc]], Ai, [0, Ai, yi, -1, Ei]]);
var $c = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect_in", false), this.outputCategoryMask = false, this.outputConfidenceMasks = true, this.h = new So(), this.s = new To(), yn(this.h, 0, 3, this.s), yn(t2 = this.h, 0, 1, e2 = new Ds());
  }
  get baseOptions() {
    return pn(this.h, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.h, 0, 1, t2);
  }
  o(t2) {
    return "outputCategoryMask" in t2 && (this.outputCategoryMask = t2.outputCategoryMask ?? false), "outputConfidenceMasks" in t2 && (this.outputConfidenceMasks = t2.outputConfidenceMasks ?? true), super.l(t2);
  }
  fa(t2, e2, n2, r2) {
    const i2 = "function" != typeof n2 ? n2 : {};
    this.j = "function" == typeof n2 ? n2 : r2, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, n2 = this.B + 1, r2 = new Yc();
    const s2 = new zc();
    var o2 = new Dc();
    if (xn(o2, 1, 255), yn(s2, 0, 12, o2), e2.keypoint && e2.scribble) throw Error("Cannot provide both keypoint and scribble.");
    if (e2.keypoint) {
      var a2 = new Xc();
      Sn(a2, 3, true), Ln(a2, 1, e2.keypoint.x), Ln(a2, 2, e2.keypoint.y), _n(s2, 5, Kc, a2);
    } else {
      if (!e2.scribble) throw Error("Must provide either a keypoint or a scribble.");
      for (a2 of (o2 = new Wc(), e2.scribble)) Sn(e2 = new Xc(), 3, true), Ln(e2, 1, a2.x), Ln(e2, 2, a2.y), wn(o2, 1, Xc, e2);
      _n(s2, 15, Kc, o2);
    }
    wn(r2, 1, zc, s2), this.g.addProtoToStream(r2.g(), "drishti.RenderData", "roi_in", n2), ec(this, t2, i2);
    t: {
      try {
        const t3 = new Uc(this.confidenceMasks, this.categoryMask, this.qualityScores);
        if (!this.j) {
          var c2 = t3;
          break t;
        }
        this.j(t3);
      } finally {
        ia(this);
      }
      c2 = void 0;
    }
    return c2;
  }
  m() {
    var t2 = new os();
    is(t2, "image_in"), is(t2, "roi_in"), is(t2, "norm_rect_in");
    const e2 = new Ki();
    er(e2, xo, this.h);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"), Ji(n2, "IMAGE:image_in"), Ji(n2, "ROI:roi_in"), Ji(n2, "NORM_RECT:norm_rect_in"), n2.o(e2), rs(t2, n2), na(this, t2), this.outputConfidenceMasks && (ss(t2, "confidence_masks"), Zi(n2, "CONFIDENCE_MASKS:confidence_masks"), ra(this, "confidence_masks"), this.g.da("confidence_masks", ((t3, e3) => {
      this.confidenceMasks = t3.map(((t4) => rc(this, t4, true, !this.j))), ea(this, e3);
    })), this.g.attachEmptyPacketListener("confidence_masks", ((t3) => {
      this.confidenceMasks = [], ea(this, t3);
    }))), this.outputCategoryMask && (ss(t2, "category_mask"), Zi(n2, "CATEGORY_MASK:category_mask"), ra(this, "category_mask"), this.g.V("category_mask", ((t3, e3) => {
      this.categoryMask = rc(this, t3, false, !this.j), ea(this, e3);
    })), this.g.attachEmptyPacketListener("category_mask", ((t3) => {
      this.categoryMask = void 0, ea(this, t3);
    }))), ss(t2, "quality_scores"), Zi(n2, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", ((t3, e3) => {
      this.qualityScores = t3, ea(this, e3);
    })), this.g.attachEmptyPacketListener("quality_scores", ((t3) => {
      this.categoryMask = void 0, ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
$c.prototype.segment = $c.prototype.fa, $c.prototype.setOptions = $c.prototype.o, $c.createFromModelPath = function(t2, e2) {
  return Qa($c, t2, { baseOptions: { modelAssetPath: e2 } });
}, $c.createFromModelBuffer = function(t2, e2) {
  return Qa($c, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, $c.createFromOptions = function(t2, e2) {
  return Qa($c, t2, e2);
};
var qc = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "input_frame_gpu", "norm_rect", false), this.j = { detections: [] }, yn(t2 = this.h = new Lo(), 0, 1, e2 = new Ds());
  }
  get baseOptions() {
    return pn(this.h, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.h, 0, 1, t2);
  }
  o(t2) {
    return void 0 !== t2.displayNamesLocale ? $e(this.h, 2, ne(t2.displayNamesLocale)) : "displayNamesLocale" in t2 && $e(this.h, 2), void 0 !== t2.maxResults ? xn(this.h, 3, t2.maxResults) : "maxResults" in t2 && $e(this.h, 3), void 0 !== t2.scoreThreshold ? Ln(this.h, 4, t2.scoreThreshold) : "scoreThreshold" in t2 && $e(this.h, 4), void 0 !== t2.categoryAllowlist ? Rn(this.h, 5, t2.categoryAllowlist) : "categoryAllowlist" in t2 && $e(this.h, 5), void 0 !== t2.categoryDenylist ? Rn(this.h, 6, t2.categoryDenylist) : "categoryDenylist" in t2 && $e(this.h, 6), this.l(t2);
  }
  D(t2, e2) {
    return this.j = { detections: [] }, ec(this, t2, e2), this.j;
  }
  F(t2, e2, n2) {
    return this.j = { detections: [] }, nc(this, t2, n2, e2), this.j;
  }
  m() {
    var t2 = new os();
    is(t2, "input_frame_gpu"), is(t2, "norm_rect"), ss(t2, "detections");
    const e2 = new Ki();
    er(e2, Ro, this.h);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.ObjectDetectorGraph"), Ji(n2, "IMAGE:input_frame_gpu"), Ji(n2, "NORM_RECT:norm_rect"), Zi(n2, "DETECTIONS:detections"), n2.o(e2), rs(t2, n2), this.g.attachProtoVectorListener("detections", ((t3, e3) => {
      for (const e4 of t3) t3 = ms(e4), this.j.detections.push(Oo(t3));
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("detections", ((t3) => {
      ea(this, t3);
    })), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
qc.prototype.detectForVideo = qc.prototype.F, qc.prototype.detect = qc.prototype.D, qc.prototype.setOptions = qc.prototype.o, qc.createFromModelPath = async function(t2, e2) {
  return Qa(qc, t2, { baseOptions: { modelAssetPath: e2 } });
}, qc.createFromModelBuffer = function(t2, e2) {
  return Qa(qc, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, qc.createFromOptions = function(t2, e2) {
  return Qa(qc, t2, e2);
};
var Jc = class {
  constructor(t2, e2, n2) {
    this.landmarks = t2, this.worldLandmarks = e2, this.segmentationMasks = n2;
  }
  close() {
    var _a2;
    (_a2 = this.segmentationMasks) == null ? void 0 : _a2.forEach(((t2) => {
      t2.close();
    }));
  }
};
function Zc(t2) {
  t2.landmarks = [], t2.worldLandmarks = [], t2.segmentationMasks = void 0;
}
function Qc(t2) {
  try {
    const e2 = new Jc(t2.landmarks, t2.worldLandmarks, t2.segmentationMasks);
    if (!t2.s) return e2;
    t2.s(e2);
  } finally {
    ia(t2);
  }
}
Jc.prototype.close = Jc.prototype.close;
var th = class extends ic {
  constructor(t2, e2) {
    super(new Za(t2, e2), "image_in", "norm_rect", false), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = false, yn(t2 = this.h = new Fo(), 0, 1, e2 = new Ds()), this.v = new po(), yn(this.h, 0, 3, this.v), this.j = new fo(), yn(this.h, 0, 2, this.j), xn(this.j, 4, 1), Ln(this.j, 2, 0.5), Ln(this.v, 2, 0.5), Ln(this.h, 4, 0.5);
  }
  get baseOptions() {
    return pn(this.h, Ds, 1);
  }
  set baseOptions(t2) {
    yn(this.h, 0, 1, t2);
  }
  o(t2) {
    return "numPoses" in t2 && xn(this.j, 4, t2.numPoses ?? 1), "minPoseDetectionConfidence" in t2 && Ln(this.j, 2, t2.minPoseDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Ln(this.h, 4, t2.minTrackingConfidence ?? 0.5), "minPosePresenceConfidence" in t2 && Ln(this.v, 2, t2.minPosePresenceConfidence ?? 0.5), "outputSegmentationMasks" in t2 && (this.outputSegmentationMasks = t2.outputSegmentationMasks ?? false), this.l(t2);
  }
  D(t2, e2, n2) {
    const r2 = "function" != typeof e2 ? e2 : {};
    return this.s = "function" == typeof e2 ? e2 : n2, Zc(this), ec(this, t2, r2), Qc(this);
  }
  F(t2, e2, n2, r2) {
    const i2 = "function" != typeof n2 ? n2 : {};
    return this.s = "function" == typeof n2 ? n2 : r2, Zc(this), nc(this, t2, i2, e2), Qc(this);
  }
  m() {
    var t2 = new os();
    is(t2, "image_in"), is(t2, "norm_rect"), ss(t2, "normalized_landmarks"), ss(t2, "world_landmarks"), ss(t2, "segmentation_masks");
    const e2 = new Ki();
    er(e2, Mo, this.h);
    const n2 = new Qi();
    qi(n2, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), Ji(n2, "IMAGE:image_in"), Ji(n2, "NORM_RECT:norm_rect"), Zi(n2, "NORM_LANDMARKS:normalized_landmarks"), Zi(n2, "WORLD_LANDMARKS:world_landmarks"), n2.o(e2), rs(t2, n2), na(this, t2), this.g.attachProtoVectorListener("normalized_landmarks", ((t3, e3) => {
      this.landmarks = [];
      for (const e4 of t3) t3 = Es(e4), this.landmarks.push(Co(t3));
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("normalized_landmarks", ((t3) => {
      this.landmarks = [], ea(this, t3);
    })), this.g.attachProtoVectorListener("world_landmarks", ((t3, e3) => {
      this.worldLandmarks = [];
      for (const e4 of t3) t3 = _s(e4), this.worldLandmarks.push(No(t3));
      ea(this, e3);
    })), this.g.attachEmptyPacketListener("world_landmarks", ((t3) => {
      this.worldLandmarks = [], ea(this, t3);
    })), this.outputSegmentationMasks && (Zi(n2, "SEGMENTATION_MASK:segmentation_masks"), ra(this, "segmentation_masks"), this.g.da("segmentation_masks", ((t3, e3) => {
      this.segmentationMasks = t3.map(((t4) => rc(this, t4, true, !this.s))), ea(this, e3);
    })), this.g.attachEmptyPacketListener("segmentation_masks", ((t3) => {
      this.segmentationMasks = [], ea(this, t3);
    }))), t2 = t2.g(), this.setGraph(new Uint8Array(t2), true);
  }
};
th.prototype.detectForVideo = th.prototype.F, th.prototype.detect = th.prototype.D, th.prototype.setOptions = th.prototype.o, th.createFromModelPath = function(t2, e2) {
  return Qa(th, t2, { baseOptions: { modelAssetPath: e2 } });
}, th.createFromModelBuffer = function(t2, e2) {
  return Qa(th, t2, { baseOptions: { modelAssetBuffer: e2 } });
}, th.createFromOptions = function(t2, e2) {
  return Qa(th, t2, e2);
}, th.POSE_CONNECTIONS = Sc;
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
  let faceLandmarker = await yc.createFromOptions(vision, {
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
        yc.FACE_LANDMARKS_TESSELATION,
        { color: "#C0C0C070", lineWidth: 1 }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yc.FACE_LANDMARKS_RIGHT_EYE,
        { color: "#FF3030" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yc.FACE_LANDMARKS_RIGHT_EYEBROW,
        { color: "#FF3030" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yc.FACE_LANDMARKS_LEFT_EYE,
        { color: "#30FF30" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yc.FACE_LANDMARKS_LEFT_EYEBROW,
        { color: "#30FF30" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yc.FACE_LANDMARKS_FACE_OVAL,
        { color: "#E0E0E0" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yc.FACE_LANDMARKS_LIPS,
        { color: "#E0E0E0" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yc.FACE_LANDMARKS_RIGHT_IRIS,
        { color: "#FF3030" }
      );
      drawingUtils.drawConnectors(
        landmarks,
        yc.FACE_LANDMARKS_LEFT_IRIS,
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
  let faceDetector = await sc.createFromOptions(vision, {
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
  console.log('numHands', parseInt(handState.numHands))
  const vision = await Xo.forVisionTasks(WASM_PATH2);
  let handLandmarker = await kc.createFromOptions(vision, {
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
        kc.HAND_CONNECTIONS,
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
  let handGestures = await bc.createFromOptions(vision, {
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
        bc.HAND_CONNECTIONS,
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
  let poseLandmarker = await th.createFromOptions(vision, {
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
        radius: (data) => Da.lerp(data.from.z, -0.15, 0.1, 5, 1)
      });
      drawingUtils.drawConnectors(
        landmark,
        th.POSE_CONNECTIONS
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
  let objectDetector = await qc.createFromOptions(vision, {
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
  let imageClassifier = await Mc.createFromOptions(vision, {
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
  let imageSegmenter = await Nc.createFromOptions(vision, {
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
  drawingUtils: new Da(canvasCtx),
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
  await new Promise(r => setTimeout(r, 1000));
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
