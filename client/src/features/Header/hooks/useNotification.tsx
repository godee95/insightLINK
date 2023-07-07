// import React, { useEffect, useState } from "react";
// // recoil
// import { useSetRecoilState } from "recoil";
// import { NotiCntAtom } from "@/recoil/atoms/HeaderAtom";

// import { Header_Notifications_API } from "@/axios/headerApi";
// import { HeaderNoti_DTO } from "@/types/notification.types";

// const useNotification = () => {
//   const [notiArr, setNotiArr] = useState<HeaderNoti_DTO[] | null>([]);
//   const setNotiCnt = useSetRecoilState(NotiCntAtom);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const noti = await Header_Notifications_API();
//       if (noti.length > 0) {
//         // 알림이 있는 경우에만 상태를 업데이트
//         setNotiArr((prevNotiArr) =>
//           prevNotiArr ? [...prevNotiArr, ...noti] : noti
//         );
//       }
//     };

//     fetchNotifications();
//     if (notiArr) setNotiCnt(notiArr.length);
//   }, []);

//   return notiArr;
// };

// export default useNotification;
