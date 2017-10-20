
v.component.toolbar = {
  oncreate: (vnode) => {
    var toolbar = mdc.toolbar.MDCToolbar.attachTo(vnode.dom)
    toolbar.listen('MDCToolbar:change', (e) => {
      if (e.detail.flexibleExpansionRatio === 0) {
        vnode.dom.querySelector('.mdc-toolbar__title').style.opacity = 1
        vnode.dom.querySelector('.mdc-toolbar__row').style.overflow = 'visible'
        vnode.dom.querySelector('.mdc-toolbar__row img').style.display = 'none'
      }
      else {
        vnode.dom.querySelector('.mdc-toolbar__title').style.opacity = 0
        vnode.dom.querySelector('.mdc-toolbar__row').style.overflow = 'hidden'
        vnode.dom.querySelector('.mdc-toolbar__row img').style.display = 'block'
      }
    })
  },
  view: (vnode) =>
    m('header.' + [
      'mdc-toolbar',
      'mdc-toolbar--fixed',
      'mdc-toolbar--waterfall',
      'mdc-toolbar--flexible',
      'mdc-toolbar--flexible-default-behavior',
      'v-toolbar'
      ].join(' '),
      m('.mdc-toolbar__row',
        m('section.mdc-toolbar__section mdc-toolbar__section--align-start',
          m('a.material-icons mdc-toolbar__icon--menu', {
            href: '#',
            onclick: vnode.attrs.drawer.open
            },
            'menu'
          ),
          m('span.mdc-toolbar__title', vnode.attrs.title)
        ),
        m('section.mdc-toolbar__section mdc-toolbar__section--align-end', {
          role: 'toolbar',
          class: 'v-' + vnode.attrs.route,
          },
          vnode.attrs.toolbar.map((item) =>
            m('a.material-icons mdc-toolbar__icon v-filter', {
              'aria-label': '..',
              alt: '..',
              href: item.path,
              // onclick: item.onclick,
              oncreate: m.route.link,
              class: item.active ? 'active' : null
              },
              m('span', item.icon)
            )
          ),
          m('a.material-icons mdc-toolbar__icon', {
            'aria-label': '..', alt: '..',
            href: '#',
            onclick: vnode.attrs.menu.open
            },
            'more_vert'
          ),
          // menu
          m(v.component.menu, vnode.attrs)
        ),
        m('img', {
          src: vnode.attrs.avatar,
          class: vnode.attrs.route === 'known' ? 'v-circle' : ''
        })
      )
    )
}
