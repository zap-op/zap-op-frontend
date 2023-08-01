import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTargetModel } from "../../utils/types";

export type TScanState = {
	trial: Pick<TTargetModel, "target">;
	authed: {
		listSpiderTargetId: TTargetModel["_id"][];
	};
};

const initialState: TScanState = {
	trial: {
		target: "",
	},
	authed: {
		listSpiderTargetId: [],
	},
};

const scanSlice = createSlice({
	name: "scanStorage",
	initialState,
	reducers: {
		setTrial: ({ trial }, action: PayloadAction<TScanState["trial"]>) => {
			trial.target = action.payload.target;
		},
		cleanTrial: ({ trial }) => {
			trial = {
				target: "",
			};
		},
	},
	extraReducers: (builder) => {},
});

export default scanSlice;
export const { setTrial, cleanTrial } = scanSlice.actions;
