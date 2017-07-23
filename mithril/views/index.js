
v.view.index = {
  view: (vnode) =>
    m('.mdc-toolbar-fixed-adjust',
      m('h1.mdc-typography--headline', '[ Предстоящи Събития ]'),
      m('p.mdc-typography--body1', {style: 'text-align:center'}, m('em', '... coming soon ...')),
      m('h1.mdc-typography--headline', '[ Хора в Лаба ]'),
      m('ul.mdc-list mdc-list--avatar-list v-team',
        vnode.attrs.known.map((known) =>
          m('a.mdc-list-item', {
            key: known.id,
            href: '/known/' + known.id,
            oncreate: m.route.link
            },
            m('img.mdc-list-item__start-detail', {
              src: known.avatar
            }),
            known.name,
            (known.online || null) &&
            m('span.mdc-list-item__end-detail material-icons v-online',
              'power'
            )
          )
        )
      )
    )
}
