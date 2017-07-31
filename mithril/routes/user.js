
v.route.user = (whois, known) => {
  var state = {
    route: 'known',
    title: '[ ]',
    avatar: '',
    toolbar: [
      {path: '/whois', icon: 'directions_run'}
    ],
    known: {},
    social: []
  }

  var onmatch = (args, requestedUrl) => {
    window.scrollTo(0, 0)

    state.title = ''
    state.avatar = ''
    state.known = {}
    state.social = []

    whois.get().then((data) => {

      state.known = whois.known(data)
        .find((known) => known.id === args.id)

      whois.loaded = true

      state.title = '[ ' + state.known.name + ' ]'
      state.avatar = 'https://gravatar.com/avatar/' + state.known.gravatar +
        '?size=150&d=monsterid'
      document.title = state.title

      state.social = known.social(state.known)
      m.redraw()
    })
    .catch((err) => console.error(err))
  }

  var render = (vnode) => {
    return m(v.layout, state, m(v.view.user, state))
  }

  return {onmatch, render}
}
