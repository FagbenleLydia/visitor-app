"use client";
import ArrowRight from "@/assets/svg/ArrowRight";
import Asterick from "@/assets/svg/Asterick";
import Party from "@/assets/svg/Party";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Form, Input, notification } from "antd";
import User from "@/assets/svg/User";
import Lock from "@/assets/svg/Lock";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import EyeIcon from "@/assets/svg/eye-icon";
import Eyesclose from "@/assets/svg/Eyesclose";
import { useState } from "react";
import postLogin from "@/lib/postLogin";
import Cache from "@/util/cache";
import { LoadingOutlined } from "@ant-design/icons";
import useStore from "@/store";

type NotificationType = "success" | "info" | "warning" | "error";

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

export default function SignIn() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const setUserDetail = useStore((state) => state.setUserDetail);

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
  const INITIALVALUES = {
    email: "",
    password: "",
  };

  interface Iprops {
    email: string;
    password: string;
  }
  const expires_in = 14400000 / 86400000;

  const loginVisitor = async (values: Iprops) => {
    Cache.removeCookie("token");
    setLoading(true);
    const usersData: Promise<any> = postLogin(values);

    const users = await usersData;

    if (users.responseCode === "00") {
      Cache.setCookie("token", users.data.token, expires_in);
      setUserDetail(users.data.user);
      router.push("/");
    } else {
      Cache.removeCookie("token");
      setLoading(false);
      openNotificationWithIcon("error", "Something went wrong", "");
    }

    return users;
  };

  const onFinish = async (values: Iprops) => {
    loginVisitor(values);
  };
  return (
    <main className="min-h-screen w-full max-w-[1194px] m-auto bg-white pb-12">
      {contextHolder}
      <div className="my-8">
        <Header showrest={false} />
      </div>
      <div className="bg-[#B3CFF8] mx-3 lg:mx-0 rounded-3xl flex items-start justify-between p-6 relative">
        <div className="flex-1 mt-[40px]">
          <Asterick />
          <h2 className="text-[32px] text-[#1F1F1F] font-bold mb-[48px]">
            Login as Admin
          </h2>
          <div className="mb-[32px]">
            <Form
              form={form}
              initialValues={INITIALVALUES}
              layout="vertical"
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
              requiredMark={false}
            >
              <div className="flex justify-between space-x-6">
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
                      message: "Please enter your email",
                    },
                  ]}
                >
                  <Input
                    type="email"
                    placeholder="Enter administrator e-mail address"
                    className="h-[56px] w-full rounded-[12px] bg-[#F3F3F3] border border-solid border-[#EAEAEC]"
                    prefix={<User />}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label={
                    <label className="text-[16px] font-medium text-[#344054] mb-2">
                      Password
                    </label>
                  }
                  style={{ flex: 1 }}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your password",
                    },
                  ]}
                >
                  <Input.Password
                    type="password"
                    placeholder="Enter administrator password"
                    className="h-[56px] w-full rounded-[12px] bg-[#F3F3F3] border border-solid border-[#EAEAEC]"
                    prefix={<Lock />}
                    iconRender={(visible) =>
                      visible ? <EyeIcon /> : <Eyesclose />
                    }
                  />
                </Form.Item>
              </div>

              <div className="flex w-full justify-end items-center">
                <Form.Item shouldUpdate>
                  {() => (
                    <button
                      type="submit"
                      disabled={
                        !form.isFieldsTouched(true) ||
                        form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length > 0
                      }
                      className="text-[#ffffff] bg-[#6541D1] disabled:bg-[#B39CF8] rounded-[24px] text-[16px] leading-6 flex justify-center items-center px-6 py-4"
                    >

                      {loading ? <span
                        className={`flex items-center`}
                      >
                        <LoadingOutlined spin />
                      </span> :  <span>Login as Admin</span>}

                    </button>
                  )}
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-end">
          <Image
            src="/assets/png/MainImage.png"
            width={469}
            height={624}
            alt="landingImage"
          />
        </div>
        <div className="absolute bottom-0 right-0">
          <Party />
        </div>
      </div>
    </main>
  );
}
