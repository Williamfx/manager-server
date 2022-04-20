const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./utils/log4j')
const users = require('./routes/users')
    // const jwt = require('koa-jwt')
const router = require('koa-router')()
const jwt = require('jsonwebtoken')

// error handler
onerror(app)

require('./config/db')

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async(ctx, next) => {
    log4js.info(`get params:${JSON.stringify(ctx.request.query)}`)
    log4js.info(`post params:${JSON.stringify(ctx.request.body)}`)
    await next()
})

//接口访问的根路径，即xxxx：端口号/api/
router.prefix("/api")

router.get('/leave/count', (ctx) => {
    const token = ctx.request.headers.authorization.split(' ')[1]
    const payload = jwt.verify(token, 'imooc')
    ctx.body = payload
})

router.use(users.routes(), users.allowedMethods())

app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    log4js.error(`${err.stack}`)
});

module.exports = app