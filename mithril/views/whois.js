
v.view.whois = {
  oninit: (vnode) => {
    var snackbar

    vnode.state.snackbar = {
      init: (n) => {
        var MDCSnackbar = window.mdc.snackbar.MDCSnackbar
        snackbar = new MDCSnackbar(n.dom)
      },
      open: (known) => () => {
        snackbar.show({
          message: '[ ' + known.name + ' ] не е въведен!'
        })
        return false
      }
    }
  },
  view: (vnode) =>
    m('.mdc-toolbar-fixed-adjust',

      (/(whois|online|backers)$/.test(m.route.get()) || null) &&
      m(v.component.known, Object.assign({}, vnode.attrs, {
        onclick: vnode.state.snackbar.open
      })),

      (/unknown$/.test(m.route.get()) || null) &&
      m(v.component.unknown, Object.assign({}, vnode.attrs, {
        onclick: vnode.state.snackbar.open
      })),

      m('.mdc-snackbar', {oncreate: vnode.state.snackbar.init},
        m('.mdc-snackbar__text'),
        m('.mdc-snackbar__action-wrapper',
          m('button.mdc-button mdc-snackbar__action-button', {
            type: 'button'
          })
        )
      )
    )
}
