import { createStore, createPesistStore } from './utils'

export { createStore, createPesistStore } from './utils'
import { useState } from 'react'
import { Auth, Description } from '../api'
import { message } from 'antd'

export const useDescriptions = createStore([] as Description[])

export interface AppStatus {
    logging: boolean
}

export const useApp = createPesistStore({ logging: false }, 'app')

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

export const useAPI = <T, R>(req: (arg: T) => Promise<R>): [APIState<R>, (arg: T) => Promise<R>] => {
    const [state, setState] = useState(defaultState as APIState<R>)

    const wrapped = async (arg: T) => {
        setState({ ...defaultState, requesting: true, status: 'REQUESTING' })
        try {
            const resp = await req(arg)
            setState({ ...defaultState, requesting: false, resp, status: 'SUCCESS' })
            return resp
        } catch (error) {
            console.log(`Action Failed: ${error.toString()}`)
            message.error(`Action Failed: ${error.toString()}`)
            setState({ ...defaultState, requesting: false, error, status: 'FAILED' })
            throw error
        }
    }

    return [state, wrapped]
}
