
v.route.index = (whois) => {
  var state = {
    route: 'index',
    title: '[ VarnaLab ]',
    avatar: v.prefix + '/assets/images/logo.png',
    toolbar: [
      {path: '/whois', icon: 'directions_run'}
    ],
    known: []
  }

  var onmatch = (args, requestedUrl) => {
    window.scrollTo(0, 0)
    document.title = state.title

    if (whois.loaded) {
      return
    }

    whois.get()
      .then((data) => {
        state.known = whois.known(data)
          .filter((member) => member.online)
        whois.loaded = true
        m.redraw()
      })
  }

  var render = (vnode) => {
    return m(v.layout, state, m(v.view.index, state))
  }

  return {onmatch, render}
}
