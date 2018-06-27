'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

var container_1 = require('../container')

var factory_1 = require('../factory')

var token_1 = require('../token')

function SingletonService (id) {
  return function (target) {
    var service = id || token_1.default(target)
    container_1.default.addSingleton(
      service,
      new factory_1.default(target, true)
    )
  }
}

exports.SingletonService = SingletonService

//# sourceMappingURL=singletonService.js.map
