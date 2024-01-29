import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    addByNumber: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 导出 action
export const addByNumberAsync: any = (num) => (dispatch) => {
  setTimeout(() => {
    dispatch(addByNumber(num));
  }, 3000);
};

// 导出 actions
export const { addByNumber } = counterSlice.actions;

// 导出 reducer
export default counterSlice.reducer;
