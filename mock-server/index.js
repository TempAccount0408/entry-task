const koa = require('koa')
const path = require('path')
const { v4 } = require('uuid')
const fs = require('fs')
const body = require('koa-body')
const cors = require('@koa/cors')

let descs = require(path.join(__dirname, './descs.json'))
const users = require(path.join(__dirname, './users.json'))

const session = {}

const app = new koa()

app.use(cors())
app.use(body())

app.use(async (ctx, next) => {
    if (ctx.req.method != 'PUT') return next()

    if (ctx.path == '/login') {
        const { email } = JSON.parse(ctx.request.body)
        const idx = users.findIndex(user => user.email == email)
        console.log(email, idx)
        if (idx < 0) {
            ctx.status = 500
        } else {
            session[email] = true
            ctx.body = JSON.stringify(users[idx])
            ctx.status = 200
        }
    }

    if (ctx.path == '/logout') {
        const { id } = ctx.request.body
        const idx = users.findIndex(user => user.id == id)
        if (idx >= 0) {
            session[id] = false
        }
        ctx.status = 200
    }

    if (ctx.path == '/update-description') {
        const { id, ...description } = JSON.parse(ctx.request.body)
        const idx = descs.findIndex(desc => desc.id == id)
        console.log(id, idx)
        if (idx >= 0) {
            descs[idx] = { id, ...description }
            ctx.status = 200
        } else {
            ctx.status = 500
        }
    }
})

app.use(async (ctx, next) => {
    if (ctx.req.method != 'GET') return next()

    if (ctx.path == '/list-descriptions') {
        ctx.body = JSON.stringify(descs)
        ctx.status = 200
    }
})

app.use(async (ctx, next) => {
    if (ctx.req.method != 'POST') return next()

    if (ctx.path == '/verify-login-status') {
        const { token } = JSON.parse(ctx.request.body)
        if (session[token]) {
            ctx.status = 200
        } else {
            ctx.status = 403
        }
    }
    if (ctx.path == '/single-create') {
        const newly = JSON.parse(ctx.request.body)
        descs.unshift(newly)
        fs.writeFileSync(path.join(__dirname, 'descs.json'), JSON.stringify(descs))
        ctx.status = 200
    }
    if (ctx.path == '/massive-create') {
        const newly = JSON.parse(ctx.request.body)
        descs = [...newly, ...descs]
        fs.writeFileSync(path.join(__dirname, 'descs.json'), JSON.stringify(descs))
        ctx.status = 200
    }
})

app.use(async ctx => (ctx.status = 500))

app.listen(3000)
