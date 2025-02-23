import React, { useEffect, useRef } from "react";
// core
import * as echarts from "echarts/core";
import { EChartsType } from "echarts/core";
// charts
import { LineChart } from "echarts/charts";
// components
import {
  TitleComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
// features
// renderers
import { CanvasRenderer } from "echarts/renderers";
import { ECOption } from "@/@types/EChartsTypes";
import S from "@/components/LPRComponent/lprComponent.module.css";

echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  CanvasRenderer,
]);

type PropsType = {
  option: ECOption | undefined;
};

const LPRCOmponent: React.FC<PropsType> = (props: PropsType) => {
  const echartsRef = useRef(null);
  const echartsInstance = useRef<EChartsType>(null);

  // 1. echarts 是否挂载成功。挂载成功而且echarts 实例不为 null 则进行初始化。
  // 2. echarts option 配置是否变化。echarts option 不为 null 而且 echarts 实例不为空则加载 echarts option 配置
  // 3. 组件销毁时 echarts 实例执行释放逻辑。
  useEffect(() => {
    if (echartsRef.current) {
      // TODO 每次都进行赋值，避免 echart 初次初始化失败导致无法后续判断错误无法进行初始化
      echartsInstance.current = echarts.getInstanceByDom(echartsRef.current);
      if (!echartsInstance.current) {
        echartsInstance.current = echarts.init(echartsRef.current, undefined, {
          renderer: "canvas",
        });
      }
    }

    if (props?.option && echartsInstance.current) {
      echartsInstance.current?.setOption(props.option);
    }

    return () => {
      if (echartsInstance.current) {
        echartsInstance.current?.dispose();
      }
    };
  }, [echartsRef, props, props.option]);

  return (
    <>
      <div ref={echartsRef} className={S.echarts}></div>
    </>
  );
};

export default LPRCOmponent;
