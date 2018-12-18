/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

import 'reflect-metadata'
import Token from '../../../src/token'

export {}

const requireTest = () => {
  jest.resetModules()
  Reflect.deleteProperty(global, 'pii_di_global_container')
  Reflect.deleteProperty(global, 'pii_di_singleton_container')
  Reflect.deleteProperty(global, 'pii_di_transient_container')
  return require('../../../src/decorators/injectMany').InjectMany
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

const testWithoutIdentifier = (
  method: ((c: any) => any),
  result: any,
  replace?: any
) => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../../src/container').default
  method(Container)('id', 1000, replace)
  method(Container)('id', 1001, replace)
  method(Container)('id', 1002, replace)
  class Test {
    @InjectMany()
    id!: number[]
  }
  const test = new Test()
  expect(test.id).toEqual(result)
}

describe('inject without identifier', () => {
  test('with singleton(replace = false) Container', () => {
    testWithoutIdentifier(c => c.addSingleton, [1000, 1001, 1002], false)
  })

  test('with singleton(replace = true) Container', () => {
    testWithoutIdentifier(c => c.addSingleton, [1002], true)
  })

  test('with transient Container', () => {
    testWithoutIdentifier(c => c.addTransient, [1000, 1001, 1002])
  })

  test('with scoped Container', () => {
    testWithoutIdentifier(c => c.addScoped, [1000, 1001, 1002])
  })
})

const testWithIdentifier = (
  method: ((c: any) => any),
  identifier: any,
  result: any,
  replace?: boolean
) => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../../src/container').default
  method(Container)(identifier, 1000, replace)
  method(Container)(identifier, 1001, replace)
  method(Container)(identifier, 1002, replace)
  class Test {
    @InjectMany(identifier)
    id!: number[]
  }
  const test = new Test()
  expect(test.id).toEqual(result)
}

describe('inject with string identifier', () => {
  test('with singleton(replace = false) Container', () => {
    testWithIdentifier(c => c.addSingleton, 'test', [1000, 1001, 1002], false)
  })

  test('with singleton(replace = true) Container', () => {
    testWithIdentifier(c => c.addSingleton, 'test', [1002], true)
  })

  test('with transient Container', () => {
    testWithIdentifier(c => c.addTransient, 'test', [1000, 1001, 1002])
  })

  test('with scoped Container', () => {
    testWithIdentifier(c => c.addScoped, 'test', [1000, 1001, 1002])
  })
})

describe('inject with symbol identifier', () => {
  test('with singleton(replace = false) Container', () => {
    testWithIdentifier(
      c => c.addSingleton,
      Symbol.for('test'),
      [1000, 1001, 1002],
      false
    )
  })

  test('with singleton(replace = true) Container', () => {
    testWithIdentifier(c => c.addSingleton, Symbol.for('test'), [1002], true)
  })

  test('with transient Container', () => {
    testWithIdentifier(c => c.addTransient, Symbol.for('test'), [
      1000,
      1001,
      1002
    ])
  })

  test('with scoped Container', () => {
    testWithIdentifier(c => c.addScoped, Symbol.for('test'), [
      1000,
      1001,
      1002
    ])
  })
})

describe('inject with token identifier', () => {
  test('with singleton(replace = false) Container', () => {
    testWithIdentifier(
      c => c.addSingleton,
      Token('test'),
      [1000, 1001, 1002],
      false
    )
  })

  test('with singleton(replace = true) Container', () => {
    testWithIdentifier(c => c.addSingleton, Token('test'), [1002], true)
  })

  test('with transient Container', () => {
    testWithIdentifier(c => c.addTransient, Token('test'), [1000, 1001, 1002])
  })

  test('with scoped Container', () => {
    testWithIdentifier(c => c.addScoped, Token('test'), [1000, 1001, 1002])
  })
})

const testWithClassIdentifier = (
  method: ((c: any) => any),
  replace?: boolean
) => {
  class Key {}
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../../src/container').default
  const k1 = new Key()
  const k2 = new Key()
  method(Container)(Key, k1, replace)
  method(Container)(Key, k2, replace)
  class Test {
    @InjectMany(Key)
    id2!: any[]
  }
  const test = new Test()
  expect(test.id2).toStrictEqual(replace ? [k2] : [k1, k2])
}

describe('inject with class identifier', () => {
  test('with singleton(replace = false) Container', () => {
    testWithClassIdentifier(c => c.addSingleton, false)
  })

  test('with singleton(replace = true) Container', () => {
    testWithClassIdentifier(c => c.addSingleton, true)
  })

  test('with transient Container', () => {
    testWithClassIdentifier(c => c.addTransient)
  })

  test('with scoped Container', () => {
    testWithClassIdentifier(c => c.addScoped)
  })
})

