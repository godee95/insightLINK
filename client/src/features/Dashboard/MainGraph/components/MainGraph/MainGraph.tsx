import React from "react";
// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import {
  DashBoardCardAtom,
  EditModeAtom,
  RefreshGraphAtom,
} from "@/recoil/atoms/MainGraphAtom";
// Componenets
import Graph from "@/features/Dashboard/MainGraph/components/Graph/Graph";

function MainGraph({ data }: any) {
  const openCard = useRecoilValue(DashBoardCardAtom);
  const editMode = useRecoilValue(EditModeAtom);
  const [refreshGraph, SetRefreshGraph] = useRecoilState(RefreshGraphAtom);

  const handleRefreshGraph = () => {
    SetRefreshGraph(!refreshGraph);
  };

  return (
    <div className={openCard ? "w-[42rem]" : "w-full relative"}>
      {typeof data === "number" ? (
        <button
          onClick={handleRefreshGraph}
          className="absolute top-[1rem] right-[1rem]"
        >
          Refreshing...
        </button>
      ) : (
        <Graph data={data} editMode={editMode} />
      )}
    </div>
  );
}

export default MainGraph;
