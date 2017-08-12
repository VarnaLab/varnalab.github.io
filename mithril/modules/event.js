
v.module.event = (config) => {
  var url = {
    events: config.origin + '/events',
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

  return {range, single}
}
