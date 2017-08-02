
v.component.menu = {
  oninit: (vnode) => {
    vnode.state.onclick = (item) => () => {
      localStorage.setItem('v-theme', item.theme)
      v.state.theme = item.theme
      vnode.state.set()
    }
  },
  oncreate: (vnode) => {
    var menu = new mdc.menu.MDCSimpleMenu(vnode.dom)

    vnode.state.set = () => {
      vnode.attrs.menu.items.forEach((item) => {
        item.active = item.theme === v.state.theme
      })
      document.querySelector('body').classList.remove('light', 'shadow', 'hacker')
      document.querySelector('body').classList.add(v.state.theme)
    }

    vnode.state.set()

    vnode.attrs.menu.open = () => {
      menu.open = !menu.open
      return false
    }
  },
  view: (vnode) =>
    m('.mdc-simple-menu v-menu',
      m('ul.mdc-simple-menu__items mdc-list', {
        role: 'menu',
        'aria-hidden': true
        },
        vnode.attrs.menu.items.map((item) =>
          m('li.mdc-list-item', {
            role: 'menuitem',
            class: item.active ? 'active' : null,
            onclick: vnode.state.onclick(item)
            },
            item.text
          )
        )
      )
    )
}
