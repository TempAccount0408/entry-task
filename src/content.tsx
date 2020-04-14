import * as React from 'react'
import { PageHeader, Layout } from 'antd'
import { Content as TablePage } from './pages/table'

const routes = [
    {
        path: 'index',
        breadcrumbName: 'First-level Menu',
    },
    {
        path: 'first',
        breadcrumbName: 'Second-level Menu',
    },
    {
        path: 'second',
        breadcrumbName: 'Third-level Menu',
    },
]

export const Content = () => {
    return (
        <Layout.Content style={{ padding: 16, backgroundColor: 'white' }}>
            <PageHeader title="" breadcrumb={{ routes }} />
            <TablePage />
        </Layout.Content>
    )
}
