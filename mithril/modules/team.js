
v.module.team = (config) => {
  var url = {
    members: config.origin.box + '/varnalab/members',
    sponsors: config.origin.box + '/varnalab/stats/sponsors',
    online: config.origin.box + '/varnalab/online'
  }

  var state = {
    members: [],
    online: {},
    sponsors: [],
    all: []
  }

  var get = () =>
    Promise.all([
      m.request({
        method: 'GET',
        url: url.members
      }),
      m.request({
        method: 'GET',
        url: url.online
      }),
      m.request({
        method: 'GET',
        url: url.sponsors
      })
    ])
    .then((data) => ({
      members: data[0],
      online: data[1],
      sponsors: data[2]
    }))

  var members = ({members, online, sponsors}) =>
    members
      .map(({id, name, gravatar, sponsor, twitter, github}) => ({
        id,
        name,
        gravatar,
        avatar: 'https://gravatar.com/avatar/' + gravatar +
          '?size=48&d=monsterid',
        online: online.known.includes(id),
        sponsor: sponsors.find((s) => s.name === sponsor),
        twitter,
        github
      }))

  var missing = ({members, online, sponsors}) =>
    (
      (
        names = members
          .map((member) => member.sponsor)
      ) =>
      sponsors
        .filter((sponsor) => !names.includes(sponsor.name))
        .map((sponsor) => ({
          name: sponsor.name,
          sponsor
        }))
    )()

  return {get, members, missing}
}
