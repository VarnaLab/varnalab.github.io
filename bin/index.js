#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log('--render')
  console.log('--build /path/to/build/location/')
  console.log('--env')
  process.exit()
}

var env = process.env.NODE_ENV || argv.env || 'development'
var static = require('../config/static')[env]
var meta = require('../config/meta')
var base = require('../mithril/base')

var fs = require('fs')
var path = require('path')


if (argv.render) {
  base({meta, static})
    .then((html) => {
      fs.writeFileSync(path.resolve(__dirname, '../index.html'), html, 'utf8')
    })
    .catch((err) => console.error(err))
}

else if (argv.build) {

  // varnalab.min.css

  var csso = require('csso')

  fs.writeFileSync(
    path.resolve(process.cwd(), argv.build, 'varnalab.min.css'),
    csso.minify(
      fs.readFileSync(path.resolve(__dirname, '../assets/css/varnalab.css'), 'utf8')
    ).css,
    'utf8'
  )

  // varnalab.js

  var babel = require('babel-core')

  var options = {
    presets: ['es2015'],
    comments: false,
    compact: true,
    minified: true
  }

  fs.writeFileSync(
    path.resolve(process.cwd(), argv.build, 'varnalab.js'),

    babel.transformFileSync(
      path.resolve(__dirname, '../mithril/index.js'), options
    ).code + '\n' +

    babel.transformFileSync(
      path.resolve(__dirname, '../mithril/layout.js'), options
    ).code + '\n' +

    fs.readdirSync(path.resolve(__dirname, '../mithril/modules/'))
      .map((file) =>
        babel.transformFileSync(
          path.resolve(__dirname, '../mithril/modules/', file), options
        ).code
      ).join('\n') + '\n' +

    fs.readdirSync(path.resolve(__dirname, '../mithril/routes/'))
      .map((file) =>
        babel.transformFileSync(
          path.resolve(__dirname, '../mithril/routes/', file), options
        ).code
      ).join('\n') + '\n' +

    fs.readdirSync(path.resolve(__dirname, '../mithril/views/'))
      .map((file) =>
        babel.transformFileSync(
          path.resolve(__dirname, '../mithril/views/', file), options
        ).code
      ).join('\n'),

    'utf8'
  )

  // varnalab.min.js

  var minify = require('uglify-js').minify

  var options = {
    compress: {},
    mangle: true
  }

  fs.writeFileSync(
    path.resolve(process.cwd(), argv.build, 'varnalab.min.js'),
    minify(
      fs.readFileSync(
        path.resolve(process.cwd(), argv.build, 'varnalab.js'),
        'utf8'
      ),
      options
    ).code,
    'utf8'
  )

  // mdc.varnalab.css
  fs.writeFileSync(
    path.resolve(process.cwd(), argv.build, 'mdc.varnalab.min.css'),

    static.css
      .filter((file) => /@material/.test(file))
      .reduce((css, file) => (
        css += fs.readFileSync(path.resolve(__dirname, '../', file), 'utf8'),
        css
      ), ''),

    'utf8'
  )

  // mdc.varnalab.js
  fs.writeFileSync(
    path.resolve(process.cwd(), argv.build, 'mdc.varnalab.min.js'),

    static.js
      .filter((file) => /@material/.test(file))
      .reduce((js, file) => (
        js += fs.readFileSync(path.resolve(__dirname, '../', file), 'utf8'),
        js
      ), ''),

    'utf8'
  )
}
