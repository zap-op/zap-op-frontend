import { createSlice } from "@reduxjs/toolkit";
import authApi from "../../services/authApi";
import { LOGIN_STATUS, TStatusResponse } from "../../submodules/utility/status";
import { UserTokenData } from "../../submodules/utility/user";
import { getCookie } from "../../utils/cookieMgr";
import { parseJwt } from "../../utils/tokenMgr";

type TAuthState = {
	isAuth: boolean;
	userId: UserTokenData["userId"] | undefined;
	email: UserTokenData["email"] | undefined;
	picture: UserTokenData["picture"] | undefined;
	name: UserTokenData["name"] | undefined;
	familyName: UserTokenData["familyName"] | undefined;
	givenName: UserTokenData["givenName"] | undefined;
	errorMessage: string | undefined;
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
			console.log(("state.isAuth", state.isAuth));
			state.userId = userInfo.userId;
			state.email = userInfo.email;
			state.picture = userInfo.picture;
			state.name = userInfo.name;
			state.familyName = userInfo.familyName;
			state.givenName = userInfo.givenName;
			console.log("login.matchFulfilled");
		});
		builder.addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
			console.log("login.matchRejected");
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
