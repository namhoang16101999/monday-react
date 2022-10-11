import React, { useState } from "react";
import { Form, Button, Select, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import { OPEN_AI_TYPE } from "../../constants";
import { getOpenAIText } from "../../services";
import { setResult } from "../../store/reducer";

const { Option } = Select;

const OpenAIForm = () => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const onFinish = async (values) => {
        try {
            setLoading(true)
            const data = await getOpenAIText(values)
            dispatch(setResult(data))
            setLoading(false)
        } catch (err) {
            notification.error({
                message: err
            })
        }
    }

    return (
        <Form
            form={form}
            name="basic"
            labelAlign="left"
            scrollToFirstError
            requiredMark={false}
            labelCol={{ span: 5 }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Type"
                name="type"
                rules={[{
                    required: true
                }]}
            >
                <Select
                    allowClear
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                >
                    <Option key={1} value={OPEN_AI_TYPE.GENERATE_EMAIL}>
                        Generate Email
                    </Option>
                    <Option key={2} value={OPEN_AI_TYPE.GENERATE_IDEA}>
                        Generate Detail For Idea
                    </Option>
                    <Option key={3} value={OPEN_AI_TYPE.SUMMARIZE_EMAIL}>
                        Summarize Email
                    </Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Text"
                name="text"
                rules={[{
                    required: true
                }]}
            >
                <Input.TextArea autoSize rows={5}/>
            </Form.Item>
            <Form.Item className="btn-login">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default OpenAIForm;