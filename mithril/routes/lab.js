
v.route.lab = () => {
  var state

  function active (index) {
    state.toolbar.forEach((item) => item.active = false)
    state.toolbar[index].active = true
  }

  var view = {
    lab: () => {
      document.title = state.title = '[ VarnaLab ]'
      state.view = 'lab'
      active(0)
    },
    links: () => {
      document.title = state.title = '[ Връзки ]'
      state.view = 'links'
      active(1)
    }
  }

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'lab',
      toolbar: [
        {path: '/lab', icon: 'list'},
        {path: '/lab/links', icon: 'link'},
      ],
    })

    window.scrollTo(0, 0)
    view[args.view || 'lab']()

    setTimeout(() => m.redraw(), 100)
  }

  var render = (vnode) => [
    m(v.component.toolbar, state),
    m(v.component.drawer, state),
    m(v.view.lab, state)
  ]

  return {onmatch, render}
}
