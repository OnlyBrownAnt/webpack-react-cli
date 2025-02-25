import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/store/store";

export type DateChangeTime = {
  changeTime: number;
  date: string;
};

const initialState: DateChangeTime = {
  changeTime: 0,
  date: new Date().toTimeString(),
};

const slice = createSlice({
  name: "date",
  initialState,
  reducers: {
    refreshDate: {
      reducer: (state, action: PayloadAction<DateChangeTime>) => {
        return {
          ...state,
          ...action.payload,
          changeTime: state.changeTime + 1,
        };
      },
      prepare: () => {
        return {
          payload: {
            date: new Date().toTimeString(),
          },
        };
      },
    },
  },
});

export const { refreshDate } = slice.actions;

export const refreshDateAsync = () => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    console.log("loading...");
    setTimeout(() => {
      dispatch(refreshDate());
      console.log("loading over");
    }, 2000);
  };
};

export default slice.reducer;
