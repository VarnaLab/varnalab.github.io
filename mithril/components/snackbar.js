
v.component.snackbar = {
  oncreate: (vnode) => {
    var snackbar = new mdc.snackbar.MDCSnackbar(vnode.dom)

    vnode.attrs.snackbar.show = (message) => {
      snackbar.show(message)
    }
  },
  view: (vnode) =>
    m('.mdc-snackbar v-snackbar',
      m('.mdc-snackbar__text'),
      m('.mdc-snackbar__action-wrapper',
        m('button.mdc-button mdc-snackbar__action-button', {
          type: 'button'
        })
      )
    )
}
