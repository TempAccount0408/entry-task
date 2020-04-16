import { UnorderedListOutlined, LogoutOutlined } from '@ant-design/icons'
import { Layout, Popover } from 'antd'
import * as React from 'react'
import { useAuth } from './hooks'

const { Header, Sider } = Layout

export const HeaderHeight = 64

const AppHeader = () => {
    const [auth, setAuth] = useAuth()
    const title = (
        <div style={{ display: 'flex', paddingTop: '1em' }}>
            <img style={{ height: 42 }} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"></img>
            <div style={{ paddingLeft: '1em' }}>
                <p>{auth.name}</p>
                <p>{auth.email}</p>
            </div>
        </div>
    )
    const content = (
        <p style={{ margin: 0 }} onClick={() => setAuth(null)}>
            <LogoutOutlined style={{ marginRight: '1em' }} />
            Logout
        </p>
    )

    return (
        <Header
            style={{
                height: HeaderHeight,
                color: 'white',
                backgroundColor: '#2673DD',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <p>
                <UnorderedListOutlined style={{ marginRight: '1em' }} />
                System Management
            </p>
            <Popover placement="bottomRight" title={title} content={content} trigger="click">
                <img style={{ height: 42 }} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"></img>
            </Popover>
        </Header>
    )
}

export default AppHeader
