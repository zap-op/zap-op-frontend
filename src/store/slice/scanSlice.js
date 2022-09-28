import { createSlice } from '@reduxjs/toolkit'

const scanSlice = createSlice({
    name: "scan-storage",
    initialState: {
        isScanning: false,
        scanProgressDisplay: 0,
        scanInfosDisplay: []
    },
    reducers: {
        concatScanInfosDisplay: (state, action) => {
            state.scanInfosDisplay = state.scanInfosDisplay.concat(action.payload.listUrl);
        },
        clearScanInfosDisplay: (state) => {
            state.scanInfosDisplay = [];
        },
        updateScanProgressDisplay: (state, action) => {
            state.scanProgressDisplay = action.payload.scanProgress;
        },
        resetScanProgressDisplay: (state) => {
            state.scanProgressDisplay = 0;
        },
    }
})

export default scanSlice;
export const {
    concatScanInfosDisplay,
    clearScanInfosDisplay,
    updateScanProgressDisplay,
    resetScanProgressDisplay,
} = scanSlice.actions;