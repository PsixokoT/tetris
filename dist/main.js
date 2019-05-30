/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/deepmerge/dist/umd.js":
/*!********************************************!*\
  !*** ./node_modules/deepmerge/dist/umd.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function (global, factory) {\n\t true ? module.exports = factory() :\n\tundefined;\n}(this, (function () { 'use strict';\n\nvar isMergeableObject = function isMergeableObject(value) {\n\treturn isNonNullObject(value)\n\t\t&& !isSpecial(value)\n};\n\nfunction isNonNullObject(value) {\n\treturn !!value && typeof value === 'object'\n}\n\nfunction isSpecial(value) {\n\tvar stringValue = Object.prototype.toString.call(value);\n\n\treturn stringValue === '[object RegExp]'\n\t\t|| stringValue === '[object Date]'\n\t\t|| isReactElement(value)\n}\n\n// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25\nvar canUseSymbol = typeof Symbol === 'function' && Symbol.for;\nvar REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;\n\nfunction isReactElement(value) {\n\treturn value.$$typeof === REACT_ELEMENT_TYPE\n}\n\nfunction emptyTarget(val) {\n\treturn Array.isArray(val) ? [] : {}\n}\n\nfunction cloneUnlessOtherwiseSpecified(value, options) {\n\treturn (options.clone !== false && options.isMergeableObject(value))\n\t\t? deepmerge(emptyTarget(value), value, options)\n\t\t: value\n}\n\nfunction defaultArrayMerge(target, source, options) {\n\treturn target.concat(source).map(function(element) {\n\t\treturn cloneUnlessOtherwiseSpecified(element, options)\n\t})\n}\n\nfunction getMergeFunction(key, options) {\n\tif (!options.customMerge) {\n\t\treturn deepmerge\n\t}\n\tvar customMerge = options.customMerge(key);\n\treturn typeof customMerge === 'function' ? customMerge : deepmerge\n}\n\nfunction mergeObject(target, source, options) {\n\tvar destination = {};\n\tif (options.isMergeableObject(target)) {\n\t\tObject.keys(target).forEach(function(key) {\n\t\t\tdestination[key] = cloneUnlessOtherwiseSpecified(target[key], options);\n\t\t});\n\t}\n\tObject.keys(source).forEach(function(key) {\n\t\tif (!options.isMergeableObject(source[key]) || !target[key]) {\n\t\t\tdestination[key] = cloneUnlessOtherwiseSpecified(source[key], options);\n\t\t} else {\n\t\t\tdestination[key] = getMergeFunction(key, options)(target[key], source[key], options);\n\t\t}\n\t});\n\treturn destination\n}\n\nfunction deepmerge(target, source, options) {\n\toptions = options || {};\n\toptions.arrayMerge = options.arrayMerge || defaultArrayMerge;\n\toptions.isMergeableObject = options.isMergeableObject || isMergeableObject;\n\n\tvar sourceIsArray = Array.isArray(source);\n\tvar targetIsArray = Array.isArray(target);\n\tvar sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;\n\n\tif (!sourceAndTargetTypesMatch) {\n\t\treturn cloneUnlessOtherwiseSpecified(source, options)\n\t} else if (sourceIsArray) {\n\t\treturn options.arrayMerge(target, source, options)\n\t} else {\n\t\treturn mergeObject(target, source, options)\n\t}\n}\n\ndeepmerge.all = function deepmergeAll(array, options) {\n\tif (!Array.isArray(array)) {\n\t\tthrow new Error('first argument should be an array')\n\t}\n\n\treturn array.reduce(function(prev, next) {\n\t\treturn deepmerge(prev, next, options)\n\t}, {})\n};\n\nvar deepmerge_1 = deepmerge;\n\nreturn deepmerge_1;\n\n})));\n\n\n//# sourceURL=webpack:///./node_modules/deepmerge/dist/umd.js?");

/***/ }),

