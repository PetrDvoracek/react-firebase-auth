import React from 'react';
import { Layout, Row, Col, Typography, Divider, Button } from 'antd';
import './Landing.css';
import { appName } from '../config/globalNames';

const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;


export default function Landing() {
  return (
    <>
      <Layout>
        <Header className="landing">
          <Row gutter={48} className="landing-header-heading">
            <Col span={8}></Col>
            <Col span={8} >

              <Title level={2}>
                { appName }
              </Title>

            </Col>

            <Col span={8}><Button type='primary' href="/login">Get In</Button></Col>
          </Row>
        </Header>
        <Content className="landing">
          <Divider />
          <Text disabled className="landing-header-clever-text">The only App you need to App.</Text>
        </Content>
        <Footer className="landing">powered by clever man</Footer>
      </Layout >
    </>
  );
}
