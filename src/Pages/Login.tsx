import { Select, Button, Form, Input, message } from 'antd'
import { useForm } from 'antd/lib/form/util'
import * as React from 'react'
import * as api from '../api'
import { useApp, useAuth, useAPI } from '../hooks'
import * as styles from './Login.modules.scss'

const { Item } = Form
const { Option } = Select

export const LoginPage = () => {
    const [form] = useForm()
    const [app, setApp] = useApp()
    const [auth, setAuth] = useAuth()
    const [reqState, request] = useAPI(api.login)

    const login = async () => {
        try {
            const { email } = await form.validateFields()

            const resp = await request({ email })
            console.log(resp)
            setAuth({ ...auth, ...resp })
            setApp({ ...app, logging: false })
        } catch (error) {}
    }
    const cancel = () => setApp({ ...app, logging: false })

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    }

    return (
        <div className={styles.container}>
            <Form form={form} {...formItemLayout} layout="horizontal" size="large">
                <Item name="email" label="Email" rules={[{ required: true, message: 'NameName is required!' }]}>
                    <Input placeholder="String Only" />
                </Item>
            </Form>
            <div className={styles.actions}>
                <Button disabled={reqState.status == 'REQUESTING'} onClick={login}>
                    Login
                </Button>
                <Button onClick={cancel}>Cancel</Button>
            </div>
        </div>
    )
}
