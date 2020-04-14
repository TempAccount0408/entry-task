import * as React from 'react'
import { Upload, message, Layout } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

const { Dragger } = Upload

export const MassCreate = () => (
    <Layout.Content>
        <Dragger
            name="file"
            multiple={true}
            action=""
            onChange={info => {
                const { status } = info.file
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList)
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`)
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`)
                }
            }}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
    </Layout.Content>
)
