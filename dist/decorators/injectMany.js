'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

require('reflect-metadata')

var container_1 = require('../container')

function InjectMany (option) {
  return function (target, propertyName, index) {
    var service = option || propertyName

    var getter = function getter () {
      return container_1.default.getServices(service)
    }

    var setter = function setter (newVal) {
      throw new Error('This property has been injected, can not be setted')
    }

    Reflect.deleteProperty(target, propertyName)
    Object.defineProperty(target, propertyName, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}

exports.InjectMany = InjectMany

//# sourceMappingURL=injectMany.js.map