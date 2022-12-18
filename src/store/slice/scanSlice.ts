import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import scanApi from '../../services/scanApi';

type TScanState = {
    isScanProgressing: boolean,
    scanProgressDisplay?: number,
    scanInfosDisplay: string[],
}

const initialState: TScanState = {
    isScanProgressing: false,
    scanProgressDisplay: undefined,
    scanInfosDisplay: [],
}

const scanSlice = createSlice({
    name: "scanStorage",
    initialState,
    reducers: {
        setStatusScanProgress: (state, action: PayloadAction<{
            status: TScanState["isScanProgressing"],
        }>) => {
            state.isScanProgressing = action.payload.status;
        },
        updateScanProgressDisplay: (state, action: PayloadAction<{
            scanProgress: TScanState["scanProgressDisplay"],
        }>) => {
            state.scanProgressDisplay = action.payload.scanProgress;
        },
        resetScanDisplay: (state) => {
            state = initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            scanApi.endpoints.getResultsByOffset.matchFulfilled,
            (state, action) => {
                const dif = action.payload.filter((item) => !state.scanInfosDisplay.includes(item));
                state.scanInfosDisplay = state.scanInfosDisplay.concat(dif);
            }
        )
    }
})

export default scanSlice;
export const {
    setStatusScanProgress,
    updateScanProgressDisplay,
    resetScanDisplay,
} = scanSlice.actions;