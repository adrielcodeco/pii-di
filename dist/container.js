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

var factory_1 = require('./factory')

var token_1 = require('./token')

var keyValue_1 = require('./keyValue')

var util_1 = require('./util')

var globalContainerKey = 'pii_di_container'

var initializeGLobal = function initializeGLobal (_global) {
  _global[globalContainerKey] = []
}

initializeGLobal(global)
var globalContainer = Reflect.get(global, globalContainerKey)
var singletonContainer = []
var transientContainer = []

function findService (container, service) {
  if (!container) return undefined
  return container
    .filter(function (s) {
      return s.key === service
    })
    .find(function () {
      return true
    })
}

function scopeService (service) {
  return findService(globalContainer, service)
}

function singletonService (service) {
  return findService(singletonContainer, service)
}

function transientService (service) {
  return findService(transientContainer, service)
}

function addOneOrMany (container, service, value) {
  var keyValue = findService(container, service)

  if (keyValue) {
    if (keyValue.value instanceof Array) {
      keyValue.value.push(value)
    } else {
      container.splice(
        container.indexOf(keyValue),
        1,
        new keyValue_1.default(service, [keyValue.value, value])
      )
    }
  } else {
    container.push(new keyValue_1.default(service, value))
  }
}

function getInstanceOrValue (container, service) {
  var keyValue = findService(container, service)

  if (!keyValue) {
    return []
  }

  var values =
    keyValue.value instanceof Array ? keyValue.value : [keyValue.value]

  var mapValues = function mapValues (Value) {
    if (Value instanceof factory_1.default) {
      return util_1.cast(Value).newInstance()
    } else if (
      typeof Value === 'function' &&
      Value.prototype &&
      Value.prototype.constructor
    ) {
      return new Value()
    } else {
      return util_1.cast(Value)
    }
  }

  return values.map(mapValues).filter(function (value) {
    return !!value
  })
}

function getContainer (service) {
  if (scopeService(service)) {
    return globalContainer
  }

  if (singletonService(service)) {
    return singletonContainer
  }

  if (transientService(service)) {
    return transientContainer
  }

  return undefined
}

var Container =
  /* #__PURE__ */
  (function () {
    function Container () {
      _classCallCheck(this, Container)
    }

    _createClass(Container, null, [
      {
        key: 'has',
        value: function has (identifier) {
          var service =
            util_1.isString(identifier) || util_1.isSymbol(identifier)
              ? util_1.cast(identifier)
              : token_1.default(util_1.cast(identifier))
          return (
            !!scopeService(service) ||
            !!singletonService(service) ||
            !!transientService(service)
          )
        }
      },
      {
        key: 'get',
        value: function get (identifier) {
          var service =
            util_1.isString(identifier) || util_1.isSymbol(identifier)
              ? util_1.cast(identifier)
              : token_1.default(util_1.cast(identifier))
          var container = getContainer(service)
          return getInstanceOrValue(container, service).find(function () {
            return true
          })
        }
      },
      {
        key: 'getServices',
        value: function getServices (identifier) {
          var service =
            util_1.isString(identifier) || util_1.isSymbol(identifier)
              ? util_1.cast(identifier)
              : token_1.default(util_1.cast(identifier))
          var container = getContainer(service)
          return getInstanceOrValue(container, service)
        }
      },
      {
        key: 'add',
        value: function add (service, value) {
          addOneOrMany(singletonContainer, service, value)
        }
      },
      {
        key: 'addScoped',
        value: function addScoped (service, value) {
          addOneOrMany(globalContainer, service, value)
        }
      },
      {
        key: 'addTransient',
        value: function addTransient (service, value) {
          addOneOrMany(transientContainer, service, value)
        }
      },
      {
        key: 'addSingleton',
        value: function addSingleton (service, value) {
          addOneOrMany(singletonContainer, service, value)
        }
      }
    ])

    return Container
  })()

exports.default = Container

//# sourceMappingURL=container.js.map
