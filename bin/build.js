
var fs = require('fs')
var path = require('path')
var babel = require('babel-core')
var csso = require('csso')
var uglify = require('uglify-js')


module.exports = (tpath, static) => {

  var varnalab = {

    // varnalab.min.css
    css: () =>
      ['light', 'shadow', 'hacker']
        .reduce((styles, theme) => styles +=
          csso.minify(
            fs.readFileSync(
              path.resolve(__dirname, `../assets/css/${theme}.css`), 'utf8')
          )
          .css + '\n',
          ''
        )
      +
      csso.minify(
        fs.readFileSync(
          path.resolve(__dirname, '../assets/css/varnalab.css'), 'utf8')
      ).css
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
      }) => {
      uglify.minify(
        fs.readFileSync(
          path.resolve(process.cwd(), tpath, 'varnalab.js'),
          'utf8'
        ),
        options
      ).code
    }
  }

  var mdc = {

    // mdc.varnalab.css
    css: () => static.css
      .filter((file) => /@material/.test(file))
      .reduce((styles, file) =>
        styles += fs.readFileSync(path.resolve(__dirname, '../', file), 'utf8'),
        ''
      )
    ,

    // mdc.varnalab.js
    js: () => static.js
      .filter((file) => /@material/.test(file))
      .reduce((code, file) =>
        code += fs.readFileSync(path.resolve(__dirname, '../', file), 'utf8'),
        ''
      )
    ,
  }

  return {varnalab, mdc}
}
