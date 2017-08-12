
v.module.event = (config) => {
  var url = {
    events: config.origin + '/events',
    upcoming: config.origin + '/events/upcoming',
  }

  var range = (offset = 0, limit = 10) =>
    m.request({
      method: 'GET',
      url: url.events,
      data: {offset, limit}
    })

  var single = (id) =>
    m.request({
      method: 'GET',
      url: url.events,
      data: {id}
    })

  var upcoming = () =>
    m.request({
      method: 'GET',
      url: url.upcoming
    })

  return {range, single, upcoming}
}
