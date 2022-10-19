import React, { useState, useEffect } from "react";
import { Form, Button, Select, Input, notification, Space } from "antd";
import { useDispatch } from "react-redux";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getOpenAIText } from "../../services";
import { setResult } from "../../store/reducer";
import { AudioOutlined, AudioMutedOutlined, CloseOutlined } from '@ant-design/icons';
import { OPEN_AI_TYPE } from "../../constants";

const QandAForm = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    const onFinish = async (values) => {
        try {
            setLoading(true)
            const data = await getOpenAIText({
                ...values,
                type: OPEN_AI_TYPE.QANDA
            })
            dispatch(setResult(data))
            setLoading(false)
        } catch (err) {
            notification.error({
                message: JSON.stringify(err)
            })
            setLoading(false)
        }
    }

    useEffect(() => {
        if (transcript) {
            form.setFieldsValue({ text: transcript })
        }
    }, [transcript])

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
                label="Text"
                name="text"
                rules={[{
                    required: true
                }]}
            >
                <Input.TextArea autoSize rows={5} />
            </Form.Item>

            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <Button
                icon={<AudioOutlined />}
                onClick={() => {
                    SpeechRecognition.startListening({
                        continuous: true
                    })
                }
                }
            />
            <Button
                icon={<AudioMutedOutlined />}
                onClick={SpeechRecognition.stopListening}
            />
            <Button
                icon={<CloseOutlined />}
                onClick={() => {
                    resetTranscript()
                    form.setFieldsValue({ text: "" })
                }}
            />
            <br />
            <br />

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

export default QandAForm;