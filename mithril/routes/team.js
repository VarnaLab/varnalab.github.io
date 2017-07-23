
v.route.whois = (whois) => {
  var state = {
    route: 'whois',
    title: '[ ]',
    avatar: v.prefix + '/assets/images/logo.png',
    toolbar: [
      {path: '/whois', icon: 'list'},
      {path: '/whois/online', icon: 'power'},
      {path: '/whois/backers', icon: 'attach_money'}
    ],
    all: [],
    missing: [],
    known: []
  }

  function active (index) {
    state.toolbar.forEach((item) => item.active = false)
    state.toolbar[index].active = true
  }

  var filter = {
    all: () => {
      document.title = state.title = '[ Хора ]'
      active(0)
      state.known = state.all
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    },
    online: () => {
      document.title = state.title = '[ Онлайн ]'
      active(1)
      state.known = state.all
        .filter((known) => known.online)
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
    },
    backers: () => {
      document.title = state.title = '[ Дарители ]'
      active(2)
      state.known = state.all
        .filter((known) => known.backer)
        .concat(state.missing)
        .sort((a, b) => (b.backer.average - a.backer.average))
    }
  }

  var onmatch = (args, requestedUrl) => {
    whois.get()
      .then((data) => {
        whois.loaded = true
        state.all = whois.known(data)
        state.missing = whois.missing(data)
        filter[args.filter || 'all']()
        m.redraw()
      })
  }

  var render = (vnode) => {
    return m(v.layout, state, m(v.view.whois, state))
  }

  return {onmatch, render}
}
