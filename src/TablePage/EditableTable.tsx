import { Form, Input, Popconfirm, Table } from 'antd'
import * as moment from 'moment'
import { compose, isNil, map, not } from 'ramda'
import * as React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { Description, useAuth, useDescriptions } from '../hooks'
import { useFilter } from './Filter'

const EditableContext = React.createContext(null)

const EditableRow = ({ index, ...props }: any) => {
    const [form] = Form.useForm()
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    )
}

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }: any) => {
    const [auth] = useAuth()
    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const form = useContext(EditableContext)
    useEffect(() => {
        if (editing) inputRef.current.focus()
    }, [editing])

    const toggleEdit = () => {
        if (!auth.admin) return
        setEditing(!editing)
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        })
    }

    const save = async () => {
        try {
            const values = await form.validateFields()
            toggleEdit()
            handleSave({ ...record, ...values })
        } catch (error) {
            console.log('Save failed:', error)
        }
    }

    let childNode = children

    if (editable) {
        childNode = editing ? (
            <Form.Item
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div onClick={toggleEdit}>{children}</div>
        )
    }

    return <td {...restProps}>{childNode}</td>
}

export const EditableTable = () => {
    const [auth] = useAuth()
    const [descriptions, setDescriptions] = useDescriptions()
    const [conditions] = useFilter()

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'Job Description',
            dataIndex: 'description',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            render: (text: string, record: Description) => {
                const [start, end] = record.duration.map(t => moment(t))
                const duration = moment.duration(end.diff(start))
                return duration.months() + ' Month(s)'
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text: string, record: Description) => (
                <Popconfirm
                    title="Are you sure to delete?"
                    okText="Delete"
                    onConfirm={() => setDescriptions(descriptions.filter(desc => desc.id != record.id))}
                >
                    {auth.admin && <a>Delete</a>}
                </Popconfirm>
            ),
        },
    ]

    const handleSave = (record: Description) => setDescriptions(descriptions.map(desc => (desc.id == record.id ? record : desc)))

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    }
    const columnsSource = columns.map(col => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,
            onCell: (record: any) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        }
    })
    return (
        <div>
            <Table
                rowKey="id"
                components={components}
                dataSource={descriptions.filter(desc => {
                    for (const condition of conditions) {
                        if (condition.name == 'name' && !isNil(condition.value)) {
                            if (desc.name != condition.value) return false
                        } else if (condition.name == 'description' && !isNil(condition.value)) {
                            if (desc.description != condition.value) return false
                        } else if (condition.name == 'date' && condition.value.filter(compose(not, isNil)).length == 2) {
                            const [start, end] = desc.duration.map(t => moment(t))
                            const duration = moment.duration(end.diff(start))
                            const [fstart, fend] = map(moment, condition.value)
                            const fduration = moment.duration(fend.diff(fstart))
                            if (duration.asMilliseconds() < fduration.asMilliseconds()) return false
                        }
                    }
                    return true
                })}
                columns={columnsSource}
                pagination={{
                    defaultPageSize: 5,
                    pageSize: 5,
                    showQuickJumper: true,
                    showSizeChanger: true,
                }}
            />
        </div>
    )
}
