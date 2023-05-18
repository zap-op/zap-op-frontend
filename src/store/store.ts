import { configureStore } from "@reduxjs/toolkit";
import {
	TypedUseSelectorHook, //
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
} from "react-redux";

import authSlice from "./slice/authSlice";
import scanSlice from "./slice/scanSlice";
import targetSlice from "./slice/targetSlice";
import describablePortalSlice from "./slice/toolkit/describablePortalSlice";

import authApi from "../services/authApi";
import scanApi from "../services/scanApi";
import targetApi from "../services/targetApi";

const reducers = {
	auth: authSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	scan: scanSlice.reducer,
	[scanApi.reducerPath]: scanApi.reducer,
	target: targetSlice.reducer,
	[targetApi.reducerPath]: targetApi.reducer,
	// Tookit
	describablePortal: describablePortalSlice.reducer,
};

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, scanApi.middleware, targetApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export default store;

export const useDispatch = () => useReduxDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export * from "./slice/authSlice";
export * from "./slice/scanSlice";
export * from "./slice/targetSlice";
export * from "./slice/toolkit/describablePortalSlice";

export * from "../services/authApi";
export * from "../services/scanApi";
export * from "../services/targetApi";
export {
	authApi, //
	scanApi,
	targetApi,
};
