'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

function describe (Identifier) {
  var instance = Identifier.prototype ? new Identifier() : Identifier
  var target = Identifier.prototype || Identifier
  return Reflect.ownKeys(target)
    .concat(Object.keys(target))
    .concat(Object.getOwnPropertyNames(instance))
    .filter(function (v, i, a) {
      return a.indexOf(v) === i && v !== 'constructor'
    })
}

function Token (identifier) {
  if (!identifier) {
    throw new Error('invalid token identifier')
  }

  if (typeof identifier === 'string') {
    return 'Token('.concat(identifier, ')')
  }

  var keys = describe(identifier)
  return 'Token('
    .concat(identifier.name || '', '{')
    .concat(keys.join(','), '})')
}

exports.default = Token

//# sourceMappingURL=token.js.map
