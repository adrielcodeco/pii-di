/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

const Token = require('../dist/token').default

const requireTest = () => {
  jest.resetModules()
  return require('../dist/container').default
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

const testFoundValue = makeTest => {
  describe('on scope', () => {
    test('for string service key', () => {
      makeTest(c => c.addScoped, () => 'test')
    })

    test('for symbol service key', () => {
      makeTest(c => c.addScoped, () => Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(c => c.addScoped, () => Token('test'))
    })
  })

  describe('on singleton', () => {
    test('for string service key', () => {
      makeTest(c => c.addSingleton, () => 'test')
    })

    test('for symbol service key', () => {
      makeTest(c => c.addSingleton, () => Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(c => c.addSingleton, () => Token('test'))
    })
  })

  describe('on transient', () => {
    test('for string service key', () => {
      makeTest(c => c.addTransient, () => 'test')
    })

    test('for symbol service key', () => {
      makeTest(c => c.addTransient, () => Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(c => c.addTransient, () => Token('test'))
    })
  })
}

const testNotFoundValue = (method, ex) => {
  describe('value not found', () => {
    test('for string service key', () => {
      expect.assertions(1)
      const Container = requireTest()
      ex(expect(method(Container)('test')))
    })

    test('for symbol service key', () => {
      expect.assertions(1)
      const Container = requireTest()
      ex(expect(method(Container)(Symbol('test'))))
    })

    test('for Token service key', () => {
      expect.assertions(1)
      const Container = requireTest()
      ex(expect(method(Container)(Token('test'))))
    })

    test('for Function service key', () => {
      expect.assertions(1)
      const Container = requireTest()
      ex(expect(method(Container)(function Test () { /* does nothing */ })))
    })

    test('for Class service key', () => {
      expect.assertions(1)
      const Container = requireTest()
      ex(expect(method(Container)(class Test { })))
    })
  })
}

describe('happy path', () => {
  describe('call has', () => {
    testNotFoundValue(c => c.has, ex => ex.toBeFalsy())

    describe('value found', () => {
      const makeTest = (add, key) => {
        expect.assertions(1)
        const Container = requireTest()
        add(Container)(key(), 1000)
        expect(Container.has(key())).toBeTruthy()
      }
      testFoundValue(makeTest)
    })
  })

  describe('call get', () => {
    testNotFoundValue(c => c.get, ex => ex.toBeUndefined())

    describe('value found', () => {
      const makeTest = (add, key) => {
        expect.assertions(1)
        const Container = requireTest()
        add(Container)(key(), 1000)
        expect(Container.get(key())).toEqual(1000)
      }
      testFoundValue(makeTest)
    })
  })

  describe('call getServices', () => {
    testNotFoundValue(c => c.getServices, ex => ex.toEqual([]))

    describe('value found', () => {
      const makeTest = (add, key) => {
        expect.assertions(1)
        const Container = requireTest()
        add(Container)(key(), 1000)
        add(Container)(key(), 1001)
        add(Container)(key(), 1002)
        expect(Container.getServices(key())).toEqual([1000, 1001, 1002])
      }
      testFoundValue(makeTest)
    })
  })

  describe('call add', () => {
    const value = { test: '@pii' }
    const makeTest = (add, key) => {
      expect.assertions(1)
      const Container = requireTest()
      add(Container)(key(), value)
      expect(Container.get(key())).toEqual(value)
    }

    test('for string service key', () => {
      makeTest(c => c.add, () => 'test')
    })

    test('for symbol service key', () => {
      makeTest(c => c.add, () => Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(c => c.add, () => Token('test'))
    })
  })

  describe('call addScoped', () => {
    const value = { test: '@pii' }
    const makeTest = (add, key) => {
      expect.assertions(1)
      const Container = requireTest()
      add(Container)(key(), value)
      expect(Container.get(key())).toEqual(value)
    }

    test('for string service key', () => {
      makeTest(c => c.addScoped, () => 'test')
    })

    test('for symbol service key', () => {
      makeTest(c => c.addScoped, () => Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(c => c.addScoped, () => Token('test'))
    })
  })

  describe('call addTransient', () => {
    describe('with object value', () => {
      const value = { test: '@pii' }
      const makeTest = (key) => {
        expect.assertions(1)
        const Container = requireTest()
        Container.addTransient(key(), value)
        expect(Container.get(key())).toEqual(value)
      }

      test('for string service key', () => {
        makeTest(() => 'test')
      })

      test('for symbol service key', () => {
        makeTest(() => Symbol.for('test'))
      })

      test('for Token service key', () => {
        makeTest(() => Token('test'))
      })
    })

    describe('with class value', () => {
      const value = class Test {
        constructor () {
          this.test = Math.random()
        }
      }
      const makeTest = (key) => {
        expect.assertions(1)
        const Container = requireTest()
        Container.addTransient(key(), value)
        expect(Container.get(key())).toBeInstanceOf(value)
      }

      test('for string service key', () => {
        makeTest(() => 'test')
      })

      test('for symbol service key', () => {
        makeTest(() => Symbol.for('test'))
      })

      test('for Token service key', () => {
        makeTest(() => Token('test'))
      })
    })

    describe('with ServiceInstanceFactory value', () => {
      const value = class Test {
        constructor () {
          this.test = Math.random()
        }
      }
      const makeTest = (key) => {
        expect.assertions(1)
        const Container = requireTest()
        const ServiceInstanceFactory = require('../dist/factory').default
        Container.addTransient(key(), new ServiceInstanceFactory(value))
        expect(Container.get(key())).toBeInstanceOf(value)
      }

      test('for string service key', () => {
        makeTest(() => 'test')
      })

      test('for symbol service key', () => {
        makeTest(() => Symbol.for('test'))
      })

      test('for Token service key', () => {
        makeTest(() => Token('test'))
      })
    })
  })

  describe('call addSingleton', () => {
    const value = { test: '@pii' }
    const makeTest = (add, key) => {
      expect.assertions(1)
      const Container = requireTest()
      add(Container)(key(), value)
      expect(Container.get(key())).toEqual(value)
    }

    test('for string service key', () => {
      makeTest(c => c.addSingleton, () => 'test')
    })

    test('for symbol service key', () => {
      makeTest(c => c.addSingleton, () => Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(c => c.addSingleton, () => Token('test'))
    })
  })
})
