const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./utils/log4j')
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
const util = require('./utils/util')
const users = require('./routes/users')
const menus = require('./routes/menus')
const roles = require('./routes/roles')


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
    await next().catch((err) => {
        if (err.status == '401') {
            ctx.status = 200;
            ctx.body = util.fail('Token认证失败', util.CODE.AUTH_ERROR)
        } else {
            throw err;
        }
    })
})

app.use(koajwt({ secret: 'imooc' }).unless({
    path: [/^\/api\/users\/login/]
}))

//接口访问的根路径，即xxxx：端口号/api/
router.prefix("/api")

router.use(users.routes(), users.allowedMethods())
router.use(menus.routes(), menus.allowedMethods())
router.use(roles.routes(), menus.allowedMethods())

app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    log4js.error(`${err.stack}`)
});

module.exports = app