import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// Recoil
import { useSetRecoilState } from "recoil";
import { LoginStateAtom } from "@/recoil/atoms/LoginStateAtom";
// Components
import SignupButton from "@/features/User/SignupButton";
import LoginBtn from "@/features/User/LoginBtn";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const setLoginId = useSetRecoilState(LoginStateAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <p className="text-2xl">갤러리 속 숨겨진 인사이트를 이어주는 아카이브</p>
      <p className="py-[2rem] font-bold text-8xl">insightLINK</p>
      {!token && (
        <div className="flex w-[20rem] justify-between py-[4rem]">
          <div className="flex h-[3.375rem] px-7 justify-center items-center rounded bg-gray-200 cursor-pointer">
            <SignupButton />
          </div>
          <LoginBtn />
        </div>
      )}
    </div>
  );
}
