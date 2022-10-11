import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
    isAuth: boolean,
    token: string | undefined,
    tokenExpiration: string | undefined,
}

const initialState: AuthState = {
    isAuth: false,
    token: undefined,
    tokenExpiration: undefined,
}

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {

    }
})

export default authSlice;
export const {

} = authSlice.actions;