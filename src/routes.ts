export interface RouteConfig {
    path: string
    name: string
}

export const RouteConfigs: { [key: string]: RouteConfig } = {
    table: {
        path: '/table',
        name: 'Table Page',
    },
    chart: {
        path: '/chart',
        name: 'Chart Page',
    },
}

export const routes = Object.values(RouteConfigs)
