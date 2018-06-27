'use strict'

function _typeof (obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof (obj) {
      return typeof obj
    }
  } else {
    _typeof = function _typeof (obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj
    }
  }
  return _typeof(obj)
}

Object.defineProperty(exports, '__esModule', {
  value: true
})

function cast (value) {
  return value
}

exports.cast = cast

function isString (value) {
  return typeof value === 'string'
}

exports.isString = isString

function isSymbol (value) {
  return _typeof(value) === 'symbol'
}

exports.isSymbol = isSymbol

//# sourceMappingURL=util.js.map
