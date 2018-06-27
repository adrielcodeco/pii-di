'use strict'

function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties (target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass (Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

Object.defineProperty(exports, '__esModule', {
  value: true
})

var ServiceInstanceFactory =
  /* #__PURE__ */
  (function () {
    function ServiceInstanceFactory (type) {
      var lazyInstance =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : false

      _classCallCheck(this, ServiceInstanceFactory)

      this.type = type
      this.lazyInstance = lazyInstance
    }

    _createClass(ServiceInstanceFactory, [
      {
        key: 'newInstance',
        value: function newInstance () {
          if (!this.lazyInstance || !this._instance) {
            var Type = this.type
            this._instance = new Type()
          }

          return this._instance
        }
      }
    ])

    return ServiceInstanceFactory
  })()

exports.default = ServiceInstanceFactory

//# sourceMappingURL=factory.js.map
