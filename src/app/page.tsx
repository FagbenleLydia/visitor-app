"use client";
import ArrowRight from "@/assets/svg/ArrowRight";
import Party from "@/assets/svg/Party";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import usePagination from "@/hooks/usePagination";
import getAllUsers from "@/lib/getAllUsers";
import useStore from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { page, pageSize } = usePagination();
  const [data, setData] = useState([]);
  const [name, setFirstName] = useState<string>("");
  const [timeIn, setTimeIn] = useState<string>("");
  const [timeOut, setTimeOut] = useState<string>("");
  const [email, setEmail] = useState<string>("");
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
    setData(users.data.visitors);

    return users;
  };

  useEffect(() => {
    fetchVisitors();
  }, [name]);
  return (
    <main className="min-h-screen w-full max-w-[1194px] m-auto bg-white pb-12">
      <div className="my-8">
        <Header />
      </div>
      <div className="bg-[#B3CFF8] mx-3 lg:mx-0 rounded-3xl flex items-start justify-between p-6 relative">
        <div className="flex-1 mt-[40px]">
          <h2 className="text-[32px] font-bold leading-[48px] text-[#1F1F1F] mb-1">
            Welcome to Clane 👋🏽
          </h2>
          <p className="text-[16px] leading-[24px] text-[#1F1F1F] mb-12">
            We are glad to have you visit us today!{" "}
          </p>
          <div
            onClick={() => router.push("/book-entry?email=firsttimer")}
            className="bg-[#6541D1] rounded-lg w-[536px] px-6 py-10 flex justify-between items-center mb-10 cursor-pointer"
          >
            <p className="text-[20px] font-medium leading-[30px] text-[#FFF]">
              My first time here
            </p>
            <ArrowRight />
          </div>
          <div className="bg-[#6541D1] rounded-lg w-[536px] px-4 py-[29px]">
            <p className="text-[20px] font-medium leading-[30px] text-[#FFF] mb-6">
              I have been here before
            </p>

            <SearchInput setName={setFirstName} data={data} />
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
