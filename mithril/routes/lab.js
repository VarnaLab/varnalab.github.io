
v.route.lab = () => {
  var state

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'lab',
    })

    window.scrollTo(0, 0)
    document.title = state.title = '[ VarnaLab ]'

    setTimeout(() => m.redraw(), 100)
  }

  var render = (vnode) => [
    m(v.component.toolbar, state),
    m(v.component.drawer, state),
    m(v.view.lab, state)
  ]

  return {onmatch, render}
}
