
v.module.whois = (config) => {

  var get = () =>
    Promise.all(['known', 'backers', 'online'].map((endpoint) =>
      Promise.race([
        // skip backers endpoint
        endpoint === 'backers' ? Promise.resolve([]) :
        m.request({
          method: 'GET',
          url: config.api[endpoint]
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => resolve({error: 'Timeout'}), 3000)
        })
      ])
    ))
    .then(([known, backers, online]) => ({
        error: {
          known: !known ? 'Missing' : known.error,
          backers: !backers ? 'Missing' : backers.error,
          online: !online ? 'Missing' : online.error,
        },
        data: {
          known: known.error || !known ? [] : known,
          backers: backers.error || !backers ? [] : backers,
          online: online.error || !online ? {known: [], unknown: []} : online,
        }
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
