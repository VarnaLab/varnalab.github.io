
v.view.edit = {
  oninit: (vnode) => {
    vnode.state.textfield = {
      create: (n) => {
        mdc.textfield.MDCTextfield.attachTo(n.dom)
      },
      change: (field) => (e) => {
        var index = vnode.attrs.fields.indexOf(field)
        vnode.attrs.fields[index].value = e.target.value
      }
    }
  },
  oncreate: (vnode) => {
    vnode.attrs.fab.onclick = (e) => {
      vnode.attrs.dialog.show(e)
    }
  },
  view: (vnode) =>
    m('.mdc-toolbar-fixed-adjust v-known',
      m('h1.mdc-typography--headline', vnode.attrs.title),
      // textfields
      m('.mdc-list',
        vnode.attrs.fields.map((field) =>
        m('.mdc-textfield v-textfield', {
          oncreate: vnode.state.textfield.create
          },
          m('input.mdc-textfield__input', {
            type: 'text',
            name: field.name,
            value: field.value,
            onchange: vnode.state.textfield.change(field)
          }),
          m('label.mdc-textfield__label',
            field.label
          )
        ))
      )
    )
}
