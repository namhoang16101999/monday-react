import React from 'react';
import { Row, Col } from "antd"
import { useSelector } from 'react-redux';
import OpenAIForm from '../components/forms/OpenAIForm';

const Main = () => {
    const { result } = useSelector(({ store }) => store)
    return (
        <>
            <Row gutter={15}>
                <Col sm={24} md={12}>
                   <OpenAIForm/>
                </Col>
                <Col sm={24} md={12}>
                    { result }
                </Col>
            </Row>
        </>

    )
}

export default Main;