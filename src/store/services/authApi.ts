import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL } from "../../utils/urlMgr";
import {
	TStatusResponse, //
	TOKEN_TYPE,
	TGoogleCredentialResponse,
} from "../../utils/types";

const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: BaseURL,
		credentials: "include",
	}),
	endpoints: (builder) => ({
		login: builder.mutation<TStatusResponse, TGoogleCredentialResponse["credential"]>({
			query: () => ({
				url: "login",
				method: "POST",
			}),
			onQueryStarted: (_arg) => {
				document.cookie = `${TOKEN_TYPE.GOOGLE}=${_arg};domain=${window.location.hostname}`;
			},
		}),
		logout: builder.mutation<TStatusResponse, void>({
			query: () => ({
				url: "logout",
				method: "POST",
			}),
		}),
		refreshCredentials: builder.mutation<TStatusResponse, void>({
			query: () => ({
				url: "refreshToken",
				method: "POST",
			}),
		}),
	}),
});

export const {
	useLoginMutation, //
	useRefreshCredentialsMutation,
	useLogoutMutation,
} = authApi;
export default authApi;
