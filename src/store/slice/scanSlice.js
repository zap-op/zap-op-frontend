import { createSlice } from '@reduxjs/toolkit'

const scanSlice = createSlice({
    name: "scan-storage",
    initialState: {
        isStartScanProgress: false,
        scanProgressDisplay: 0,
        scanInfosDisplay: []
    },
    reducers: {
        startScanProgress: (state) => {
            state.isStartScanProgress = true;
        },
        endScanProgress: (state) => {
            state.isStartScanProgress = false;
        },
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
        resetScanDisplay: (state) => {
            scanSlice.caseReducers.clearScanInfosDisplay(state);
            scanSlice.caseReducers.resetScanProgressDisplay(state);
        }
    }
})

export default scanSlice;
export const {
    startScanProgress,
    endScanProgress,
    concatScanInfosDisplay,
    clearScanInfosDisplay,
    updateScanProgressDisplay,
    resetScanProgressDisplay,
    resetScanDisplay,
} = scanSlice.actions;