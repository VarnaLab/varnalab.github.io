
if (location.search) {
  var qs = location.search.replace('?', '').split('&')
    .reduce((qs, pair) => (
      ([key, value] = pair.split('=')) => (qs[key] = value, qs)
    )(), {})

  if (qs.login) {
    localStorage.setItem('v-login', qs.login)
  }
  if (qs.admin) {
    localStorage.setItem('v-admin', qs.admin)
  }
  if (qs.jwt) {
    localStorage.setItem('v-jwt', qs.jwt)
  }

  window.location = '/'
}


var v = {
  origin: 'https://simo.varnalab.org/api',
  // origin: 'http://192.168.1.101:3000/varnalab/api',
  prefix: '',

  module: {},
  route: {},
  view: {},
  component: {},

  state: {
    login: localStorage.getItem('v-login'),
    admin: localStorage.getItem('v-admin'),
    jwt: localStorage.getItem('v-jwt'),
    theme: localStorage.getItem('v-theme'),

    route: '',
    title: '',
    avatar: '/assets/images/logo.png',

    toolbar: [
      {path: '/whois', icon: 'directions_run'},
    ],
    menu: {
      items: [
        {theme: 'light', text: 'Светла'},
        {theme: 'shadow', text: 'Тъмна'},
        {theme: 'hacker', text: 'Хакер'},
      ]
    },
    drawer: {
      items: [
        [
          {path: '/', icon: 'refresh', text: '[ Начало ]', route: 'index'},
          {path: '/whois', icon: 'directions_run', text: '[ Хора ]', route: 'whois'}
        ],
        [
          {path: '/login', icon: 'lock_open', text: '[ Влез ]', route: 'login'},
        ],
      ]
    },
    fab: {},
    snackbar: {},
    dialog: {},
  }
}


window.addEventListener('DOMContentLoaded', () => {

  if (location.host === 'box.outofindex.com') {
    v.prefix = '/varnalab/app'
    m.route.prefix(v.prefix)
  }
  else if (location.protocol === 'file:') {
    v.prefix = '/android_asset/www'
  }

  if (location.host === 'ssd') {
    v.state.avatar = v.state.avatar.slice(1)
  }
  v.state.avatar = v.prefix + v.state.avatar


  m.route(document.querySelector('body'), '/', {

    '/': v.route.index(
      v.module.whois(v)
    ),

    '/whois': v.route.whois(
      v.module.whois(v)
    ),

    '/whois/:filter': v.route.whois(
      v.module.whois(v)
    ),

    '/user': v.route.edit(
      // v.module.whois(v),
      v.module.edit(v)
    ),

    '/user/:id': v.route.user(
      v.module.whois(v),
      v.module.user(v)
    ),

    '/login': {
      onmatch: () => window.location = v.origin + '/auth/login'
    }

  })
})