/***/ "./src/game/Game.ts":
/*!**************************!*\
  !*** ./src/game/Game.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Config_1 = __webpack_require__(/*! ./config/Config */ \"./src/game/config/Config.ts\");\nvar Field_1 = __webpack_require__(/*! ./data/Field */ \"./src/game/data/Field.ts\");\nvar Shape_1 = __webpack_require__(/*! ./data/Shape */ \"./src/game/data/Shape.ts\");\nvar Game = /** @class */ (function () {\n    function Game(config) {\n        this.config = config;\n        this._time = 0;\n        this._score = 0;\n        this._lines = 0;\n        this._level = this.config.getLevelByScore(this._score);\n        this.field = new Field_1.Field(this.config.width, this.config.height);\n        this._nextShape = this.config.getRandomShapeData();\n    }\n    // --------------------------------------------------------------------------\n    //  Static\n    // --------------------------------------------------------------------------\n    Game.init = function (options) {\n        if (options === void 0) { options = {}; }\n        return __awaiter(this, void 0, void 0, function () {\n            var config;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, Config_1.Config.init(options)];\n                    case 1:\n                        config = _a.sent();\n                        return [2 /*return*/, new Game(config)];\n                }\n            });\n        });\n    };\n    Object.defineProperty(Game.prototype, \"score\", {\n        get: function () {\n            return this._score;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Game.prototype, \"lines\", {\n        get: function () {\n            return this._lines;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Game.prototype, \"level\", {\n        get: function () {\n            return this._level;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Game.prototype.start = function () {\n        this._time = 0;\n        this._score = 0;\n        this._level = this.config.getLevelByScore(this._score);\n        this.field.dispose();\n        this.field.addShape(new Shape_1.Shape(this._level.getRandomColor(), this.config.getRandomShapeData()));\n        this._nextShape = this.config.getRandomShapeData();\n    };\n    Game.prototype.update = function (delta) {\n        this._time += delta;\n        var stepsCount = Math.round(this._time / this._level.speed);\n        if (stepsCount > 0) {\n            while (stepsCount-- > 0) {\n                if (!this.step()) {\n                    console.log('finish game');\n                    break;\n                }\n            }\n            this._time = this._time % this._level.speed;\n        }\n    };\n    Game.prototype.pause = function () {\n        console.log('pause');\n    };\n    Game.prototype.unpause = function () {\n        console.log('unpause');\n    };\n    Game.prototype.step = function () {\n        var linesCount = this.field.step();\n        if (linesCount >= 0) {\n            this._lines += linesCount;\n            this._score += this.config.getScore(linesCount);\n            this._level = this.config.getLevelByScore(this._score);\n            var shape = new Shape_1.Shape(this._level.getRandomColor(), this._nextShape);\n            this._nextShape = this.config.getRandomShapeData();\n            return this.field.addShape(shape);\n        }\n        return true;\n    };\n    return Game;\n}());\nexports.Game = Game;\n\n\n//# sourceURL=webpack:///./src/game/Game.ts?");

/***/ }),

