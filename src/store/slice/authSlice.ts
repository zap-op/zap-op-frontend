import { createSlice } from '@reduxjs/toolkit'
import authApi from '../../services/authApi'

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
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
            state = initialState;
        })
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, action) => {
                state.isAuth = true;
                window.location.pathname = "/app";
            })
        builder.addMatcher(
            authApi.endpoints.login.matchRejected,
            (state, action) => {
                if (!action.payload || !action.payload.data) {
                    console.log(action);
                    state.errorMessage = "Something went wrong!"
                    return;
                }
                state.errorMessage = (<{
                    statusCode: number,
                    msg: string
                }>action.payload.data).msg;
            })
    },
})

export default authSlice;
export const {
} = authSlice.actions;