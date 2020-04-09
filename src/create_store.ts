import { useState, useEffect } from 'react'

const create_store = <T>(initState: T): (() => [T, (state: T) => void]) => {
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

export default create_store