/***/ "./src/game/config/Config.ts":
/*!***********************************!*\
  !*** ./src/game/config/Config.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar deepmerge_1 = __importDefault(__webpack_require__(/*! deepmerge */ \"./node_modules/deepmerge/dist/umd.js\"));\nvar Level_1 = __webpack_require__(/*! ../data/Level */ \"./src/game/data/Level.ts\");\nvar ShapeData_1 = __webpack_require__(/*! ../data/ShapeData */ \"./src/game/data/ShapeData.ts\");\nvar Config = /** @class */ (function () {\n    function Config(data) {\n        if (data.width <= 0 || data.height <= 0)\n            throw new RangeError('incorrect size');\n        if (!data.shapes.length)\n            throw new Error('shapes can\\'t be empty');\n        if (!data.levels.length)\n            throw new Error('levels can\\'t be empty');\n        if (!data.score.length)\n            throw new Error('score can\\'t be empty');\n        this.width = Math.round(data.width);\n        this.height = Math.round(data.height);\n        this._score = data.score;\n        this._shapes = data.shapes.map(function (frames) { return new ShapeData_1.ShapeData(frames); });\n        var minScore = 0;\n        this._levels = data.levels.map(function (_a, index) {\n            var speed = _a.speed, score = _a.score, colors = _a.colors;\n            var level = new Level_1.Level(index.toString(), speed, minScore, score, colors);\n            minScore = score;\n            return level;\n        });\n    }\n    Config.init = function (data) {\n        if (data === void 0) { data = {}; }\n        return __awaiter(this, void 0, void 0, function () {\n            var defaultData, overwriteMerge, merge;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(__webpack_require__(/*! ./default.json */ \"./src/game/config/default.json\")); })];\n                    case 1:\n                        defaultData = _a.sent();\n                        overwriteMerge = function (destinationArray, sourceArray) { return sourceArray; };\n                        merge = deepmerge_1.default(defaultData, data, { arrayMerge: overwriteMerge });\n                        return [2 /*return*/, new Config(merge)];\n                }\n            });\n        });\n    };\n    Config.prototype.getScore = function (linesCount) {\n        return this._score[linesCount - 1];\n    };\n    Config.prototype.getRandomShapeData = function () {\n        return this._shapes[Math.floor(Math.random() * this._shapes.length)];\n    };\n    Config.prototype.getLevelByScore = function (value) {\n        var level = this._levels[0]; // TODO: remove this hack `Variable 'level' is used before being assigned.`\n        for (var i = 0; i < this._levels.length; i++) {\n            level = this._levels[i];\n            if (level.containScore(value))\n                break;\n        }\n        return level;\n    };\n    return Config;\n}());\nexports.Config = Config;\n\n\n//# sourceURL=webpack:///./src/game/config/Config.ts?");

/***/ }),

/***/ "./src/game/config/default.json":
/*!**************************************!*\
  !*** ./src/game/config/default.json ***!
  \**************************************/
/*! exports provided: width, height, shapes, score, levels, default */
/***/ (function(module) {

eval("module.exports = {\"width\":10,\"height\":20,\"shapes\":[[[[1,1,0],[0,1,1]],[[0,1],[1,1],[1,0]]],[[[0,1,1],[1,1,0]],[[1,0],[1,1],[0,1]]],[[[0,1,0],[1,1,1],[0,0,0]],[[0,1,0],[0,1,1],[0,1,0]],[[0,0,0],[1,1,1],[0,1,0]],[[0,1,0],[1,1,0],[0,1,0]]],[[[1,1,0],[0,1,0],[0,1,0]],[[0,0,1],[1,1,1],[0,0,0]],[[0,1,0],[0,1,0],[0,1,1]],[[0,0,0],[1,1,1],[1,0,0]]],[[[0,1,1],[0,1,0],[0,1,0]],[[0,0,0],[1,1,1],[0,0,1]],[[0,1,0],[0,1,0],[1,1,0]],[[1,0,0],[1,1,1],[0,0,0]]],[[[0,1,0],[0,1,0],[0,1,0],[0,1,0]],[[0,0,0,0],[1,1,1,1]]],[[[1,1],[1,1]]]],\"score\":[100,200,300,400],\"levels\":[{\"score\":0,\"speed\":1,\"colors\":[1238908,802384098]},{\"score\":1000,\"speed\":0.9,\"colors\":[1238908,802384098]},{\"score\":5000,\"speed\":0.8,\"colors\":[1238908,802384098]},{\"score\":10000,\"speed\":0.7,\"colors\":[1238908,802384098]},{\"score\":20000,\"speed\":0.6,\"colors\":[1238908,802384098]},{\"score\":30000,\"speed\":0.5,\"colors\":[1238908,802384098]},{\"score\":40000,\"speed\":0.4,\"colors\":[1238908,802384098]},{\"score\":50000,\"speed\":0.3,\"colors\":[1238908,802384098]},{\"score\":60000,\"speed\":0.2,\"colors\":[1238908,802384098]},{\"score\":70000,\"speed\":0.1,\"colors\":[1238908,802384098]}]};\n\n//# sourceURL=webpack:///./src/game/config/default.json?");

/***/ }),

