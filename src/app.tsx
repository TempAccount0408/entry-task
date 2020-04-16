import { Layout, Menu } from 'antd'
import * as React from 'react'
import { useLocation } from 'react-router-dom'
import AppHeader from './AppHeader'
import { Content } from './content'
import { useAuth } from './hooks'
import LoginPage from './LoginPage'
import { routes } from './routes'

const { SubMenu } = Menu
const { Header, Sider } = Layout

const SiderWidth = 256

export const App = () => {
    const [auth, setAuth] = useAuth()
    const location = useLocation()
    console.log(location)

    return auth && auth.id ? (
        <Layout>
            <AppHeader></AppHeader>
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
    ) : (
        <LoginPage></LoginPage>
    )
}
