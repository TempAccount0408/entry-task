import * as React from 'react'
import { useAuth } from './hooks'

type Hoc = (Cmp: any) => (props: any) => JSX.Element

export const private_: Hoc = Cmp => props => {
    const [auth] = useAuth()
    if (auth && auth.id) return <Cmp {...props}></Cmp>
    return null
}

export const protected_: Hoc = Cmp => props => {
    const [auth] = useAuth()
    if (auth && auth.admin) return <Cmp {...props}></Cmp>
    return null
}