/***/ "./src/game/data/Field.ts":
/*!********************************!*\
  !*** ./src/game/data/Field.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Field = /** @class */ (function () {\n    function Field(width, height) {\n        this.width = width;\n        this.height = height;\n        if (width <= 0 || height <= 0)\n            throw new Error('invalid size');\n        this.dispose();\n    }\n    Object.defineProperty(Field.prototype, \"map\", {\n        get: function () {\n            return this._map;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Field.prototype, \"shape\", {\n        get: function () {\n            return this._shape;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Field.prototype.dispose = function () {\n        var _this = this;\n        this._map = Array.from({ length: this.width }, function () { return new Array(_this.height).fill(undefined); });\n        this._shape = undefined;\n    };\n    Field.prototype.toString = function () {\n        var mapToRows = this._map.reduce(function (rows, col, x) {\n            col.forEach(function (value, y) {\n                if (!rows[y])\n                    rows[y] = [];\n                rows[y][x] = value !== undefined ? '1' : '0';\n            });\n            return rows;\n        }, []);\n        if (this._shape) {\n            var _a = this._shape, shapeX_1 = _a.x, shapeY_1 = _a.y, frame = _a.frame;\n            frame.forEach(function (_a) {\n                var x = _a.x, y = _a.y;\n                mapToRows[shapeY_1 + y][shapeX_1 + x] = '1';\n            });\n        }\n        return mapToRows.map(function (row) { return row.join(' '); }).join('\\n');\n    };\n    Field.prototype.addShape = function (shape) {\n        if (this._shape)\n            return false;\n        shape.x = Math.round((this.width - shape.width) / 2);\n        shape.y = 0;\n        this._shape = shape;\n        return this.move(0, 0);\n    };\n    Field.prototype.move = function (x, y) {\n        var _this = this;\n        if (!this._shape)\n            return false;\n        if (y < 0)\n            return false;\n        var _a = this._shape, shapeX = _a.x, shapeY = _a.y, frame = _a.frame;\n        var newX = shapeX + x;\n        var newY = shapeY + y;\n        var absolutePoints = frame.map(function (_a) {\n            var relativeX = _a.x, relativeY = _a.y;\n            return {\n                x: newX + relativeX,\n                y: newY + relativeY\n            };\n        });\n        var validPosition = absolutePoints.every(function (_a) {\n            var pointX = _a.x, pointY = _a.y;\n            if (pointX < 0 || pointX >= _this.width)\n                return false;\n            if (pointY < 0 || pointY >= _this.height)\n                return false;\n            return _this._map[pointX][pointY] === undefined;\n        });\n        if (validPosition) {\n            this._shape.x = newX;\n            this._shape.y = newY;\n        }\n        return validPosition;\n    };\n    Field.prototype.rotate = function (count) {\n        if (count === void 0) { count = 1; }\n        if (!this._shape)\n            return;\n        this._shape.rotate(count);\n        if (!this.move(0, 0)) {\n            this._shape.rotate(count * -1);\n        }\n    };\n    Field.prototype.step = function () {\n        var _this = this;\n        if (!this._shape)\n            return 0;\n        if (!this.move(0, 1)) {\n            var _a = this._shape, shapeX_2 = _a.x, shapeY_2 = _a.y, frame = _a.frame, color_1 = _a.color;\n            frame.forEach(function (_a) {\n                var x = _a.x, y = _a.y;\n                _this._map[shapeX_2 + x][shapeY_2 + y] = color_1;\n            });\n            this._shape = undefined;\n            return this.clearLines();\n        }\n        return -1;\n    };\n    Field.prototype.clearLines = function () {\n        var count = 0;\n        var _loop_1 = function (y) {\n            var hasLine = this_1._map.every(function (col) { return col[y] !== undefined; });\n            if (hasLine) {\n                this_1._map.forEach(function (col) {\n                    col.splice(y, 1);\n                    col.unshift(undefined);\n                });\n                count++;\n                y++;\n            }\n            out_y_1 = y;\n        };\n        var this_1 = this, out_y_1;\n        for (var y = this.height - 1; y >= 0; y--) {\n            _loop_1(y);\n            y = out_y_1;\n        }\n        return count;\n    };\n    return Field;\n}());\nexports.Field = Field;\n\n\n//# sourceURL=webpack:///./src/game/data/Field.ts?");

/***/ }),

