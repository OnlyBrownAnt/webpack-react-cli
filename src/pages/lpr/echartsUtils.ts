import { ECOption } from "@/@types/EChartsTypes";

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 对 echarts 的 option 预处理
 */
const colorArray = ["#e84a55", "#2b77f2"];
function getDefaultData() {
  return {
    title: {
      text: "LPR历史趋势图",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: "15",
      right: "15",
      bottom: "30",
      containLabel: true,
    },
    yAxis: [
      {
        name: "LPR(%)",
        nameLocation: "end",
        nameTextStyle: {
          align: "right",
        },
        type: "value",
        min: function (value: any) {
          return (value.min - (value.max - value.min) * 3).toFixed(2);
        },
        max: function (value: any) {
          return (value.max + (value.max - value.min) * 3).toFixed(2);
        },
      },
    ],
  };
}
function createxAxis(data: any) {
  return {
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data,
      },
    ],
  };
}
function createLegend(data: any) {
  return {
    legend: {
      data: data,
      bottom: "0",
      lineStyle: {
        opacity: 0,
      },
      icon: "roundRect",
      itemGap: 30,
      itemHeight: 8,
      itemWidth: 8,
      textStyle: {
        fontSize: 14,
      },
    },
  };
}

function createSeries(name: string, data: Array<any>, color: Array<any>) {
  return {
    name: name,
    type: "line",
    label: {
      show: false,
      position: "top",
    },
    areaStyle: {
      opacity: 0.1,
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: color, // 0% 处的颜色
          },
          {
            offset: 0.5,
            color: "#ffffff", // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    },
    emphasis: {
      focus: "series",
      blurScope: "coordinateSystem",
    },
    data: data,
  };
}
export function createLPROption(option: any) {
  const newOption = getDefaultData();
  const color = {
    color: colorArray,
  };
  const xAxis = createxAxis(option.xAxis);
  const legend = createLegend(option.legend);
  const series = {
    series: [],
  };
  for (let i = 0; i < option.legend.length; i++) {
    const seriesItem = createSeries(
      option.legend[i],
      option.data[i].xAxisData,
      colorArray[i],
    );
    series.series.push(seriesItem);
  }
  return Object.assign(newOption, color, xAxis, legend, series);
}

export const originOption = {
  legend: ["1年期LPR", "5年期LPR"],
  xAxis: ["07/23", "08/20", "09/20", "10/22", "11/20", "12/20"],
  data: [
    { xAxisData: ["3.35", "3.35", "3.35", "3.10", "3.10", "3.10"] },
    { xAxisData: ["3.85", "3.85", "3.85", "3.60", "3.60", "3.60"] },
  ],
};

export const mockOption: ECOption = {
  title: { text: "LPR历史趋势图", left: "center" },
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "cross", label: { backgroundColor: "#6a7985" } },
  },
  grid: { left: "15", right: "15", bottom: "30", containLabel: true },
  yAxis: [
    {
      name: "LPR(%)",
      nameLocation: "end",
      nameTextStyle: { align: "right" },
      type: "value",
    },
  ],
  color: ["#e84a55", "#2b77f2"],
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      // 外部传入
      data: ["07/23", "08/20", "09/20", "10/22", "11/20", "12/20"],
    },
  ],
  legend: {
    data: ["1年期LPR", "5年期LPR"],
    bottom: "0",
    lineStyle: { opacity: 0 },
    icon: "roundRect",
    itemGap: 30,
    itemHeight: 8,
    itemWidth: 8,
    textStyle: { fontSize: 14 },
  },
  series: [
    {
      name: "1年期LPR",
      type: "line",
      label: { show: false, position: "top" },
      areaStyle: {
        opacity: 0.1,
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#e84a55" },
            { offset: 0.5, color: "#ffffff" },
          ],
          global: false,
        },
      },
      emphasis: { focus: "series", blurScope: "coordinateSystem" },
      // 外部传入
      data: ["3.35", "3.35", "3.35", "3.10", "3.10", "3.10"],
    },
    {
      name: "5年期LPR",
      type: "line",
      label: { show: false, position: "top" },
      areaStyle: {
        opacity: 0.1,
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#2b77f2" },
            { offset: 0.5, color: "#ffffff" },
          ],
          global: false,
        },
      },
      emphasis: { focus: "series", blurScope: "coordinateSystem" },
      // 外部传入
      data: ["3.85", "3.85", "3.85", "3.60", "3.60", "3.60"],
    },
  ],
};
