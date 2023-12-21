"use client";
import {
  Button,
  Flex,
  Typography,
  Form,
  Input,
  Col,
  Row,
  Radio,
  Divider,
  Select,
} from "antd";
import React, { useState } from "react";
const Page = () => {
  const [form] = Form.useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Flex justify="flex-start" align="middle" style={{ marginBlock: "3rem" }}>
        <Typography.Title style={{ marginBottom: 0 }}>
          Add user
        </Typography.Title>
      </Flex>
      <Flex>
        <Col span={14}>
          <Form
            form={form}
            name="control-ref"
            layout="vertical"
            onFinish={onSubmit}
            autoComplete="off"
          >
            <Row justify="space-between">
              <Col xs={23} sm={23} md={11} lg={11} xl={11} xxl={11}>
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
              <Col xs={23} sm={23} md={11} lg={11} xl={11} xxl={11}>
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
              <Col xs={23} sm={23} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "this field is mendatory!",
                    },
                  ]}
                  label={
                    <Typography.Text strong style={{ fontSize: 16 }}>
                      Role
                    </Typography.Text>
                  }
                >
                  <Select
                    size="large"
                    showSearch
                    placeholder="Select a Role"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        label: "Admin",
                        value: 1,
                      },
                      { label: "Collaborator", value: 2 },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Button
              htmlType="submit"
              type="primary"
              size="large"
              // className={styles.btn_submit}
            >
              Create New User
            </Button>
          </Form>
        </Col>
      </Flex>
    </div>
  );
};

export default Page;
