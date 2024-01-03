"use client";
import React, { useState } from "react";
import { Row, Button, Typography, Table, message, Flex } from "antd";
import { useParams, usePathname, useRouter } from "next/navigation";
import data from "@/data/response";
import { AiTwotoneLeftCircle } from "react-icons/ai";
import { CSVLink } from "react-csv";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "@/context/apiRequest";
const Page = () => {
  const router = useRouter();
  const params = useParams()
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(1);
  const responsesFormData = useQuery({
    queryKey: ["responseForm", params.id],
    queryFn: async () => {
      const response = await apiRequest(
        process.env.NEXT_PUBLIC_URL,
        {
          method: "get",
          url: `response?id=${params.id}`,
        }
      );

      return response;
    },
    enabled: params.id? true:false,
  });
  const columns = [
    ...responsesFormData?.data?.data?.responses.map((response) => ({
      title: response.question.question,
      dataIndex: `response_${response.question.question}`,
      key: `response_${response.question.question}`,
      render: (text) => text || "-",
    })),
  ];
  const dataSource = [
    {
      ...responsesFormData?.data?.data?.responses.reduce((acc, response) => {
        acc[`response_${response.question.question}`] = response.answer;
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
  const transformedData = transformDataForCSV(responsesFormData?.data?.data?.responses);
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
          loading={responsesFormData.isLoading}
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
