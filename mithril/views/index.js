
v.view.index = {
  view: (vnode) =>
    m('.mdc-toolbar-fixed-adjust',
      m('h1.mdc-typography--headline', '[ Предстоящи Събития ]'),
      m('p.mdc-typography--body1', {style: 'text-align:center'}, m('em', '... coming soon ...')),
      m('h1.mdc-typography--headline', '[ Хора в Лаба ]'),
      m(v.component.known, vnode.attrs)
    )
}
