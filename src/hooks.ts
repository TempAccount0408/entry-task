import { useEffect, useState } from 'react'
import * as uuid from 'uuid'

export const createStore = <T>(initState: T): (() => [T, (state: T) => void]) => {
    const listeners: Set<(state: T) => void> = new Set()
    let curr = initState

    return () => {
        const [state, local] = useState(curr)
        useEffect(() => {
            listeners.add(local)
            return () => {
                listeners.delete(local)
            }
        }, [])

        const setState = (state: T) => {
            curr = state
            for (const setState of listeners) setState(state)
        }

        return [state, setState]
    }
}

export interface Description {
    name: string
    description: string
    duration: [number, number]
    id: string
}

const start = 1318785876406
const end = 1348781876406
export const useDescriptions = createStore([
    { name: 'Curry0', description: 'Front-End Dev', duration: [start, end], id: uuid.v4() },
    { name: 'Curry1', description: 'Front-End Dev', duration: [start, end], id: uuid.v4() },
    { name: 'Curry2', description: 'Front-End Dev', duration: [start, end], id: uuid.v4() },
    { name: 'Curry3', description: 'Front-End Dev', duration: [start, end], id: uuid.v4() },
    { name: 'Curry4', description: 'Front-End Dev', duration: [start, end], id: uuid.v4() },
    { name: 'Curry5', description: 'Front-End Dev', duration: [start, end], id: uuid.v4() },
    { name: 'Curry6', description: 'Front-End Dev', duration: [start, end], id: uuid.v4() },
] as Description[])

export interface AppStatus {
    logged: boolean
}

export const useApp = createStore({ logged: false } as AppStatus)

export interface Auth {
    name: string
    admin: boolean
}

export const useAuth = createStore({ name: '', admin: false } as Auth)
