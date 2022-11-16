import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TDescribablePortalState = {
    isDescribing: boolean,
    describeElement: JSX.Element | undefined,
}

const initialState: TDescribablePortalState = {
    isDescribing: false,
    describeElement: undefined,
}

const describablePortalSlice = createSlice({
    name: "describablePortal",
    initialState,
    reducers: {
        setDescribeElement: (state, action: PayloadAction<{
            describeElement: TDescribablePortalState["describeElement"],
        }>) => {
            state.describeElement = action.payload.describeElement;
            state.isDescribing = (state.describeElement !== undefined);
        },
    },
})

export default describablePortalSlice;
export const {
    setDescribeElement,
} = describablePortalSlice.actions;