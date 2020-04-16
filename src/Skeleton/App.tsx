import { Layout, Menu } from 'antd'
import * as React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useApp } from '../hooks'
import { LoginPage } from '../Pages/Login'
import { routes } from '../routes'
import { default as Header } from './Header'
import { default as Content } from './Content'
import './App.scss'

const { SubMenu } = Menu
const { Sider } = Layout

const SiderWidth = 256

export const App = () => {
    const location = useLocation()
    const [app] = useApp()
    const history = useHistory()

    return app.logging ? (
        <LoginPage></LoginPage>
    ) : (
        <Layout>
            <Header></Header>
            <Layout style={{ background: 'white' }}>
                <Sider width={SiderWidth} style={{ height: '100%' }}>
                    <Menu
                        style={{ width: SiderWidth, height: '100%' }}
                        // defaultOpenKeys={['1']}
                        // defaultSelectedKeys={[location.pathname]}
                        selectedKeys={[location.pathname]}
                        mode="inline"
                    >
                        <SubMenu key="1" title="System Management">
                            {routes.map(route => (
                                <Menu.Item onClick={() => history.push(route.path)} key={route.path}>
                                    {route.name}
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content />
            </Layout>
        </Layout>
    )
}

export default App
