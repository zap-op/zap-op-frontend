import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TDescribablePortalState = {
	isDescribing: boolean;
	describeInfo:
		| undefined
		| {
				offset: {
					top: number;
					left: number;
				};
				title: string;
		  };
};

const initialState: TDescribablePortalState = {
	isDescribing: false,
	describeInfo: undefined,
};

const describablePortalSlice = createSlice({
	name: "describablePortal",
	initialState,
	reducers: {
		setDescribeInfo: (
			state,
			action: PayloadAction<{
				describeInfo: TDescribablePortalState["describeInfo"];
			}>,
		) => {
			state.describeInfo = action.payload.describeInfo;
			state.isDescribing = action.payload.describeInfo !== undefined;
		},
	},
});

export default describablePortalSlice;
export const { setDescribeInfo } = describablePortalSlice.actions;
