
v.route.index = (whois) => {
  var state

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'index',
      title: '[ VarnaLab ]',
      all: [],
      known: [],
      devices: [],
      events: [],
    })

    window.scrollTo(0, 0)
    document.title = state.title

    whois.get().then((data) => {
      state.all = whois.known(data)

      state.known = whois.filter.online(state.all)
      state.devices = whois.filter.unknown(whois.sort(data.online.unknown))

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
