import { useState, useEffect } from 'react'

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
    id: number
}

const start = 1318785876406
const end = 1348781876406
export const useDescriptions = createStore([
    { name: 'Curry0', description: 'Front-End Dev', duration: [start, end], id: 0 },
    { name: 'Curry1', description: 'Front-End Dev', duration: [start, end], id: 1 },
    { name: 'Curry2', description: 'Front-End Dev', duration: [start, end], id: 2 },
    { name: 'Curry3', description: 'Front-End Dev', duration: [start, end], id: 3 },
    { name: 'Curry4', description: 'Front-End Dev', duration: [start, end], id: 4 },
    { name: 'Curry5', description: 'Front-End Dev', duration: [start, end], id: 5 },
    { name: 'Curry6', description: 'Front-End Dev', duration: [start, end], id: 6 },
] as Description[])
