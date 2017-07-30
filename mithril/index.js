
var v = {
  origin: {
    box: 'https://simo.varnalab.org/api',
    // box: 'http://192.168.1.101:3000/varnalab/api',
  },
  prefix: '',
  layout: {},
  module: {},
  route: {},
  view: {},
  component: {},
}


window.addEventListener('DOMContentLoaded', () => {

  if (location.host === 'box.outofindex.com') {
    v.prefix = '/varnalab/app'
    m.route.prefix(v.prefix)
  }
  else if (location.protocol === 'file:') {
    v.prefix = '/android_asset/www'
  }

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

    '/known/:id': v.route.known(
      v.module.whois(v),
      v.module.known(v)
    )
  })
})
