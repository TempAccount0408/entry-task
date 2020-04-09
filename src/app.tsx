import * as React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import * as styles from './app.scss'
import { Content } from './content'

const { SubMenu } = Menu
const { Header, Sider } = Layout

const sider_width = 256

export const App = () => (
    <Layout>
        <Header></Header>
        <Layout>
            <Sider width={sider_width} style={{ height: '100%' }}>
                <Menu
                    style={{ width: sider_width }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu key="sub1" title={<span>Navigation One</span>}>
                        <Menu.ItemGroup key="g1" title="Item 1">
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup key="g2" title="Item 2">
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout.Content>
                <Content />
            </Layout.Content>
        </Layout>
    </Layout>
)
