
v.module.whois = (config) => {
  var url = {
    known: config.origin + '/whois/known',
    backers: config.origin + '/finance/stats/backers',
    online: config.origin + '/whois/online',
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
        url: url.online
      }),
    ])
    .then((data) => ({
      known: data[0],
      backers: data[1],
      online: data[2],
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

  var filter = {
    all: (known) =>
      known
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)),

    online: (known) =>
      known
        .filter((known) => known.online)
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0)),

    backers: (known, missing) =>
      known
        .filter((known) => known.backer)
        .concat(missing)
        .sort((a, b) => (b.backer.average - a.backer.average)),

    unknown: (unknown) =>
      unknown
        .map((device) => ({
          name: device.host,
          vendor: device.vendor,
          icon: /android|i?phone/i.test(device.host) ? 'smartphone' : 'laptop'
        }))
  }

  var sort = (devices) => {
    var phones = devices
      .filter((device) => device.host && /android|i?phone/i.test(device.host))
      .sort((a, b) => (
        a.host.toLowerCase() > b.host.toLowerCase() ? 1 :
        a.host.toLowerCase() < b.host.toLowerCase() ? -1 : 0))

    var other = devices
      .filter((device) => device.host && !/android|i?phone/i.test(device.host))
      .sort((a, b) => (
        a.host.toLowerCase() > b.host.toLowerCase() ? 1 :
        a.host.toLowerCase() < b.host.toLowerCase() ? -1 : 0))

    var nohost = devices.filter((device) => !device.host)

    return phones.concat(other).concat(nohost)
  }

  return {get, known, missing, filter, sort}
}
