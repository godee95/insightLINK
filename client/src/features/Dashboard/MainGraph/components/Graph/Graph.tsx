import React, { useEffect, useRef, useState, useCallback } from "react";
// recoil
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  CardDetailOpenAtom,
  DashBoardCardAtom,
  NodeNameAtom,
  NodeColorAtom,
} from "@/recoil/atoms/MainGraphAtom";
// library
import * as echarts from "echarts";
// type
import { Main_graph_Api_DTO, GraphNode } from "@/types/dashborad.types";

import handleNodeUnclick from "@/features/Dashboard/MainGraph/components/OnClickEvent/MouseUp";
import ChartDefaultOptions from "@/features/Dashboard/MainGraph/components/Graph/ChartDefaultOptions";
import handleEditTag from "../OnClickEvent/handleEditTag";
import handleDeleteTag from "../OnClickEvent/handleDeleteTag";
import handleMerge from "@/features/Dashboard/MainGraph/components/OnClickEvent/handleMerge";
import handleConnect from "../OnClickEvent/handleConnect";
import handleDisconnect from "../OnClickEvent/handleDisconnect";

type MainGraphProps = {
  data: Main_graph_Api_DTO;
  editMode: boolean;
};

function Graph({ data, editMode }: MainGraphProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [lastClickedNode, setLastClickedNode] = useState<string>("");
  const [openCard, setOpenCard] = useRecoilState(DashBoardCardAtom);
  const [nodeName, setNodeName] = useRecoilState(NodeNameAtom);
  const setNodeColor = useSetRecoilState(NodeColorAtom);
  const setDetailOpen = useSetRecoilState(CardDetailOpenAtom);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactElement | null>(
    null
  );
  const [modalPosition, setModalPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  const pressTimer = useRef<any>(null);
  const longPressNode = useRef<string | null>(null);

  // 일반 모드
  const handleNodeClick = useCallback(
    (nodeName: string) => {
      if (!editMode) {
        // 이전에 클릭된 노드인지 확인
        const isLastClickedNode = lastClickedNode === nodeName;
        setLastClickedNode(nodeName);
        // 클릭된 노드 상태 업데이트
        if (isLastClickedNode) {
          setOpenCard(!openCard);
          setDetailOpen(false);
        } else {
          setOpenCard(true);
          setNodeName(nodeName);
        }
      }
    },
    [editMode, lastClickedNode, openCard]
  );

  const handleCloseCard = useCallback(() => {
    if (!editMode) {
      if (
        chartRef.current &&
        !chartRef.current.contains(event?.target as Node)
      ) {
        setOpenCard(false);
        setDetailOpen(false);
      }
    }
  }, [editMode, openCard]);

  const getColorName = (el: string) => {
    switch (el) {
      case "#EE6565":
        setNodeColor("colorRed");
        break;
      case "#FB8351":
        setNodeColor("colorOrange");
        break;
      case "#FAC858":
        setNodeColor("colorYellow");
        break;
      case "#91CB75":
        setNodeColor("colorLightgreen");
        break;
      case "#3AA272":
        setNodeColor("colorGreen");
        break;
      case "#73C0DE":
        setNodeColor("colorSkyblue");
        break;
      case "#5470C6":
        setNodeColor("colorBlue");
        break;
      case "#9A60B4":
        setNodeColor("colorPurple");
        break;
      case "#FFC0CB":
        setNodeColor("colorPink");
        break;
      default:
        setNodeColor("blue-600");
        break;
    }
  };

  useEffect(() => {
    if (chartRef.current && data) {
      const chart = echarts.init(chartRef.current);

      data.nodes.forEach((node: any) => {
        node.label = {
          show: node.symbolSize >= 10,
          fontSize: node.symbolSize >= 10 ? 17 : 15,
          // color: (params: any) => params.data.itemStyle.color,
        };
      });

      chart.setOption(ChartDefaultOptions(data) as any);

      // 수정 모드
      const handleMouseDown = (params: any) => {
        if (editMode) {
          setModalContent(
            <>
              <div>
                <button
                  onClick={() => handleMerge(params, chart, longPressNode)}
                  className="mr-4"
                >
                  태그 병합
                </button>
                <button onClick={closeModal}>닫기</button>
              </div>
              {/* <button onClick={() => handleEditTag(params, chart)}>
                Edit Tag
              </button>
              <button onClick={() => handleDeleteTag(params, chart)}>
                Delete Tag
              </button>
            
              <button onClick={() => handleConnect(params, chart)}>
                Connect Tag
              </button>
              <button onClick={() => handleDisconnect(params, chart)}>
                Disconnect Tag
              </button> */}
            </>
          );
          const containerRect = chartRef.current?.getBoundingClientRect();
          const nodeRect = params.event.event.target.getBoundingClientRect();
          if (containerRect) {
            const left = nodeRect.left - containerRect.left + nodeRect.width;
            const top = nodeRect.top - containerRect.top;
            setModalPosition({ left, top });
            setModalVisible(true);
          }
        }
      };

      const clickHandler = function (params: any) {
        console.log(params.color);
        if (params.dataType === "node") {
          console.log("노드 클릭");
          if (!editMode) {
            handleNodeClick(params.name as string);
            getColorName(params.color);
          } else {
            handleMouseDown(params);
          }
        }
      };
      chart.on("click", clickHandler);

      // Cleanup function
      return () => {
        chart.off("click", clickHandler);
      };
    }
  }, [editMode, handleNodeClick, data, chartRef]);

  // Add a new useEffect for resizing
  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        chart.resize();
      }
    }
  }, [nodeName, openCard]);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {modalVisible && modalPosition && (
        <div
          className="modal"
          style={{ left: modalPosition.left, top: modalPosition.top }}
        >
          {modalContent}
        </div>
      )}
      <div
        className={openCard ? "w-full h-[65vh]" : "w-[150vh] h-[65vh]"}
        ref={chartRef}
        onClick={handleCloseCard}
      ></div>
    </div>
  );
}

export default Graph;
