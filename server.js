'use strict'

var fs = require('fs')
var path = require('path')
global.Vue = require('vue')

// 获取HTML
var layout = fs.readFileSync('./index.html', 'utf8')
// 服务端渲染模块渲染上面的./index.html
var renderer = require('vue-server-renderer').createRenderer()

var express = require('express')
var server = express()

server.use('/src', express.static(
  path.resolve(__dirname, 'src')
))

// node get
server.get('*', function (request, response) {
  renderer.renderToString(
    require('./src/mainserver')(),
    function (error, html) {
      if (error) {
        console.log(error)
        return response
          .status(500)
          .send('server error')
      }
      // send this layout with the rendered app is html
      response.send(layout.replace('<div id="app"></div>', html))
    }
  )
})

// 端口号8812
server.listen(8812, function (error) {
  if (error) throw error
  console.log("请访问: localhost:8812")
})