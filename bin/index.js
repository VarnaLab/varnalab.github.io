#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))

if (argv.help) {
  console.log('--render /path/to/render/location/')
  console.log('--build /path/to/build/location/')
  console.log('--env environment')
  process.exit()
}

if (argv.render && typeof argv.render !== 'string') {
  console.log('Specify --render /path/to/render/location/')
  process.exit()
}

if (argv.build && typeof argv.build !== 'string') {
  console.log('Specify --build /path/to/build/location/')
  process.exit()
}

var env = process.env.NODE_ENV || argv.env

if (!env) {
  console.log('Specify --env environment')
  process.exit()
}

var static = require('../config/static')[env]
var meta = require('../config/meta')
var base = require('../mithril/base')
var build = require('./build')(argv.build, static)

var fs = require('fs')
var path = require('path')


if (argv.render) {
  base({meta, static})
    .then((html) => {
      fs.writeFileSync(
        path.resolve(process.cwd(), argv.render, 'index.html'),
        html,
        'utf8'
      )
    })
    .catch((err) => console.error(err))
}

else if (argv.build) {

  var write = (file, data) => {
    fs.writeFileSync(
      path.resolve(process.cwd(), argv.build, file),
      data,
      'utf8'
    )
  }

  write('varnalab.min.css', build.varnalab.css())
  write('varnalab.js', build.varnalab.js())
  write('varnalab.min.js', build.varnalab.minjs())

  write('mdc.varnalab.min.css', build.mdc.css())

  build.mdc.js()
    .then((code) => {
      write('mdc.varnalab.min.js', code)
    })
}
