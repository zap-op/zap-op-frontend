import { createSlice } from "@reduxjs/toolkit"
import { TTarget } from "../../submodules/utility/model"

type TTargetState = {
    listTarget: TTarget[],
}

const initialState: TTargetState = {
    listTarget: [],
}

const targetSlice = createSlice({
    name: "targetStorge",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
    }
})

export default targetSlice;
export const {

} = targetSlice.reducer;