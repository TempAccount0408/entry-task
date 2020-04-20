import { Layout } from 'antd'
import * as React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// import { ChartPage } from '../Pages/Chart'
// import { TablePage } from '../Pages/Table'
import { RouteConfigs } from '../routes'

const TablePage = React.lazy(() => import('../Pages/Table'))
const ChartPage = React.lazy(() => import('../Pages/Chart'))

const Content = () => {
    return (
        <Layout.Content style={{ padding: 16, backgroundColor: 'white' }}>
            <Switch>
                <Route path={RouteConfigs.table.path}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <TablePage />
                    </React.Suspense>
                </Route>
                <Route path={RouteConfigs.chart.path}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <ChartPage />
                    </React.Suspense>
                </Route>
                {/* <Redirect to={RouteConfigs.table.path}></Redirect> */}
            </Switch>
        </Layout.Content>
    )
}

export default Content
