"use client";
import { Button, Card, Flex, Form, Typography, Col, Row, Input } from "antd";
import React from "react";

const Page = () => {
  const [form] = Form.useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", height: "100%" }}
    >
      <Col xs={22} sm={22} md={14} lg={10} xl={10} xxl={10}>
        <Card>
          <Typography.Title>Login</Typography.Title>
          <Form
            form={form}
            name="control-ref"
            layout="vertical"
            onFinish={onSubmit}
            autoComplete="off"
          >
            <Row justify="space-between">
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "this field is mendatory!",
                    },
                  ]}
                  label={
                    <Typography.Text strong style={{ fontSize: 16 }}>
                      User Name
                    </Typography.Text>
                  }
                >
                  <Input size="large" placeholder="User Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "this field is mendatory!",
                    },
                  ]}
                  label={
                    <Typography.Text strong style={{ fontSize: 16 }}>
                      Password
                    </Typography.Text>
                  }
                >
                  <Input.Password size="large" placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>

            <Button
              htmlType="submit"
              type="primary"
              size="large"
              style={{ width: "100%" }}
            >
              Log In
            </Button>
          </Form>
        </Card>
      </Col>
    </Flex>
  );
};

export default Page;
