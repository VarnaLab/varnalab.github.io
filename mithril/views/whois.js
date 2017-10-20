
v.view.whois = {
  oncreate: (vnode) => {
    vnode.attrs.fab.onclick = () => {
      m.route.set('/user')
    }
  },
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust',
      m('h1.mdc-typography--headline', vnode.attrs.title),

      /(online|unknown)$/.test(m.route.get())
      ? (
        vnode.attrs.error.online
        ? m('p.v-error', m('em', vnode.attrs.error.online))
        : vnode.attrs.loaded && !vnode.attrs.known.length && !vnode.attrs.devices.length
        ? m('p.v-error', m('em', 'Няма никой'))
        : null
        )
      : null,

      (/(whois|online|backers)$/.test(m.route.get()) || null) &&
      m(v.component['list-users'], vnode.attrs),

      (/online$/.test(m.route.get()) || null) &&
      m(v.component['list-devices'], vnode.attrs)

    )
}
