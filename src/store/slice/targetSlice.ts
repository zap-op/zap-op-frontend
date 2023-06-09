import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ScanType } from "../../utils/types";
import { TTargetModel } from "../../utils/types";
import targetApi from "../services/targetApi";

type TSelectedTarget = Pick<TTargetModel, "_id" | "name">;

type TTargetState = {
	listSelectedTarget: TSelectedTarget[];
	listSelectedScanOption: ScanType[];
	listTargetTag: string[];
};

const initialState: TTargetState = {
	listSelectedTarget: [],
	listSelectedScanOption: [],
	listTargetTag: [],
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
			const indexToRemove = listSelectedTarget.map((item) => item._id).indexOf(action.payload._id);
			if (indexToRemove !== -1) {
				listSelectedTarget.splice(indexToRemove, 1);
			}
		},
		clearSelectTarget: ({ listSelectedTarget }) => {
			listSelectedTarget.length = 0;
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
			listSelectedScanOption.length = 0;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(targetApi.endpoints.getTarget.matchFulfilled, (state, action) => {
			const setTag = new Set<string>();
			action.payload.forEach((target) => {
				target.tag?.forEach((tag) => {
					setTag.add(tag);
				});
			});
			return {
				...state,
				listTargetTag: Array.from(setTag),
			};
		});
	},
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
