
v.component.devices = {
  view: (vnode) =>
    m('ul.mdc-list mdc-list--avatar-list v-list v-unknown',
      vnode.attrs.known.map((device) =>
        m('a.mdc-list-item', {
          key: device.id,
          href: '#',
          // onclick: vnode.attrs.onclick(device)
          },
          m('span.mdc-list-item__start-detail material-icons',
            device.icon
          ),
          m('span.mdc-list-item__text',
            device.name,
            m('span.mdc-list-item__text__secondary',
              device.vendor
            )
          ),
          // TODO: add the checkbox for admins here
          (device.online || null) &&
          m('span.mdc-list-item__end-detail material-icons v-online',
            'power'
          )
        )
      )
    )
}
