
v.view.team = {
  oninit: (vnode) => {
    var snackbar

    vnode.state.snackbar = {
      init: (n) => {
        var MDCSnackbar = window.mdc.snackbar.MDCSnackbar
        snackbar = new MDCSnackbar(n.dom)
      },
      open: (member) => () => {
        snackbar.show({
          message: '[ ' + member.name + ' ] не е въведен!'
        })
        return false
      }
    }
  },
  view: (vnode) =>
    m('.mdc-toolbar-fixed-adjust',
      m('ul.mdc-list mdc-list--avatar-list v-team',
        vnode.attrs.members.map((member) =>
          m('a.mdc-list-item', {
            key: member.id,
            href: '/member/' + member.id,
            oncreate: member.id ? m.route.link : null,
            onclick: !member.id ? vnode.state.snackbar.open(member) : null
            },
            m('img.mdc-list-item__start-detail', {
              src: member.avatar
            }),
            member.name,
            (member.online || null) &&
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
