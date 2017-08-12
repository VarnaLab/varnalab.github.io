
v.view.events = {
  oninit: (vnode) => {
    vnode.state.onscroll = () => {
      vnode.attrs.cache.scroll = document.querySelector('body').scrollTop
    }
    window.addEventListener('scroll', vnode.state.onscroll)
  },
  onremove: (vnode) => {
    window.removeEventListener('scroll', vnode.state.onscroll)
  },
  oncreate: (vnode) => {
    window.scrollTo(0, vnode.attrs.cache.scroll)
  },
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust v-events',
      m(v.component['card-events'], vnode.attrs),
      m('button.mdc-button v-refresh', {
        onclick: vnode.attrs.load
        },
        m('i.material-icons',
          'refresh'
        )
      )
    )
}
