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
})({5:[function(require,module,exports) {
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var main = document.querySelector('main');
var canvas = document.createElement('canvas');
var CTX = canvas.getContext('2d');
canvas.style.zIndex = "-1";
canvas.style.position = "absolute";

function resizeCanvas(canvas) {
    canvas.width = main.clientWidth;
    canvas.height = main.clientHeight;
}

var MOUSE = {
    x: 0,
    y: 0
    // clicked: false
};
var COLORS = ["#092140", "#024959", "#F2C777", "#F24738", "#BF2A2A"];

var Shape = function () {
    function Shape() {
        _classCallCheck(this, Shape);

        this.dx = Math.random() - 0.5;
        this.dy = Math.random() - 0.5;
        this.radius = Math.random() * 5;
        this.minRadius = this.radius;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
        this.y = Math.random() * (canvas.height - 2 * this.radius) + this.radius;
    }

    _createClass(Shape, [{
        key: 'display',
        value: function display() {
            CTX.beginPath();
            CTX.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

            CTX.strokeStyle = this.color;
            CTX.stroke();
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
                this.dx *= -1;
            }
            if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
                this.dy *= -1;
            }

            this.x += this.dx;
            this.y += this.dy;

            var x = this.x,
                y = this.y,
                radius = this.radius,
                minRadius = this.minRadius;


            if (MOUSE.x - x < 50 && MOUSE.x - x > -50 && MOUSE.y - y < 50 && MOUSE.y - y > -50 && radius < 100) {
                radius += 1;
            } else if (radius > minRadius) {
                radius -= 1;
                if (radius < minRadius) {
                    radius = minRadius;
                }
            }
            this.radius = radius;
        }
    }]);

    return Shape;
}();

// starts and continuees the animation per frame


function animate() {
    requestAnimationFrame(animate);
    CTX.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(function (c) {
        c.update();
        c.display();
    });
}

main.addEventListener("mousemove", function (event) {
    MOUSE.x = event.x;
    MOUSE.y = event.y;
});

// canvas.addEventListener("click", function(event) {
//     MOUSE.clicked = true
// })
function init() {
    resizeCanvas(canvas);
    fillShapes();
}

function fillShapes() {
    shapes = [];
    for (var i = 0; i < 50; i++) {

        var c = new Shape();
        c.display();
        shapes.push(c);
    }
}
var shapes = [];
fillShapes();

if (window.matchMedia("(min-width: 769px)").matches) {

    window.addEventListener("resize", init);
    window.addEventListener("load", function () {
        return main.appendChild(canvas);
    });
    init();
    animate();
} else {
    console.log("For mobile");
}
},{}],12:[function(require,module,exports) {

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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '36035' + '/');
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
},{}]},{},[12,5])
//# sourceMappingURL=/dist/0457e442bffb41d879bd01fda5c4cd09.map