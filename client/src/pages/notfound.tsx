import React from "react";
import Link from "next/link";

import { BsExclamationTriangle } from "react-icons/bs";

interface NotFoundPageProps {
  errorMsg: ErrorMsg;
}
interface ErrorMsg {
  msg: string;
  btn: string;
  route: string;
}

NotFound.defaultProps = {
  errorMsg: {
    msg: "요청하신 페이지를 찾을 수 없습니다",
    btn: "메인 페이지로 이동",
    route: "/",
  },
};

export default function NotFound({ errorMsg }: NotFoundPageProps) {
  return (
    <>
      <div>
        {" "}
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="flex flex-col items-center mt-72">
            <div className="mb-3">
              <BsExclamationTriangle className="w-40 h-40" />
            </div>
            <h2 className="leading-10 text-left">
              <p className="mb-10 text-4xl font-extrabold text-center">
                Not Found
              </p>
              <p className="mb-3 text-3xl font-medium text-center text-black dark:text-white">
                죄송합니다.
              </p>
              <p className="text-xl text-center text-black dark:text-white">
                {errorMsg.msg}
              </p>
            </h2>
          </div>
          <Link href={errorMsg.route}>
            <button className="px-10 py-3 my-28 bg-slate-300 rounded-2xl text-medium dark:bg-DMThrColor dark:text-white">
              {errorMsg.btn}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
