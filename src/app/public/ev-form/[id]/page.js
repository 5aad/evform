"use client";
import FmCard from "@/components/FmCard";
import data from "@/data";
import { Button, Flex, Form, Card, Typography } from "antd";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { decryptUrl } from "@/context/decryptUrl";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "@/context/apiRequest";
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function Home() {
  const [form] = Form.useForm();
  const pathname = useSearchParams();
  const params = useParams();
  const [id, setId] = useState(null);
  useEffect(() => {
    if (params.id) {
      const decryptedUrl = decryptUrl(params.id, pathname.get("title"));
      setId(decryptedUrl);
    }
  }, []);

  const publicFormData = useQuery({
    queryKey: ["publicForm", id],
    queryFn: async () => {
      const response = await apiRequest(
        process.env.NEXT_PUBLIC_URL,
        {
          method: "get",
          url: `form?id=${id}`,
        }
      );

      return response;
    },
    enabled: id? true:false,
  });

  const onSubmit = (data) => {
    const formDataJson = {
      form_id: id,
      responses: Object.entries(data).map((item) => {
        return { question: item, answer: item[1] };
      }),
    };
    console.log(formDataJson);
  };
  return (
    <div className={styles.container}>
      <Flex vertical="vertical" gap="large">
        <Card>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {publicFormData?.data?.data.title}
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
