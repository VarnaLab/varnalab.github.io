
var fs = require('fs')
var path = require('path')
var babel = require('babel-core')
var csso = require('csso')
var uglify = require('uglify-js')
var build = require('./mdc-build')()


module.exports = (tpath, static) => {

  var varnalab = {

    // varnalab.min.css
    css: () =>
      ['light', 'shadow', 'hacker', 'varnalab']
        .reduce((styles, file) => styles +=
          csso.minify(
            fs.readFileSync(
              path.resolve(__dirname, `../assets/css/${file}.css`), 'utf8')
          )
          .css + '\n',
          ''
        )
    ,

    // varnalab.js
    js: (
      options = {
        presets: ['es2015'],
        comments: false,
        compact: true,
        minified: true
      }) =>
      babel.transformFileSync(
        path.resolve(__dirname, '../mithril/index.js'), options
      ).code + '\n'
      +
      ['components', 'modules', 'routes', 'views']
        .reduce((code, dir) =>
          code += fs.readdirSync(path.resolve(__dirname, `../mithril/${dir}/`))
            .map((file) =>
              babel.transformFileSync(
                path.resolve(__dirname, `../mithril/${dir}/`, file), options
              ).code
            ).join('\n') + '\n',
          ''
        )
    ,

    // varnalab.min.js
    minjs: (
      options = {
        compress: {},
        mangle: true
      }) =>
      uglify.minify(
        fs.readFileSync(
          path.resolve(process.cwd(), tpath, 'varnalab.js'),
          'utf8'
        ),
        options
      ).code
  }

  var mdc = {

    // mdc.varnalab.min.css
    css: () => static.css
      .filter((file) => /@material/.test(file))
      .reduce((styles, file) =>
        styles += fs.readFileSync(path.resolve(__dirname, '../', file), 'utf8'),
        ''
      )
    ,

    // mdc.varnalab.min.js
    js: () =>
      build.bundle(path.resolve(__dirname, 'mdc.js'))
        .then((code) => {
          var transpiled = build.transpile(code)
          var minified = build.minify(transpiled)
          return minified
        })
  }

  return {varnalab, mdc}
}
