import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ScanType } from "../../utils/settings";
import { TTarget, TTargetModel } from "../../utils/types";

type TTargetState = {
	listTarget: TTarget[];
	listSelectedTarget: TTargetModel["_id"][];
	listSelectedScanOption: ScanType[];
};

const initialState: TTargetState = {
	listTarget: [],
	listSelectedTarget: [],
	listSelectedScanOption: [],
};

const targetSlice = createSlice({
	name: "targetStorge",
	initialState,
	reducers: {
		addSelectTarget: ({ listSelectedTarget }, action: PayloadAction<TTargetModel["_id"]>) => {
			if (listSelectedTarget.includes(action.payload)) {
				return;
			}
			listSelectedTarget.push(action.payload);
		},
		removeSelectTarget: ({ listSelectedTarget }, action: PayloadAction<TTargetModel["_id"]>) => {
			const indexToRemove = listSelectedTarget.indexOf(action.payload);
			if (indexToRemove !== -1) {
				listSelectedTarget.splice(indexToRemove, 1);
			}
		},
		clearSelectTarget: ({ listSelectedTarget }) => {
			listSelectedTarget = [];
		},
		addScanOption: ({ listSelectedScanOption }, action: PayloadAction<ScanType>) => {
			if (listSelectedScanOption.includes(action.payload)) {
				return;
			}
			listSelectedScanOption.push(action.payload);
		},
		removeScanOption: ({ listSelectedScanOption }, action: PayloadAction<ScanType>) => {
			const indexToRemove = listSelectedScanOption.indexOf(action.payload);
			if (indexToRemove !== -1) {
				listSelectedScanOption.splice(indexToRemove, 1);
			}
		},
		clearScanOption: ({ listSelectedScanOption }) => {
			listSelectedScanOption = [];
		},
	},
	extraReducers: (builder) => {},
});

export default targetSlice;
export const {
	addSelectTarget, //
	removeSelectTarget,
	clearSelectTarget,
	addScanOption,
	removeScanOption,
	clearScanOption
} = targetSlice.actions;
