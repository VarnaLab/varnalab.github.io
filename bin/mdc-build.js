
var rollup = require('rollup')
var common = require('rollup-plugin-commonjs')
var resolve = require('rollup-plugin-node-resolve')
var babel = require('babel-core')
var uglify = require('uglify-js')


module.exports = () => {

  var bundle = async (entry) => {
    var options = {
      entry,
      plugins: [
        common(),
        resolve(),
      ]
    }

    var bundle = await rollup.rollup(options)

    var config = {
      format: 'iife',
      moduleName: 'mdc',
      context: 'window',
      moduleContext: {id: 'window'},
    }

    var bundled = await bundle.generate(config)

    return bundled.code
  }

  var transpile = (code) => {
    var options = {
      presets: ['es2015'],
      // comments: false,
      // compact: true,
      // minified: true
    }

    var transpiled = babel.transform(code, options)

    return transpiled.code
  }

  var minify = (code) => {
    var options = {
      compress: {},
      mangle: true
    }

    var minified = uglify.minify(code, options)

    return minified.code
  }

  return {bundle, transpile, minify}
}
