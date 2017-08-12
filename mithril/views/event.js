
v.view.event = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust v-events',
      m('h1.mdc-typography--headline', vnode.attrs.event.name),
      m('.mdc-card v-card',
        (vnode.attrs.event.photo || null) &&
        m('section.mdc-card__media', {
          style: 'background-image: url(' + vnode.attrs.event.photo + ')'
        }),
        m('section.mdc-card__supporting-text',
          vnode.attrs.event.description
        )
      ),
      m(v.component['list-links'], vnode.attrs)
    )
}
