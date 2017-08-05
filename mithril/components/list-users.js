
v.component['list-users'] = {
  oninit: (vnode) => {
    vnode.state.onclick = (known) => () => {
      vnode.attrs.snackbar.show({
        message: '[ ' + known.name + ' ] не е въведен!'
      })
      return false
    }
  },
  view: (vnode) =>
    m('ul.mdc-list mdc-list--avatar-list v-list v-known',
      vnode.attrs.known.map((known) =>
        m('a.mdc-list-item', {
          key: known.id,
          href: '/user/' + known.id,
          oncreate: known.id ? m.route.link : null,
          onclick: !known.id ? vnode.state.onclick(known) : null
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
    )
}
