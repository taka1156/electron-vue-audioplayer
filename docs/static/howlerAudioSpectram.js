/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable quotes */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
!(function(n) {
  var r = {};
  function i(t) {
    if (r[t]) return r[t].exports;
    var e = (r[t] = { i: t, l: !1, exports: {} });
    return n[t].call(e.exports, e, e.exports, i), (e.l = !0), e.exports;
  }
  (i.m = n),
    (i.c = r),
    (i.d = function(t, e, n) {
      i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (i.r = function(t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (i.t = function(e, t) {
      if ((1 & t && (e = i(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (i.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var r in e)
          i.d(
            n,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return n;
    }),
    (i.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return i.d(e, 'a', e), e;
    }),
    (i.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (i.p = ''),
    i((i.s = 0));
})([
  function(t, e, n) {
    'use strict';
    var r, i;
    n.r(e),
      ((i = r = r || {})[(i.Solid = 0)] = 'Solid'),
      (i[(i.Block = 1)] = 'Block');
    var o = r;
    function a(t, e) {
      var n = this;
      void 0 === e && (e = 128),
        (this.ready = !1),
        (this.analyserNode = null),
        (this.audioSource = null),
        (this.spectrum = []),
        (this.howl = t),
        (this.fftSize = e),
        (this.spectrumArray = new Uint8Array(e / 2));
      var r = Howler.ctx.createAnalyser();
      (this.analyserNode = r),
        (this.analyserNode.fftSize = this.fftSize),
        this.howl.on('play', function() {
          var t = n.howl._sounds[0]._node.bufferSource;
          (n.audioSource = t), n.audioSource.connect(r), (n.ready = !0);
        });
    }
    var s =
      (Object.defineProperty(a.prototype, 'isReady', {
        get: function() {
          return this.ready;
        },
        enumerable: !0,
        configurable: !0
      }),
      Object.defineProperty(a.prototype, 'length', {
        get: function() {
          var t = Math.floor(0.1 * this.spectrumArray.length);
          return Math.floor(0.8 * this.spectrumArray.length) - t;
        },
        enumerable: !0,
        configurable: !0
      }),
      (a.prototype.destroy = function() {
        if (null != this.audioSource && null != this.analyserNode)
          try {
            this.audioSource.disconnect(this.analyserNode);
          } catch (t) {
            console.error(t);
          }
        (this.audioSource = null), (this.analyserNode = null), (this.ready = !1);
      }),
      (a.prototype.getSpectrumArray = function() {
        var t = this.spectrumArray,
          e = this.spectrum,
          n = 0;
        if (this.ready && null != this.analyserNode) {
          this.analyserNode.getByteFrequencyData(t);
          for (
            var r = Math.floor(0.1 * t.length),
              i = Math.floor(0.8 * t.length),
              o = r;
            o < i;
            o++
          )
            e[n++] = t[o] / 256;
        }
        return this.spectrum;
      }),
      a);
    function l(t) {
      (this.type = o.Solid),
        (this.options = t),
        (this._canvas = document.createElement('canvas'));
      var e = this.canvas.getContext('2d');
      if (null == e) throw Error('Cannot get context 2d');
      this._context = e;
    }
    var c,
      h,
      u =
        (Object.defineProperty(l.prototype, 'canvas', {
          get: function() {
            return this._canvas;
          },
          enumerable: !0,
          configurable: !0
        }),
        Object.defineProperty(l.prototype, 'context', {
          get: function() {
            return this._context;
          },
          enumerable: !0,
          configurable: !0
        }),
        (l.prototype.draw = function(t) {
          throw Error('extends me!');
        }),
        (l.prototype.applyOptions = function(e, n) {
          var r = this;
          Object.keys(n).forEach(function(t) {
            null != e[t] ? (r[t] = e[t]) : (r[t] = n[t]);
          });
        }),
        l);
    function f(t) {
      var r = h.call(this, t) || this;
      if (
        ((r.type = o.Solid),
        r.applyOptions(t, {
          barWidth: 5,
          barHeight: 140,
          colors: ['#1d2088', '#0068b7', '#00a0e9', '#8edcff'],
          margin: 1,
          gradientStops: null,
          colorSteps: [5, 10, 15, 20]
        }),
        (r.canvas.height = r.barHeight),
        (r.canvas.width = r.barWidth),
        null == r.gradientStops)
      ) {
        var i = (r.gradientStops = []);
        r.colors.forEach(function(t, e) {
          var n = 0;
          0 < e && (n = e / (r.colors.length - 1)), (i[e] = n);
        });
      }
      return (
        (r.gradient = r.context.createLinearGradient(r.barWidth, r.barHeight, 0, 0)),
        r.colors.forEach(function(t, e) {
          r.gradient.addColorStop(r.gradientStops[e], t);
        }),
        r
      );
    }
    var p,
      d,
      y =
        (((c = function(t, e) {
          return (c =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function(t, e) {
                t.__proto__ = e;
              }) ||
            function(t, e) {
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            })(t, e);
        }),
        function(t, e) {
          function n() {
            this.constructor = t;
          }
          c(t, e),
            (t.prototype =
              null === e
                ? Object.create(e)
                : ((n.prototype = e.prototype), new n()));
        })(f, (h = u)),
        (f.prototype.draw = function(t) {
          var e = this.canvas,
            n = this.context,
            r = this.barWidth,
            i = this.margin;
          (e.width = (r + i) * t.length - i),
            (n.fillStyle = this.gradient),
            n.clearRect(0, 0, this.canvas.width, this.canvas.height);
          for (var o = 0; o < t.length; o++) {
            var a = e.height * t[o];
            n.fillRect((r + i) * o, e.height - a, r, e.height);
          }
        }),
        f);
    function g(t) {
      var e = d.call(this, t) || this;
      (e.type = o.Block),
        (e.stepedColors = []),
        (e.remnantStartPoints = []),
        (e.remnantCurrentPoints = []),
        (e.remnantTicks = []),
        e.applyOptions(t, {
          blockWidth: 8,
          blockHeight: 5,
          blockCount: 20,
          marginh: 3,
          marginv: 3,
          colors: ['#1d2088', '#0068b7', '#00a0e9', '#8edcff'],
          colorSteps: [5, 10, 15, 30]
        }),
        (e.canvas.height = (e.blockHeight + e.marginv) * e.blockCount - e.marginv);
      for (var n = 0, r = 0; r < e.blockCount; r++)
        e.colorSteps[n] <= r && ++n >= e.colors.length && (n = e.colors.length - 1),
          (e.stepedColors[r] = e.colors[n]);
      return (
        (window.tmp = {
          s: e.remnantStartPoints,
          c: e.remnantCurrentPoints,
          t: e.remnantTicks
        }),
        e
      );
    }
    var v =
      (((p = function(t, e) {
        return (p =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
          })(t, e);
      }),
      function(t, e) {
        function n() {
          this.constructor = t;
        }
        p(t, e),
          (t.prototype =
            null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
      })(g, (d = u)),
      (g.prototype.draw = function(t) {
        var e = Date.now();
        (this.canvas.width =
          (this.blockWidth + this.marginh) * t.length - this.marginh),
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var n = 0; n < t.length; n++) {
          for (
            var r = this.canvas.height * t[n],
              i = Math.floor(r / (this.blockHeight + this.marginh)),
              o = 0;
            o < i;
            o++
          )
            this.drawBlock(n, o);
          null == this.remnantStartPoints[n] &&
            ((this.remnantStartPoints[n] = 0),
            (this.remnantCurrentPoints[n] = 0),
            (this.remnantTicks[n] = e)),
            this.remnantCurrentPoints[n] <= i &&
              ((this.remnantStartPoints[n] = i),
              (this.remnantCurrentPoints[n] = i),
              (this.remnantTicks[n] = e)),
            0 <= this.remnantCurrentPoints[n] &&
              this.drawBlock(n, this.remnantCurrentPoints[n]);
        }
        this.updateRemnantPoints(e);
      }),
      (g.prototype.drawBlock = function(t, e) {
        var n = (this.blockWidth + this.marginh) * t,
          r =
            this.canvas.height -
            this.blockHeight -
            (this.blockHeight + this.marginv) * e;
        (this.context.fillStyle = this.stepedColors[e]),
          this.context.fillRect(n, r, this.blockWidth, this.blockHeight);
      }),
      (g.prototype.updateRemnantPoints = function(t) {
        for (var e = 0; e < this.remnantStartPoints.length; e++) {
          var n = this.remnantStartPoints[e],
            r = this.remnantTicks[e];
          if (!(n <= 0 || r <= 0)) {
            var i = t - r - 128;
            if (i <= 0) this.remnantCurrentPoints[e] = n;
            else {
              var o = n - Math.floor(i / 64);
              (this.remnantCurrentPoints[e] = o) < 0 &&
                ((this.remnantStartPoints[e] = 0),
                (this.remnantCurrentPoints[e] = 0),
                (this.remnantTicks[e] = 0));
            }
          }
        }
      }),
      g);
    function m() {}
    var b =
        ((m.create = function(t, e) {
          switch (t) {
            case o.Solid:
              return new y(e);
            case o.Block:
              return new v(e);
          }
          throw new Error('Unknown PonAudioVisualizerType. (' + t + ')');
        }),
        (m.visualizers = {}),
        m),
      S =
        (Object.defineProperty(w.prototype, 'canvas', {
          get: function() {
            return null != this.visualizer ? this.visualizer.canvas : null;
          },
          enumerable: !0,
          configurable: !0
        }),
        (w.prototype.destroy = function() {
          null != this.analyser && this.analyser.destroy();
        }),
        (w.prototype.setAudio = function(t) {
          this.analyser = new s(t, this.fftSize);
        }),
        Object.defineProperty(w.prototype, 'isReady', {
          get: function() {
            return (
              null != this.analyser &&
              this.analyser.isReady &&
              null != this.visualizer
            );
          },
          enumerable: !0,
          configurable: !0
        }),
        (w.prototype.draw = function() {
          null != this.analyser &&
            null != this.visualizer &&
            this.analyser.isReady &&
            this.visualizer.draw(this.analyser.getSpectrumArray());
        }),
        (w.VisualizerType = o),
        w);
    function w(t, e) {
      (this.analyser = null),
        (this.fftSize = 64),
        (this.visualizer = null),
        (this.visualizerType = t),
        (this.visualizer = b.create(t, e)),
        null == e.fftSize || isNaN(+e.fftSize) || (this.fftSize = +e.fftSize);
    }
    e.default = S;
    'undefined' != typeof window && (window.PonAudioSpectrum = S);
  }
]);
