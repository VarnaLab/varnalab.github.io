
v.route.member = (team, member) => {
  var state = {
    route: 'member',
    title: '[ ]',
    avatar: '',
    toolbar: [
      {path: '/team', icon: 'directions_run'}
    ],
    member: {},
    social: []
  }

  var onmatch = (args, requestedUrl) => {
    window.scrollTo(0, 0)

    state.title = ''
    state.avatar = ''
    state.member = {}
    state.social = []

    team.get().then((data) => {

      state.member = team.members(data)
        .find((member) => member.id === args.id)

      team.loaded = true

      state.title = '[ ' + state.member.name + ' ]'
      state.avatar = 'https://gravatar.com/avatar/' + state.member.gravatar +
        '?size=150&d=monsterid'
      document.title = state.title

      state.social = member.social(state.member)
      m.redraw()
    })
    .catch((err) => console.error(err))
  }

  var render = (vnode) => {
    return m(v.layout, state, m(v.view.member, state))
  }

  return {onmatch, render}
}
