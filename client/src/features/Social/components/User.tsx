import { useEffect } from "react";
import { useRouter } from "next/router";

import { GET } from "@/axios/GET";
import { POST } from "@/axios/POST";
import { User_Info_Api } from "@/axios/dashBoardApi";
// Recoil
import { useRecoilState } from "recoil";
import { FollowCntAtom } from "@/recoil/atoms/LoginStateAtom";
import { SocialUserAtom } from "@/recoil/atoms/SocialAtom";
// Assets
import { AiOutlinePlus } from "react-icons/ai";

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

const User = () => {
  const [followCnt, setFollowCnt] = useRecoilState(FollowCntAtom);
  const [users, setUsers] = useRecoilState(SocialUserAtom);
  const router = useRouter();

  const getUsers = async () => {
    const data = await GET("social/user", true);
    console.log("getUsers");
    if (data.status === 200) {
      setUsers(data.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUserInfoData = async () => {
    const response = await User_Info_Api();
    setFollowCnt(response.followCnt);
    console.log("user:", response.followCnt);
  };

  const handleAddFollow = async (userId: number) => {
    await POST(`social/follow?followId=${userId}`, null, true);
    getUserInfoData();
    getUsers();
  };

  const handleRedirectToDashboard = (userid: number) => {
    router.push(`/dashboard/${userid}`);
  };

  const handleRedirectToSearch = (tag: string) => {
    router.push(`/search?search=${tag}`);
  };

  return (
    <>
      {users &&
        users.map((u, index: number) => (
          <li
            key={index}
            className="flex p-4 justify-between items-center self-stretch rounded border border-gray-100 bg-white"
          >
            <div className="flex flex-col justify-center items-start gap-2 flex-1">
              <div className="flex justify-between items-center self-stretch">
                <div className="flex justify-center items-center gap-6">
                  <img
                    // src={u.img}
                    src="/insightLINK_profile.png"
                    className="w-[2rem] h-[2rem] rounded-full cursor-pointer"
                    alt="profile"
                    onClick={() => {
                      handleRedirectToDashboard(u.userId);
                    }}
                  />
                  <p
                    className="text-gray-900 text-lg  leading-normal tracking-wide cursor-pointer"
                    onClick={() => {
                      handleRedirectToDashboard(u.userId);
                    }}
                  >
                    {u.userName}
                  </p>
                </div>
                <div className="flex w-7 h-7 flex-col justify-center items-center cursor-pointer">
                  <AiOutlinePlus
                    className="text-gray-800 text-base font-xeicon leading-normal"
                    onClick={() => handleAddFollow(u.userId)}
                  />
                </div>
              </div>
              <ul className="flex items-start content-start gap-2 self-stretch flex-wrap">
                {u.tags.map((t: string, index: number) => (
                  <li
                    key={index}
                    className="flex h-[2.25rem] px-4 justify-center items-center rounded cursor-pointer"
                    style={{
                      backgroundColor:
                        randomColors[
                          Math.floor(Math.random() * randomColors.length)
                        ],
                    }}
                    onClick={() => handleRedirectToSearch(t)}
                  >
                    <p className="text-white text-xl  font-semibold leading-6 tracking-wider">
                      #{t}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
    </>
  );
};

export default User;
