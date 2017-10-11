
v.route.index = (whois, event) => {
  var state

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'index',
      title: '[ VarnaLab ]',
      all: [],
      known: [],
      devices: [],
      events: [],
      error: {},
    })

    window.scrollTo(0, 0)
    document.title = state.title

    whois.get().then((res) => {
      state.loaded = true
      state.error = res.error

      state.all = whois.known(res.data)
      state.known = whois.filter.online(state.all)
      state.devices = whois.filter.unknown(whois.sort(res.data.online.unknown))

      m.redraw()
    })

    event.upcoming().then((data) => {
      state.events = data
        .sort((a, b) => new Date(b.start_time) - new Date(a.start_time))
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
