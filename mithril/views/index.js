
v.view.index = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust',

      (vnode.attrs.events.length || null) &&
      m('h1.mdc-typography--headline', '[ Предстоящи Събития ]'),
      m(v.component['card-slider'], vnode.attrs),

      m('h1.mdc-typography--headline', '[ Хора в Лаба ]'),

      vnode.attrs.error.online
      ? m('p.v-error', m('em', vnode.attrs.error.online))
      : vnode.attrs.loaded && !vnode.attrs.known.length && !vnode.attrs.devices.length
      ? m('p.v-error', m('em', 'Няма никой'))
      : null,

      m(v.component['list-users'], vnode.attrs),
      m(v.component['list-devices'], vnode.attrs)
    )
}
