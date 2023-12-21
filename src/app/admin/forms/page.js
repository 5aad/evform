"use client";
import React, { useState } from "react";
import { Row, Button, Typography, Table, message } from "antd";
import { useRouter } from "next/navigation";
import data from "@/data/response";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
const Page = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(1);
  console.log(data);
  const columns = [
    // ...data.responses.map((key) => ({
    //   title: key.question.question,
    //   dataIndex: "answer",
    //   key: 1,
    // })),
    // {
    //   title:"question",
    //   dataIndex:"answer",
    //   key:"answer"
    // },
    ...data.responses.map((response) => ({
      title: response.question.question,
      dataIndex: `response_${response.question.id}`,
      key: `response_${response.question.id}`,
      render: (text) => text || "-",
    })),
    {
      title: "Action",
      dataIndex: "",
      key: 2,
      render: () => (
        <div>
          <Button
            htmlType="button"
            style={{ marginLeft: 5 }}
            type="dashed"
            icon={<AiTwotoneEdit style={{ paddingBottom: 4 }} size={28} />}
            size="large"
          />

          <Button
            htmlType="button"
            style={{ marginLeft: 5 }}
            type="dashed"
            icon={
              <AiTwotoneDelete
                color="red"
                style={{ paddingBottom: 4 }}
                size={28}
              />
            }
            size="large"
          />
        </div>
      ),
    },
  ];
  const dataSource = [
    {
      key: data.id,
      id: data.id,
      title: data.title,
      created_at: data.created_at,
      live: data.live,
      ...data.responses.reduce((acc, response) => {
        acc[`response_${response.question.id}`] = response.answer;
        return acc;
      }, {}),
    },
  ];
  return (
    <div>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBlock: "3rem" }}
      >
        <Typography.Title style={{ marginBottom: 0 }}>
          Manage Forms
        </Typography.Title>

        <Button
          size="large"
          type="primary"
          onClick={() => router.push("/admin/forms/add-form")}
        >
          Add New Form
        </Button>
      </Row>
      <Row>
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={dataSource}
          size="middle"
          scroll={{ x: true }}
          pagination={{
            current: offset,
            pageSize: pageSize,
            position: ["bottomRight"],
            total: 1,
            showSizeChanger: false,
          }}
          onChange={(e) => {
            setPageSize(e.pageSize), setOffset(e.current);
          }}
        />
      </Row>
    </div>
  );
};

export default Page;
