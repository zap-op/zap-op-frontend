import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/cookieMgr";
import { parseJwt } from "../../utils/tokenMgr";
import authApi from "../services/authApi";
import {
	LOGIN_STATUS, //
	UserTokenData,
	TStatusResponse,
} from "../../utils/types";

type TAuthState = {
	isAuth: boolean;
	userId?: UserTokenData["userId"];
	email?: UserTokenData["email"];
	picture?: UserTokenData["picture"];
	name?: UserTokenData["name"];
	familyName?: UserTokenData["familyName"];
	givenName?: UserTokenData["givenName"];
	errorMessage?: string;
};

const initialState: TAuthState = {
	isAuth: false,
	userId: undefined,
	email: undefined,
	picture: undefined,
	name: undefined,
	familyName: undefined,
	givenName: undefined,
	errorMessage: undefined,
};

const authSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		clearState: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
			const token = getCookie("accessToken");
			if (!token) {
				state.errorMessage = LOGIN_STATUS.TOKEN_INVALID["msg"];
				return;
			}
			const userInfo = parseJwt<UserTokenData>(token);
			if (!userInfo.userId) {
				state.errorMessage = LOGIN_STATUS.TOKEN_INVALID["msg"];
				return;
			}
			state.isAuth = true;
			state.userId = userInfo.userId;
			state.email = userInfo.email;
			state.picture = userInfo.picture;
			state.name = userInfo.name;
			state.familyName = userInfo.familyName;
			state.givenName = userInfo.givenName;
		});
		builder.addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
			if (!action.payload || !action.payload.data) {
				state.errorMessage = "Something went wrong!";
				return;
			}
			state.errorMessage = (action.payload.data as TStatusResponse).msg;
		});
	},
});

export default authSlice;
export const { clearState } = authSlice.actions;
