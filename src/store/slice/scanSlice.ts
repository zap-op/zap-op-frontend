import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TScanSession } from "../../utils/types";

export type TScanState = {
	trial: Pick<TScanSession, "url">;
};

const initialState: TScanState = {
	trial: {
		url: "",
	},
};

const scanSlice = createSlice({
	name: "scanStorage",
	initialState,
	reducers: {
		setTrial: ({ trial }, action: PayloadAction<TScanState["trial"]>) => {
			trial.url = action.payload.url;
		},
		cleanTrial: ({ trial }) => {
			trial = {
				url: "",
			};
		},
	},
	extraReducers: (builder) => {},
});

export default scanSlice;
export const { setTrial, cleanTrial } = scanSlice.actions;
