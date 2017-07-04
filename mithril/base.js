
var render = require('mithril-node-render')
var html = require('html')

var m = (() => {
  // https://github.com/lhorie/mithril.js/issues/1279#issuecomment-278561782

  var m

  // Polyfill DOM env for mithril
  global.window = require('mithril/test-utils/browserMock.js')()
  global.document = window.document

  // Require the lib AFTER THE POLYFILL IS UP
  m = require('mithril')

  // Make available globally for client scripts running on the server
  global.m = m

  // Export for normal server usage
  return m
})()

var template = ({meta, static}) =>
  m('html',
    m('head',
      meta.map((attrs, index) =>
        m('meta', meta[index])
      ),

      m('title', 'VarnaLab'),

      m('link', {rel: 'shortcut icon', href: static.favicon}),
      m('link', {rel: 'manifest', href: static.manifest}),

      static.css.map((path) =>
        m('link', {rel: 'stylesheet', type: 'text/css', href: path})
      ),

      static.js.map((path) =>
        m('script', {type: 'text/javascript', src: path})
      )
    ),
    m('body.mdc-typography')
  )

module.exports = ({meta, static}) =>
  render({
    view: () => template({meta, static})
  })
  .then((rendered) =>
    html.prettyPrint(
      '<!DOCTYPE html>\n' + rendered,
      {indent_size: 2}
    ))
