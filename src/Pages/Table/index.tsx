import { PageHeader } from 'antd'
import * as React from 'react'
import { RouteConfigs } from '../../routes'
import { Create } from './Create'
import { EditableTable } from './EditableTable'
import { Filter } from './Filter'
import { private_ } from '../../hocs'

export const TablePage = private_(() => {
    return (
        <div>
            <PageHeader
                title="Table Page"
                breadcrumb={{
                    routes: [
                        { breadcrumbName: 'System Management', path: '/' },
                        {
                            breadcrumbName: 'Table Page',
                            path: RouteConfigs.table.path,
                        },
                    ],
                }}
            />
            <Filter />
            <Create />
            <EditableTable />
        </div>
    )
})
