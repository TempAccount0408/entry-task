import { Button, Form, Layout, Menu, Modal } from 'antd'
import * as React from 'react'
import { useState } from 'react'
import * as uuid from 'uuid'
import { Description, useAuth, useDescriptions } from '../hooks'
import { MassCreate } from './MassCreate'
import { SingleCreate } from './SingleCreate'

const { Sider } = Layout

const SiderWidth = 128
const defaultStatus = { visible: false, massive: false }

export const Create = () => {
    const [auth] = useAuth()

    const [singleForm] = Form.useForm()
    const [massiveForm] = Form.useForm()
    const [status, setStatus] = useState(defaultStatus)
    const { visible, massive } = status

    const [descriptions, setDescriptions] = useDescriptions()

    const onCancel = () => {
        singleForm.resetFields()
        setStatus(defaultStatus)
    }
    const onOk = () => {
        singleForm
            .validateFields()
            .then(values => {
                const description = { ...values, id: uuid.v4() } as Description
                setDescriptions([description, ...descriptions])
            })
            .then(onCancel)
            .catch(info => {
                console.log('Validate Failed:', info)
            })
    }

    if (!auth.admin) return null
    return (
        <>
            <div style={{ margin: '16px 0px' }}>
                <Button type="primary" onClick={() => setStatus({ ...status, visible: true })}>
                    Create
                </Button>
            </div>
            <Modal width={720} visible={visible} title="Create Person" okText="Submit" cancelText="Cancel" onCancel={onCancel} onOk={onOk}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Menu style={{ width: SiderWidth }} defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" onClick={() => setStatus({ ...status, massive: false })}>
                            Single Create
                        </Menu.Item>
                        <Menu.Item key="2" onClick={() => setStatus({ ...status, massive: true })}>
                            Mass Create
                        </Menu.Item>
                    </Menu>
                    <div style={{ width: '100%', padding: 8 }}>
                        {massive ? <MassCreate form={massiveForm} /> : <SingleCreate form={singleForm} />}
                    </div>
                </div>
            </Modal>
        </>
    )
}
