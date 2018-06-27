'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var container_1 = require('../container')

var token_1 = require('../token')

function ScopeService (id) {
  return function (target) {
    var service = id || token_1.default(target)
    container_1.default.addScoped(service, target)
  }
}

exports.ScopeService = ScopeService

//# sourceMappingURL=scopeService.js.map
