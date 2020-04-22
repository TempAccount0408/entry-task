import { Form, Input, Popconfirm, Table } from 'antd'
import * as moment from 'moment'
import * as React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import * as api from '../../api'
import { Description } from '../../api'
import { useAPI, useAuth, useDescriptions, builders } from '../../hooks'
import { useConditions } from './Filter'
import { equals } from 'ramda'
import { protected_, private_ } from '../../hocs'

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
        if (!auth && !auth.admin) return
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

export const EditableTable = private_(() => {
    const [auth] = useAuth()
    const [descriptions, setDescriptions] = useDescriptions()
    const [updateReqState, updateReq] = useAPI(builders.updateDescription)
    const [{ status, resp }, listReq] = useAPI(builders.listDescriptions)
    const [, deleteReq] = useAPI(builders.deleteDescription)
    React.useEffect(() => {
        listReq({})
    }, [])
    React.useEffect(() => {
        setDescriptions(resp || [])
    }, [resp])
    const [conditions] = useConditions()

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
                    onConfirm={async () => {
                        try {
                            await deleteReq({ description: record })
                            setDescriptions(descriptions.filter(desc => desc.id != record.id))
                        } catch (error) {}
                    }}
                >
                    {auth && auth.admin && <a>Delete</a>}
                </Popconfirm>
            ),
        },
    ]

    const handleSave = async (record: Description) => {
        const modified = !equals(
            record,
            descriptions.find(({ id }) => id == record.id)
        )
        if (modified) {
            try {
                console.log(record)
                await updateReq({ description: record }, true)
                setDescriptions(descriptions.map(desc => (desc.id == record.id ? record : desc)))
            } catch (error) {}
        }
    }

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
            onCell: (record: Description) => ({
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
                loading={status == 'REQUESTING'}
                components={components}
                dataSource={descriptions.filter(desc => {
                    if (conditions.name && !desc.name.startsWith(conditions.name)) {
                        return false
                    }
                    if (conditions.description && desc.description != conditions.description) {
                        return false
                    }
                    if (conditions.duration && conditions.duration.filter(d => d != undefined).length == 2) {
                        const dd = moment.duration(moment(desc.duration[1]).diff(moment(desc.duration[0])))
                        const df = moment.duration(conditions.duration[1].diff(conditions.duration[0]))
                        if (dd.asMilliseconds() < df.asMilliseconds()) return false
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
})
