"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, notification } from "antd";
import Signin from "@/assets/svg/Signin";
import Message from "@/assets/svg/Message";
import NumberDivider from "@/assets/svg/NumberDivider";
import { purposeArray, staff, time } from "@/util/Constants";
import Checked from "@/assets/svg/Checked";
import Circle from "@/assets/svg/Circle";
import User from "@/assets/svg/User";
import Staff from "@/assets/svg/Staff";
import ThumbUp from "@/assets/svg/ThumbUp";
import Bookmark from "@/assets/svg/Bookmark";
import Messagepurple from "@/assets/svg/messagepurple";
import Book from "@/assets/svg/Book";
import { useRouter } from "next/navigation";
import useStore from "@/store";
import addVisitor from "@/lib/addVisitor";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */
const FormBox = ({ email }: { email: string | null }) => {
  const [form] = Form.useForm();
  const [active, setActive] = useState<string>("PERSONAL_MEETING");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
  const router = useRouter();
  const visitorDetail = useStore((state) => state.visitorDetail);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const okayHandler = () => {
    handleCancel();
    router.push("/check-in");
  };

  const INITIALVALUES = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    whoToVisit: {
      value: ``,
      label: `--Choose Staff--`,
    },
  };
  interface Iprops {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    whoToVisit: string;
  }

  const loginVisitor = async (values: Iprops) => {
    setLoading(true);
    const usersData: Promise<any> = addVisitor({
      ...values,
      purpose: active,
      timeIn: new Date().toISOString(),
      timeOut: null,
      dateVisited: moment().format("YYYY-MM-DD"),
    });

    const users = await usersData;

    if (users.responseCode === "00") {
      showModal();
      setLoading(false);
    } else {
      setLoading(false);
      openNotificationWithIcon("error", "Something went wrong", "");
    }

    return users;
  };

  const onFinish = async (values: Iprops) => {
    if (Object.keys(visitorDetail).length === 0) {
      loginVisitor(values);
    } else {
      loginVisitor({
        firstName: visitorDetail.firstName,
        lastName: visitorDetail.lastName,
        email: visitorDetail.email,
        phoneNumber: visitorDetail.phoneNumber,
        whoToVisit: values.whoToVisit,
      });
    }
  };

  return (
    <div>
      <Form
        form={form}
        initialValues={INITIALVALUES}
        layout="vertical"
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        requiredMark={false}
      >
        {Object.keys(visitorDetail).length === 0 ? (
          <>
            <div className="flex justify-between space-x-6">
              <Form.Item
                label={
                  <label className="text-[16px] font-medium text-[#344054] mb-2">
                    First name
                  </label>
                }
                style={{ flex: 1 }}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your first name",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter visitor’s first name"
                  className="h-[56px] w-full rounded-[12px] bg-[#F3F3F3] border border-solid border-[#EAEAEC]"
                />
              </Form.Item>
              <Form.Item
                label={
                  <label className="text-[16px] font-medium text-[#344054] mb-2">
                    Last name
                  </label>
                }
                style={{ flex: 1 }}
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your last name",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter visitor’s last name"
                  className="h-[56px] w-full rounded-[12px] bg-[#F3F3F3] border border-solid border-[#EAEAEC]"
                />
              </Form.Item>
            </div>
            <div className="flex justify-between space-x-6">
              <Form.Item
                label={
                  <label className="text-[16px] font-medium text-[#344054] mb-2">
                    Phone number
                  </label>
                }
                style={{ flex: 1 }}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Enter visitor’s phone number"
                  className="h-[56px] w-full rounded-[12px] bg-[#F3F3F3] border border-solid border-[#EAEAEC]"
                  prefix={<NumberDivider />}
                />
              </Form.Item>
              <Form.Item
                label={
                  <label className="text-[16px] font-medium text-[#344054] mb-2">
                    E-mail address
                  </label>
                }
                style={{ flex: 1 }}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Enter visitor’s email address"
                  className="h-[56px] w-full rounded-[12px] bg-[#F3F3F3] border border-solid border-[#EAEAEC]"
                  prefix={<Message />}
                />
              </Form.Item>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2 mb-4">
              <span>
                <Bookmark />
              </span>
              <span className=" text-[#1F1F1F] text-[20px]">
                {visitorDetail.firstName} {visitorDetail.lastName}
              </span>
            </div>
            <div className="mb-10 flex items-center space-x-2">
              <span className="px-3 py-2 bg-[#1F1F1F] flex justify-center items-center rounded-[24px] text-[16px] text-[#B3CFF8] min-w-[136px]">
                {visitorDetail.phoneNumber}
              </span>
              <span className="px-3 py-2 bg-[#1F1F1F] flex justify-center items-center rounded-[24px] text-[16px] text-[#B3CFF8] min-w-[136px]">
                <Messagepurple /> &nbsp;{visitorDetail.email}
              </span>
            </div>
          </>
        )}

        <div className="mb-10 ">
          <h2 className="text-[16px] text-[#1F1F1F] font-medium mb-4">
            Select purpose of visit
          </h2>
          <div className="flex flex-wrap items-center justify-between overflow-x-scroll scrollbar-none">
            {purposeArray.map((item: string, i) => (
              <div
                key={i}
                onClick={() => setActive(item)}
                className={`${
                  active === item
                    ? "text-[#1F1F1F] bg-[#CFF4B8] border border-solid border-[#3A8E1C]"
                    : "text-[#A4A5A6] bg-[#fff] border border-solid"
                }text-[#ffffff] cursor-pointer rounded-[24px] text-[16px] leading-6 flex justify-center mt-2 items-center h-[56px] ${
                  item === "" ? "py-4 px-8" : "p-4"
                }`}
              >
                <span className="mr-2">
                  {active === item ? <Checked /> : <Circle />}
                </span>{" "}
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between space-x-6 mb-10">
          <Form.Item
            label={
              <label className="text-[16px] font-medium text-[#344054] mb-2">
                Who do you want to see?
              </label>
            }
            style={{ flex: 1 }}
            name="whoToVisit"
            rules={[
              {
                required: true,
                message: "Please state who you want to see",
              },
            ]}
          >
            <Select placeholder="Select/Search" allowClear>
              {staff.map((item) => (
                <Option key={item.id} value={item.EmployeeName}>
                  {item.EmployeeName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <div className="flex-1"></div>
        </div>
        <div className="flex w-full justify-end items-center">
          <Form.Item shouldUpdate>
            {() => (
              <button
                type="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length > 0
                }
                className="text-[#ffffff] bg-[#6541D1] disabled:bg-[#B39CF8] rounded-[24px] text-[16px] leading-6 flex justify-center items-center px-6 py-4"
              >
                <span className="flex items-center">
                  {loading ? <LoadingOutlined spin /> : <Signin />}
                </span>
                <span className="ml-3">Check in</span>
              </button>
            )}
          </Form.Item>
        </div>
      </Form>
      <Modal
        title=""
        centered
        closeIcon={false}
        width="481px"
        bodyStyle={{ borderRadius: "12px" }}
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <div className="flex flex-col justify-center items-center p-6">
          <ThumbUp />
          <h1 className="mb-4 text-[32px] font-semibold">
            Check-in successful!
          </h1>
          <p className="mb-[48px] text-center text-[#525261] ">
            Hope you have a pleasant visit experience with us today.
          </p>
          <button
            onClick={okayHandler}
            className="w-[89px] h-[40px] text-white rounded-[124px] outline-none bg-[#6541D1] border-none cursor-pointer"
          >
            Okay
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default FormBox;
