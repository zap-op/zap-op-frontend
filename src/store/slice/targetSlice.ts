import { createSlice } from "@reduxjs/toolkit"
import targetApi from "../../services/targetApi"

export type TTarget = {
    userId: string,
    name: string,
    target: string,
    tag: string[],
}

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