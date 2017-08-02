
v.view.user = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust v-known',
      m('h1.mdc-typography--headline', '[ ', vnode.attrs.known.name, ' ]'),

      m('ul.mdc-list mdc-list--avatar-list v-list',
        vnode.attrs.social.map((provider) =>
          m('a.mdc-list-item', {
              href: provider.url
            },
            m('.mdc-list-item__start-detail', {class: 'icon-' + provider.icon}),
            provider.name,
            m('span.mdc-list-item__end-detail material-icons',
              m('i.material-icons', 'open_in_new')
            )
          )
        )
      ),

      [0, 0, 0, 0].map(() =>
        m('p.mdc-typography--body1', 'Lorizzle ipsum that\'s the shizzle fizzle amizzle, sheezy adipiscing black. Nullizzle sapizzle velizzle, doggy volutpizzle, suscipit izzle, gravida vizzle, yo mamma. Pellentesque eget sheezy. Sed erizzle. Crackalackin boofron dolor dapibus check it out tempizzle pimpin\'. Check it out pellentesque rizzle et turpizzle. Pizzle izzle that\'s the shizzle. Pellentesque fizzle stuff fo shizzle. In hac owned cool dictumst. Shut the shizzle up dapibizzle. Curabitizzle bizzle gizzle, pretizzle eu, mattizzle ac, eleifend vitae, nunc. Pimpin\' suscipizzle. Integizzle crazy velizzle sizzle we gonna chung.')
      )
    )
}
