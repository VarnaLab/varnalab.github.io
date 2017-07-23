
v.layout = {
  oninit: (vnode) => {
    vnode.state.drawer = {
      items: []
    }
    vnode.state.menu = {
      items: []
    }
  },
  oncreate: (vnode) => {
    // header
    ;(() => {
      var toolbarEl = document.querySelector('.mdc-toolbar')
      var toolbar = mdc.toolbar.MDCToolbar.attachTo(toolbarEl)
      toolbar.listen('MDCToolbar:change', (e) => {
        if (e.detail.flexibleExpansionRatio === 0) {
          toolbarEl.querySelector('.mdc-toolbar__title').style.opacity = 1
          toolbarEl.querySelector('.mdc-toolbar__row').style.overflow = 'visible'
          toolbarEl.querySelector('.mdc-toolbar__row img').style.display = 'none'
        }
        else {
          toolbarEl.querySelector('.mdc-toolbar__title').style.opacity = 0
          toolbarEl.querySelector('.mdc-toolbar__row').style.overflow = 'hidden'
          toolbarEl.querySelector('.mdc-toolbar__row img').style.display = 'block'
        }
      })
    })()

    // drawer
    ;(() => {
      var drawerEl = document.querySelector('.mdc-temporary-drawer')
      var MDCTemporaryDrawer = mdc.drawer.MDCTemporaryDrawer
      var drawer = new MDCTemporaryDrawer(drawerEl)

      vnode.state.drawer.items = [
        {path: '/', icon: 'refresh', text: '[ Начало ]', route: 'index'},
        {path: '/whois', icon: 'directions_run', text: '[ Хора ]', route: 'whois'}
      ]

      vnode.state.drawer.open = () => {
        drawer.open = true
        return false
      }

      vnode.state.drawer.link = (vnode) => {
        vnode.dom.addEventListener('click', () => {
          drawer.open = false
        })
        return m.route.link(vnode)
      }
    })()

    // menu
    ;(() => {
      var menuEl = document.querySelector('.mdc-simple-menu')
      var menu = new mdc.menu.MDCSimpleMenu(menuEl)

      var set = () => {
        var theme = localStorage.getItem('v-theme')
        var action = theme === 'light' ? 'remove' : 'add'
        document.querySelector('body').classList[action]('v-dark')
        vnode.state.menu.items = [
          {theme: 'light', text: 'Светла тема', active: !theme || theme === 'light'},
          {theme: 'dark', text: 'Тъмна тема', active: theme === 'dark'}
        ]
      }

      set()

      vnode.state.menu.open = () => {
        menu.open = !menu.open
        return false
      }

      vnode.state.menu.link = (item) => () => {
        localStorage.setItem('v-theme', item.theme)
        set()
      }
    })()
  },
  view: (vnode) => [
    m('header.mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall mdc-toolbar--flexible mdc-toolbar--flexible-default-behavior',
      m('.mdc-toolbar__row',
        m('section.mdc-toolbar__section mdc-toolbar__section--align-start',
          m('a.material-icons mdc-toolbar__icon--menu', {
            href: '#',
            onclick: vnode.state.drawer.open
          }, 'menu'),
          m('span.mdc-toolbar__title', vnode.attrs.title)
        ),
        m('section.mdc-toolbar__section mdc-toolbar__section--align-end', {
            role: 'toolbar'
          },
          vnode.attrs.toolbar.map((item) =>
            m('a.material-icons mdc-toolbar__icon', {
              'aria-label': '..', alt: '..',
              href: item.path,
              // onclick: item.onclick,
              oncreate: m.route.link,
              class: item.active ? 'active' : null
            },
            item.icon)
          ),
          m('a.material-icons mdc-toolbar__icon', {
            'aria-label': '..', alt: '..',
            href: '#',
            onclick: vnode.state.menu.open
          },
          'more_vert'),
          m('.mdc-simple-menu',
            m('ul.mdc-simple-menu__items mdc-list', {
                role: 'menu',
                'aria-hidden': true
              },
              vnode.state.menu.items.map((item) =>
                m('li.mdc-list-item', {
                  role: 'menuitem',
                  class: item.active ? 'active' : null,
                  onclick: vnode.state.menu.link(item)
                }, item.text)
              )
            )
          )
        ),
        m('img', {
          src: vnode.attrs.avatar,
          class: vnode.attrs.route === 'known' ? 'v-circle' : ''
        })
      )
    ),
    m('aside.mdc-temporary-drawer v-drawer',
      m('nav.mdc-temporary-drawer__drawer',
        m('header.mdc-temporary-drawer__header',
          m('.mdc-temporary-drawer__header-content mdc-theme--primary-bg mdc-theme--text-primary-on-primary',
            m('h1.mdc-typography--display1', '[ VarnaLab ]')
          )
        ),
        m('nav.mdc-temporary-drawer__content mdc-list-group',
          m('.mdc-list', vnode.state.drawer.items.map((item) =>
            m('a.mdc-list-item', {
                href: item.path,
                oncreate: vnode.state.drawer.link,
                class: item.route === vnode.attrs.route ? 'active' : null
              },
              m('i.material-icons mdc-list-item__start-detail', {
                'aria-hidden': true
              }, item.icon),
              item.text
            )
          ))
        )
      )
    ),
    m('main', vnode.children)
  ]
}
