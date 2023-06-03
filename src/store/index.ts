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

import authApi from "./services/authApi";
import trialScanApi from "./services/trialScanApi";
import authScanApi from "./services/authScanApi";
import targetApi from "./services/targetApi";
import scanSessionApi from "./services/scanSessionApi";

const reducers = {
	auth: authSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	scan: scanSlice.reducer,
	[trialScanApi.reducerPath]: trialScanApi.reducer,
	[authScanApi.reducerPath]: authScanApi.reducer,
	target: targetSlice.reducer,
	[targetApi.reducerPath]: targetApi.reducer,
	[scanSessionApi.reducerPath]: scanSessionApi.reducer,
	// Tookit
	describablePortal: describablePortalSlice.reducer,
};

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			authApi.middleware, //
			trialScanApi.middleware,
			authScanApi.middleware,
			targetApi.middleware,
			scanSessionApi.middleware,
		]),
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

export * from "./services/authApi";
export * from "./services/trialScanApi";
export * from "./services/authScanApi";
export * from "./services/targetApi";
export * from "./services/scanSessionApi";
export {
	authApi, //
	trialScanApi,
	authScanApi,
	targetApi,
	scanSessionApi,
};
