import { LogoutOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Layout, Popover } from 'antd'
import * as React from 'react'
import * as api from '../api'
import { useAPI, useApp, useAuth } from '../hooks'
import * as styles from './Header.modules.scss'

console.log(styles)

export const HeaderHeight = 64

const Header = () => {
    const [auth, setAuth] = useAuth()
    const [app, setApp] = useApp()
    const [{ status }, req] = useAPI(api.logout)
    const logout = async () => {
        try {
            await req({ id: auth.id })
            setAuth(null)
        } catch (error) {}
    }

    return (
        <Layout.Header style={{ height: HeaderHeight }} className={styles.header}>
            <p>
                <UnorderedListOutlined style={{ marginRight: '1em' }} />
                System Management
            </p>
            {auth && auth.id ? (
                <Popover
                    placement="bottomRight"
                    title={
                        <div className={styles.popover}>
                            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"></img>
                            <div>
                                <p>{auth.name}</p>
                                <p>{auth.email}</p>
                            </div>
                        </div>
                    }
                    content={
                        status == 'REQUESTING' ? (
                            <p>...</p>
                        ) : (
                            <p onClick={logout}>
                                <LogoutOutlined style={{ marginRight: '1em' }} />
                                Logout
                            </p>
                        )
                    }
                    trigger="click"
                >
                    <img style={{ height: 42 }} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"></img>
                </Popover>
            ) : (
                <p onClick={() => setApp({ ...app, logging: true })}>Login</p>
            )}
        </Layout.Header>
    )
}

export default Header
