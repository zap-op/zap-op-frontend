import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TScanSession, TTargetModel } from "../../utils/types";
import authScanApi from "../services/authScanApi";

export type TScanState = {
	trial: Pick<TScanSession, "url">;
	authed: {
		listSpiderTargetId: TTargetModel["_id"][];
	};
};

const initialState: TScanState = {
	trial: {
		url: "",
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
			trial.url = action.payload.url;
		},
		cleanTrial: ({ trial }) => {
			trial = {
				url: "",
			};
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(authScanApi.endpoints.spiderScan.matchFulfilled, ({ authed: { listSpiderTargetId } }, action) => {
			console.log("authScanApi.endpoints.spiderScan.matchFulfilled");
			console.log(action);
		});
	},
});

export default scanSlice;
export const { setTrial, cleanTrial } = scanSlice.actions;