const testFailOnSetInjectedProperty = (
  method: ((c: any) => any),
  identifier: any,
  replace?: boolean
) => {
  expect.assertions(2)
  const InjectMany = requireTest()
  const Container = require('../../../src/container').default
  method(Container)(identifier, 1000, replace)
  method(Container)(identifier, 1001, replace)
  method(Container)(identifier, 1002, replace)
  class Test {
    @InjectMany(identifier)
    id?: number[]
  }
  const test = new Test()
  expect(() => {
    test.id = undefined
  }).not.toThrow()
  expect(() => {
    test.id = [1]
  }).toThrowError(/This property has been injected, can not be setted/)
}

describe('fail on set injected property', () => {
  describe('with string identifier', () => {
    test('with singleton(replace = false) Container', () => {
      testFailOnSetInjectedProperty(c => c.addSingleton, 'test', false)
    })

    test('with singleton(replace = true) Container', () => {
      testFailOnSetInjectedProperty(c => c.addSingleton, 'test', true)
    })

    test('with transient Container', () => {
      testFailOnSetInjectedProperty(c => c.addTransient, 'test')
    })

    test('with scoped Container', () => {
      testFailOnSetInjectedProperty(c => c.addScoped, 'test')
    })
  })

  describe('with symbol identifier', () => {
    test('with singleton(replace = false) Container', () => {
      testFailOnSetInjectedProperty(
        c => c.addSingleton,
        Symbol.for('test'),
        false
      )
    })

    test('with singleton(replace = true) Container', () => {
      testFailOnSetInjectedProperty(
        c => c.addSingleton,
        Symbol.for('test'),
        true
      )
    })

    test('with transient Container', () => {
      testFailOnSetInjectedProperty(c => c.addTransient, Symbol.for('test'))
    })

    test('with scoped Container', () => {
      testFailOnSetInjectedProperty(c => c.addScoped, Symbol.for('test'))
    })
  })

  describe('with token identifier', () => {
    test('with singleton(replace = false) Container', () => {
      testFailOnSetInjectedProperty(c => c.addSingleton, Token('test'), false)
    })

    test('with singleton(replace = true) Container', () => {
      testFailOnSetInjectedProperty(c => c.addSingleton, Token('test'), true)
    })

    test('with transient Container', () => {
      testFailOnSetInjectedProperty(c => c.addTransient, Token('test'))
    })

    test('with scoped Container', () => {
      testFailOnSetInjectedProperty(c => c.addScoped, Token('test'))
    })
  })
})

const testFailOnInjectOnSealedObject = (
  method: ((c: any) => any),
  identifier: any,
  replace?: boolean
) => {
  expect.assertions(1)
  const InjectMany = requireTest()
  const Container = require('../../../src/container').default
  method(Container)(identifier, 1000, replace)
  method(Container)(identifier, 1001, replace)
  method(Container)(identifier, 1002, replace)
  function sealed (target: Object, propertyName: string | symbol, index?: any) {
    Object.seal(target)
  }
  expect(() => {
    class Test {
      @InjectMany(identifier)
      @sealed
      id!: number[]
    }
    new Test()
  }).toThrowError(/Cannot define property[\s:]id, object is not extensible/)
}

describe('fail on inject on sealed object', () => {
  describe('with string identifier', () => {
    test('with singleton(replace = false) Container', () => {
      testFailOnInjectOnSealedObject(c => c.addSingleton, 'test', false)
    })

    test('with singleton(replace = true) Container', () => {
      testFailOnInjectOnSealedObject(c => c.addSingleton, 'test', true)
    })

    test('with transient Container', () => {
      testFailOnInjectOnSealedObject(c => c.addTransient, 'test')
    })

    test('with scoped Container', () => {
      testFailOnInjectOnSealedObject(c => c.addScoped, 'test')
    })
  })

  describe('with symbol identifier', () => {
    test('with singleton(replace = false) Container', () => {
      testFailOnInjectOnSealedObject(
        c => c.addSingleton,
        Symbol.for('test'),
        false
      )
    })

    test('with singleton(replace = true) Container', () => {
      testFailOnInjectOnSealedObject(
        c => c.addSingleton,
        Symbol.for('test'),
        true
      )
    })

    test('with transient Container', () => {
      testFailOnInjectOnSealedObject(c => c.addTransient, Symbol.for('test'))
    })

    test('with scoped Container', () => {
      testFailOnInjectOnSealedObject(c => c.addScoped, Symbol.for('test'))
    })
  })

  describe('with token identifier', () => {
    test('with singleton(replace = false) Container', () => {
      testFailOnInjectOnSealedObject(c => c.addSingleton, Token('test'), false)
    })

    test('with singleton(replace = true) Container', () => {
      testFailOnInjectOnSealedObject(c => c.addSingleton, Token('test'), true)
    })

    test('with transient Container', () => {
      testFailOnInjectOnSealedObject(c => c.addTransient, Token('test'))
    })

    test('with scoped Container', () => {
      testFailOnInjectOnSealedObject(c => c.addScoped, Token('test'))
    })
  })
})
