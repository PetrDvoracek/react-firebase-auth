import React from 'react';
import { Layout, Row, Col, Typography, Divider, Button } from 'antd';
import './Landing.css';
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
                EquipPex
              </Title>

            </Col>

            <Col span={8}><Button type='primary' href="/login">Get In</Button></Col>
          </Row>
        </Header>
        <Content className="landing">
          <Divider />
          <Text disabled className="landing-header-clever-text">The only solution you need to manage your equipment.</Text>
        </Content>
        <Footer className="landing">powered by profiq</Footer>
      </Layout >
    </>
  );
}
