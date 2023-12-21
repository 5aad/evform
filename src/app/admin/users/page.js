"use client";
import React, { useState } from "react";
import { Row, Button, Typography, Table, message, Flex } from "antd";
import { useRouter } from "next/navigation";
import data from "@/data/users";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
const Page = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(1);
  console.log(data);
  const columns = [
    {
      title: "User Name",
      dataIndex: "user_name",
      key: 1,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: 2,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: 2,
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
            icon={<AiTwotoneDelete color="red" style={{ paddingBottom: 4 }} size={28} />}
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
          Manage Users
        </Typography.Title>

        <Button
          size="large"
          type="primary"
          onClick={() => router.push("/admin/users/add-user")}
        >
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
