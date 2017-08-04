
v.route.whois = (whois) => {
  var state

  function active (index) {
    state.toolbar.forEach((item) => item.active = false)
    state.toolbar[index].active = true
  }

  var filter = {
    all: () => {
      document.title = state.title = '[ Хора ]'
      active(0)
      state.known = whois.filter.all(state.all)
    },
    online: () => {
      document.title = state.title = '[ В Лаба ]'
      active(1)
      state.known = whois.filter.online(state.all)
    },
    backers: () => {
      document.title = state.title = '[ Дарители ]'
      active(2)
      state.known = whois.filter.backers(state.all, state.missing)
    },
    unknown: () => {
      document.title = state.title = '[ Гости ]'
      active(3)
      state.devices = whois.filter.unknown(whois.sort(state.unknown))
    }
  }

  var onmatch = (args, url) => {
    state = Object.assign({}, v.state, {
      route: 'whois',
      all: [],
      missing: [],
      known: [],
      devices: [],

      toolbar: [
        {path: '/whois', icon: 'list'},
        {path: '/whois/online', icon: 'power'},
        {path: '/whois/backers', icon: 'attach_money'},
        {path: '/whois/unknown', icon: 'fingerprint'},
      ],
    })
    whois.get().then((data) => {
      whois.loaded = true
      state.all = whois.known(data)
      state.missing = whois.missing(data)
      state.unknown = data.online.unknown
      filter[args.filter || 'all']()
      m.redraw()
    })
  }

  var render = (vnode) => [
    m(v.component.toolbar, state),
    m(v.component.drawer, state),
    m(v.component.snackbar, state),
    m(v.component.fab, state),
    m(v.view.whois, state),
  ]

  return {onmatch, render}
}
