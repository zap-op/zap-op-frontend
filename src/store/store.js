import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import scanSlice from './slice/scanSlice';

const reducers = {
    auth: authSlice.reducer,
    scan: scanSlice.reducer
}

const store = () => {
    return configureStore({
        reducer: reducers
    })
}

export default store;