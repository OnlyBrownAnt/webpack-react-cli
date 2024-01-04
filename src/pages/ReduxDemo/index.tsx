import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addByNumber, addByNumberAsync } from '@/store/modules/counter/counterSlice'
import S from './index.module.less';

const ReduxDemo: React.FC = () => {
    const counter = useSelector((state) => state.counter.value);
    console.log(counter);
    const dispatch = useDispatch();

    const add = () => {
        dispatch(addByNumber(1))
    }
    const addSync = () => {
        dispatch(addByNumberAsync(1))
    }
    return (<>
        <div className={S.number}>{counter}</div>
        <button onClick={add}>加一</button>
        <button onClick={addSync}>加一(异步)</button>
    </>)
}

export default ReduxDemo;