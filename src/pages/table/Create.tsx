import { Button, Form, Layout, Menu, Modal } from 'antd'
import * as React from 'react'
import { useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { useDescriptions } from '../../hooks'
import { MassCreate } from './MassCreate'
import { SingleCreate } from './SingleCreate'

const { Sider } = Layout

const sider_width = 128

const CreateForm = ({ visible, onCreate, onCancel }: any) => {
    const [form] = Form.useForm()
    const [state, setState] = useDescriptions()
    return (
        <Modal
            visible={visible}
            title="Create Person"
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        setState([
                            ...state,
                            {
                                ...values,
                                visible: true,
                                key: state.reduce((maxId, person) => Math.max(person.id, maxId), -1) + 1,
                            },
                        ])
                        form.resetFields()
                        onCreate(values)
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info)
                    })
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <HashRouter>
                    <Layout>
                        <Sider>
                            <Menu
                                style={{ width: sider_width }}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['1']}
                                mode="inline"
                            >
                                <Menu.Item key="1">Single Create</Menu.Item>
                                <Menu.Item key="2">Mass Create</Menu.Item>
                            </Menu>
                        </Sider>
                        <Switch>
                            <Route path="/TabelPage/SingleCreate" component={SingleCreate} />
                            <Route path="/TabelPage/MassCreate" component={MassCreate} />
                        </Switch>
                    </Layout>
                </HashRouter>
            </Form>
        </Modal>
    )
}

export const Create = () => {
    const [visible, setVisible] = useState(false)

    const onCreate = (values: any) => {
        setVisible(false)
    }

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true)
                }}
            >
                Create
            </Button>
            <CreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false)
                }}
            />
        </div>
    )
}
