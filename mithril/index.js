
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
          {path: '/whois', icon: 'directions_run', text: '[ Хора ]', route: 'whois'},
          {path: '/lab', icon: 'lightbulb_outline', text: '[ За Лаба ]', route: 'lab'},
        ],
        [
          {path: '/login', icon: 'lock_open', text: '[ Влез ]', route: 'login'},
        ],
      ]
    },
    links: [
      [
        {id: 'facebook-page', title: 'Facebook Страница', url: 'https://www.facebook.com/varnalab', icon: 'facebook'},
        {id: 'facebook-group', title: 'Facebook Група', url: 'https://www.facebook.com/groups/varnalab/', icon: 'facebook'},
        {id: 'twitter', title: 'Twitter', url: 'https://twitter.com/varnalab', icon: 'twitter'},
        {id: 'trello', title: 'Trello', url: 'https://trello.com/varnalab', icon: 'trello'},
        {id: 'github', title: 'GitHub', url: 'https://github.com/varnalab', icon: 'github'},
        {id: 'slack', title: 'Slack', url: 'https://varnalab.slack.com', icon: 'slack'},
        {id: 'wiki', title: 'Wiki', url: 'https://wiki.varnalab.org', icon: 'wikipedia'},
      ],
      [
        {id: 'slack-invitation', title: 'Покана за Slack', url: 'https://slack.varnalab.org', icon: 'slack'},
        {id: 'github-invitation', title: 'Покана за GitHub', url: 'https://github.varnalab.org', icon: 'github'},
        {id: 'mobile-cordova', title: 'Cordova Приложение', url: 'https://play.google.com/store/apps/details?id=com.varnalab.app', icon: 'android'},
        {id: 'mobile-native', title: 'Native Приложение (Lite)', url: 'https://play.google.com/store/apps/details?id=com.varnalab.app.android', icon: 'android'},
      ],
      [
        {id: 'group-email', title: 'varna-lab@googlegroups.com', url: 'mailto:varna-lab@googlegroups.com', icon: 'email'},
        {id: 'hq-email', title: 'hq@varnalab.org', url: 'mailto:hq@varnalab.org', icon: 'email'},
      ],
    ],
    fab: {},
    snackbar: {},
    dialog: {},
  }
}


if (location.host === 'box.outofindex.com') {
  v.prefix = '/varnalab/app'
  m.route.prefix(v.prefix)
}

if (location.protocol === 'file:') {
  v.prefix = '/android_asset/www'
}

if (location.host === 'ssd' || location.host ===  '192.168.1.101:8001') {
  v.state.avatar = v.state.avatar.slice(1)
  v.origin = 'http://192.168.1.101:3000/varnalab/api'
}

v.state.avatar = v.prefix + v.state.avatar


window.addEventListener('DOMContentLoaded', () => {

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
    },

    '/lab': v.route.lab(),

    '/lab/:view': v.route.lab()

  })
})
