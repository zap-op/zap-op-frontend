import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GoogleCredentialResponse } from "../components/buttons/auth-google-button";
import { TStatusResponse } from "../submodules/utility/status";
import { TOKEN_TYPE } from "../submodules/utility/token";
import api from "./api";

const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({
		baseUrl: api.defaults.baseURL,
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
