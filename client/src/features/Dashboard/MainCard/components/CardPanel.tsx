import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// recoil
import { useRecoilValue } from "recoil";
import {
  CardDetailOpenAtom,
  NodeNameAtom,
  NodeColorAtom,
} from "@/recoil/atoms/MainGraphAtom";
// components
import Card from "@/features/Dashboard/MainCard/components/Card";
import CardDetail from "@/features/Dashboard/MainCard/components/CardDetail";
// custom hook
import useCard from "@/features/Dashboard/MainCard/hook/useCard";
// types
import { CardData, FeedCardData } from "@/types/dashborad.types";
// Assets
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { Card_Info_Api } from "@/axios/dashBoardApi";

function CardPanel() {
  const router = useRouter();

  const [cardData, setCardData] = useState<CardData>();
  const detailOpen = useRecoilValue(CardDetailOpenAtom);
  const nodeName = useRecoilValue(NodeNameAtom);
  const nodeColor = useRecoilValue<string>(NodeColorAtom);
  const getData = useCard();

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(9);
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
    if (getData) {
      setCardData(getData);
      setCurrentPage(1);
      setTotalCards(cardData?.totalResults ? cardData?.totalResults : 0);
    }
  }, [getData]);

  useEffect(() => {
    if (!router.isReady) return;

    const getCardData = async () => {
      const userid = Array.isArray(router.query.userid)
        ? router.query.userid[0]
        : router.query.userid;

      const cardData = await Card_Info_Api(
        nodeName,
        userid,
        currentPage,
        cardsPerPage
      );
      setCardData(cardData);
      setTotalCards(cardData?.totalResults);
    };
    getCardData();
  }, [router.isReady, currentPage, nodeName]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {detailOpen ? (
        <div className="w-[32rem] h-[33rem]">
          <CardDetail />
        </div>
      ) : (
        <>
          <div className="flex flex-row justify-between mb-4">
            {/* <div
              className={`px-4 font-semibold leading-6 text-white rounded bg-blue-600`}
            > */}
            <div
              className={`px-4 font-semibold leading-6 text-white rounded bg-${nodeColor}`}
            >
              # {nodeName}
            </div>
            <div>
              <div className="flex items-center gap-[0.5rem]">
                <div className="text-[#181818] text-[0.875rem]  font-weight-[300] leading-[160%] tracking-[-0.02625rem]">
                  {`${Math.min(
                    (currentPage - 1) * cardsPerPage + 1,
                    totalCards
                  )} - ${Math.min(
                    currentPage * cardsPerPage,
                    totalCards
                  )} of ${totalCards}`}
                </div>
                <div
                  className={`flex items-center justify-center w-[1.75rem] h-[1.75rem] rounded-md bg-[#FFF]  cursor-pointer${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                >
                  <AiOutlineLeft />
                </div>
                <div className="text-[#181818] text-[0.875rem]  font-weight-[300] leading-[160%] tracking-[-0.02625rem]">
                  {`${currentPage} / ${Math.ceil(totalCards / cardsPerPage)}`}
                </div>
                <div
                  className={`flex items-center justify-center w-[1.75rem] h-[1.75rem] rounded-md bg-[#FFF] cursor-pointer ${
                    currentPage === Math.ceil(totalCards / cardsPerPage)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() =>
                    currentPage < Math.ceil(totalCards / cardsPerPage) &&
                    handlePageChange(currentPage + 1)
                  }
                >
                  <AiOutlineRight />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-flow-row w-[32rem] gap-y-3">
            {cardData?.data?.map((data: FeedCardData, index: number) => {
              return <Card data={data} key={index} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default CardPanel;
