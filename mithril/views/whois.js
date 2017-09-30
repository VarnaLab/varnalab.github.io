
v.view.whois = {
  oncreate: (vnode) => {
    vnode.attrs.fab.onclick = () => {
      m.route.set('/user')
    }
  },
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust',

      ((/(online|unknown)$/.test(m.route.get()) && vnode.attrs.error.online) || null) &&
      m('p.v-error', m('em', vnode.attrs.error.online)),

      (/(whois|online|backers)$/.test(m.route.get()) || null) &&
      m(v.component['list-users'], vnode.attrs),

      (/unknown$/.test(m.route.get()) || null) &&
      m(v.component['list-devices'], vnode.attrs)

    )
}
