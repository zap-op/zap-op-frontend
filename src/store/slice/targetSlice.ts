import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ScanType } from "../../utils/settings";
import { TTargetModel } from "../../utils/types";

type TSelectedTarget = Pick<TTargetModel, "_id" | "name">;

type TTargetState = {
	listSelectedTarget: TSelectedTarget[];
	listSelectedScanOption: ScanType[];
};

const initialState: TTargetState = {
	listSelectedTarget: [],
	listSelectedScanOption: [],
};

const targetSlice = createSlice({
	name: "targetStorge",
	initialState,
	reducers: {
		addSelectTarget: ({ listSelectedTarget }, action: PayloadAction<TSelectedTarget>) => {
			if (listSelectedTarget.includes(action.payload)) {
				return;
			}
			listSelectedTarget.push(action.payload);
		},
		removeSelectTarget: ({ listSelectedTarget }, action: PayloadAction<TSelectedTarget>) => {
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
	clearScanOption,
} = targetSlice.actions;
