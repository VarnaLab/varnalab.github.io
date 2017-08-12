
v.component['card-slider'] = {
  view: (vnode) =>
    m('.v-slider',
      vnode.attrs.events.map((event) =>
        m('a.mdc-card mdc-card--theme-dark v-card', {
          href: '/event/' + event.id,
          oncreate: m.route.link
          },
          m('section.mdc-card__media', {
            style: 'background-image: url(' + event.photo + ')'
            },
            m('h1.mdc-card__title mdc-card__title--large',
              event.name
            )
          )
        )
      )
    )
}
