# combo-url

[![NPM version](https://img.shields.io/npm/v/combo-url.svg?style=flat)](https://npmjs.org/package/combo-url)
[![Build Status](https://img.shields.io/travis/popomore/combo-url.svg?style=flat)](https://travis-ci.org/popomore/combo-url)
[![Build Status](https://img.shields.io/coveralls/popomore/combo-url?style=flat)](https://coveralls.io/r/popomore/combo-url)
[![NPM downloads](http://img.shields.io/npm/dm/combo-url.svg?style=flat)](https://npmjs.org/package/combo-url)

resolve combo url such as `??a.js.b.js`

---

## Install

```
$ npm install combo-url -g
```

## Usage

```
var combo = require('combo-url');
combo.isCombo('http://localhost?a.js'); // false
combo.parse('http://localhost?a.js'); // null

combo.isCombo('http://localhost??a.js.b.js'); // true
combo.parse('http://localhost??a.js.b.js');

// return
// {
//  host: 'localhost',
//  ... properties parsed by require('url')
//  combo: ['/a.js', '/b.js']
// }
```

## LISENCE

Copyright (c) 2014 popomore. Licensed under the MIT license.
