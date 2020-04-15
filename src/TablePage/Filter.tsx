import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd'
import { Moment } from 'moment'
import { compose, isNil, not } from 'ramda'
import * as React from 'react'
import { JOB_DESCRIPTIONS } from '../constants'
import { createStore } from '../hooks'

const { RangePicker } = DatePicker
const { Option } = Select
const { useState } = React

// I don't know why antd does not export this interface
interface FieldData {
    name: string[]
    value: any
    touched: boolean
    validating: boolean
    errors: string[]
}

export type FilterConditions =
    | { name: 'name'; value: string }
    | { name: 'date'; value: [Moment, Moment] }
    | { name: 'description'; value: string }

const defaults = {
    name: undefined as string,
    description: undefined as string,
    date: [undefined as Moment, undefined as Moment],
}

export const useFilter = createStore([])

export const Filter = () => {
    const [fields, setFields] = useState([] as FieldData[])
    const [, setFilter] = useFilter()
    const submit = () =>
        setFilter(
            fields
                .filter(field => {
                    const name = field.name.join('')
                    if (name == 'name' || name == 'description') {
                        return field.value != undefined
                    } else {
                        return field.value && field.value.filter(compose(not, isNil)).length == 2
                    }
                })
                .map(field => ({ name: field.name.join(''), value: field.value }))
        )
    const reset = () => {
        setFields(
            fields.map(field => {
                const name = field.name.join('')
                if (name == 'name' || name == 'description') {
                    return { ...field, value: defaults[name] }
                } else {
                    return { ...field, value: defaults['date'] }
                }
            })
        )
        setFilter([])
    }

    const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    return (
        <Form {...formItemLayout} fields={fields} onFieldsChange={(field, fields) => setFields(fields as FieldData[])}>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="name" label="Name">
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
                    <Form.Item name="date" label="Entry Date">
                        <RangePicker />
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
