
v.view.index = {
  view: (vnode) =>
    m('.mdc-toolbar-fixed-adjust',
      m('h1.mdc-typography--headline', '[ Предстоящи Събития ]'),
      m('p.mdc-typography--body1', {style: 'text-align:center'}, m('em', '... coming soon ...')),
      m('h1.mdc-typography--headline', '[ Хора в Лаба ]'),
      m('ul.mdc-list mdc-list--avatar-list v-team',
        vnode.attrs.members.map((member) =>
          m('a.mdc-list-item', {
            key: member.id,
            href: '/member/' + member.id,
            oncreate: m.route.link
            },
            m('img.mdc-list-item__start-detail', {
              src: member.avatar
            }),
            member.name,
            (member.online || null) &&
            m('span.mdc-list-item__end-detail material-icons v-online',
              'power'
            )
          )
        )
      )
    )
}
