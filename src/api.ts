export const APIBase = 'http://localhost:3000'

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
    return resp
}

// export const logout = async (payload: Private): Promise<void> => {
//     const resp = await req('/logout', { body: JSON.stringify(payload), method: 'PUT' })
//     return
// }

// export const login = async (payload: { email: string }): Promise<Auth> => {
//     const resp = await req('/login', { body: JSON.stringify(payload), method: 'PUT' })
//     const json = (await resp.json()) as Auth
//     return json
// }

// export const listDescriptions = async (payload: Private): Promise<Description[]> => {
//     const resp = await req('/list-descriptions', { method: 'POST', body: JSON.stringify(payload) })
//     const json = (await resp.json()) as Description[]
//     return json
// }

// export const updateDescription = async ({ id, ...rest }: Protected) => {
//     const resp = await req('/update-description', { body: JSON.stringify({ id, ...rest }), method: 'PUT' })
//     return
// }

// export const createDescriptions = async (payload: Protected & { descriptions: Description[] }): Promise<void> => {
//     const resp = await req('/massive-create', { body: JSON.stringify(payload), method: 'POST' })
//     return
// }
