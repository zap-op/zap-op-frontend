import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: "authentication",
    initialState: {
        isAuth: false,
        token: null,
        tokenExpiration: null
    },
    reducers: {

    }
})

export default authSlice;
export const {

} = authSlice.actions;