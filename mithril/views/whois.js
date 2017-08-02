
v.view.whois = {
  oncreate: (vnode) => {
    vnode.attrs.fab.onclick = () => {
      m.route.set('/user')
    }
  },
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust',
      // list
      (/(whois|online|backers)$/.test(m.route.get()) || null) &&
      m(v.component.users, vnode.attrs),
      // list
      (/unknown$/.test(m.route.get()) || null) &&
      m(v.component.devices, vnode.attrs)
    )
}
