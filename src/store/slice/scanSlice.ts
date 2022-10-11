import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ScanState = {
    isStartScanProgress: boolean,
    scanProgressDisplay: number,
    scanInfosDisplay: string[],
}

const initialState: ScanState = {
    isStartScanProgress: false,
    scanProgressDisplay: 0,
    scanInfosDisplay: [],
}

const scanSlice = createSlice({
    name: "scan-storage",
    initialState,
    reducers: {
        startScanProgress: (state) => {
            state.isStartScanProgress = true;
        },
        endScanProgress: (state) => {
            state.isStartScanProgress = false;
        },
        concatScanInfosDisplay: (state, action: PayloadAction<{
            listUrl: typeof initialState.scanInfosDisplay,
        }>) => {
            state.scanInfosDisplay = state.scanInfosDisplay.concat(action.payload.listUrl);
        },
        clearScanInfosDisplay: (state) => {
            state.scanInfosDisplay = [];
        },
        updateScanProgressDisplay: (state, action: PayloadAction<{
            scanProgress: typeof initialState.scanProgressDisplay,
        }>) => {
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