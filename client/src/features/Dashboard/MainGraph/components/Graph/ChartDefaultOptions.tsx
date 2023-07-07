import { Main_graph_Api_DTO } from "@/types/dashborad.types";
import setCategories from "./setCategories";

const randomColors = [
  "#EE6565",
  "#FB8351",
  "#FFA500",
  "#FAC858",
  "#91CB75",
  "#3AA272",
  "#73C0DE",
  "#5470C6",
  "#9A60B4",
  "#FFC0CB",
  "#FFD700",
  "#195E31",
  "#254D9B",
  "#CDA0D9 ",
  "#FF88E0",
  "#181818",
];

const ChartDefaultOptions = (graph: Main_graph_Api_DTO) => {
  const nodeColorMapping = new Map();
  const nodes = graph?.nodes.map((node) => {
    const color = randomColors[node.category % randomColors.length];
    nodeColorMapping.set(node.id, color);
    return {
      ...node,
      itemStyle: {
        color,
      },
    };
  });

  const links = graph?.links.map((link) => ({
    ...link,
    lineStyle: {
      color: nodeColorMapping.get(link.source), // Use color of source node
    },
  }));

  let seenIds = new Set();
  let seenNames = new Set();
  let i = 0;
  while (i < nodes.length) {
    if (seenIds.has(nodes[i].id) || seenNames.has(nodes[i].name)) {
      nodes.splice(i, 1);
    } else {
      seenIds.add(nodes[i].id);
      seenNames.add(nodes[i].name);
      i++;
    }
  }

  return {
    tooltip: false,
    animation: true,
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        type: "graph",
        layout: "force",
        data: nodes,
        links: links,
        categories: setCategories(graph?.cnt),
        roam: true,
        draggable: true,
        label: {
          show: true,
          position: "top",
          formatter: "{b}",
          color: "auto",
        },
        labelLayout: {
          hideOverlap: true,
        },
        scaleLimit: {
          min: 1,
          max: 5,
        },
        lineStyle: {
          width: 2, // edge의 두께
          curveness: 0, // edge의 곡률, 0은 직선
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 5,
          },
        },
        force: {
          repulsion: 350, // 노드 간 반발력 조정
          gravity: 0.2, // 중력
          edgeLength: [60, 130], // 노드 간 거리 [minlength, maxlength]
        },
      },
    ],
  };
};

export default ChartDefaultOptions;
