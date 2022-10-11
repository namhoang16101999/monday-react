import './App.css';
import Main from './pages';
import "antd/dist/antd.css";
import { Card, Col, Row } from "antd";
import { Provider } from "react-redux";
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Row gutter={15} style={{
        margin: "0 auto"
      }}>
        <Col span={24}>
          <Card
              className='paper'
              title = "Open AI"
            >
              <Main/>
            </Card>
        </Col>
      </Row>
    </Provider>
  );
}

export default App;
