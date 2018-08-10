/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Class } from '@pii/utils'

function describe (Identifier: Class<any> | Function) {
  const instance = Identifier.prototype
    ? new (Identifier as Class<any>)()
    : Identifier
  const target = Identifier.prototype || Identifier
  return Reflect.ownKeys(target)
    .concat(Object.keys(target))
    .concat(Object.getOwnPropertyNames(instance))
    .filter(
      (v, i, a) =>
        a.indexOf(v) === i && v !== 'constructor' && typeof v !== 'symbol'
    )
}

export default function Token (
  identifier: string | Function | Class<any>
): string {
  if (!identifier) {
    throw new Error('invalid token identifier')
  }
  if (typeof identifier === 'string') {
    return `Token(${identifier})`
  }
  const keys = describe(identifier)
  return `Token(${identifier.name || ''}{${keys.join(',')}})`
}
