import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../services";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,

    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add the API middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = (selector: (state: RootState) => any) =>
  useSelector(selector);

export default store;
