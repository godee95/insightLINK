import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { User_Info_Api } from "@/axios/dashBoardApi";
// Recoil
import { useRecoilState } from "recoil";
import { FollowCntAtom } from "@/recoil/atoms/LoginStateAtom";
import { SocialUserAtom } from "@/recoil/atoms/SocialAtom";
// Component
import NavBar from "@/features/Header/NavBar";
import Friends from "@/features/Social/components/Friends";
import Feeds from "@/features/Social/components/Feeds";
import Users from "@/features/Social/components/Users";
import Onboarding from "@/features/Social/components/Onboarding";

export default function Social() {
  const [followCnt, setFollowCnt] = useRecoilState(FollowCntAtom);
  const [users, setUsers] = useRecoilState(SocialUserAtom);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const getUserInfoData = async () => {
      const response = await User_Info_Api();
      setFollowCnt(response.followCnt);
    };
    getUserInfoData();
  }, [users]);

  return (
    <div className="h-screen max-w-[75rem] mx-auto">
      <NavBar />
      {followCnt ? (
        <div className="max-w-[75rem] flex flex-col items-center justify-between m-auto">
          <div className="flex jutify-center items-start gap-8 self-stretch">
            <div className="flex py-[3.75rem] flex-col items-start gap-7 flex-1 w-full">
              <Friends />
              <Feeds />
            </div>
            <Users />
          </div>
        </div>
      ) : (
        <Onboarding />
      )}
    </div>
  );
}
