import { message } from 'antd'

const APIBase = 'http://localhost:3000'

export interface Description {
    name: string
    description: string
    duration: [number, number]
    id: string
}

export interface Auth {
    id: string
    name: string
    email: string
    admin: boolean
}

const req = async (endpoint: string, { body, method }: { body?: string; method: string }) => {
    console.log(endpoint, { body, method })
    const resp = await fetch(APIBase + endpoint, { mode: 'cors', body, method })
    if (!resp.ok) {
        throw new Error('Resp not ok')
    }
    return resp
}

export const updateDescription = async ({ id, ...rest }: { id: string }) => {
    console.log(id)
    const resp = await req('/update-description', { body: JSON.stringify({ id, ...rest }), method: 'put' })
    return
}

export const listDescriptions = async ({}): Promise<Description[]> => {
    const resp = await req('/list-descriptions', { method: 'get' })
    const json = (await resp.json()) as Description[]
    return json
}

export const createDescriptions = async ({ descriptions }: { descriptions: Description[] }): Promise<void> => {
    const resp = await req('/massive-create', { body: JSON.stringify(descriptions), method: 'post' })
    return
}

export const logout = async ({ id }: { id: string }): Promise<void> => {
    const resp = await req('/logout', { body: JSON.stringify({ id }), method: 'put' })
    return
}

export const login = async ({ email }: { email: string }): Promise<Auth> => {
    const resp = await req('/login', { body: JSON.stringify({ email }), method: 'put' })
    const json = (await resp.json()) as Auth
    return json
}

// export const defaultCatcher = promise => promise.catch(error => message.error(`Action Error: ${error.toString()}`))
