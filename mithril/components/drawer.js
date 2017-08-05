
v.component.drawer = {
  oninit: (vnode) => {
    vnode.state.onclick = (n) => {
      n.dom.addEventListener('click', () => {
        vnode.state.drawer.open = false
      })
      return m.route.link(n)
    }
  },
  oncreate: (vnode) => {
    var drawer = new mdc.drawer.MDCTemporaryDrawer(vnode.dom)

    vnode.attrs.drawer.open = () => {
      drawer.open = true
      return false
    }

    vnode.state.drawer = drawer
  },
  view: (vnode) =>
    m('aside.mdc-temporary-drawer v-drawer',
      m('nav.mdc-temporary-drawer__drawer',
        m('header.mdc-temporary-drawer__header',
          m('.mdc-temporary-drawer__header-content',
            m('h1.mdc-typography--display1', '[ VarnaLab ]')
          )
        ),
        m('nav.mdc-temporary-drawer__content mdc-list-group',
          vnode.attrs.drawer.items.map((items, index) => [
            m('.mdc-list v-list', items.map((item) =>
              m('a.mdc-list-item', {
                href: item.path,
                oncreate: vnode.state.onclick,
                class: item.route === vnode.attrs.route ? 'active' : null
                },
                m('i.material-icons mdc-list-item__start-detail', {
                  'aria-hidden': true
                  },
                  item.icon
                ),
                item.text
              )
            )),
            (index < items.length - 1) &&
            m('hr.mdc-list-divider')
          ])
        )
      )
    )
}
