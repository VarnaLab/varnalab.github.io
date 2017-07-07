
v.route.index = (team) => {
  var state = {
    route: 'index',
    title: '[ VarnaLab ]',
    avatar: v.prefix + '/assets/images/logo.png',
    toolbar: [
      {path: '/team', icon: 'directions_run'}
    ],
    members: []
  }

  var onmatch = (args, requestedUrl) => {
    window.scrollTo(0, 0)
    document.title = state.title

    if (team.loaded) {
      return
    }

    team.get()
      .then((data) => {
        state.members = team.members(data)
          .filter((member) => member.online)
        team.loaded = true
        m.redraw()
      })
  }

  var render = (vnode) => {
    return m(v.layout, state, m(v.view.index, state))
  }

  return {onmatch, render}
}
