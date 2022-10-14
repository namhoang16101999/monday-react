import React, { useState, useEffect } from "react";
import { Form, Button, Select, Input, notification, Space } from "antd";
import { useDispatch } from "react-redux";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { OPEN_AI_TYPE } from "../../constants";
import { getOpenAIText } from "../../services";
import { setResult } from "../../store/reducer";
import { AudioOutlined, AudioMutedOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

const OpenAIForm = () => {
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
            const data = await getOpenAIText(values)
            dispatch(setResult(data))
            setLoading(false)
        } catch (err) {
            notification.error({
                message: err
            })
        }
    }
    
    useEffect(() => {
        if(transcript) {
            form.setFieldsValue({ text: transcript })
        }
    }, [transcript])


    // if (!browserSupportsSpeechRecognition) {
    //     return <span>Browser doesn't support speech recognition.</span>;
    // }
   
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
                    <Option key={4} value={OPEN_AI_TYPE.GENERATE_CODE}>
                        Generate Code
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
          
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <Button 
                icon={<AudioOutlined />} 
                onClick={() => {
                    SpeechRecognition.startListening({
                        continuous: true
                    })}
                }
            />
            <Button 
                icon={<AudioMutedOutlined />} 
                onClick={ SpeechRecognition.stopListening }
            />
            <Button 
                icon={<CloseOutlined />} 
                onClick={() => {
                    resetTranscript()
                    form.setFieldsValue({ text: "" })
                }}
            />
            <br/>
            <br/>
            <Form.Item
                label="Max Tokens"
                name="maxTokens"
            >
                <Input type="number"/>
            </Form.Item>

            <Form.Item
                label="N"
                name="n"
            >
                <Input type="number"/>
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