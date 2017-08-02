
v.component.fab = {
  oninit: (vnode) => {
    vnode.state.onclick = (e) => {
      vnode.attrs.fab.onclick(e)
    }
  },
  oncreate: (vnode) => {
    var fab = mdc.ripple.MDCRipple.attachTo(vnode.dom)
  },
  view: (vnode) => [
    (v.state.admin || null) &&
    m('button.mdc-fab material-icons v-fab', {
      onclick: vnode.state.onclick
      },
      m('span.mdc-fab__icon', 'add')
    )
  ]
}
