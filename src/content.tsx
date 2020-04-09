import * as React from 'react'
import { PageHeader } from 'antd'

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
    return <PageHeader title="Title" breadcrumb={{ routes }} />
}
