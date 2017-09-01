
v.module.event = (config) => {

  var range = (offset = 0, limit = 10) =>
    m.request({
      method: 'GET',
      url: config.api.events,
      data: {offset, limit}
    })

  var single = (id) =>
    m.request({
      method: 'GET',
      url: config.api.events,
      data: {id}
    })

  var upcoming = () =>
    m.request({
      method: 'GET',
      url: config.api.upcoming
    })

  return {range, single, upcoming}
}
