import React from "react";
import S from "@/pages/reduxDemo/ReduxDemo.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DateChangeTime,
  refreshDate,
  refreshDateAsync,
} from "@/store/modules/tools/date";
import { RootState } from "@/store/store";
const ReduxDemo: React.FC = () => {
  const date: DateChangeTime = useSelector((state: RootState) => state.date);
  const dispatch = useDispatch();
  return (
    <div className={S.title}>
      <div className={S.date}>
        {date.changeTime}
        <br />
        {date.date}
      </div>
      <div
        className={S.changeBtn}
        onClick={() => {
          dispatch(refreshDate());
        }}
      >
        change
      </div>
      <div
        className={S.changeBtn}
        onClick={() => {
          dispatch(refreshDateAsync());
        }}
      >
        change async
      </div>
    </div>
  );
};

export default ReduxDemo;
