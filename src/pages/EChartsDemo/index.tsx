import React, { useRef, useEffect, useState } from "react";
import EChartsWrapper, {
  EChartsRef,
  EChartsRendererType,
} from "../EChartsWrapper";
import { EChartsType } from "echarts/core";
import { ECOption } from "../EChartsWrapper/EChartsConfig";

import { Resizable, ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

/**
 * echart 组件实例
 * 增加父层拖动子层 echart 自适应变化效果
 */
const EChartsDemo: React.FC = () => {
  const echartsRef = useRef<EChartsRef>(null);
  const [options, setOptions] = useState<ECOption>({});
  const [renderer, setRenderer] = useState<EChartsRendererType>(
    EChartsRendererType.canvas,
  );

  useEffect(() => {
    const options: any = {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
    setOptions(options);

    setRenderer(EChartsRendererType.canvas);
  }, []);

  useEffect(() => {
    if (echartsRef.current) {
      const echartsInstance: EChartsType | undefined =
        echartsRef.current.getEChartsInstance();
      echartsInstance?.on("click", (event) => {
        console.log("echarts click !");
      });
    }
  }, [echartsRef]);

  // div 宽高拖动变化
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);
  const onResize = (event, { node, size, handle }) => {
    setHeight(size.height);
    setWidth(size.width);
  };
  return (
    <>
      <Resizable height={height} width={width} onResize={onResize}>
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            border: "1px solid black",
          }}
        >
          <EChartsWrapper
            ref={echartsRef}
            options={options}
            renderer={renderer}
            height={height}
            width={width}
          ></EChartsWrapper>
        </div>
      </Resizable>
    </>
  );
};

export default EChartsDemo;
