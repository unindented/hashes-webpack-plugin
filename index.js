/**
 * Create a new HashesPlugin that causes webpack to generate files with their
 * hash as part of the emitted assets.
 * @constructor
 * @param {String} output Pattern to output files.
 * @param {Object} options Options used to generate the hashes.
 */
var async = require('async')
var crypto = require('crypto')
var path = require('path')
var RawSource = require('webpack/lib/RawSource')

function HashesPlugin (output, options) {
  options = options || {}

  this.output = output || '[path][name]-[hash].[ext]'
  this.algorithm = options.algorithm || 'md5'
}

HashesPlugin.prototype.apply = function apply (compiler) {
  var output = this.output
  var algorithm = this.algorithm

  compiler.plugin('this-compilation', function (compilation) {
    compilation.plugin('optimize-assets', function (assets, callback) {
      async.forEach(Object.keys(assets), function (file, callback) {
        var asset = assets[file]
        var content = asset.source()

        var ext = path.extname(file)
        var base = path.basename(file, ext)
        var dir = path.dirname(file, ext)
        var hash = crypto.createHash(algorithm).update(content).digest('hex')

        var newFile = output
          .replace('[path]', (dir !== '.' ? dir + '/' : ''))
          .replace('[name]', base)
          .replace('[hash]', hash)
          .replace('[ext]', ext.substr(1))
        assets[newFile] = new RawSource(content)

        callback()
      }, callback)
    })
  })
}

module.exports = HashesPlugin
