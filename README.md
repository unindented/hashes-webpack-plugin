# Hashes plugin for webpack [![Version](https://img.shields.io/npm/v/hashes-webpack-plugin.svg)](https://www.npmjs.com/package/hashes-webpack-plugin) [![Build Status](https://img.shields.io/travis/unindented/hashes-webpack-plugin.svg)](http://travis-ci.org/unindented/hashes-webpack-plugin)

Generates hashed versions of all files in a compilation.


## Installation

```sh
$ npm install --save hashes-webpack-plugin
```


## Usage

```js
var HashesPlugin = require('hashes-webpack-plugin');

module.exports = {
  plugins: [
    new HashesPlugin('[path][name]-[hash].[ext]', {
      algorithm: 'md5'
    })
  ]
};
```


## API

```js
new HashesPlugin(pattern: string, [options])
```

* `pattern`: The pattern used to name the resulting files. Possible placeholders:
  * `[path]` the name of the chunk
  * `[name]` the name of the chunk
  * `[ext]` the extension of the chunk
  * `[hash]` a hash of the content of the extracted file
* `options`:
  * `algorithm` the hashing algorithm to be used


## Meta

* Code: `git clone git://github.com/unindented/hashes-webpack-plugin.git`
* Home: <https://github.com/unindented/hashes-webpack-plugin/>


## Contributors

* Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))


## License

Copyright (c) 2016 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
