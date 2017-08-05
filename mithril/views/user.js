
v.view.user = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust',
      m('h1.mdc-typography--headline', '[ ', vnode.attrs.known.name, ' ]'),

      m(v.component['list-links'], vnode.attrs),

      [0, 0, 0, 0].map(() =>
        m('p.mdc-typography--body1', 'Lorizzle ipsum that\'s the shizzle fizzle amizzle, sheezy adipiscing black. Nullizzle sapizzle velizzle, doggy volutpizzle, suscipit izzle, gravida vizzle, yo mamma. Pellentesque eget sheezy. Sed erizzle. Crackalackin boofron dolor dapibus check it out tempizzle pimpin\'. Check it out pellentesque rizzle et turpizzle. Pizzle izzle that\'s the shizzle. Pellentesque fizzle stuff fo shizzle. In hac owned cool dictumst. Shut the shizzle up dapibizzle. Curabitizzle bizzle gizzle, pretizzle eu, mattizzle ac, eleifend vitae, nunc. Pimpin\' suscipizzle. Integizzle crazy velizzle sizzle we gonna chung.')
      )
    )
}
