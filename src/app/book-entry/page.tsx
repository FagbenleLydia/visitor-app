"use client";
import ArrowLeft from "@/assets/svg/ArrowLeft";
import ArrowRight from "@/assets/svg/ArrowRight";
import FormBox from "@/components/FormBox";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import usePagination from "@/hooks/usePagination";
import getAllUsers from "@/lib/getAllUsers";
import useStore from "@/store";
import { visitorProps } from "@/store/auth";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookEntry() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setVisitorDetail = useStore((state) => state.setVisitorDetail);
  const emailParams = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { page, pageSize } = usePagination();
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
    <main className="min-h-screen w-full max-w-[1194px] m-auto bg-white">
      <div className="my-8">
        <Header />
      </div>
      <div className="mx-6">
        <div
          onClick={() => {
            router.push("/");
            setVisitorDetail({} as visitorProps);
          }}
          className="flex items-center mb-8 cursor-pointer"
        >
          <ArrowLeft />
          <span className="ml-3 text-[#727272]">Back to home</span>
        </div>
        <h2 className="text-[24px] font-bold leading-[36px] text-[#1F1F1F] mb-6">
          Book visitor entry
        </h2>
        <div className="mb-6">
          {emailParams === "firsttimer" && (
            <SearchInput
              classNames="w-[533px] rounded-xl h-[200px] max-h-[234px] pb-[14px] overflow-y-scroll top-13"
              existing={true}
              placeholder="Search existing visitor"
              data={data}
              setName={setFirstName}
            />
          )}
        </div>
        <div className="mb-6 bg-[#B3CFF8] rounded-3xl px-6 py-10">
          <FormBox email={email} />
        </div>
      </div>
    </main>
  );
}
