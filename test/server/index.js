
var path = require('path')
var express = require('express')
var static = require('serve-static')
var api = require('varnalab-api')

var config = {
  "db": {
    "users": [],
    "devices": [],
    "online": {"known": [], "unknown": []},
    "finance": {},
    "stats": [],
    "events": [],
  },
  "auth": {
    "public": path.resolve(__dirname, "index.js"),
    "private": path.resolve(__dirname, "index.js")
  },
  "github": {
    "connect": "/oauth/connect/route",
    "team": "GitHub Team ID"
  },
  "slack": {
    "token": ""
  }
}


var port = 3000

var server = express()
server.use('/', static(path.join(__dirname, './')))
server.use('/assets', static(path.join(__dirname, '../../assets/')))
server.use('/mithril', static(path.join(__dirname, '../../mithril/')))
server.use('/node_modules', static(path.join(__dirname, '../../node_modules/')))
server.use('/api', api(config))

server.listen(port, () => console.log('Oh Hi', port))
