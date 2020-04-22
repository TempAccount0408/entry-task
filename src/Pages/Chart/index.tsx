import { PageHeader } from 'antd'
import { Axis, Chart, Geom, Legend, Tooltip } from 'BizCharts'
import * as moment from 'moment'
import * as React from 'react'
import { private_ } from '../../hocs'
import { builders, useAPI, useDescriptions } from '../../hooks'
import { RouteConfigs } from '../../routes'

export const ChartPage = private_(() => {
    const [descriptions, setDescriptions] = useDescriptions()
    const [{ status, resp }, req] = useAPI(builders.listDescriptions)

    React.useEffect(() => {
        req({}).then(setDescriptions)
    }, [])

    const months = []
    for (let i = 1; i <= 9; i += 1) months.push({ count: 0, name: `0${i}` })
    for (let i = 10; i <= 12; i += 1) months.push({ count: 0, name: i.toString() })
    for (const description of descriptions) {
        const m = moment(description.duration[0]).month() - 1
        months[m].count += 1
    }

    return (
        <div style={{ width: '100%' }}>
            <PageHeader
                title="Table Page"
                breadcrumb={{
                    routes: [
                        { breadcrumbName: 'System Management', path: '/' },
                        {
                            breadcrumbName: 'Chart Page',
                            path: RouteConfigs.chart.path,
                        },
                    ],
                }}
            />
            <Chart height={400} data={months} forceFit>
                <Axis name="name" />
                <Axis name="count" />
                <Legend position="left-top" />
                <Tooltip enterable />
                <Geom type="interval" position="name*count" />
            </Chart>
        </div>
    )
})

export default ChartPage
