import { InboxOutlined } from '@ant-design/icons'
import { Form, message, Upload } from 'antd'
import { FormInstance } from 'antd/lib/form'
import * as React from 'react'

const { Dragger } = Upload

export interface Props {
    form: FormInstance
}

// const dummyRequest = ({ file, onSuccess }) => {
//     setTimeout(() => {
//         onSuccess('ok')
//     }, 0)
// }

export const MassCreate = ({ form }: Props) => {
    return (
        <Form form={form} style={{ width: '100%' }} layout="horizontal" size="large">
            <Form.Item name="file" rules={[{ required: true, message: 'At leas one file is required!' }]}>
                <Dragger
                    multiple={true}
                    beforeUpload={file => false}
                    onChange={info => {
                        const { status } = info.file
                        switch (status) {
                            case 'uploading':
                                console.log(info.file, info.fileList)
                                break
                            case 'done':
                                message.success(`${info.file.name} file uploaded successfully.`)
                                break
                            case 'error':
                                message.success(`${info.file.name} file uploaded successfully.`)
                                break
                            default:
                                break
                        }
                    }}
                >
                    <p>
                        <InboxOutlined />
                    </p>
                    <p>Click or drag file to this area to upload</p>
                </Dragger>
            </Form.Item>
        </Form>
    )
}
