import { InboxOutlined } from '@ant-design/icons'
import { Upload, Button, Form, Layout, Menu, message, Modal } from 'antd'
import * as React from 'react'
import { useState } from 'react'
import * as uuid from 'uuid'
import { Description, useAuth, useDescriptions } from '../hooks'
import { SingleCreate } from './SingleCreate'

const { Dragger } = Upload

const SiderWidth = 128
const defaultStatus = { visible: false, massive: false }

export const Create = () => {
    const [auth] = useAuth()

    const [singleForm] = Form.useForm()
    const [files, setFiles] = useState([])
    const [status, setStatus] = useState(defaultStatus)
    const { visible, massive } = status

    const [descriptions, setDescriptions] = useDescriptions()

    const onCancel = () => {
        setFiles([])
        singleForm.resetFields()
        setStatus(defaultStatus)
    }
    const onOk = () => {
        if (massive) {
            console.log(files)
            files
                .reduce(async (accu, file) => {
                    const descs = await accu
                    const reader = new FileReader()
                    const json = await new Promise((resolve, reject) => {
                        reader.onload = event => resolve(event.target.result)
                        reader.onerror = reject
                        reader.readAsText(file)
                    })
                    console.log(json, JSON.parse(json as string))
                    return [...descs, ...JSON.parse(json as string)]
                }, Promise.resolve([]))
                .then((descs: Description[]) => {
                    console.log(descs)
                    setDescriptions([...descs, ...descriptions])
                })
                .then(onCancel)
                .catch((error: Error) => message.error(error.toString()))
        } else {
            singleForm
                .validateFields()
                .then(values => {
                    const description = { ...values, id: uuid.v4() } as Description
                    setDescriptions([description, ...descriptions])
                })
                .then(onCancel)
                .catch(error => {
                    console.log('Validate Failed:', error)
                    message.error(error.toString())
                })
        }
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
                        {massive ? (
                            <div>
                                {/* why dragger is wrapped by a span... */}
                                <Dragger
                                    fileList={files}
                                    multiple={true}
                                    beforeUpload={file => {
                                        // need to handle duplicate files
                                        setFiles([...files, file])
                                        return false
                                    }}
                                    onRemove={file => {
                                        const idx = files.indexOf(file)
                                        setFiles([...files.slice(0, idx), ...files.slice(idx + 1)])
                                    }}
                                >
                                    <p>
                                        <InboxOutlined />
                                    </p>
                                    <p>Click or drag file to this area to upload</p>
                                </Dragger>
                            </div>
                        ) : (
                            <SingleCreate form={singleForm} />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}
