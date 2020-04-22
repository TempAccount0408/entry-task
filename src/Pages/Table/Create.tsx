import { InboxOutlined } from '@ant-design/icons'
import { Button, Form, Menu, message, Modal, Upload } from 'antd'
import * as React from 'react'
import { useState } from 'react'
import * as uuid from 'uuid'
import * as api from '../../api'
import * as styles from './Create.modules.scss'
import { Description } from '../../api'
import { useAuth, useDescriptions, useAPI, builders } from '../../hooks'
import { SingleCreate } from './SingleCreate'
import { protected_ } from '../../hocs'

const { Dragger } = Upload

const SiderWidth = 128
const defaultStatus = { visible: false, massive: false }

export const Create = protected_(() => {
    const [singleForm] = Form.useForm()
    const [files, setFiles] = useState([])
    const [status, setStatus] = useState(defaultStatus)
    const { visible, massive } = status
    const [state, request] = useAPI(builders.createDescriptions)

    const [descriptions, setDescriptions] = useDescriptions()

    const onCancel = () => {
        setFiles([])
        singleForm.resetFields()
        setStatus(defaultStatus)
    }
    const onOk = async () => {
        try {
            if (massive) {
                console.log(files)
                const descs = await files.reduce(async (accu, file) => {
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
                await request({ descriptions: descs })
                setDescriptions([...descs, ...descriptions])
                onCancel()
            } else {
                const values = await singleForm.validateFields()
                const description = { ...values, id: uuid.v4() } as Description
                await request({ descriptions: [description] })
                setDescriptions([description, ...descriptions])
                onCancel()
            }
        } catch (error) {
            message.error(error.toString())
        }
    }

    return (
        <>
            <div className={styles.button}>
                <Button type="primary" onClick={() => setStatus({ ...status, visible: true })}>
                    Create
                </Button>
            </div>
            <Modal
                width={720}
                visible={visible}
                title="Create Person"
                footer={[
                    <Button key="Cancel" onClick={onCancel}>
                        Cancel
                    </Button>,
                    <Button key="Submit" type="primary" loading={state.status == 'REQUESTING'} onClick={onOk}>
                        Submit
                    </Button>,
                ]}
            >
                <div className={styles.modal}>
                    <Menu style={{ width: SiderWidth }} defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" onClick={() => setStatus({ ...status, massive: false })}>
                            Single Create
                        </Menu.Item>
                        <Menu.Item key="2" onClick={() => setStatus({ ...status, massive: true })}>
                            Mass Create
                        </Menu.Item>
                    </Menu>
                    <div className={styles.contents}>
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
})
