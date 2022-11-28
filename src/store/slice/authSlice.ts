import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TAuthState = {
    isAuth: boolean,
    ggCredentials: string | undefined,
    accessToken: string | undefined,
    refreshToken: string | undefined,
    errorMessage: string | undefined,
}

const initialState: TAuthState = {
    isAuth: false,
    ggCredentials: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    errorMessage: undefined,
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