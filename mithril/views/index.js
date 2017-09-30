
v.view.index = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust',

      (vnode.attrs.events.length || null) &&
      m('h1.mdc-typography--headline', '[ Предстоящи Събития ]'),
      m(v.component['card-slider'], vnode.attrs),

      m('h1.mdc-typography--headline', '[ Хора в Лаба ]'),
      (vnode.attrs.error.online || null) &&
      m('p.v-error', m('em', vnode.attrs.error.online)),
      m(v.component['list-users'], vnode.attrs),
      m(v.component['list-devices'], vnode.attrs)
    )
}
