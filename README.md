# [Pii DI](https://github.com/adrielcodeco/pii-di)

Pii DI is a library to dependency injection implementation

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Build Status](https://travis-ci.org/adrielcodeco/pii-di.svg?branch=master)](https://travis-ci.org/adrielcodeco/pii-di)
[![Coverage Status](https://coveralls.io/repos/github/adrielcodeco/pii-di/badge.svg?branch=master)](https://coveralls.io/github/adrielcodeco/pii-di?branch=master)

[![NPM](https://nodei.co/npm/@pii/di.png)](https://npmjs.org/package/@pii/di)

## Installation

```
npm i -S @pii/di
```

## Requirements

* NodeJS version >= 6

## Documentation

* [Quick Start](https://adrielcodeco.github.io/pii-di#quick-start)
* [Examples](https://github.com/adrielcodeco/pii-di/tree/master/examples)

## Examples

Here is a simple example to get you started:

index.ts

```ts
import { Container } from '@pii/di'

Container.addSingleton('test', 12345)

const test = Container.get('test')
console.log(test)
```

### License

This project is [MIT licensed](./LICENSE).

[![js-standard-style](https://cdn.rawgit.com/standard/standard/master/badge.svg)](http://standardjs.com)