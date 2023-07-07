import React from "react";
import { atom } from "recoil";
import { CardData, CardDetail_DTO } from "@/types/dashborad.types";

export const DashBoardCardAtom = atom({
  key: "DashBoardCardAtom",
  default: false,
});

export const ChartInstanceAtom = atom<React.RefObject<echarts.ECharts | null>>({
  key: "chartInstance",
  default: React.createRef<echarts.ECharts | null>(),
});

export const ChartOptionAtom = atom({
  key: "ChartOptionAtom",
  default: null,
});

export const NodeNameAtom = atom<string | null>({
  key: "NodeNameAtom",
  default: null,
});

export const NodeColorAtom = atom<string>({
  key: "NodeColorAtom",
  default: "blue-600",
});

export const CardDataAtom = atom<CardData | null>({
  key: "CardDataAtom",
  default: null,
});

export const CardDetailAtom = atom<CardDetail_DTO | null>({
  key: "CardDetailAtom",
  default: null,
});

export const CardDetailOpenAtom = atom({
  key: "CardDetailOpenAtom",
  default: false,
});

export const ClickedCardDetailAtom = atom<number | null>({
  key: "ClickedCardDetailAtom",
  default: null,
});

export const ImgModalAtom = atom({
  key: "ImgModalAtom",
  default: false,
});

export const UploadedImgAtom = atom({
  key: "UploadedImgAtom",
  default: [""],
});

export const UploadedImgNumAtom = atom({
  key: "UploadedImgNumAtom",
  default: 0,
});

export const ExportedTagsAtom = atom({
  key: "ExportedTagsAtom",
  default: [""],
});

export const ShowImgModalAtom = atom({
  key: "ShowImgModalAtom",
  default: false,
});

export const EditModeAtom = atom({
  key: "EditModeAtom",
  default: false,
});

export const AlarmCntAtom = atom({
  key: "alarmCntAtom",
  default: true,
});

export const RefreshGraphAtom = atom({
  key: "RefreshGraphAtom",
  default: false,
});
