/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'reflect-metadata'
import { isClass } from '@pii/utils'
import Token from '../token'

export default function InjectFunction (
  containerServiceGetter: (identifier: any) => any,
  identifier?: any
): Function {
  return function (target: Object, propertyName: string | symbol, index?: any) {
    let type!: string
    let services!: any[]
    if (
      typeof identifier !== 'string' &&
      typeof identifier !== 'symbol' &&
      isClass(identifier)
    ) {
      services = [identifier, Token(identifier)]
    } else {
      type = Reflect.getMetadata('design:type', target, propertyName)
      services = [identifier, type, Token(type), propertyName]
    }
    // let _val = target[propertyName]
    let getter = function () {
      return services
        .filter(s => s)
        .map(s => containerServiceGetter(s))
        .find((s: any) => s)
    }
    let setter = function (newVal: any) {
      if (!newVal) return
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
