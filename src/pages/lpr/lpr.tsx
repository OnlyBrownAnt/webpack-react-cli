import React, { useEffect, useState } from "react";
import LPRCOmponent from "@/components/LPRComponent/lprComponent";
import S from "@/pages/lpr/lpr.module.css";
import { originOption, createLPROption } from "./echartsUtils";
import { ECOption } from "@/@types/EChartsTypes";

const LPR: React.FC = () => {
  const [option, setOption] = useState<ECOption>();
  useEffect(() => {
    const optionRes = createLPROption(originOption);
    setOption(optionRes);
  }, []);
  return (
    <>
      <div className={S.content}>
        <LPRCOmponent option={option}></LPRCOmponent>
      </div>
    </>
  );
};

export default LPR;
