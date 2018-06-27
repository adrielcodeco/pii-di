/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Container from '../container'
import Token from '../token'

export function TransientService (id?: string | Symbol): Function {
  return function (target: Function) {
    const service = id || Token(target)
    Container.addTransient(service, target)
  }
}
