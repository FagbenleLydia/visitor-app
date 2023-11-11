"use client";

import ArrowLeft from "@/assets/svg/ArrowLeft";
import AllList from "@/components/AllList";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function CheckIn() {
  const router = useRouter();

  return (
    <main className="min-h-screen w-full max-w-[1194px] m-auto bg-white pb-12">
      <div className="mx-6 my-8">
        <Header />
      </div>
      <div className="mx-6 mb-6">
        <div
          onClick={() => router.push("/")}
          className="flex items-center mb-8 cursor-pointer"
        >
          <ArrowLeft />
          <span className="ml-3 text-[#727272]">Back to home</span>
        </div>
        <h2 className="text-[24px] font-bold leading-[36px] text-[#1F1F1F] mb-6">
          Check-in history
        </h2>
      </div>
      <div className="mx-6 mb-6">
        <AllList />
      </div>
    </main>
  );
}
