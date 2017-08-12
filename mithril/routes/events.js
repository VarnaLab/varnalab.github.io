
v.route.events = (event) => {
  var state
  var cache = {
    events: [],
    offset: 0,
    scroll: 0
  }

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'events',
      title: '[ Събития ]',
      toolbar: [
        {path: '/events', icon: 'school'},
      ],
      events: cache.events,
      cache
    })

    document.title = state.title

    state.load = () => {
      event.range(cache.offset).then((data) => {
        cache.events = cache.events.concat(data)
        state.events = cache.events
        cache.offset += 10
        m.redraw()
      })
    }

    if (!state.events.length) {
      window.scrollTo(0, 0)
      state.load()
    }
  }

  var render = (vnode) => [
    m(v.component.toolbar, state),
    m(v.component.drawer, state),
    m(v.view.events, state)
  ]

  return {onmatch, render}
}
