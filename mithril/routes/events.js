
v.route.events = (event) => {
  var state
  var cache = {
    events: [],
    offset: 0,
    scroll: 0
  }

  function active (index) {
    state.toolbar.forEach((item) => item.active = false)
    state.toolbar[index].active = true
  }

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'events',
      toolbar: [
        {path: '/events/upcoming', icon: 'local_movies'},
        {path: '/events', icon: 'school'},
      ],
      events: cache.events,
      filter: args.filter,
      cache
    })

    if (state.filter === 'upcoming') {
      state.title = '[ Предстоящи Събития ]'
      active(0)
      state.load = () => {
        event.upcoming().then((data) => {
          cache.events = cache.events.concat(data)
          state.events = cache.events
          m.redraw()
        })
      }
    }
    else {
      state.title = '[ Изминали Събития ]'
      active(1)
      state.load = () => {
        event.range({offset: cache.offset, past: true}).then((data) => {
          cache.events = cache.events.concat(data)
          state.events = cache.events
          cache.offset += 10
          m.redraw()
        })
      }
    }

    document.title = state.title

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
