
v.component['list-links'] = {
  view: (vnode) =>
    vnode.attrs.links.map((group, index) => [
      m('ul.mdc-list mdc-list--avatar-list v-list v-links', group.map((link) =>
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
      (index < vnode.attrs.links.length - 1) &&
      m('hr.mdc-list-divider')
    ])
}
