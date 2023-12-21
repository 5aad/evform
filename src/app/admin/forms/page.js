"use client";
import React, { useState } from "react";
import { Row, Button, Typography, Table, message } from "antd";
import { useRouter } from "next/navigation";
import data from "@/data/forms";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
const Page = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(1);
  const columns = [
    // ...data.responses.map((key) => ({
    //   title: key.question.question,
    //   dataIndex: "answer",
    //   key: 1,
    // })),
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Responses",
      dataIndex: "",
      key: 1,
      render: () => (
        <div>
          <Button
            htmlType="button"
            style={{ marginLeft: 5 }}
            type="dashed"
            size="large"
            onClick={() => router.push("/admin/forms/responses")}
          >
            View Responses
          </Button>
        </div>
      ),
    },
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
          dataSource={data}
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
