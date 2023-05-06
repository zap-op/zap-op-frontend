import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import scanApi from "../../services/scanApi";
import { TStatusResponse } from "../../submodules/utility/status";

type TScanState = {
	isScanProgressing: boolean;
	scanProgressDisplay?: number;
	scanInfosDisplay: string[];
	scanError?: TStatusResponse;
};

const initialState: TScanState = {
	isScanProgressing: false,
	scanProgressDisplay: undefined,
	scanInfosDisplay: [],
	scanError: undefined,
};

const scanSlice = createSlice({
	name: "scanStorage",
	initialState,
	reducers: {
		setStatusScanProgress: (
			state,
			action: PayloadAction<{
				status: TScanState["isScanProgressing"];
			}>,
		) => {
			state.isScanProgressing = action.payload.status;
		},
		updateScanProgressDisplay: (
			state,
			action: PayloadAction<{
				scanProgress: TScanState["scanProgressDisplay"];
			}>,
		) => {
			state.scanProgressDisplay = action.payload.scanProgress;
		},
		resetScanDisplay: () => {
			return {
				isScanProgressing: false,
				scanProgressDisplay: undefined,
				scanInfosDisplay: [],
				scanError: undefined,
			} as TScanState;
		},
		setScanError: (
			state,
			action: PayloadAction<{
				scanError: TStatusResponse;
			}>,
		) => {
			state.scanError = action.payload.scanError;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(scanApi.endpoints.getResultsByOffset.matchFulfilled, (state, action) => {
			const dif = action.payload.filter((item) => !state.scanInfosDisplay.includes(item));
			state.scanInfosDisplay = state.scanInfosDisplay.concat(dif);
		});
	},
});

export default scanSlice;
export const { setStatusScanProgress, updateScanProgressDisplay, resetScanDisplay, setScanError } = scanSlice.actions;
