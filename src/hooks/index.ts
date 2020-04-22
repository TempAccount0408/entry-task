import { message } from 'antd'
import { useRef, useState, useEffect } from 'react'
import { APIBase, Auth, Description } from '../api'
import { useSafeState, createPesistStore, createStore } from './utils'

export { useSafeState, createPesistStore, createStore } from './utils'

export const useDescriptions = createStore([] as Description[])

export interface AppStatus {
    logging: boolean
}

export const useApp = createStore({ logging: false })

export const useAuth = createPesistStore({} as Auth, 'auth')

export type Status = 'SUCCESS' | 'REQUESTING' | 'FAILED' | 'IDLE'

export interface APIState<R> {
    requesting: boolean
    resp?: R
    error?: Error
    status: Status
}

const defaultState = {
    requesting: false,
    status: 'IDLE',
}

export interface APIParams<R> {
    endpoint: string
    method: string
    body?: any
}

export interface Protected {
    id: string
}

export interface Private {
    id: string
}

export type Builder<T, R> = (payload: T) => [APIParams<R>, (resp: Response) => Promise<R>, boolean]

const listDescriptions: Builder<{}, Description[]> = payload => [
    {
        endpoint: '/list-descriptions',
        method: 'POST',
        body: payload,
    },
    resp => resp.json(),
    true,
]
const logout: Builder<{}, void> = payload => [
    {
        endpoint: '/logout',
        method: 'PUT',
        body: payload,
    },
    resp => Promise.resolve(),
    true,
]
const login: Builder<{ email: string }, Auth> = payload => [
    {
        endpoint: '/login',
        method: 'PUT',
        body: payload,
    },
    resp => resp.json(),
    false,
]
// need a better type signature
const updateDescription: Builder<{ description: Description }, void> = payload => [
    {
        endpoint: '/update-description',
        method: 'PUT',
        body: payload,
    },
    resp => Promise.resolve(),
    true,
]
const createDescriptions: Builder<{ descriptions: Description[] }, void> = payload => [
    {
        endpoint: '/massive-create',
        method: 'POST',
        body: payload,
    },
    resp => Promise.resolve(),
    true,
]
// need a better type signature
const deleteDescription: Builder<{ description: { id: string } }, void> = payload => [
    {
        endpoint: '/delete-description',
        method: 'PUT',
        body: payload,
    },
    resp => Promise.resolve(),
    true,
]

export const builders = {
    listDescriptions,
    logout,
    login,
    updateDescription,
    createDescriptions,
    deleteDescription,
}

export const useAPI = <T, R>(builder: Builder<T, R>): [APIState<R>, (payload: T, rethrow?: boolean) => Promise<R>] => {
    const [auth, setAuth] = useAuth()
    const [app, setApp] = useApp()

    const [state, setState, container] = useSafeState(defaultState as APIState<R>)

    const wrapped = async (payload: T, rethrow = false) => {
        setState({ ...defaultState, requesting: true, status: 'REQUESTING' })

        try {
            const [{ endpoint, method, body }, transform, inject] = builder(payload)
            console.log('body', body)
            const resp = await fetch(APIBase + endpoint, { method, body: JSON.stringify(inject ? { ...body, id: auth.id } : body) })

            if (!resp.ok) {
                if (resp.status == 403) {
                    setApp({ logging: true })
                    setAuth(null)
                }
                throw new Error('Req not accepted.')
            }

            const result = await transform(resp)
            setState({ ...defaultState, requesting: false, resp: result, status: 'SUCCESS' })
            return result
        } catch (error) {
            console.error(error)
            message.error(`Action Failed: ${error.toString()}`)
            container.current({ ...defaultState, requesting: false, error, status: 'FAILED' })
            if (rethrow) {
                throw error
            }
        }
    }

    return [state, wrapped]
}
