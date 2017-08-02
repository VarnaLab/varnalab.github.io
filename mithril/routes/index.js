
v.route.index = (whois) => {
  var state

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'index',
      title: '[ VarnaLab ]',
      known: [],
    })

    window.scrollTo(0, 0)
    document.title = state.title

    whois.get().then((data) => {
      state.known = whois.known(data)
        .filter((member) => member.online)
      whois.loaded = true
      m.redraw()
    })
  }

  var render = (vnode) => [
    m(v.component.toolbar, state),
    m(v.component.drawer, state),
    m(v.view.index, state)
  ]

  return {onmatch, render}
}
