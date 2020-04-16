import { Button, Col, DatePicker, Form, Input, message, Row, Select } from 'antd'
import { Moment } from 'moment'
import * as React from 'react'
import { JOB_DESCRIPTIONS } from '../constants'
import { createStore } from '../hooks'
import * as moment from 'moment'

const { RangePicker } = DatePicker
const { Option } = Select

// I don't know why antd does not export this interface
// interface FieldData {
//     name: string[]
//     value: any
//     touched: boolean
//     validating: boolean
//     errors: string[]
// }

// export type FilterConditions =
//     | { name: 'name'; value: string }
//     | { name: 'date'; value: [Moment, Moment] }
//     | { name: 'description'; value: string }

export type FilterConditions = {
    name?: string
    description?: string
    duration?: [Moment, Moment]
}

export const defaults = {
    name: undefined,
    description: undefined,
    duration: [undefined, undefined],
} as FilterConditions

export const useConditions = createStore(defaults)

export const Filter = () => {
    const [form] = Form.useForm()
    const [conditions, setConditions] = useConditions()
    const submit = () =>
        form
            .validateFields()
            .then((values: FilterConditions) => {
                if (values.duration && values.duration.filter(d => d != undefined).length == 2) {
                    const duration = moment.duration(values.duration[1].diff(values.duration[0]))
                    if (duration.asMonths() > 24) {
                        message.error('Entry Date cannot be more than 2 years.')
                        return
                    }
                }
                setConditions(values)
            })
            .catch(console.error)

    const reset = () => {
        form.resetFields()
        setConditions(defaults)
    }

    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    return (
        <Form {...formItemLayout} form={form}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input placeholder="String Only" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="description" label="Job Description">
                        <Select placeholder="Select" allowClear>
                            {JOB_DESCRIPTIONS.map(desc => (
                                <Option key={desc} value={desc}>
                                    {desc}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="duration" label="Entry Date">
                        <RangePicker style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={submit}>Submit</Button>
                        <Button style={{ marginLeft: 8 }} onClick={reset}>
                            Reset
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    )
}
