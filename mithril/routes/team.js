
v.route.team = (team) => {
  var state = {
    route: 'team',
    title: '[ ]',
    avatar: v.prefix + '/assets/images/logo.png',
    toolbar: [
      {path: '/team', icon: 'list'},
      {path: '/team/online', icon: 'power'},
      {path: '/team/sponsors', icon: 'attach_money'}
    ],
    all: [],
    missing: [],
    members: []
  }

  function active (index) {
    state.toolbar.forEach((item) => item.active = false)
    state.toolbar[index].active = true
  }

  var filter = {
    all: () => {
      document.title = state.title = '[ Екип ]'
      active(0)
      state.members = state.all
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    },
    online: () => {
      document.title = state.title = '[ Онлайн ]'
      active(1)
      state.members = state.all
        .filter((member) => member.online)
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    },
    sponsors: () => {
      document.title = state.title = '[ Спонсори ]'
      active(2)
      state.members = state.all
        .filter((member) => member.sponsor)
        .concat(state.missing)
        .sort((a, b) => (b.sponsor.average - a.sponsor.average))
    }
  }

  var onmatch = (args, requestedUrl) => {
    team.get()
      .then((data) => {
        team.loaded = true
        state.all = team.members(data)
        state.missing = team.missing(data)
        filter[args.filter || 'all']()
        m.redraw()
      })
  }

  var render = (vnode) => {
    return m(v.layout, state, m(v.view.team, state))
  }

  return {onmatch, render}
}
