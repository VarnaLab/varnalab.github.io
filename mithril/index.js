
var v = {
  origin: {
    box: 'https://box.outofindex.com',
    org: 'https://json.varnalab.org'
    // box: 'http://192.168.1.101:3000',
    // org: 'http://192.168.1.101:3000/varnalab'
  },
  layout: {},
  module: {},
  route: {},
  view: {}
}


window.addEventListener('DOMContentLoaded', () => {

  m.route(document.querySelector('body'), '/', {

    '/': v.route.index(
      v.module.team(v)
    ),

    '/team': v.route.team(
      v.module.team(v)
    ),

    '/team/:filter': v.route.team(
      v.module.team(v)
    ),

    '/member/:id': v.route.member(
      v.module.team(v),
      v.module.member(v)
    )
  })
})
