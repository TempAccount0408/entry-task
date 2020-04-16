const path = require('path')
const { v4 } = require('uuid')
const fs = require('fs')

const short = () => v4().slice(0, 10)

const JOB_DESCRIPTIONS = ['Front-end Dev', 'Core Server', 'Product Manager', 'Project Manager', 'QA']

const descs = []
for (let i = 0; i <= 10; i += 1) {
    const id = v4()
    const name = short()
    const email = `${short()}@shopee.com`
    const description = JOB_DESCRIPTIONS[Math.floor(Math.random() * JOB_DESCRIPTIONS.length)]
    const duration = [+new Date(), +new Date() + Math.floor(Math.random() * 1000000)]
    const admin = Math.random() > 0.5
    const desc = { id, admin, name, email, description, duration }
    descs.push(desc)
}
fs.writeFileSync(path.join(__dirname, 'descs.json'), JSON.stringify(descs))

const users = [
    { id: v4(), name: 'Curry', email: 'curry@shopee.com', admin: true },
    { id: v4(), name: '_Curry', email: '_curry@shopee.com', admin: false },
]
fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users))
