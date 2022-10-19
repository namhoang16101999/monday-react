import { Card, Col, Row } from "antd";
import { useSelector } from 'react-redux';
import OpenAIForm from '../components/forms/OpenAIForm';

const OpenAI = () => {
  const { result } = useSelector(({ store }) => store)
  return (
    <Row gutter={15} style={{
      margin: "0 auto"
    }}>
      <Col span={24}>
        <Card
          className='paper'
          title="Open AI"
        >
          <Row gutter={15}>
            <Col sm={24} md={12}>
              <OpenAIForm />
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

export default OpenAI;
