import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import scanSlice from './slice/scanSlice';
import toolkitSlice, { setDescribeElement } from './slice/toolkitSlice';

const reducers = {
    auth: authSlice.reducer,
    scan: scanSlice.reducer,
    toolkit: toolkitSlice.reducer,
}

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["toolkit/setDescribeElement"],
                ignoreState: true,
            }
        }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
export default store;