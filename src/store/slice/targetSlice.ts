import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TTargetModel, TZapActiveScanConfig, TZapAjaxScanConfig, TZapPassiveScanConfig, TZapSpiderScanConfig } from "../../utils/types";
import targetApi from "../services/targetApi";

type TSelectedTarget = Pick<TTargetModel, "_id" | "name">;

type TScanOption = {
	spider: boolean;
	ajax: boolean;
	passive: {
		checked: boolean;
		spider: boolean;
		ajax: boolean;
	};
	active: {
		checked: boolean;
		spider: boolean;
		ajax: boolean;
	};
};

type TScanConfig = {
	spider: TZapSpiderScanConfig["scanConfig"];
	ajax: TZapAjaxScanConfig["scanConfig"];
	passive: Pick<TZapPassiveScanConfig, "spiderConfig" | "ajaxConfig">;
	active: Pick<TZapActiveScanConfig, "spiderConfig" | "ajaxConfig" | "scanConfig">;
};

type TTargetState = {
	listSelectedTarget: TSelectedTarget[];
	scanOption: TScanOption;
	scanConfig: TScanConfig;
	listTargetTag: string[];
};

const initialState: TTargetState = {
	listSelectedTarget: [],
	scanOption: {
		spider: false,
		ajax: false,
		passive: {
			checked: false,
			spider: true,
			ajax: false,
		},
		active: {
			checked: false,
			spider: true,
			ajax: false,
		},
	},
	scanConfig: {
		spider: {},
		ajax: {},
		passive: {},
		active: {
			scanConfig: {},
		},
	},
	listTargetTag: [],
};

const targetSlice = createSlice({
	name: "targetStorge",
	initialState,
	reducers: {
		addSelectTarget: (state, action: PayloadAction<TSelectedTarget>) => {
			if (state.listSelectedTarget.includes(action.payload)) {
				return;
			}
			state.listSelectedTarget.push(action.payload);
		},
		removeSelectTarget: (state, action: PayloadAction<TSelectedTarget>) => {
			const indexToRemove = state.listSelectedTarget.map((item) => item._id).indexOf(action.payload._id);
			if (indexToRemove !== -1) {
				state.listSelectedTarget.splice(indexToRemove, 1);
			}
		},
		clearSelectTarget: (state) => {
			state.listSelectedTarget.length = 0;
		},
		updateScanOption: (state, action: PayloadAction<TTargetState["scanOption"]>) => {
			state.scanOption = {
				...action.payload,
			};
		},
		clearScanOption: (state) => {
			state.scanOption = {
				...initialState.scanOption,
			};
		},
		updateScanConfig: (state, action: PayloadAction<TTargetState["scanConfig"]>) => {
			state.scanConfig = {
				...action.payload,
			};
		},
		clearScanConfig: (state) => {
			state.scanConfig = {
				...initialState.scanConfig,
			};
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
	updateScanOption,
	clearScanOption,
	updateScanConfig,
	clearScanConfig,
} = targetSlice.actions;
