
v.view.index = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust',

      (vnode.attrs.events.length || null) &&
      m('h1.mdc-typography--headline', '[ Предстоящи Събития ]'),
      m("a", {href: "https://wiki.varnalab.org/index.php?title=%D0%9A%D0%B0%D0%BA_%D0%B4%D0%B0_%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D1%83%D0%B2%D0%B0%D0%BC_%D1%81%D1%8A%D0%B1%D0%B8%D1%82%D0%B8%D0%B5%3F"}, "Как да публикувам събитие?"),
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
