import * as React from 'react'
import { Form, DatePicker, Input, Select, Layout } from 'antd'
import { FormInstance } from 'antd/lib/form/util'
import { JOB_DESCRIPTIONS } from '../constants'

const { Item } = Form

const { RangePicker } = DatePicker

export interface Props {
    form: FormInstance
}

export const SingleCreate = ({ form }: Props) => {
    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    return (
        <Form form={form} style={{ width: '100%' }} {...formItemLayout} layout="horizontal" size="large">
            <Item name="name" label="Name" rules={[{ required: true, message: 'NameName is required!' }]}>
                <Input placeholder="String Only" />
            </Item>
            <Item name="description" label="Job Description" rules={[{ required: true, message: 'Descriptoin is required!' }]}>
                <Select placeholder="Select">
                    {JOB_DESCRIPTIONS.map((description: string) => (
                        <Select.Option value={description} key={description}>
                            {description}
                        </Select.Option>
                    ))}
                </Select>
            </Item>
            <Item name="duration" label="Entry Date" rules={[{ required: true, message: 'Duration is required!' }]}>
                <RangePicker style={{ width: '100%' }} />
            </Item>
        </Form>
    )
}
