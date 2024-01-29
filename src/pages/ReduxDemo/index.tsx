import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addByNumber,
  addByNumberAsync,
} from "@/store/modules/counter/counterSlice";
import S from "./index.module.less";
import { useNavigate } from "react-router-dom";

const ReduxDemo: React.FC = () => {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [counterState, setCounterState] = useState(0);
  const add = () => {
    dispatch(addByNumber(1));
    setCounterState((state) => state + 1);
  };
  const addSync = () => {
    dispatch(addByNumberAsync(1));
    setCounterState((state) => state + 1);
  };

  const navigate = useNavigate();
  return (
    <>
      <div className={S.number}>Redux {counter}</div>
      <div className={S.number}>React State {counterState}</div>
      <button onClick={add}>加一</button>
      <button onClick={addSync}>加一(异步)</button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back Page
      </button>
      <button
        onClick={() => {
          navigate("/css-module");
        }}
      >
        css-module
      </button>
    </>
  );
};

export default ReduxDemo;
