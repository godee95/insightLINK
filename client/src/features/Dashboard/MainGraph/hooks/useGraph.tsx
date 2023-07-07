import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// recoil
import { useRecoilValue } from "recoil";
import { EditModeAtom, RefreshGraphAtom } from "@/recoil/atoms/MainGraphAtom";
import { ImgUpLoadAtom } from "@/recoil/atoms/ImageUploadAtom";

import { Main_graph_Api, Share_graph_Api } from "@/axios/dashBoardApi";
import { Main_graph_Api_DTO } from "@/types/dashborad.types";

function useGraph() {
  const editMode = useRecoilValue(EditModeAtom);
  const imgUpLoad = useRecoilValue(ImgUpLoadAtom);
  const refreshGraph = useRecoilValue(RefreshGraphAtom);

  const [data, setData] = useState<Main_graph_Api_DTO | undefined | number>(
    undefined
  );
  const router = useRouter();

  let token: any;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  useEffect(() => {
    if (!router.isReady) return; // if query values are not ready, return

    const getGraphData = async () => {
      const userid = Array.isArray(router.query.userid)
        ? router.query.userid[0]
        : router.query.userid;
      let graphData;
      if (token) {
        graphData = await Main_graph_Api(userid);
      } else if (!token && userid) {
        graphData = await Share_graph_Api(userid);
      }
      setData(graphData);
    };
    getGraphData();
  }, [router.isReady, router.query.userid, editMode, imgUpLoad, refreshGraph]); // add dependencies

  if (data) {
    return data;
  }
}

export default useGraph;
