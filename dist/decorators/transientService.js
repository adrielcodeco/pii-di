'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var container_1 = require('../container')

var token_1 = require('../token')

function TransientService (id) {
  return function (target) {
    var service = id || token_1.default(target)
    container_1.default.addTransient(service, target)
  }
}

exports.TransientService = TransientService

//# sourceMappingURL=transientService.js.map
