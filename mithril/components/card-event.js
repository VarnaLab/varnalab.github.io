
v.component['card-event'] = {
  view: (vnode) =>
    m('.mdc-card v-card v-card-event',
      (vnode.attrs.event.photo || null) &&
      m('section.mdc-card__media', {
          style: 'background-image: url(' + vnode.attrs.event.photo + ')'
        },
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
