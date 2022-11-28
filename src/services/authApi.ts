import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GoogleCredentialResponse } from "../components/auth-google-button/auth-google";
import authSlice from "../store/slice/authSlice";
import api from "./api";

const authApi = createApi({
    reducerPath: `${authSlice.name}Api`,
    baseQuery: fetchBaseQuery({
        baseUrl: api.defaults.baseURL,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        login: builder.mutation<{ statusCode: number, msg: string }, GoogleCredentialResponse["credential"]>({
            query: () => ({
                url: "login",
                method: "POST",
            }),
            onQueryStarted: (_arg) => {
                document.cookie = `ggToken=${_arg}`;
            },
        })
    }),
});

export const { useLoginMutation } = authApi;
export default authApi;