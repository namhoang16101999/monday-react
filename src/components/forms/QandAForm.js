import React, { useCallback, useEffect, useState } from 'react';
import { Form, Button, Select, Input, notification, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getOpenAIText } from "../../services";
import { setResult, setSelectedVoice } from "../../store/reducer";
import { AudioOutlined, AudioMutedOutlined, CloseOutlined } from '@ant-design/icons';
import { OPEN_AI_TYPE } from "../../constants";

const { Option } = Select
const synth = window.speechSynthesis;
const QandAForm = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const dispatch = useDispatch();
    const { selectedVoice } = useSelector(({ store }) => store)
    const [voices, setVoices] = useState([]);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const speak = () => {
        var utterance = new SpeechSynthesisUtterance("Hello");
        utterance.voice = synth.getVoices()[selectedVoice];
        utterance.lang = "ja-JP"
        utterance.localService = true;
        synth.speak(utterance);
    };

    const setVoiceSpeak = (e) => {
        dispatch(setSelectedVoice(e))
        speak(e)
    }
    const populateVoiceList = useCallback(() => {
        const newVoices = synth.getVoices();
        setVoices(newVoices);
      }, []);

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
        populateVoiceList();
        if (synth.onvoiceschanged !== undefined) {
          synth.onvoiceschanged = populateVoiceList;
        }
      }, [populateVoiceList]);

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

            <Form.Item
                label="Voice Selector"
                rules={[{
                    required: true
                }]}
            >
                <Select
                    allowClear
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={setVoiceSpeak}
                    filterOption={(input, option) => option.children[0].includes(input)}
                >
                    {voices.map((voice, index) => (
                        <Option key={index} value={index}>
                            {voice.name} ({voice.lang}) {voice.default && ' [Default]'}
                        </Option>
                    ))}
                </Select>
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