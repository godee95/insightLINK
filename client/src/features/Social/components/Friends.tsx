import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { GET } from "@/axios/GET";

import CardDetail from "@/features/Social/components/CardDetail";
// Types
import { Friends } from "@/types/social.types";
// Assets
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { SocialImgModalAtom } from "@/recoil/atoms/SocialAtom";

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const listRef = useRef<HTMLUListElement>(null);
  // 마우스로 드래그 앤 드롭
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  // 모달
  const [showModal, setShowModal] = useRecoilState(SocialImgModalAtom);
  const [userId, setUserId] = useState(0);
  const [cardId, setCardId] = useState(0);

  // 최근 업데이트 친구 조회
  const getFriends = async () => {
    const data = await GET("social/updated", true);
    if (data.status === 200) {
      setFriends(data.data);
    }
  };

  useEffect(() => {
    getFriends();
  }, []);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    setIsMouseDown(true);
    setStartX(e.clientX - (listRef.current?.offsetLeft || 0));
    setScrollLeft(listRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.clientX - (listRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (listRef.current) {
      listRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="flex flex-col items-start self-stretch gap-10 pb-10 shadow-sm h-60">
      <h2 className="text-gray-900 text-[1.5rem]  font-semibold leading-1.5 tracking-tighter">
        News
      </h2>
      <div className="flex items-center gap-8 flex-1 self-stretch w-[53rem]">
        <div className="flex w-[1.75rem] h-[1.75rem] flex-col justify-center items-center">
          <BsChevronLeft className="text-base leading-normal text-gray-800 font-xeicon" />
        </div>
        <ul
          ref={listRef}
          className="flex justify-start w-full py-5 overflow-x-hidden overflow-y-hidden scrolling-touch cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {friends &&
            friends?.map((f: Friends, index: number) => {
              return (
                <li
                  key={index}
                  className="flex flex-col justify-center items-center w-[6.25rem] h-[8.25rem] flex-shrink-0 m-2 gap-3"
                >
                  <div className="relative w-[6.25rem] h-[6.25rem] transition transform rounded-full cursor-pointer hover:-rotate-6 bg-gradient-to-r from-purple-600 to-pink-500 flex justify-center items-center">
                    <Image
                      // src={f.profile_img}
                      src="/insightLINK_profile.png"
                      alt="Profile"
                      width={84} // rem to pixel conversion (1rem = 16px)
                      height={84} // rem to pixel conversion (1rem = 16px)
                      className="rounded-full cursor-pointer"
                      onClick={() => {
                        setCardId(f.cardId);
                        setUserId(f.userId);
                        setShowModal(true);
                      }}
                    />
                  </div>
                  <p className="flex flex-col items-center justify-center overflow-hidden text-center w-6.0625rem h-auto text-gray-900  text-lg leading-normal tracking-wider">
                    {f.userName}
                  </p>
                </li>
              );
            })}
        </ul>
        <div className="flex w-[1.75rem] h-[1.75rem] flex-col justify-center items-center">
          <BsChevronRight className="text-base leading-normal text-gray-800 font-xeicon" />
        </div>
      </div>
      {showModal && cardId && userId && (
        <CardDetail cardId={cardId} userId={userId} />
      )}
    </div>
  );
};

export default Friends;
