"use client";
import React, { useState } from "react";
import { Row, Button, Typography, Table, message, Flex } from "antd";
import { useRouter } from "next/navigation";
import data from "@/data/response";
import { AiTwotoneLeftCircle } from "react-icons/ai";
const Page = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(1);
  console.log(data);
  const columns = [
    ...data.responses.map((response) => ({
      title: response.question.question,
      dataIndex: `response_${response.question.id}`,
      key: `response_${response.question.id}`,
      render: (text) => text || "-",
    })),
  ];
  const dataSource = [
    {
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
        <Flex align="flex-end">
          <Button
            htmlType="button"
            style={{ marginRight: 5 }}
            type="dashed"
            size="large"
            icon={
              <AiTwotoneLeftCircle style={{ paddingBottom: 4 }} size={28} />
            }
            onClick={() => router.back()}
          />
          <Typography.Title style={{ marginBottom: 0 }}>
            Responses
          </Typography.Title>
        </Flex>

        <Button size="large" type="primary">
          Export CSV
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
