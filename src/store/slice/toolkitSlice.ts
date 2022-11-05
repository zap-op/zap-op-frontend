import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { startScanProgress } from "../slice/scanSlice";

type TToolkitState = {
    isDescribing: boolean,
    describeElement: JSX.Element | null,
}

const initialState: TToolkitState = {
    isDescribing: false,
    describeElement: null,
}

const toolkitSlice = createSlice({
    name: "toolkit",
    initialState,
    reducers: {
        setDescribeElement: (state, action: PayloadAction<{
            describeElement: TToolkitState["describeElement"],
        }>) => {
            state.describeElement = action.payload.describeElement;
            state.isDescribing = (state.describeElement !== null);
        },
    },
})

export default toolkitSlice;
export const {
    setDescribeElement,
} = toolkitSlice.actions;