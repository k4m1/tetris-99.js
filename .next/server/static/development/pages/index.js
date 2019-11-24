module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var trace_events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! trace_events */ "trace_events");
/* harmony import */ var trace_events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(trace_events__WEBPACK_IMPORTED_MODULE_0__);

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);
context.fillStyle = '#000';
context.fillRect(0, 0, canvas.clientWidth, canvas.height);

const collision = (playArea, player) => {
  const [m, o] = [player.matrix, player.pos];

  for (let y = 0; y < m.length; y++) {
    for (let x = 0; x < m[y].length; x++) {
      if (m[y][x] !== 0 && (playArea[y + o.y] && playArea[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }

  return false;
};

const createMatrix = (width, height) => {
  const matrix = []; // while height is not 0

  while (height--) {
    matrix.push(new Array(width).fill(0));
  }

  return matrix;
};

const createTetris = type => {
  if (type === 'T') {
    return [[0, 0, 0], [1, 1, 1], [0, 1, 0]];
  } else if (type === 'O') {
    return [[2, 2], [2, 2]];
  } else if (type === 'L') {
    return [[0, 3, 0], [0, 3, 0], [0, 3, 3]];
  } else if (type === 'J') {
    return [[0, 4, 0], [0, 4, 0], [4, 4, 0]];
  } else if (type === 'I') {
    return [[0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0], [0, 5, 0, 0]];
  } else if (type === 'S') {
    return [[0, 6, 6], [6, 6, 0], [0, 0, 0]];
  } else if (type === 'Z') {
    return [[7, 7, 0], [0, 7, 7], [0, 0, 0]];
  }
};

const draw = () => {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.clientWidth, canvas.height);
  drawMatrix(playArea, {
    x: 0,
    y: 0
  });
  drawMatrix(player.matrix, player.pos);
};

const drawMatrix = (nmatrix, offset) => {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
};

const merge = (playArea, player) => {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        playArea[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
};

const playerDrop = () => {
  player.pos.y++;

  if (collision(playArea, player)) {
    player.pos.y--;
    merge(playArea, player);
    playerReset();
  }

  dropCounter = 0;
};

const playerMove = direction => {
  player.pos.x += direction;

  if (collision(playArea, player)) {
    player.pos.x -= direction;
  }
};

const playerReset = () => {
  const tetrises = "ILJOTSZ";
  player.matrix = createTetris(tetrises[tetrises.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (playArea[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);

  if (collision(playArea, player)) {
    playArea.forEach(row => row.fill(0));
  }
};

const playerRotation = direction => {
  let offset = 1;
  rotate(player.matrix, direction);

  while (collision(playArea, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));

    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
};

const rotate = (matrix, direction) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < y; x++) {
      [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
    }
  }

  if (direction > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
};

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

const update = (time = 0) => {
  const deltatime = time - lastTime;
  lastTime = time;
  dropCounter += deltatime;

  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update);
};

const playArea = createMatrix(12, 20);
const player = {
  pos: {
    x: 5,
    y: 5
  },
  matrix: createTetris('T')
}; // These event listners will move the player left or right by incremnting the x plane
// the 'down' control sets our 'dropCounter' to zero which tirggers a 'move' down one position

document.addEventListener('keydown', e => {
  if (e.keyCode === 37) {
    playerMovement(-1);
  } else if (e.keyCode === 39) {
    playerMovement(1);
  } else if (e.keyCode === 40) {
    playerDrop();
  } else if (e.keyCode === 81) {
    playerRotation(-1);
  } else if (e.keyCode === 87) {
    playerRotation(1);
  }
});
const colors = [null, 'purple', 'yellow', 'blue', 'orange', 'light blue', 'green', 'red'];
update();

/***/ }),

/***/ 4:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/bebop/Desktop/GitHub Reasources /websocket-tetris/pages/index.js */"./pages/index.js");


/***/ }),

/***/ "trace_events":
/*!*******************************!*\
  !*** external "trace_events" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("trace_events");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map