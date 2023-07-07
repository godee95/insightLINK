import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
//recoil
import { useRecoilValue, useRecoilState } from "recoil";
import { ImgModalAtom, AlarmCntAtom } from "@/recoil/atoms/MainGraphAtom";
import { LoginStateAtom } from "@/recoil/atoms/LoginStateAtom";
import { NotiCntAtom } from "@/recoil/atoms/HeaderAtom";

import { GET } from "@/axios/GET";
// import useNotification from "@/features/Header/hooks/useNotification";
// Components
import UserModal from "@/features/User/UserModal";
import BurgerMenu from "@/features/Header/componenets/BurgerMenu";
// Assets
import { AiOutlineUpload, AiTwotoneBell } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsShareFill } from "react-icons/bs";

import tw from "tailwind-styled-components";
import AlarmModal from "@/features/Header/componenets/AlarmModal";

export default function NavBar() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [userProfile, setUserProfile] = useState("");
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [showImgModal, setShowImgModal] = useRecoilState(ImgModalAtom);

  const [openAlarm, setOpenAlarm] = useState(false);
  const [alarmCnt, setAlarmCnt] = useRecoilState(AlarmCntAtom);

  const loginId = useRecoilValue(LoginStateAtom);
  const notiCnt = useRecoilValue(NotiCntAtom);

  const getProfileImg = async () => {
    const data = await GET("user/profile", true);
    if (data.status === 200) {
      setUserProfile(data.data.userProfile);
    }
  };

  const handleUserIconClick = () => {
    setUserModalOpen(true);
  };

  const closeModal = () => {
    setUserModalOpen(false);
  };

  const CategoryLink = tw.p`
  text-xl font-bold hover:underline underline-offset-8 active:text-yellow-400 mr-4
  `;

  const handleShareIconClick = () => {
    // Use Kakao.Link.sendDefault to send the image URL to KakaoTalk
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "text",
        text: "나의 그래프를 확인해봐요.",
        link: {
          mobileWebUrl:
            "https://insight-link-ten.vercel.app/dashboard/" + loginId,
          webUrl: "https://insight-link-ten.vercel.app/dashboard/" + loginId,
        },
      });
    }
  };

  const handleOpenAlarm = () => {
    setOpenAlarm(!openAlarm);
    setAlarmCnt(false);
  };

  useEffect(() => {
    getProfileImg();
  }, []);

  const imgUpLoad = () => {
    return (
      <div
        className="flex items-center justify-center h-10 gap-1 px-4 bg-gray-900 rounded cursor-pointer"
        onClick={() => setShowImgModal(true)}
      >
        <AiOutlineUpload className="text-white text-[1rem] font-xeicon leading-normal" />
        <p className="text-white text-[1.125rem] font-kanit font-semibold leading-normal tracking-tighter">
          업로드
        </p>
      </div>
    );
  };

  // const notiArr = useNotification();

  return (
    <div className="flex items-center self-stretch justify-between flex-shrink-0 h-20 py-0 ">
      <div className="flex flex-row items-center justify-center md:hidden">
        <BurgerMenu />
        <Link href="/dashboard" className="ml-2">
          <Image
            src="/insightLINK_logo.svg"
            alt="InsightLINK Logo"
            width={180}
            height={230}
          />
        </Link>
      </div>

      <Link href="/dashboard" className="max-md:hidden">
        <Image
          src="/insightLINK_logo.svg"
          alt="InsightLINK Logo"
          width={230}
          height={230}
        />
      </Link>

      <div className="hidden md:block">
        <Link href="/social">
          <CategoryLink>소셜</CategoryLink>
        </Link>
      </div>

      <div
        className="flex items-center justify-center h-10 gap-1 px-4 bg-gray-900 rounded cursor-pointer md:hidden md:ml-auto"
        onClick={() => setShowImgModal(true)}
      >
        <AiOutlineUpload className="text-white text-[1rem] font-xeicon leading-normal" />
        <p className="text-white text-[1.125rem] font-kanit font-semibold leading-normal tracking-tighter">
          업로드
        </p>
      </div>

      <div className="flex items-center gap-4 max-md:hidden">
        <div className="flex items-center self-stretch gap-4">
          <div className="flex flex-col items-center justify-center w-7 h-7">
            <BsShareFill
              className="leading-normal text-gray-800 cursor-pointer text-1xl font-xeicon"
              onClick={handleShareIconClick}
            />
          </div>
          <button
            className="relative flex flex-col items-center justify-center cursor-pointer w-7 h-7"
            onClick={handleOpenAlarm}
          >
            <AiTwotoneBell className="text-gray-800 text-[1rem] font-xeicon leading-normal" />
            {/* {alarmCnt &&
              (notiCnt ? (
                <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -right-1 -top-1 z-1">
                  notiCnt
                </div>
              ) : (
                <></>
              ))} */}
            {alarmCnt && (
              <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -right-1 -top-1 z-1">
                1
              </div>
            )}
            {/* {openAlarm && notiArr && <AlarmModal notiArr={notiArr} />} */}

            {openAlarm && <AlarmModal />}
          </button>
        </div>
        {userProfile ? (
          <div className="relative w-10 h-10">
            <Image
              src="/insightLINK_profile.png"
              alt=""
              layout="fill"
              className="rounded-full cursor-pointer"
              onClick={handleUserIconClick}
            />
          </div>
        ) : (
          <BiUser
            className="text-gray-800 text-[1rem] font-xeicon leading-normal  cursor-pointer"
            onClick={handleUserIconClick}
          />
        )}
        {/* {currentTheme === "dark" ? (
          <BsSunFill size={30} onClick={() => setTheme("light")} />
        ) : (
          <BsFillMoonFill size={30} onClick={() => setTheme("dark")} />
        )} */}
        <div
          className="flex items-center justify-center h-10 gap-1 px-4 bg-gray-900 rounded cursor-pointer"
          onClick={() => setShowImgModal(true)}
        >
          <AiOutlineUpload className="text-white text-[1rem] font-xeicon leading-normal" />
          <p className="text-white text-[1.125rem] font-kanit font-semibold leading-normal tracking-tighter">
            업로드
          </p>
        </div>
      </div>
      {isUserModalOpen && <UserModal closeModal={closeModal} />}
    </div>
  );
}
