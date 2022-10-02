import { configureStore, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "authentication",
    initialState: {
        isAuth: false,
        token: null,
        tokenExpiration: null
    },
    reducers: {

    }
})

const scanSlice = createSlice({
    name: "scan-storage",
    initialState: {
        isScanning: false
    },
    reducers: {

    }
})

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
