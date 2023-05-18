import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/service";
import { getCookie } from "../../utils/cookieMgr";
import { parseJwt } from "../../utils/tokenMgr";
import { LOGIN_STATUS, TStatusResponse, UserTokenData } from "../../utils/types";

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
	reducers: {},
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
				console.log(action);
				state.errorMessage = "Something went wrong!";
				return;
			}
			state.errorMessage = (action.payload.data as TStatusResponse).msg;
		});
	},
});

export default authSlice;
export const {} = authSlice.actions;
