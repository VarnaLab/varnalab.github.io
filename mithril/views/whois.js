
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
      m('ul.mdc-list mdc-list--avatar-list v-whois',
        vnode.attrs.known.map((known) =>
          m('a.mdc-list-item', {
            key: known.id,
            href: '/known/' + known.id,
            oncreate: known.id ? m.route.link : null,
            onclick: !known.id ? vnode.state.snackbar.open(known) : null
            },
            m('img.mdc-list-item__start-detail', {
              src: known.avatar
            }),
            known.name,
            (known.online || null) &&
            m('span.mdc-list-item__end-detail material-icons v-online',
              'power'
            )
          )
        )
      ),
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
