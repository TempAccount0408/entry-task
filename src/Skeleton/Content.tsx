import { Layout } from 'antd'
import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ChartPage } from '../Pages/Chart'
import { TablePage } from '../Pages/Table'
import { RouteConfigs } from '../routes'

const Content = () => {
    return (
        <Layout.Content style={{ padding: 16, backgroundColor: 'white' }}>
            <Switch>
                <Route path={RouteConfigs.table.path}>
                    <TablePage />
                </Route>
                <Route path={RouteConfigs.chart.path}>
                    <ChartPage />
                </Route>
                {/* <Redirect to={RouteConfigs.table.path}></Redirect> */}
            </Switch>
        </Layout.Content>
    )
}

export default Content
