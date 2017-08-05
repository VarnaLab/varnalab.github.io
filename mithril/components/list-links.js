
v.component['list-links'] = {
  view: (vnode) =>
    vnode.attrs.links.map((groups, index) => [
      m('ul.mdc-list mdc-list--avatar-list v-list v-links', groups.map((link) =>
        m('a.mdc-list-item', {
          key: link.id,
          href: link.url,
          },
          m('span.mdc-list-item__start-detail', {class: 'icon-' + link.icon}),
          link.title,
          m('span.mdc-list-item__end-detail material-icons',
            m('i.material-icons', 'open_in_new')
          )
        )
      )),
      (index < groups.length - 1) &&
      m('hr.mdc-list-divider')
    ])
}
