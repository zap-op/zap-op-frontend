import { createSlice } from '@reduxjs/toolkit'

const scanSlice = createSlice({
    name: "scan-storage",
    initialState: {
        isScanning: false,
        scanInfosDisplay: []
    },
    reducers: {
        concatScanInfosDisplay: (state, action) => {
            state.scanInfosDisplay = state.scanInfosDisplay.concat(action.payload.listUrl);
        },
        clearScanInfosDisplay: (state, action) => {
            state.scanInfosDisplay = [];
        },
    }
})

export default scanSlice;
export const {
    concatScanInfosDisplay,
    clearScanInfosDisplay,
} = scanSlice.actions;