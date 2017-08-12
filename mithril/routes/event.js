
v.route.event = (event) => {
  var state

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'events',
      toolbar: [
        {path: '/events', icon: 'school'},
      ],
      event: {},
      links: [[]]
    })

    window.scrollTo(0, 0)

    event.single(args.id).then((data) => {
      document.title = state.title = '[ ' + data.name.split(' ')[0] + ' ]'
      state.event = data
      state.links[0].push({
        id: data.id,
        url: 'https://www.facebook.com/events/' + data.id,
        icon: 'facebook',
        title: 'Събитието във Facebook',
      })
      m.redraw()
    })
  }

  var render = (vnode) => [
    m(v.component.toolbar, state),
    m(v.component.drawer, state),
    m(v.view.event, state)
  ]

  return {onmatch, render}
}
