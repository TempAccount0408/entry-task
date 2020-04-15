import { Form, Input, Select } from 'antd'
import { useForm } from 'antd/lib/form/util'
import * as React from 'react'
import { useApp, useAuth } from './hooks'

const { Item } = Form

const Login = () => {
    const [form] = useForm()
    const [app, setApp] = useApp()
    const [auth, setAuth] = useAuth()

    const login = async () => {
        try {
            const values = await form.validateFields()
            setApp({ ...app, logged: true })
            setAuth({ ...auth, ...values })
        } catch (error) {
            console.log('Validate Failed:', error)
        }
    }

    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    return (
        <div style={{ padding: '16px' }}>
            <Form form={form} style={{ width: '100%' }} {...formItemLayout} layout="horizontal" size="large">
                <Item name="name" label="Name" rules={[{ required: true, message: 'NameName is required!' }]}>
                    <Input placeholder="String Only" />
                </Item>
                <Item name="admin" label="If Admin" rules={[{ required: true, message: 'Descriptoin is required!' }]}>
                    <Select placeholder="Select">
                        <Select.Option value={true}>True</Select.Option>
                        <Select.Option value={false}>False</Select.Option>
                    </Select>
                </Item>
            </Form>
            <button style={{ float: 'right' }} onClick={login}>
                Login
            </button>
        </div>
    )
}

export default Login
