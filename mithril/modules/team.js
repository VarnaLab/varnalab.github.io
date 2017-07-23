
v.module.whois = (config) => {
  var url = {
    known: config.origin.box + '/varnalab/whois/known',
    backers: config.origin.box + '/varnalab/finance/stats/backers',
    online: {
      known: config.origin.box + '/varnalab/whois/online/known',
      unknown: config.origin.box + '/varnalab/whois/online/unknown'
    }
  }

  var state = {
    known: [],
    backers: [],
    online: {
      known: [],
      unknown: []
    },
    all: []
  }

  var get = () =>
    Promise.all([
      m.request({
        method: 'GET',
        url: url.known
      }),
      m.request({
        method: 'GET',
        url: url.backers
      }),
      m.request({
        method: 'GET',
        url: url.online.known
      }),
      m.request({
        method: 'GET',
        url: url.online.unknown
      }),
    ])
    .then((data) => ({
      known: data[0],
      backers: data[1],
      online: {
        known: data[2],
        unknown: data[3]
      },
    }))

  var known = ({known, backers, online}) =>
    known
      .map(({id, name, gravatar, backer, twitter, github}) => ({
        id,
        name,
        gravatar,
        avatar: 'https://gravatar.com/avatar/' + gravatar +
          '?size=48&d=monsterid',
        online: online.known.includes(id),
        backer: backers.find((s) => s.name === backer),
        twitter,
        github
      }))

  var missing = ({known, backers}) =>
    (
      (
        names = known
          .map((member) => member.backer)
      ) =>
      backers
        .filter((backer) => !names.includes(backer.name))
        .map((backer) => ({
          name: backer.name,
          backer
        }))
    )()

  return {get, known, missing}
}
