"use client";
import React, { useState, useEffect } from "react";
import usePagination from "../hooks/usePagination";
import { Divider, Modal, TableColumnsType, notification } from "antd";
import TableHeader from "./TableHeader";
import dynamic from "next/dynamic";
import StatusView from "./StatusView";
import Message from "@/assets/svg/Message";
import Time from "@/assets/svg/Time";
import Calender from "@/assets/svg/Calender";
import Staff from "@/assets/svg/Staff";
import Book from "@/assets/svg/Book";
import getAllUsers from "@/lib/getAllUsers";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import postTimeOut from "@/lib/postTimeOut";
import { LoadingOutlined } from "@ant-design/icons";

const CustomTable = dynamic(() => import("../components/Table"), {
  ssr: false,
});

interface visitorProps {
  totalPages: number;
  totalVisitors: number;
  visitors: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    purpose: string;
    whoToVisit: string;
    timeIn: string | null;
    timeOut: string | null;
    dateVisited: string;
    visitorStatus:string;
  }[];
}

interface tableProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  purpose: string;
  whoToVisit: string;
  timeIn: string | null;
  timeOut: string | null;
  dateVisited: string;
  visitorStatus:string;
}

const AllList = () => {
  const { page, pageSize, setPageSize, setPage } = usePagination();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visitors, setVisitors] = useState<visitorProps>();
  const [currentDetail, setCurrentDetail] = useState<tableProps>();
  const [name, setFirstName] = useState<string>("");
  const [timeIn, setTimeIn] = useState<string>("");
  const [timeOut, setTimeOut] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();
  type NotificationType = "success" | "info" | "warning" | "error";

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    desc: string
  ) => {
    api[type]({
      message: message,
      description: desc,
    });
  };
  const fetchVisitors = async () => {
    setLoading(true);
    const usersData: Promise<any> = getAllUsers({
      name,
      timeIn,
      timeOut,
      email,
      page,
      pageSize,
    });

    const users = await usersData;
    setLoading(false);
    setVisitors(users.data);

    return users;
  };

  useEffect(() => {
    fetchVisitors();
  }, [name, timeIn, timeOut, page, pageSize]);

  const showModal = (record: tableProps) => {
    setIsModalOpen(true);
    setCurrentDetail(record);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editVisitor = async (data: tableProps) => {
    setLoading(true);
    const usersData: Promise<any> = postTimeOut({
      ...data,
      timeOut: new Date().toISOString(),
    });

    const users = await usersData;

    if (users.responseCode === "00") {
      handleCancel();
      setLoading(false);
    } else {
      setLoading(false);
      openNotificationWithIcon("error", "Something went wrong", "");
    }

    return users;
  };

  const checkoutVisitor = (data: tableProps) => {
    editVisitor(data);
  };

  const columns: ColumnsType<tableProps> = [
    {
      title: "Date of visit",
      dataIndex: "dateVisited",
      key: "dateVisited",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <>
            {record.firstName} {record.lastName}
          </>
        );
      },
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Purpose of visit",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Visitee",
      dataIndex: "whoToVisit",
      key: "whoToVisit",
    },
    {
      title: "Check-in time",
      dataIndex: "timeIn",
      key: "timeIn",
      render: (timeIn) => moment(timeIn).format("kk:mm a"),
    },
    {
      title: "Check-out time",
      dataIndex: "timeOut",
      key: "timeOut",
      render: (timeOut) =>
        timeOut ? (
          moment(timeOut).format("kk:mm a")
        ) : (
          <p className="flex justify-center items-center">null</p>
        ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <StatusView
          status={record.visitorStatus === "CHECKED_IN" ? "Pending" : "Out"}
          orange="Pending"
          red="Out"
        />
      ),
      align: "center",
    },
  ];


  return (
    <>
      <div>
        <TableHeader
          firstName={name}
          setFirstName={setFirstName}
          timeIn={timeIn}
          timeOut={timeOut}
          setTimeOut={setTimeOut}
          setTimeIn={setTimeIn}
        />
      </div>
      <div className="mt-8">
        <CustomTable
          columns={columns}
          data={visitors?.visitors}
          pageSize={pageSize}
          setPageSize={setPageSize}
          page={page}
          setPage={setPage}
          pagination={true}
          total={visitors?.totalVisitors ?? 0}
          description="No data created yet"
          // rowkey={(record) => record.id}
          loading={loading}
          count={visitors?.totalPages}
          onRow={(record: tableProps) => {
            return {
              onClick: () => {
                showModal(record);
              },
            };
          }}
          rowClassName="cursor-pointer"
          //   generalClassName="h-full min-h-[300px] !table-fixed w-full"
        />
      </div>

      <Modal
        title=""
        centered
        width="481px"
        bodyStyle={{ borderRadius: "12px" }}
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="flex flex-col justify-center px-5 pt-[41px]">
          <div className="mb-4 flex justify-center items-center space-x-1">
            <div
              className={`w-5 h-5 rounded-[10px] ${
                currentDetail?.timeOut === null
                  ? "bg-[#F2C94C]"
                  : "bg-[#E53030]"
              } `}
            ></div>
            <h1 className="text-[24px] font-medium text-[#1F1F1F]">
              {currentDetail?.firstName}-{currentDetail?.lastName}
            </h1>
          </div>
          <div className="flex space-x-2 justify-center items-center">
            <div className="bg-[#F6F7FB] rounded-3xl text-[#767676] flex justify-center items-center py-2 px-3">
              {currentDetail?.phoneNumber}
            </div>
            <div className="bg-[#F6F7FB] rounded-3xl text-[#767676] flex justify-center items-center py-2 px-3">
              <span className="flex items-center mr-1">
                <Message width="20px" height="20px" />
              </span>
              {currentDetail?.email}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col space-y-6">
            <div className="h-[75px] flex justify-between items-center bg-[#F9F9F9] rounded-2xl px-6">
              <div className="flex text-[#767676] font-medium text-[14px]">
                <Calender />
                &nbsp; Date of visit
              </div>
              <h2 className="font-semibold text-[#1F1F1F]">
                {currentDetail?.dateVisited}
              </h2>
            </div>
            <div className="h-[75px] flex justify-between items-center bg-[#F9F9F9] rounded-2xl px-6">
              <div className="flex text-[#767676] font-medium text-[14px]">
                <Time />
                &nbsp; Check-in time
              </div>
              <h2 className="font-semibold text-[#1F1F1F]">
                {currentDetail?.timeIn}
              </h2>
            </div>
            <div className="h-[75px] flex justify-between items-center bg-[#F9F9F9] rounded-2xl px-6">
              <div className="flex text-[#767676] font-medium text-[14px]">
                <Staff />
                &nbsp; Visited
              </div>
              <h2 className="font-semibold text-[#1F1F1F]">
                {currentDetail?.whoToVisit}
              </h2>
            </div>
            <div className="h-[75px] flex justify-between items-center bg-[#F9F9F9] rounded-2xl px-6">
              <div className="flex text-[#767676] font-medium text-[14px]">
                <Book />
                &nbsp; Purpose
              </div>
              <h2 className="font-semibold text-[#1F1F1F]">
                {currentDetail?.purpose}
              </h2>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10 mb-5">
            {currentDetail?.timeOut === null && (
              <button
                onClick={() => checkoutVisitor(currentDetail)}
                className={`py4 px-6 w-fit h-[40px] text-white rounded-[124px] outline-none bg-[#6541D1] border-none cursor-pointer`}
              >
                <span
                  className={`${
                    loading ? "block" : "hidden"
                  } flex items-center`}
                >
                  <LoadingOutlined spin />
                </span>
                Check-out visitor
              </button>
            )}
            {currentDetail?.timeOut !== null && (
              <button
                className={`py4 px-6 w-fit h-[40px] text-white rounded-[124px] outline-none bg-[#AFAFAF] border-none cursor-not-allowed flex items-center`}
              >
                Check-out time &nbsp; <Time /> &nbsp;
                <span className="text-[#1F1F1F] font-semibold">
                  {moment(currentDetail?.timeOut).format("kk:mm a")}
                </span>
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AllList;
