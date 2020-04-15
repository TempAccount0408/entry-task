import * as React from 'react'
import { PageHeader, Layout } from 'antd'
import { Content as TablePage } from './TablePage'
import { Route, Switch, useLocation, Redirect } from 'react-router-dom'
import { routes, RouteConfigs } from './routes'

export const Content = () => {
    const location = useLocation()

    return (
        <Layout.Content style={{ padding: 16, backgroundColor: 'white' }}>
            <Switch>
                <Route path={RouteConfigs.table.path}>
                    <TablePage />
                </Route>
                <Route path={RouteConfigs.table.path}>
                    <TablePage />
                </Route>
                <Redirect to={RouteConfigs.table.path}></Redirect>
            </Switch>
        </Layout.Content>
    )
}
