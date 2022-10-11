import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import scanSlice from './slice/scanSlice';

const reducers = {
    auth: authSlice.reducer,
    scan: scanSlice.reducer
}

const store = configureStore({
    reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
export default store;