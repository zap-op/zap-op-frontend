import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GoogleCredentialResponse } from "../components/Buttons/AuthGoogleButton";
import { TStatusResponse, TOKEN_TYPE } from "../utils/types";
import { BaseURL } from "../utils/urlMgr";

const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: BaseURL,
		credentials: "include",
	}),
	endpoints: (builder) => ({
		login: builder.mutation<TStatusResponse, GoogleCredentialResponse["credential"]>({
			query: () => ({
				url: "login",
				method: "POST",
			}),
			onQueryStarted: (_arg) => {
				document.cookie = `${TOKEN_TYPE.GOOGLE}=${_arg};domain=${window.location.hostname}`;
			},
		}),
	}),
});

export const { useLoginMutation } = authApi;
export default authApi;
