'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
require('reflect-metadata')
const container_1 = require('../container')
function InjectMany (option) {
  return function (target, propertyName, index) {
    const service = option || propertyName
    let getter = function () {
      return container_1.default.getServices(service)
    }
    let setter = function (newVal) {
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
