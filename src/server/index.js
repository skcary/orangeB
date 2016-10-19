import Koa from 'koa'
import middlewareRegister from './middlewareRegister'
import http from 'http'
import config from '../config'

const app = new Koa()
app.env = 'production'
middlewareRegister(app)

const server = http.createServer(app.callback())
server.listen(config.port, () => {
  console.log('App started, bind port %d, CTRL + C to terminate', config.port)
})
