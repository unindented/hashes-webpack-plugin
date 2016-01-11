var fs = require('fs')
var path = require('path')
var crypto = require('crypto')
var rimraf = require('rimraf')
var webpack = require('webpack')
var HashesPlugin = require('../')

var chai = require('chai')
var expect = chai.expect

var inputFolder = path.resolve(__dirname, 'fixtures')
var inputFile = path.resolve(inputFolder, 'entry.js')
var outputFolder = path.resolve(__dirname, 'output')
var outputFile = path.resolve(outputFolder, 'bundle.js')

var defaultCompilerOptions = {
  entry: inputFile,

  output: {
    path: outputFolder,
    filename: 'bundle.js'
  },

  plugins: [
    new HashesPlugin('[path][name]-[hash].[ext]', {
      algorithm: 'md5'
    })
  ]
}

describe('HashesWebpackPlugin', function () {
  beforeEach(function () {
    rimraf.sync(outputFolder)
  })

  it('generates normal files', function (done) {
    var compiler = webpack(defaultCompilerOptions)
    compiler.run(function (err) {
      if (err) {
        return done(err)
      }

      expect(fs.accessSync(outputFile)).to.not.throw
      done()
    })
  })

  it('generates hashed files', function (done) {
    var compiler = webpack(defaultCompilerOptions)
    compiler.run(function (err) {
      if (err) {
        return done(err)
      }

      var contents = fs.readFileSync(outputFile, 'utf-8')
      var hash = crypto.createHash('md5').update(contents).digest('hex')
      var outputHashedFile = path.resolve(outputFolder, 'bundle-' + hash + '.js')

      expect(fs.accessSync(outputHashedFile)).to.not.throw
      done()
    })
  })
})