/***/ "./src/game/data/Level.ts":
/*!********************************!*\
  !*** ./src/game/data/Level.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Level = /** @class */ (function () {\n    function Level(id, speed, minScore, maxScore, _colors) {\n        this.id = id;\n        this.speed = speed;\n        this.minScore = minScore;\n        this.maxScore = maxScore;\n        this._colors = _colors;\n        if (speed <= 0)\n            throw new RangeError('speed mast be greater than 0');\n        if (maxScore < minScore)\n            throw new RangeError('maxScore mast be greater than minScore');\n    }\n    Level.prototype.containScore = function (value) {\n        return value >= this.minScore && value < this.maxScore;\n    };\n    Level.prototype.getRandomColor = function () {\n        return this._colors[Math.floor(Math.random() * this._colors.length)];\n    };\n    return Level;\n}());\nexports.Level = Level;\n\n\n//# sourceURL=webpack:///./src/game/data/Level.ts?");

/***/ }),

/***/ "./src/game/data/Shape.ts":
/*!********************************!*\
  !*** ./src/game/data/Shape.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Shape = /** @class */ (function () {\n    function Shape(color, _data) {\n        this.color = color;\n        this._data = _data;\n        this.x = 0;\n        this.y = 0;\n        this._currentFrame = 0;\n    }\n    Object.defineProperty(Shape.prototype, \"currentFrame\", {\n        get: function () {\n            return this._currentFrame;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Shape.prototype, \"frame\", {\n        get: function () {\n            return this._data.frames[this._currentFrame];\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Shape.prototype, \"_shapeDataMap\", {\n        get: function () {\n            return this._data.shapeDataFrames[this._currentFrame];\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Shape.prototype, \"width\", {\n        get: function () {\n            return this._shapeDataMap[0].length;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Shape.prototype, \"height\", {\n        get: function () {\n            return this._shapeDataMap.length;\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Shape.prototype.rotate = function (count) {\n        if (count === void 0) { count = 1; }\n        var len = this._data.framesCount;\n        var value = (this._currentFrame + count) % len;\n        this._currentFrame = value < 0 ? len + value : value;\n    };\n    Shape.prototype.toString = function () {\n        return this._shapeDataMap.map(function (row) { return row.join(' '); }).join('\\n');\n    };\n    Shape.prototype[Symbol.iterator] = function () {\n        var i;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0:\n                    i = 0;\n                    _a.label = 1;\n                case 1:\n                    if (!(i < this.frame.length)) return [3 /*break*/, 4];\n                    return [4 /*yield*/, this.frame[i]];\n                case 2:\n                    _a.sent();\n                    _a.label = 3;\n                case 3:\n                    i++;\n                    return [3 /*break*/, 1];\n                case 4: return [2 /*return*/];\n            }\n        });\n    };\n    return Shape;\n}());\nexports.Shape = Shape;\n\n\n//# sourceURL=webpack:///./src/game/data/Shape.ts?");

/***/ }),

/***/ "./src/game/data/ShapeData.ts":
/*!************************************!*\
  !*** ./src/game/data/ShapeData.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ShapeData = /** @class */ (function () {\n    function ShapeData(shapeDataFrames) {\n        this.shapeDataFrames = shapeDataFrames;\n        this.frames = this.shapeDataFrames.map(function (shape) {\n            var shapePoints = [];\n            for (var y = 0; y < shape.length; y++) {\n                var row = shape[y];\n                for (var x = 0; x < row.length; x++) {\n                    var value = row[x];\n                    if (value > 0) {\n                        shapePoints.push({ x: x, y: y });\n                    }\n                }\n            }\n            return shapePoints;\n        });\n        this.framesCount = this.frames.length;\n    }\n    return ShapeData;\n}());\nexports.ShapeData = ShapeData;\n\n\n//# sourceURL=webpack:///./src/game/data/ShapeData.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar _this = this;\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Game_1 = __webpack_require__(/*! ./game/Game */ \"./src/game/Game.ts\");\ndocument.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {\n    var game;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, Game_1.Game.init()];\n            case 1:\n                game = _a.sent();\n                console.log(game);\n                return [2 /*return*/];\n        }\n    });\n}); });\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });