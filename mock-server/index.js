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
    console.log(session)
    console.log(ctx.path, ctx.method, ctx.request.body)
    next()
})

const private = middleware => async (ctx, next) => {
    try {
        const { id } = JSON.parse(ctx.request.body)
        if (!session[id]) {
            ctx.status = 403
        } else {
            middleware(ctx, next)
        }
    } catch (error) {
        ctx.status = 403
    }
}

const protected = middleware => async (ctx, next) => {
    try {
        const { id } = JSON.parse(ctx.request.body)
        const user = users.find(user => user.id == id)
        if (!session[id] || user == null || !user.admin) {
            ctx.status = 403
        } else {
            middleware(ctx, next)
        }
    } catch (error) {
        ctx.status = 403
    }
}

const route = (path, method, middleware) => async (ctx, next) => {
    if (ctx.req.method != method || ctx.path != path) {
        next()
    } else {
        middleware(ctx, next)
    }
}

app.use(
    route('/login', 'PUT', async (ctx, next) => {
        console.log('serving login...')
        const { email } = JSON.parse(ctx.request.body)
        const idx = users.findIndex(user => user.email == email)
        if (idx < 0) {
            ctx.status = 404
        } else {
            session[users[idx].id] = true
            ctx.body = JSON.stringify(users[idx])
            ctx.status = 200
        }
    })
)

app.use(
    route(
        '/logout',
        'PUT',
        private(async (ctx, next) => {
            console.log('serving logout...')
            const { id } = JSON.parse(ctx.request.body)
            session[id] = false
            ctx.status = 200
        })
    )
)

app.use(
    route(
        '/update-description',
        'PUT',
        protected(async (ctx, next) => {
            console.log('serving update-description...')
            const { description } = JSON.parse(ctx.request.body)
            const { id } = description

            const idx = descs.findIndex(desc => desc.id == id)
            if (idx >= 0) {
                descs[idx] = { id, ...description }
                fs.writeFileSync(path.join(__dirname, 'descs.json'), JSON.stringify(descs))
                ctx.status = 200
            } else {
                ctx.status = 500
            }
        })
    )
)
app.use(
    route(
        '/delete-description',
        'PUT',
        protected(async (ctx, next) => {
            console.log('serving update-description...')
            const { description } = JSON.parse(ctx.request.body)
            const { id } = description

            const idx = descs.findIndex(desc => desc.id == id)
            if (idx >= 0) {
                descs.splice(idx, 1)
                fs.writeFileSync(path.join(__dirname, 'descs.json'), JSON.stringify(descs))
                ctx.status = 200
            } else {
                ctx.status = 500
            }
        })
    )
)

app.use(
    route(
        '/list-descriptions',
        'POST',
        private(async (ctx, next) => {
            console.log('serving list-descriptions...')
            ctx.body = JSON.stringify(descs)
            ctx.status = 200
        })
    )
)

app.use(
    route(
        '/verify-login-status',
        'POST',
        private(async (ctx, next) => {
            console.log('serving verify-login-status...')
            const { id } = JSON.parse(ctx.request.body)
            if (session[id]) {
                ctx.status = 200
            } else {
                ctx.status = 403
            }
        })
    )
)

app.use(
    route(
        '/single-create',
        'POST',
        protected(async (ctx, next) => {
            console.log('serving single-create...')
            const { description: newly } = JSON.parse(ctx.request.body)
            descs.unshift(newly)
            fs.writeFileSync(path.join(__dirname, 'descs.json'), JSON.stringify(descs))
            ctx.status = 200
        })
    )
)

app.use(
    route(
        '/massive-create',
        'POST',
        protected(async (ctx, next) => {
            console.log('serving massive-create...')
            const { descriptions: newly } = JSON.parse(ctx.request.body)
            descs = [...newly, ...descs]
            fs.writeFileSync(path.join(__dirname, 'descs.json'), JSON.stringify(descs))
            ctx.status = 200
        })
    )
)

app.use(async ctx => (ctx.status = 404))

app.listen(3000)
