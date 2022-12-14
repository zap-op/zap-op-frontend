import { configureStore } from '@reduxjs/toolkit';
import authApi from '../services/authApi';
import targetApi from '../services/targetApi';
import authSlice from './slice/authSlice';
import scanSlice from './slice/scanSlice';
import targetSlice from './slice/targetSlice';
import describablePortalSlice from './slice/toolkit/describablePortalSlice';

const reducers = {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    scan: scanSlice.reducer,
    target: targetSlice.reducer,
    [targetApi.reducerPath]: targetApi.reducer,
    // Tookit
    describablePortal: describablePortalSlice.reducer,
}

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["describe/setDescribeElement"],
                ignoreState: true,
            }
        }).concat([authApi.middleware, targetApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
export default store;