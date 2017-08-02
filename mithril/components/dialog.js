
v.component.dialog = {
  oncreate: (vnode) => {
    var dialog = new mdc.dialog.MDCDialog(vnode.dom)

    dialog.listen('MDCDialog:accept', () => {
      console.log('accepted')
    })
    dialog.listen('MDCDialog:cancel', () => {
      console.log('canceled')
    })

    vnode.attrs.dialog.show = (e) => {
      dialog.lastFocusedTarget = e.target
      dialog.show()
    }
  },
  view: (vnode) =>
    m('aside.mdc-dialog',
      m('.mdc-dialog__surface v-dialog',
        m('header.mdc-dialog__header',
          m('h2.mdc-dialog__header__title', '[ Добави Човек ]')
        ),
        m('section.mdc-dialog__body mdc-dialog__body--scrollable',
          m('ul.mdc-list v-list', vnode.attrs.fields.map((field) =>
            m('li.mdc-list-item',
              m('strong', field.label + ':'),
              field.value
            )
          ))
        ),
        m('footer.mdc-dialog__footer',
          m('button.' + [
            'mdc-button',
            'mdc-dialog__footer__button',
            'mdc-dialog__footer__button--cancel',
            ].join('.'),
            'НЕ'
          ),
          m('button.' + [
            'mdc-button',
            'mdc-dialog__footer__button',
            'mdc-dialog__footer__button--accept',
            ].join('.'),
            'ДА'
          )
        )
      ),
      m('.mdc-dialog__backdrop')
    )
}
