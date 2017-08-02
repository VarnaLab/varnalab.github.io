
v.route.edit = (edit) => {
  var state

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'edit',
      title: '[ Добави Човек ]',
      fields: [
        {"name": "name", "label": "Име", "value": ""},
        {"name": "email", "label": "Email", "value": ""},
        {"name": "backer", "label": "Дарител", "value": ""},
        {"name": "github", "label": "GitHub", "value": ""},
        {"name": "twitter", "label": "Twitter", "value": ""},
        {"name": "slack", "label": "Slack", "value": ""}
      ]
    })

    window.scrollTo(0, 0)
    document.title = state.title

    setTimeout(() => m.redraw(), 100)
  }

  var render = (vnode) => [
    m(v.component.toolbar, state),
    m(v.component.drawer, state),
    m(v.component.dialog, state),
    m(v.component.fab, state),
    m(v.view.edit, state)
  ]

  return {onmatch, render}
}
