"use client"
import React, { useState } from "react";
import { Row, Button, Typography, Table, message } from "antd";
import { useRouter } from "next/navigation";
import data from "@/data/response";
const Page = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(1);
  console.log(data)
  const columns =data.map((key) => ({
    title: key.question.question,
    dataIndex: "answer",
    key: key,
  }));
 
  return (
    <div>
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBlock: "3rem" }}
      >
        <Typography.Title style={{ marginBottom: 0 }}>
          Manage Users
        </Typography.Title>

        <Button size="large" type="primary" onClick={() => router.push("/admin/users/add-user")}>
          Add New User
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
