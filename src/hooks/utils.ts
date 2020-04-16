import { useEffect, useState } from 'react'

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

export const createPesistStore = <T>(defaultState: T, key: string): (() => [T, (state: T) => void]) => {
    const initState = (localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))) || defaultState
    const hook = createStore(initState)
    return () => {
        const [state, setState] = hook()
        const persistSetState = (state: T) => {
            localStorage.setItem(key, JSON.stringify(state))
            setState(state)
        }
        return [state, persistSetState]
    }
}
