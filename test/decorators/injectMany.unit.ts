/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import 'reflect-metadata'
import Token from '../../src/token'

export {}

const requireTest = () => {
  jest.resetModules()
  return require('../../src/decorators/injectMany').InjectMany
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

const testWithoutIdentifier = (method, result) => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../src/container').default
  method(Container)('id', 1000)
  method(Container)('id', 1001)
  method(Container)('id', 1002)
  class Test {
    @InjectMany() id: number[]
  }
  const test = new Test()
  expect(test.id).toEqual(result)
}

describe('inject without identifier', () => {
  test('with singleton Container', () => {
    testWithoutIdentifier(c => c.addSingleton, [1002])
  })

  test('with transient Container', () => {
    testWithoutIdentifier(c => c.addTransient, [1000, 1001, 1002])
  })

  test('with scoped Container', () => {
    testWithoutIdentifier(c => c.addScoped, [1000, 1001, 1002])
  })
})

const testWithIdentifier = (method, identifier, result) => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../src/container').default
  method(Container)(identifier, 1000)
  method(Container)(identifier, 1001)
  method(Container)(identifier, 1002)
  class Test {
    @InjectMany(identifier) id: number[]
  }
  const test = new Test()
  expect(test.id).toEqual(result)
}

describe('inject with string identifier', () => {
  test('with singleton Container', () => {
    testWithIdentifier(c => c.addSingleton, 'test', [1002])
  })

  test('with transient Container', () => {
    testWithIdentifier(c => c.addTransient, 'test', [1000, 1001, 1002])
  })

  test('with scoped Container', () => {
    testWithIdentifier(c => c.addScoped, 'test', [1000, 1001, 1002])
  })
})

describe('inject with symbol identifier', () => {
  test('with singleton Container', () => {
    testWithIdentifier(c => c.addSingleton, Symbol.for('test'), [1002])
  })

  test('with transient Container', () => {
    testWithIdentifier(c => c.addTransient, Symbol.for('test'), [
      1000,
      1001,
      1002
    ])
  })

  test('with scoped Container', () => {
    testWithIdentifier(c => c.addScoped, Symbol.for('test'), [1000, 1001, 1002])
  })
})

describe('inject with token identifier', () => {
  test('with singleton Container', () => {
    testWithIdentifier(c => c.addSingleton, Token('test'), [1002])
  })

  test('with transient Container', () => {
    testWithIdentifier(c => c.addTransient, Token('test'), [1000, 1001, 1002])
  })

  test('with scoped Container', () => {
    testWithIdentifier(c => c.addScoped, Token('test'), [1000, 1001, 1002])
  })
})

const testFailOnSetInjectedProperty = (method, identifier) => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../src/container').default
  method(Container)(identifier, 1000)
  method(Container)(identifier, 1001)
  method(Container)(identifier, 1002)
  class Test {
    @InjectMany(identifier) id: number[]
  }
  const test = new Test()
  expect(() => {
    test.id = [1]
  }).toThrowError(/This property has been injected, can not be setted/)
}

describe('fail on set injected property', () => {
  describe('with string identifier', () => {
    test('with singleton Container', () => {
      testFailOnSetInjectedProperty(c => c.addSingleton, 'test')
    })

    test('with transient Container', () => {
      testFailOnSetInjectedProperty(c => c.addTransient, 'test')
    })

    test('with scoped Container', () => {
      testFailOnSetInjectedProperty(c => c.addScoped, 'test')
    })
  })

  describe('with symbol identifier', () => {
    test('with singleton Container', () => {
      testFailOnSetInjectedProperty(c => c.addSingleton, Symbol.for('test'))
    })

    test('with transient Container', () => {
      testFailOnSetInjectedProperty(c => c.addTransient, Symbol.for('test'))
    })

    test('with scoped Container', () => {
      testFailOnSetInjectedProperty(c => c.addScoped, Symbol.for('test'))
    })
  })

  describe('with token identifier', () => {
    test('with singleton Container', () => {
      testFailOnSetInjectedProperty(c => c.addSingleton, Token('test'))
    })

    test('with transient Container', () => {
      testFailOnSetInjectedProperty(c => c.addTransient, Token('test'))
    })

    test('with scoped Container', () => {
      testFailOnSetInjectedProperty(c => c.addScoped, Token('test'))
    })
  })
})

const testFailOnInjectOnSealedObject = (method, identifier) => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../src/container').default
  method(Container)(identifier, 1000)
  method(Container)(identifier, 1001)
  method(Container)(identifier, 1002)
  function sealed (target, propertyName, index) {
    Object.seal(target)
  }
  expect(() => {
    // tslint:disable-next-line: no-unused-variable
    class Test {
      @InjectMany(identifier)
      @sealed
      id: number[]
    }
  }).toThrowError(/Cannot define property id, object is not extensible/)
}

describe('fail on inject on sealed object', () => {
  describe('with string identifier', () => {
    test('with singleton Container', () => {
      testFailOnInjectOnSealedObject(c => c.addSingleton, 'test')
    })

    test('with transient Container', () => {
      testFailOnInjectOnSealedObject(c => c.addTransient, 'test')
    })

    test('with scoped Container', () => {
      testFailOnInjectOnSealedObject(c => c.addScoped, 'test')
    })
  })

  describe('with symbol identifier', () => {
    test('with singleton Container', () => {
      testFailOnInjectOnSealedObject(c => c.addSingleton, Symbol.for('test'))
    })

    test('with transient Container', () => {
      testFailOnInjectOnSealedObject(c => c.addTransient, Symbol.for('test'))
    })

    test('with scoped Container', () => {
      testFailOnInjectOnSealedObject(c => c.addScoped, Symbol.for('test'))
    })
  })

  describe('with token identifier', () => {
    test('with singleton Container', () => {
      testFailOnInjectOnSealedObject(c => c.addSingleton, Token('test'))
    })

    test('with transient Container', () => {
      testFailOnInjectOnSealedObject(c => c.addTransient, Token('test'))
    })

    test('with scoped Container', () => {
      testFailOnInjectOnSealedObject(c => c.addScoped, Token('test'))
    })
  })
})
