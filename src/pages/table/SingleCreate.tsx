import * as React from 'react'
import { Form, DatePicker, Input, Select, Layout } from 'antd'
import { JOB_DESCRIPTIONS } from '../../constants'

const { Item } = Form

const { RangePicker } = DatePicker

export const SingleCreate = () => (
    <Layout.Content>
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            size="large"
        >
            <Item label="Name">
                <Input placeholder="String Only" />
            </Item>
            <Item label="Job Description">
                <Select placeholder="Select">
                    {JOB_DESCRIPTIONS.map((description: string) => (
                        <Select.Option value={description} key={description}>
                            {description}
                        </Select.Option>
                    ))}
                </Select>
            </Item>
            <Item label="Entry Date">
                <RangePicker />
            </Item>
        </Form>
    </Layout.Content>
)
