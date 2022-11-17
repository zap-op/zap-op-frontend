import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import scanSlice from './slice/scanSlice';
import describablePortalSlice from './slice/toolkit/describablePortalSlice';

const reducers = {
    auth: authSlice.reducer,
    scan: scanSlice.reducer,
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
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
export default store;