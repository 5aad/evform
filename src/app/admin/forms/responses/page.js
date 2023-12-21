"use client";
import React, { useState } from "react";
import { Row, Button, Typography, Table, message, Flex } from "antd";
import { useRouter } from "next/navigation";
import data from "@/data/response";
import { AiTwotoneLeftCircle } from "react-icons/ai";
import { CSVLink } from "react-csv";
const Page = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(1);

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

  const transformDataForCSV = (responses) => {
    if (!responses || responses.length === 0) {
      return null; // Handle the case when there are no responses
    }

    // Extract unique question headers
    const headers = [
      ...data.responses.map((response) => ({
        label: response.question.question,
        key: response.question.question,
      })),
    ];
    const rows = [
      {
        ...data.responses.reduce((acc, response) => {
          acc[`${response.question.question}`] = response.answer;
          return acc;
        }, {}),
      },
    ];
    console.log(rows);
    return { headers, rows };
  };
  const transformedData = transformDataForCSV(data.responses);
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
        <CSVLink data={transformedData.rows} headers={transformedData.headers}>
          <Button size="large" type="primary">
            Export CSV
          </Button>
        </CSVLink>
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
