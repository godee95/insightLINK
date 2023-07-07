import React, { useEffect, useState } from "react";
import Image from "next/image";
// Recoil
import { useRecoilState } from "recoil";
import { SocialImgModalAtom } from "@/recoil/atoms/SocialAtom";

import { GET } from "@/axios/GET";
import CardDetail from "./CardDetail";
// Types
import { FeedCardData } from "@/types/dashborad.types";
// Assets
import { AiOutlineClose, AiTwotoneCrown } from "react-icons/ai";

const Feeds = () => {
  const [cards, setCards] = useState<FeedCardData[]>();
  // 모달
  const [showModal, setShowModal] = useRecoilState(SocialImgModalAtom);
  const [userId, setUserId] = useState(0);
  const [cardId, setCardId] = useState(0);

  const getFeeds = async () => {
    const data = await GET(`social/card`, true);
    if (data.status === 200) {
      setCards(data.data);
    }
    if (data.response?.status === 400) {
      setCards([]);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  const rejectCard = async (id: number) => {
    const data = await GET(`graph?userId=${id}`, true);
    if (data.status === 200) {
      getFeeds();
    }
  };

  const handleClose = (id: number) => {
    rejectCard(id);
  };

  return (
    <div className="flex pb-5 flex-col items-start gap-[2rem] self-stretch border-b border-gray-900 shadow-sm w-full">
      <h2 className="text-gray-900 text-[1.5rem]  font-semibold leading-1.5 tracking-tighter">
        Feed
      </h2>
      <div className="grid grid-cols-5 grid-flow-row gap-y-3 self-stretch flex-wrap w-full">
        {cards &&
          cards.map((c: FeedCardData, index: number) => {
            return (
              <div
                key={index}
                className="border-[0.1rem] rounded border-gray-300 hover:border-blue-500"
              >
                <div className="relative w-[10rem] h-[10rem] flex justify-center items-center cursor-pointer">
                  <Image
                    src={c?.cardImg}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="cursor-pointer"
                    onClick={() => {
                      setCardId(c.cardId);
                      setUserId(c.userId);
                      setShowModal(true);
                    }}
                  />
                  <button
                    onClick={() => handleClose(c?.userId)}
                    className="absolute cursor-pointer svg-button-nomal right-3 top-3"
                  >
                    <AiOutlineClose className="self-center z-1" size="1rem" />
                  </button>
                </div>
                {c?.isFriend ? (
                  <div className="flex px-3 py-4 flex-col items-start gap-3 self-stretch">
                    <p className="text-gray-400 font-ibm-plex-sans text-xs font-medium leading-normal tracking-tight flex flex-col flex-1">
                      작성자: {c?.userName}
                    </p>
                  </div>
                ) : (
                  <div className="flex px-3 py-4 flex-row justify-between gap-3 self-stretch">
                    <p className="text-gray-400 font-ibm-plex-sans text-xs font-medium leading-normal tracking-tight flex flex-col flex-1">
                      작성자: {c?.userName}
                    </p>
                    <div className="flex h-5 p-1 items-center gap-1 bg-gray-50">
                      <AiTwotoneCrown className="text-gray-700 font-xeicon text-xs font-normal leading-normal" />
                      <p className="text-gray-700 font-ibm-plex-sans text-xs font-medium leading-normal tracking-tight">
                        추천
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {showModal && cardId && userId && (
        <CardDetail cardId={cardId} userId={userId} />
      )}
    </div>
  );
};

export default Feeds;
