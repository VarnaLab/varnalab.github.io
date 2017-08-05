
v.view.lab = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust',
      m('h1.mdc-typography--headline', vnode.attrs.title),
      m(v.component['list-links'], vnode.attrs)
    )
}
