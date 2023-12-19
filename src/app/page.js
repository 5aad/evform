"use client";
import FmCard from "@/components/FmCard";
import data from "@/data";
import { Button, Flex, Form, Card, Typography } from "antd";
import styles from "./page.module.css";
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
export default function Home() {
  const [form] = Form.useForm();
  const onSubmit = (data) => {
    const formDataJson = {
      formTitle: "Your Form Title",
      responses: Object.entries(data).map((item) => {
        return {question:item[0], answer:item[1]};
      }),
    };
    console.log(formDataJson);
  };
  return (
    <div className={styles.container}>
      <Flex vertical="vertical" gap="large">
        <Card>
          <Typography.Title level={3} style={{ margin: 0 }}>
            Title
          </Typography.Title>
        </Card>
        {data.map((item, index) => (
          <Form
            key={index}
            form={form}
            name="control-ref"
            layout="vertical"
            {...formItemLayout}
            initialValues={{
              remember: true,
            }}
            onFinish={onSubmit}
            autoComplete="off"
          >
            <FmCard data={item} form={form} />
          </Form>
        ))}

        <Button
          onClick={() => form.submit()}
          type="primary"
          size="large"
          className={styles.btn_submit}
        >
          Submit
        </Button>
      </Flex>
    </div>
  );
}
