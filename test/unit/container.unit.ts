/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-env jest */

export {}

const Token = require('../../src/token').default

const requireTest = () => {
  jest.resetModules()
  Reflect.deleteProperty(global, 'pii_di_global_container')
  Reflect.deleteProperty(global, 'pii_di_singleton_container')
  Reflect.deleteProperty(global, 'pii_di_transient_container')
  return require('../../src/container').default
}

test('require', () => {
  expect.assertions(1)
  expect(() => {
    requireTest()
  }).not.toThrow()
})

const testFoundValueOnScope = (
  makeTest: (f: (c: any) => any, key: () => any) => void
) => {
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
}

const testFoundValueOnSingleton = (
  makeTest: (f: (c: any) => any, key: () => any) => void
) => {
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
}

const testFoundValueOnTransient = (
  makeTest: (f: (c: any) => any, key: () => any) => void
) => {
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

const testNotFoundValue = (
  method: (c: any) => any,
  ex: (e: any) => any
) => {
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
      ex(
        expect(
          method(Container)(function Test () {
            /* does nothing */
          })
        )
      )
    })

    test('for Class service key', () => {
      expect.assertions(1)
      const Container = requireTest()
      ex(expect(method(Container)(class Test {})))
    })
  })
}

describe('happy path', () => {
  describe('call has', () => {
    testNotFoundValue(c => c.has, ex => ex.toBeFalsy())

    describe('value found', () => {
      const makeTest = (add: any, key: any) => {
        expect.assertions(1)
        const Container = requireTest()
        add(Container)(key(), 1000)
        expect(Container.has(key())).toBeTruthy()
      }
      testFoundValueOnScope(makeTest)
      testFoundValueOnSingleton(makeTest)
      testFoundValueOnTransient(makeTest)
    })
  })

  describe('call get', () => {
    testNotFoundValue(c => c.get, ex => ex.toBeUndefined())

    describe('value found', () => {
      const makeTest = (add: any, key: any) => {
        expect.assertions(1)
        const Container = requireTest()
        add(Container)(key(), 1000)
        add(Container)(key(), 1001)
        add(Container)(key(), 1002)
        expect(Container.get(key())).toEqual(1000)
      }
      testFoundValueOnScope(makeTest)
      testFoundValueOnSingleton((add: any, key: any) => {
        expect.assertions(1)
        const Container = requireTest()
        add(Container)(key(), 1000)
        add(Container)(key(), 1001)
        add(Container)(key(), 1002)
        expect(Container.get(key())).toEqual(1002)
      })
      testFoundValueOnTransient(makeTest)
    })
  })

  describe('call getServices', () => {
    testNotFoundValue(c => c.getServices, ex => ex.toEqual([]))

    describe('value found', () => {
      const makeTest = (add: any, key: any) => {
        expect.assertions(1)
        const Container = requireTest()
        add(Container)(key(), 1000)
        add(Container)(key(), 1001)
        add(Container)(key(), 1002)
        expect(Container.getServices(key())).toEqual([1000, 1001, 1002])
      }
      testFoundValueOnScope(makeTest)
      testFoundValueOnSingleton((add: any, key: any) => {
        expect.assertions(1)
        const Container = requireTest()
        add(Container)(key(), 1000)
        add(Container)(key(), 1001)
        add(Container)(key(), 1002)
        expect(Container.getServices(key())).toEqual([1002])
      })
      testFoundValueOnTransient(makeTest)
    })
  })

  describe('call add', () => {
    const value = { test: '@pii' }
    const makeTest = (key: any) => {
      expect.assertions(1)
      const Container = requireTest()
      Container.add(key, value)
      expect(Container.get(key)).toEqual(value)
    }

    test('for string service key', () => {
      makeTest('test')
    })

    test('for symbol service key', () => {
      makeTest(Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(Token('test'))
    })
  })

  describe('call addScoped', () => {
    const value = { test: '@pii' }
    const makeTest = (key: any) => {
      expect.assertions(1)
      const Container = requireTest()
      Container.addScoped(key, value)
      expect(Container.get(key)).toEqual(value)
    }

    test('for string service key', () => {
      makeTest('test')
    })

    test('for symbol service key', () => {
      makeTest(Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(Token('test'))
    })
  })

  describe('call addTransient', () => {
    describe('with object value', () => {
      const value = { test: '@pii' }
      const makeTest = (key: any) => {
        expect.assertions(1)
        const Container = requireTest()
        Container.addTransient(key, value)
        expect(Container.get(key)).toEqual(value)
      }

      test('for string service key', () => {
        makeTest('test')
      })

      test('for symbol service key', () => {
        makeTest(Symbol.for('test'))
      })

      test('for Token service key', () => {
        makeTest(Token('test'))
      })
    })

    describe('with class value', () => {
      const value = class Test {
        public test: number
        constructor () {
          this.test = Math.random()
        }
      }
      const makeTest = (key: any) => {
        expect.assertions(1)
        const Container = requireTest()
        Container.addTransient(key, value)
        expect(Container.get(key)).toBeInstanceOf(value)
      }

      test('for string service key', () => {
        makeTest('test')
      })

      test('for symbol service key', () => {
        makeTest(Symbol.for('test'))
      })

      test('for Token service key', () => {
        makeTest(Token('test'))
      })
    })

    describe('with ServiceInstanceFactory value', () => {
      const value = class Test {
        public test: number
        constructor () {
          this.test = Math.random()
        }
      }
      const makeTest = (key: any) => {
        expect.assertions(1)
        const Container = requireTest()
        const ServiceInstanceFactory = require('../../src/factory').default
        Container.addTransient(key, new ServiceInstanceFactory(value))
        expect(Container.get(key)).toBeInstanceOf(value)
      }

      test('for string service key', () => {
        makeTest('test')
      })

      test('for symbol service key', () => {
        makeTest(Symbol.for('test'))
      })

      test('for Token service key', () => {
        makeTest(Token('test'))
      })
    })

    test('with service Type', () => {
      class Test {
        test: number = Math.random()
      }
      expect.assertions(1)
      const Container = requireTest()
      Container.addTransient(Test)
      expect(Container.get(Test)).toBeInstanceOf(Test)
    })

    describe('with service Factory', () => {
      class Test {
        test: number = Math.random()
      }
      const makeTest = (key: any) => {
        expect.assertions(2)
        const Container = requireTest()
        const test = new Test()
        Container.addTransient({ service: key, maker: () => test })
        expect(Container.get(key)).toBeInstanceOf(Test)
        expect(Container.get(key)).toStrictEqual(test)
      }

      test('for string service key', () => {
        makeTest('test')
      })

      test('for symbol service key', () => {
        makeTest(Symbol.for('test'))
      })

      test('for Token service key', () => {
        makeTest(Token('test'))
      })

      test('for Class service key', () => {
        makeTest(Test)
      })
    })
  })

  describe('call addSingleton', () => {
    const makeTest = (key: any) => {
      expect.assertions(2)
      const Container = requireTest()
      expect(Container.has(key)).toBeFalsy()
      Container.addSingleton(key, 1001)
      Container.addSingleton(key, 1002)
      expect(Container.get(key)).toEqual(1002)
    }

    test('for string service key', () => {
      makeTest('test')
    })

    test('for symbol service key', () => {
      makeTest(Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(Token('test'))
    })
  })

  describe('call addSingleton with replace = false', () => {
    const makeTest = (key: any) => {
      expect.assertions(3)
      const Container = requireTest()
      expect(Container.has(key)).toBeFalsy()
      Container.addSingleton(key, 1001, false)
      Container.addSingleton(key, 1002, false)
      expect(Container.get(key)).toEqual(1001)
      expect(Container.getServices(key)).toEqual([1001, 1002])
    }

    test('for string service key', () => {
      makeTest('test')
    })

    test('for symbol service key', () => {
      makeTest(Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(Token('test'))
    })
  })

  describe('call removeScoped', () => {
    const value = { test: '@pii' }
    const makeTest = (key: any) => {
      expect.assertions(4)
      const Container = requireTest()
      expect(Container.has(key)).toBeFalsy()
      Container.addScoped(key, value)
      expect(Container.has(key)).toBeTruthy()
      expect(Container.removeScoped(key)).toBeTruthy()
      expect(Container.has(key)).toBeFalsy()
    }

    test('for string service key', () => {
      makeTest('test')
    })

    test('for symbol service key', () => {
      makeTest(Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(Token('test'))
    })
  })

  describe('call removeScoped when service not exists in container', () => {
    const makeTest = (key: any) => {
      expect.assertions(3)
      const Container = requireTest()
      expect(Container.has(key)).toBeFalsy()
      expect(Container.removeScoped(key)).toBeFalsy()
      expect(Container.has(key)).toBeFalsy()
    }

    test('for string service key', () => {
      makeTest('test')
    })

    test('for symbol service key', () => {
      makeTest(Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(Token('test'))
    })
  })

  describe('call removeTransient', () => {
    const value = { test: '@pii' }
    const makeTest = (key: any) => {
      expect.assertions(4)
      const Container = requireTest()
      expect(Container.has(key)).toBeFalsy()
      Container.addTransient(key, value)
      expect(Container.has(key)).toBeTruthy()
      expect(Container.removeTransient(key)).toBeTruthy()
      expect(Container.has(key)).toBeFalsy()
    }

    test('for string service key', () => {
      makeTest('test')
    })

    test('for symbol service key', () => {
      makeTest(Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(Token('test'))
    })
  })

  describe('call removeTransient when service not exists in container', () => {
    const makeTest = (key: any) => {
      expect.assertions(3)
      const Container = requireTest()
      expect(Container.has(key)).toBeFalsy()
      expect(Container.removeTransient(key)).toBeFalsy()
      expect(Container.has(key)).toBeFalsy()
    }

    test('for string service key', () => {
      makeTest('test')
    })

    test('for symbol service key', () => {
      makeTest(Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(Token('test'))
    })
  })

  describe('call removeSingleton', () => {
    const value = { test: '@pii' }
    const makeTest = (key: any) => {
      expect.assertions(4)
      const Container = requireTest()
      expect(Container.has(key)).toBeFalsy()
      Container.addSingleton(key, value)
      expect(Container.has(key)).toBeTruthy()
      expect(Container.removeSingleton(key)).toBeTruthy()
      expect(Container.has(key)).toBeFalsy()
    }

    test('for string service key', () => {
      makeTest('test')
    })

    test('for symbol service key', () => {
      makeTest(Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(Token('test'))
    })
  })

  describe('call removeSingleton when service not exists in container', () => {
    const makeTest = (key: any) => {
      expect.assertions(3)
      const Container = requireTest()
      expect(Container.has(key)).toBeFalsy()
      expect(Container.removeSingleton(key)).toBeFalsy()
      expect(Container.has(key)).toBeFalsy()
    }

    test('for string service key', () => {
      makeTest('test')
    })

    test('for symbol service key', () => {
      makeTest(Symbol.for('test'))
    })

    test('for Token service key', () => {
      makeTest(Token('test'))
    })
  })
})
