import React from "react";
import { useRouter } from "next/router";

import { HeaderNoti_DTO } from "@/types/notification.types";

interface AlarmModalProps {
  notiArr: HeaderNoti_DTO[];
}

// export default function AlarmModal({ notiArr }: AlarmModalProps) {
export default function AlarmModal() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/social");
  };

  return (
    <div className="w-[15rem] max-h-[20rem] min-h-[10rem] bg-slate-100 absolute z-20 top-10 rounded-3xl py-3">
      <div className="px-1 pb-2 text-xl border-b font-mediums">새로운 알림</div>
      {/* {notiArr && notiArr.length > 0 ? (
        notiArr.map((noti, idx) => {
          let message;
          switch (noti.case) {
            case "Following":
              message = `${noti.sender}님이 회원님을 팔로우했습니다.`;
              break;
            case "CardDuplicate":
              message = `${noti.sender}님이 회원님의 카드를 복사했습니다.`;
              break;
            default:
              message = `${noti.sender}님으로부터 알림이 왔습니다.`;
          }

          return (
            <div
              className="border-b h-[2rem] py-2 text-sm cursor-pointer last:border-none"
              onClick={handleRedirect}
              key={idx}
            >
              {message}
            </div>

          );
        })
      ) : (
        <></>
      )} */}
      <div
        className="border-b h-[2rem] py-2 text-sm cursor-pointer last:border-none"
        onClick={handleRedirect}
      >
        sender 님이 회원님을 팔로우했습니다.
      </div>
    </div>
  );
}
