"use client";
import React, { useState } from "react";
import { Row, Button, Typography, Table, message, Flex } from "antd";
import { useRouter } from "next/navigation";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiRequest from "@/context/apiRequest";
import moment from 'moment';

const Page = () => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(1);
  const userData = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await apiRequest(
        process.env.NEXT_PUBLIC_URL,
        {
          method: "get",
          url: `users`,
        },
        router
      );

      return response;
    },
  });
  const delUserMutation = useMutation({
    mutationFn: async (e) => {
      const response = await apiRequest(process.env.NEXT_PUBLIC_URL, {
        method: "delete",
        url: `user?id=${e}`,
      });

      return response;
    },
    onSuccess: async (e) => {
      if (e.status === 200) {
        message.success(e.message);
        userData.refetch();
      } else {
        message.error(e.message);
      }
    },
  });
  const handleDelete = async (e) => {
    await delUserMutation.mutate(e);
  };
  const columns = [
    {
      title: "User Name",
      dataIndex: "user_name",
      key: 1,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: 2,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: 3,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: 4,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: 5,
    },
    {
      title: "Role",
      dataIndex: "",
      key: 6,
      render: (e) => e.role?.name,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: 7,
      render: (created_at) => moment(created_at).format('YYYY-MM-DD, h:mma')
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: 8,
      render: (updated_at) => moment(updated_at).format('YYYY-MM-DD, h:mma')
    },
    {
      title: "Action",
      dataIndex: "",
      key: 9,
      render: (e) =>
        e.role.name === "admin" ? null : (
          <div>
            {/* <Button
              htmlType="button"
              style={{ marginLeft: 5 }}
              type="dashed"
              icon={<AiTwotoneEdit style={{ paddingBottom: 4 }} size={28} />}
              size="large"
            /> */}

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
              onClick={() => {
                handleDelete(e.id);
              }}
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
          dataSource={userData?.data?.data}
          size="middle"
          scroll={{ x: true }}
          loading={userData.isLoading}
          // pagination={{
          //   current: offset,
          //   pageSize: pageSize,
          //   position: ["bottomRight"],
          //   total: 1,
          //   showSizeChanger: false,
          // }}
          onChange={(e) => {
            setPageSize(e.pageSize), setOffset(e.current);
          }}
        />
      </Row>
    </div>
  );
};

export default Page;
