import React, { useState } from "react"
import { Card, Col, Row, Button } from "antd";
import QandAForm from "../components/forms/QandAForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const synth = window.speechSynthesis;
const QandA = () => {
  const { result } = useSelector(({ store }) => store)
  const { selectedVoice } = useSelector(({ store }) => store)

  const speak = ({ text }) => {
    console.log(text, selectedVoice)
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = synth.getVoices()[selectedVoice];
    utterance.lang = "ja-JP"
    synth.speak(utterance);
  };

  useEffect(() => {
    if(result) {
      speak({ text: result })
    }
  }, [result])
  
  return (
    <Row gutter={15} style={{
      margin: "0 auto"
    }}>
      <Col span={24}>
        <Card
          className='paper'
          title="Q and A"
        >

          <Row gutter={15}>
            <Col sm={24} md={12}>
              <QandAForm />
            </Col>
            <Col sm={24} md={12}>
              {result}
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}

export default QandA;
