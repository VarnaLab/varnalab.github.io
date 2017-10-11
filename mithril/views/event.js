
v.view.event = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust',
      m('h1.mdc-typography--headline', vnode.attrs.event.name),
      m(v.component['card-event'], vnode.attrs),
      m(v.component['list-links'], vnode.attrs)
    )
}
