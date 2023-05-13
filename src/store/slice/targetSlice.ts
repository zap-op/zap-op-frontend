import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TTarget } from "../../submodules/utility/model";

type TTargetState = {
	listTarget: TTarget[];
	listSelectedTarget: TTarget["_id"][];
};

const initialState: TTargetState = {
	listTarget: [],
	listSelectedTarget: [],
};

const targetSlice = createSlice({
	name: "targetStorge",
	initialState,
	reducers: {
		addSelectTarget: ({ listSelectedTarget }, action: PayloadAction<TTarget["_id"]>) => {
			if (listSelectedTarget.includes(action.payload)) {
				return;
			}
			listSelectedTarget.push(action.payload);
		},
		removeSelectTarget: ({ listSelectedTarget }, action: PayloadAction<TTarget["_id"]>) => {
			const indexToRemove = listSelectedTarget.indexOf(action.payload);
			if (indexToRemove !== -1) {
				listSelectedTarget.splice(indexToRemove, 1);
			}
		},
		clearSelectTarget: ({ listSelectedTarget }) => {
			listSelectedTarget = [];
		},
	},
	extraReducers: (builder) => {},
});

export default targetSlice;
export const {
	addSelectTarget, //
	removeSelectTarget,
	clearSelectTarget,
} = targetSlice.actions;
