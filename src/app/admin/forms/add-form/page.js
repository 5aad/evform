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
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
const Page = () => {
  const [form] = Form.useForm();
  const [inputList, setInputList] = useState([
    {
      question_type: 1,
      question: "",
      placeholder: "",
      options: null,
      error_msg: "",
      required: 1,
    },
  ]);
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        question_type: 1,
        question: "",
        placeholder: "",
        error_msg: "",
        options: null,
        required: 1,
      },
    ]);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (it, index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle input change
  const handleInputChange = (e, index, name) => {
    if (name === "options") {
      const transformedValues = e.map((item, i) => ({
        label: item,
        value: i + 1,
      }));
      const list = [...inputList];
      list[index][name] = transformedValues;
      setInputList(list);
    } else {
      const list = [...inputList];
      list[index][name] = e;
      setInputList(list);
    }
  };

  const onSubmit = (e) => {
    const data = {
      title: e.title,
      questions: inputList,
    };

    console.log(data);
  };

  return (
    <div>
      <Flex justify="flex-start" align="middle" style={{ marginBlock: "3rem" }}>
        <Typography.Title style={{ marginBottom: 0 }}>
          Add Form
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
            <Row>
              <Col xs={23} sm={23} md={11} lg={11} xl={11} xxl={11}>
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "this field is mendatory!",
                    },
                  ]}
                  label={
                    <Typography.Text strong style={{ fontSize: 16 }}>
                      Title
                    </Typography.Text>
                  }
                >
                  <Input size="large" placeholder="Title" />
                </Form.Item>
              </Col>
            </Row>
            {inputList.map((x, i) => (
              <div key={i}>
                <Divider />
                <Row justify="space-between">
                  <Col xs={23} sm={23} md={23} lg={23} xl={23} xxl={23}>
                    <Form.Item
                      // name="required"

                      rules={[
                        {
                          required: true,
                          message: "this field is mendatory!",
                        },
                      ]}
                      label={
                        <Typography.Text strong style={{ fontSize: 16 }}>
                          Required
                        </Typography.Text>
                      }
                    >
                      <Radio.Group
                        options={[
                          {
                            label: "Short",
                            value: 1,
                          },
                          { label: "Long", value: 2 },
                          { label: "Radio", value: 3 },
                          { label: "Check", value: 4 },
                          { label: "Dropdown", value: 5 },
                        ]}
                        size="large"
                        value={x.question_type}
                        optionType="button"
                        buttonStyle="solid"
                        onChange={(e) =>
                          handleInputChange(e.target.value, i, "question_type")
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={23} sm={23} md={11} lg={11} xl={11} xxl={11}>
                    <Form.Item
                      // name="question"
                      rules={[
                        {
                          required: true,
                          message: "this field is mendatory!",
                        },
                      ]}
                      label={
                        <Typography.Text strong style={{ fontSize: 16 }}>
                          Question
                        </Typography.Text>
                      }
                    >
                      <Input
                        size="large"
                        placeholder="Question"
                        onChange={(e) =>
                          handleInputChange(e.target.value, i, "question")
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={23} sm={23} md={11} lg={11} xl={11} xxl={11}>
                    {x.question_type === 1 || x.question_type === 2 ? (
                      <Form.Item
                        // name="placeholder"
                        rules={[
                          {
                            required: true,
                            message: "this field is mendatory!",
                          },
                        ]}
                        label={
                          <Typography.Text strong style={{ fontSize: 16 }}>
                            Placeholder
                          </Typography.Text>
                        }
                      >
                        <Input
                          size="large"
                          placeholder="Placeholder"
                          onChange={(e) =>
                            handleInputChange(e.target.value, i, "placeholder")
                          }
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item
                        // name="placeholder"
                        rules={[
                          {
                            required: true,
                            message: "this field is mendatory!",
                          },
                        ]}
                        label={
                          <Typography.Text strong style={{ fontSize: 16 }}>
                            Options
                          </Typography.Text>
                        }
                      >
                        <Select
                          mode="tags"
                          size="large"
                          showSearch
                          placeholder="Select options"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          onChange={(e) => handleInputChange(e, i, "options")}
                        />
                      </Form.Item>
                    )}
                  </Col>
                  <Col xs={23} sm={23} md={11} lg={11} xl={11} xxl={11}>
                    <Form.Item
                      // name="error_msg"
                      rules={[
                        {
                          required: true,
                          message: "this field is mendatory!",
                        },
                      ]}
                      label={
                        <Typography.Text strong style={{ fontSize: 16 }}>
                          Error Message
                        </Typography.Text>
                      }
                    >
                      <Input
                        size="large"
                        placeholder="Error Message"
                        onChange={(e) =>
                          handleInputChange(e.target.value, i, "error_msg")
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={23} sm={23} md={11} lg={11} xl={11} xxl={11}>
                    <Flex justify="space-between" align="center">
                      <Form.Item
                        // name="required"
                        rules={[
                          {
                            required: true,
                            message: "this field is mendatory!",
                          },
                        ]}
                        label={
                          <Typography.Text strong style={{ fontSize: 16 }}>
                            Required
                          </Typography.Text>
                        }
                      >
                        <Radio.Group
                          size="large"
                          options={[
                            {
                              label: "True",
                              value: 1,
                            },
                            { label: "False", value: 2 },
                          ]}
                          value={x.required}
                          optionType="button"
                          buttonStyle="solid"
                          onChange={(e) =>
                            handleInputChange(e.target.value, i, "required")
                          }
                        />
                      </Form.Item>
                      <div>
                        {inputList.length !== 1 && (
                          <Button
                            type="dashed"
                            htmlType="button"
                            onClick={() => handleRemoveClick(x, i)}
                            icon={
                              <FcDeleteRow
                                style={{ paddingBottom: 4 }}
                                size={28}
                              />
                            }
                            size="large"
                          />
                        )}
                        <Button
                          htmlType="button"
                          onClick={handleAddClick}
                          style={{ marginLeft: 5 }}
                          type="dashed"
                          icon={
                            <FcAddRow style={{ paddingBottom: 4 }} size={28} />
                          }
                          size="large"
                        />
                      </div>
                    </Flex>
                  </Col>
                </Row>
              </div>
            ))}
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              // className={styles.btn_submit}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Flex>
    </div>
  );
};

export default Page;
