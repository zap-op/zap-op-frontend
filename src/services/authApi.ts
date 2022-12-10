import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GoogleCredentialResponse } from "../components/auth-google-button/auth-google-button";
import authSlice from "../store/slice/authSlice";
import { TStatusResponse } from "../submodules/utility/status";
import { TOKEN_TYPE } from "../submodules/utility/token";
import api from "./api";

const authApi = createApi({
    reducerPath: `${authSlice.name}Api`,
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
                document.cookie = `${TOKEN_TYPE.GOOGLE}=${_arg}`;
            },
        })
    }),
});

export const { useLoginMutation } = authApi;
export default authApi;