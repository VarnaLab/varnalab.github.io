
v.route.lab = () => {
  var state

  function active (index) {
    state.toolbar.forEach((item) => item.active = false)
    state.toolbar[index].active = true
  }

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'lab',
      title: '[ VarnaLab ]'
    })

    window.scrollTo(0, 0)
    document.title = state.title
    active(2)

    setTimeout(() => m.redraw(), 100)
  }

  var render = (vnode) => [
    m(v.component.toolbar, state),
    m(v.component.drawer, state),
    m(v.view.lab, state)
  ]

  return {onmatch, render}
}
