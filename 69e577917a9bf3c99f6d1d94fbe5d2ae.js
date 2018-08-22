// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({15:[function(require,module,exports) {
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var main = document.querySelector('main');
var canvas = document.createElement('canvas');
var CTX = canvas.getContext('2d');
canvas.style.zIndex = "-1";
canvas.style.position = "absolute";
main.appendChild(canvas);
// canvas.style.background = "black"
function resizeCanvas(canvas) {
    canvas.width = main.clientWidth;
    canvas.height = main.clientHeight;
}

var colors_blue = [
// "rgba(12, 107, 117, 0.7)",
"rgba(98, 238, 247, 0.7)", "rgba(24, 223, 245, 0.7)",
// "rgba(47, 110, 117, 0.7)",
"rgba(19, 177, 194, 0.7)", "rgba(76, 76, 255, 0.7)", "rgba(0, 0, 255, 0.7)",
// "rgba(38, 38, 127, 0.7)",
"rgba(0, 0, 204, 0.7)"];

// const colors_blue = [
//     // "rgba(118, 63, 41, 0.7)",
//     "rgba(247, 185, 161, 0.7)",
//     "rgba(246, 130, 86, 0.7)",
//     // "rgba(118, 88, 77, 0.7)",
//     "rgba(195, 103, 68, 0.7)"
// ]

// const colors_blue = [
//     // "rgba(0, 0, 127, 0.7)",
//     "rgba(76, 76, 255, 0.7)",
//     "rgba(0, 0, 255, 0.7)",
//     // "rgba(38, 38, 127, 0.7)",
//     "rgba(0, 0, 204, 0.7)"
// ]

var Vector = function () {
    function Vector(x, y, z) {
        _classCallCheck(this, Vector);

        this.x = x;
        this.y = y;
        this.z = z;
    }

    _createClass(Vector, [{
        key: 'add',
        value: function add(v) {
            if (typeof this.x === 'number' && v.x) this.x += v.x;
            if (typeof this.y === 'number' && v.y) this.y += v.y;
            if (typeof this.z === 'number' && v.z) this.z += v.z;
        }
    }, {
        key: 'sub',
        value: function sub(v) {
            if (typeof this.x === 'number' && v.x) this.x -= v.x;
            if (typeof this.y === 'number' && v.y) this.y -= v.y;
            if (typeof this.z === 'number' && v.z) this.z -= v.z;
        }
    }, {
        key: 'scalar_mul',
        value: function scalar_mul(v) {
            if (typeof this.x === 'number') this.x *= v;
            if (typeof this.y === 'number') this.y *= v;
            if (typeof this.z === 'number') this.z *= v;
        }
    }, {
        key: 'scalar_div',
        value: function scalar_div(v) {
            if (typeof this.x === 'number') this.x /= v;
            if (typeof this.y === 'number') this.y /= v;
            if (typeof this.z === 'number') this.z /= v;
        }
    }, {
        key: 'mag',
        value: function mag() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }, {
        key: 'normalize',
        value: function normalize() {
            var m = this.mag();
            if (m !== 0) this.scalar_div(m);
        }
    }, {
        key: 'limit',
        value: function limit(min, max) {
            if (this.x && this.x > max) {
                this.x = max;
            } else if (this.x && this.x < min) {
                this.x = min;
            }

            if (this.y && this.y > max) {
                this.y = max;
            } else if (this.y && this.y < min) {
                this.y = min;
            }

            if (this.z && this.z > max) {
                this.z = max;
            } else if (this.z && this.z < min) {
                this.z = min;
            }
        }
    }]);

    return Vector;
}();

