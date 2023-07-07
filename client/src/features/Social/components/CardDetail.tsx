import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// Recoil
import { useRecoilState } from "recoil";
import { SocialImgModalAtom } from "@/recoil/atoms/SocialAtom";

import { GET } from "@/axios/GET";
import { POST } from "@/axios/POST";
// Types
import { CardDetail } from "@/types/social.types";
// Assets
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";

const randomColors = [
  "#EE6565",
  "#FB8351",
  "#FAC858",
  "#91CB75",
  "#3AA272",
  "#73C0DE",
  "#5470C6",
  "#9A60B4",
  "#FF88E0",
];

const CardDetail = ({ cardId, userId }: CardDetail) => {
  const [detail, setDetail] = useState<any>();
  const [isPlus, setIsPlus] = useState(false);
  const [showModal, setShowModal] = useRecoilState(SocialImgModalAtom);

  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const getDetail = async () => {
    const data = await GET(
      `cards/info?cardId=${cardId}&userId=${userId}`,
      true
    );
    if (data.status === 200) {
      setDetail(data.data);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const cloneCard = async () => {
    const data: any = await POST(
      `social/clone`,
      { cardId: cardId, userId: userId },
      true
    );
    if (data.status === 200) {
      setIsPlus(true);
      setShowModal(false);
    }
  };

  const handleRedirectToDashboard = (userid: number) => {
    router.push(`/dashboard/${userid}`);
  };

  const handleRedirectToSearch = (tag: string) => {
    router.push(`/search?search=${tag}`);
  };

  const modalOutsideClicked = (e: any) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-opacity-10"
      ref={modalRef}
      onClick={(e) => modalOutsideClicked(e)}
    >
      <div className="flex w-[52.5rem] pt-3 pr-6 pb-5 pl-6 flex-col items-start rounded-xl border border-gray-200 bg-white shadow-md">
        <div className="flex h-[3.75rem] justify-between items-center shrink-0 self-stretch">
          <p className="text-gray-900 text-2xl  font-semibold leading-1.5 tracking-tight">
            Feed Detail
          </p>
          <AiOutlineClose
            className="text-base leading-normal text-gray-400 cursor-pointer font-xeicon"
            onClick={() => setShowModal(false)}
          />
        </div>
        <div className="flex items-center self-stretch flex-1 gap-2">
          {detail?.cardTag &&
            detail?.cardTag.map((t: string, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-center px-4 rounded cursor-pointer h-9"
                  style={{
                    backgroundColor:
                      randomColors[
                        Math.floor(Math.random() * randomColors.length)
                      ],
                  }}
                  onClick={() => {
                    setShowModal(false);
                    handleRedirectToSearch(t);
                  }}
                >
                  <p className="text-white text-lg  font-semibold leading-1.5 tracking-wide">
                    #{t}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="flex items-start self-stretch flex-1 gap-6">
          <div className="relative flex py-5 flex-col items-start flex-1 self-stretch h-[24.125rem] w-[24rem]">
            <Image
              src={detail?.cardImage}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="flex w-[24rem] flex-col text-gray-900 text-lg  font-normal leading-1.5">
            {detail?.content}
          </p>
        </div>
        <div className="flex h-[4.25rem] pb-0 justify-between items-end shrink-0 self-stretch border-t-2 border-gray-900">
          <div className="flex h-[2.75rem] justify-between items-center flex-1">
            <div className="flex flex-col items-start gap-2">
              <p
                className="text-base font-light leading-none tracking-widest text-gray-900 cursor-pointer"
                onClick={() => {
                  setShowModal(false);
                  handleRedirectToDashboard(userId);
                }}
              >
                Uploaded by {detail?.userName}
              </p>
              <p className="text-base font-light leading-none tracking-widest text-gray-900">
                {detail?.created_at.slice(0, 10)}
              </p>
            </div>
            <div
              className="flex items-center justify-center gap-1 px-5 bg-gray-900 rounded-md cursor-pointer h-11"
              onClick={cloneCard}
            >
              <AiOutlineUpload className="text-base font-normal text-white font-xeicon" />
              <p className="text-lg font-semibold text-white">카드 복제하기</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
