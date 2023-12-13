(function (e, t) {
    if (typeof exports === 'object' && typeof module === 'object') module.exports = t();
    else if (typeof define === 'function' && define.amd) define([], t);
    else if (typeof exports === 'object') exports.AOS = t();
    else e.AOS = t();
  })(this, function () {
    function e(o) {
      if (n[o]) return n[o].exports;
      var i = (n[o] = { exports: {}, id: o, loaded: !1 });
      return (
        e[o].call(i.exports, i, i.exports, e),
        (i.loaded = !0),
        i.exports
      );
    }
  
    var t = {},
      n = {};
  
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }
  
    var i = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t];
        for (var o in n)
          Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
      }
      return e;
    };
  
    var r = o(require(1)),
      a = o(require(6)),
      u = o(require(7)),
      c = o(require(8)),
      f = o(require(9)),
      s = o(require(10)),
      d = o(require(11)),
      l = o(require(14)),
      p = [];
    var m = !1,
      b = document.all && !window.atob,
      v = {
        offset: 120,
        delay: 0,
        easing: 'ease',
        duration: 400,
        disable: !1,
        once: !1,
        startEvent: 'DOMContentLoaded',
        throttleDelay: 99,
        debounceDelay: 50,
        disableMutationObserver: !1,
      },
      y = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        if (e && (m = !0)) return (p = (0, l.default)(p, v)), (0, s.default)(p, v.once), p;
      },
      g = function () {
        p = (0, d.default)();
        y();
      },
      h = function () {
        p.forEach(function (e, t) {
          e.node.removeAttribute('data-aos');
          e.node.removeAttribute('data-aos-easing');
          e.node.removeAttribute('data-aos-duration');
          e.node.removeAttribute('data-aos-delay');
        });
      },
      w = function (e) {
        return e === !0 || 'mobile' === e && a.default.mobile() || 'phone' === e && a.default.phone() || 'tablet' === e && a.default.tablet() || 'function' == typeof e && e() === !0;
      },
      k = function (e) {
        return v = i(v, e), (p = (0, d.default)()), w(v.disable) || b ? h() : (document.querySelector('body').setAttribute('data-aos-easing', v.easing), document.querySelector('body').setAttribute('data-aos-duration', v.duration), document.querySelector('body').setAttribute('data-aos-delay', v.delay), 'DOMContentLoaded' === v.startEvent && ['complete', 'interactive'].indexOf(document.readyState) > -1 ? y(!0) : 'load' === v.startEvent ? window.addEventListener(v.startEvent, function () {
          y(!0);
        }) : document.addEventListener(v.startEvent, function () {
          y(!0);
        }), window.addEventListener('resize', (0, u.default)(y, v.debounceDelay, !0)), window.addEventListener('orientationchange', (0, u.default)(y, v.debounceDelay, !0)), window.addEventListener('scroll', (0, r.default)(function () {
          (0, s.default)(p, v.once);
        }, v.throttleDelay)), v.disableMutationObserver || (0, c.default)('[data-aos]', g), p);
      };
    return {
      init: k,
      refresh: y,
      refreshHard: g,
    };
  });
  