var Mover = function () {
    function Mover() {
        var mass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var loc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vector(0, 0);
        var vel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Vector(0, 0);
        var acc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Vector(0, 0);

        _classCallCheck(this, Mover);

        this.loc = loc;
        this.vel = vel;
        this.acc = acc;
        this.mass = mass;
    }

    _createClass(Mover, [{
        key: 'applyForce',
        value: function applyForce(force) {
            force.scalar_div(this.mass);
            this.acc.add(force);
        }
    }, {
        key: 'update',
        value: function update() {
            var minVel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -2;
            var maxVel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

            this.loc.add(this.vel);
            this.vel.add(this.acc);
            if (typeof minVel === 'number') this.vel.limit(minVel, maxVel);
            // this.acc.scalar_mul(0)
            // this.checkEdges()
        }
    }, {
        key: 'display',
        value: function display(CTX, shape) {
            var _loc = this.loc,
                x = _loc.x,
                y = _loc.y;

            shape(x, y);
        }
    }, {
        key: 'checkEdges',
        value: function checkEdges(canvas) {
            var _this = this;

            var diff_x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -10;
            var diff_y = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -10;

            var f_x = void 0;
            var f_y = void 0;
            if (diff_x < 0) {
                f_x = function f_x(x) {
                    _this.loc.x = x;
                };
            } else {
                f_x = function f_x(x) {
                    _this.loc.x = canvas.width - x;
                    _this.vel.x *= -1;
                };
            }

            if (diff_y < 0) {
                f_y = function f_y(y) {
                    _this.loc.y = y;
                };
            } else {
                f_y = function f_y(y) {
                    _this.loc.y = canvas.height - y;
                    _this.vel.y *= -1;
                };
            }

            if (this.loc.x + diff_x > canvas.width) {
                f_x(diff_x);
            } else if (this.loc.x - diff_x < 0) {
                f_x(canvas.width - diff_x);
            }

            if (this.loc.y + diff_y > canvas.height) {
                f_y(diff_y);
            } else if (this.loc.y - diff_y < 0) {
                f_y(canvas.height - diff_y);
            }
        }
    }]);

    return Mover;
}();

function mover_shape(radius, color) {
    return function (x, y) {
        CTX.beginPath();
        CTX.arc(x, y, radius, 0, Math.PI * 2, false);
        CTX.fillStyle = color;
        CTX.fill();
        // CTX.strokeStyle = color
        // drawLine(mouse.x, mouse.y, x, y, CTX)
        // CTX.fillRect(x, y, radius, radius)
    };
}

function fill_ms(num, colors, min_radius, max_radius) {
    return Array(num).fill(0).map(function (v) {
        var m = new Mover(1, new Vector(Math.random() * canvas.width, Math.random() * canvas.height));

        var radius = Math.random() * max_radius + min_radius;
        var color = colors[~~(Math.random() * colors.length)];
        var shape = mover_shape(radius, color);
        return [m, shape];
    });
}

var update = function update(minVel, maxVel, acc) {
    return function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            m = _ref2[0],
            shape = _ref2[1];

        var dir = new Vector(mouse.x, mouse.y);

        dir.sub(m.loc);

        dir.normalize();
        // console.log(dir.mag)
        dir.scalar_mul(acc);

        m.applyForce(dir);

        m.update(minVel, maxVel);
        m.acc.scalar_mul(0);
        m.checkEdges(canvas);
        m.display(CTX, shape);
    };
};

var mouse = new Vector(0, 0);
// let ms_red = fill_ms(250, colors_red, 2, 10);
var ms_yellow = fill_ms(500, colors_blue, 0, 5);

function init() {
    resizeCanvas(canvas);
    // ms_red = fill_ms(250, colors_red, 2, 10)
    ms_yellow = fill_ms(1000, colors_blue, 0, 5);

    // ms_red.forEach(m => m[0].display(CTX, m[1]))
    ms_yellow.forEach(function (m) {
        return m[0].display(CTX, m[1]);
    });
}

function animate() {
    window.requestAnimationFrame(animate);
    CTX.clearRect(0, 0, canvas.width, canvas.height);
    ms_yellow.forEach(update(-5, 5, 0.2));
    // ms_red.forEach(update(-10, 10, 0.5))
}

main.addEventListener("mousemove", function (e) {
    // const x = map(perlinOctave(e.x), [-1, 1], [200, canvas.width - 200])
    // const y = map(perlinOctave(e.y), [-1, 1], [200, canvas.height - 200])
    mouse = new Vector(e.x, e.y);
});

init();
animate();

window.addEventListener("click", init);
window.addEventListener("resize", init);
},{}],18:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '44417' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[18,15])
//# sourceMappingURL=/dist/69e577917a9bf3c99f6d1d94fbe5d2ae.map