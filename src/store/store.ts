import { configureStore } from "@reduxjs/toolkit";
import date from "@/store/modules/tools/date";

const store = configureStore({
  reducer: {
    date,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
