
v.component['card-event'] = {
  oninit: (vnode) => {
    vnode.state.now = (event) =>
      new Date(event.start_time).getTime()
        <= new Date().getTime()
      &&
      new Date(event.end_time || event.start_time).getTime()
        >= new Date().getTime()
  },
  view: (vnode) =>
    m('.mdc-card v-card v-card-event',
      m('section.mdc-card__media', {
          style: 'background-image: url(' +
            (vnode.attrs.event.cover_mobile || vnode.attrs.cover) +
          ')'
        },
        (vnode.state.now(vnode.attrs.event) || null) &&
        m('.v-now', 'Събитието тече в момента!'),
        m('h2.mdc-card__subtitle',
          new Date(vnode.attrs.event.start_time).toLocaleString('bg-BG', {
            weekday: 'long', day: 'numeric', month: 'long',
            year: 'numeric', hour: 'numeric', minute: 'numeric',
          }) + ' ч.'
        )
      ),
      m('section.mdc-card__supporting-text',
        m.trust(vnode.attrs.event.description)
      )
    )
}
