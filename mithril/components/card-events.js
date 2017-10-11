
v.component['card-events'] = {
  oninit: (vnode) => {
    vnode.state.now = (event) =>
      new Date(event.start_time).getTime()
        <= new Date().getTime()
      &&
      new Date(event.end_time || event.start_time).getTime()
        >= new Date().getTime()
  },
  view: (vnode) =>
    vnode.attrs.events.map((event) =>
      m('a.mdc-card v-card v-card-events', {
        href: '/event/' + event.id,
        oncreate: m.route.link
        },
        m('section.mdc-card__media', {
            style: 'background-image: url(' + event.photo + ')'
          },
          (vnode.state.now(event) || null) &&
          m('.v-now', 'Събитието тече в момента!')
        ),
        m('section.mdc-card__primary',
          m('h1.mdc-card__title mdc-card__title--large',
            event.name
          ),
          m('h2.mdc-card__subtitle',
            new Date(event.start_time).toLocaleString('bg-BG', {
              weekday: 'long', day: 'numeric', month: 'long',
              year: 'numeric', hour: 'numeric', minute: 'numeric',
            }) + ' ч.'
          )
        )
      )
    )
}
