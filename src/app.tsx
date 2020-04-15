import { Layout, Menu } from 'antd'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { Content } from './content'
import { routes } from './routes'
import { useApp } from './hooks'
import LoginPage from './LoginPage'

const { SubMenu } = Menu
const { Header, Sider } = Layout

const SiderWidth = 256

export const App = () => {
    const [app] = useApp()
    const location = useLocation()
    console.log(location)

    if (app.logged)
        return (
            <Layout>
                <Header style={{ color: 'white', backgroundColor: '#2673DD' }}>
                    <p>System Management</p>
                </Header>
                <Layout style={{ background: 'white' }}>
                    <Sider width={SiderWidth} style={{ height: '100%' }}>
                        <Menu
                            style={{ width: SiderWidth, height: '100%' }}
                            defaultOpenKeys={['1']}
                            defaultSelectedKeys={[location.pathname]}
                            mode="inline"
                        >
                            <SubMenu key="1" title="System Management">
                                {routes.map(route => (
                                    <Menu.Item key={route.path}>{route.name}</Menu.Item>
                                ))}
                            </SubMenu>
                        </Menu>
                    </Sider>

                    <Content />
                </Layout>
            </Layout>
        )
    return <LoginPage></LoginPage>
}
