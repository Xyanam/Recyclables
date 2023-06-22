import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ordersSlice from "./slices/ordersSlice";
import materialsSlice from "./slices/materialsSlice";
import receptionSlice from "./slices/receptionSlice";

export const store = configureStore({
  reducer: {
    orders: ordersSlice,
    materials: materialsSlice,
    reception: receptionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
