/**
 * Copyright 2018-present, CODECO. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Container from './container'

export { default as Container } from './container'
export { default as Token } from './token'
export * from './decorators'

const containerKey = '(@pii/di).filename'
const containers = Container.getServices(containerKey)
if (!containers.includes(__filename)) {
  Container.addTransient(containerKey, __filename)
}
