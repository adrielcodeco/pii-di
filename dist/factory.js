'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
class ServiceInstanceFactory {
  constructor (type, lazyInstance = false) {
    this.type = type
    this.lazyInstance = lazyInstance
  }
  newInstance () {
    if (!this.lazyInstance || !this._instance) {
      const Type = this.type
      this._instance = new Type()
    }
    return this._instance
  }
}
exports.default = ServiceInstanceFactory

//# sourceMappingURL=factory.js.map
