import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import targetSlice from "../store/slice/targetSlice";
import { TAG_TARGET, TTarget } from "../submodules/utility/model";
import api from "./api";

const targetApi = createApi({
    reducerPath: `${targetSlice.name}Api`,
    baseQuery: fetchBaseQuery({
        baseUrl: api.defaults.baseURL + "/management",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        addTarget: builder.mutation<void, TTarget>({
            query: (target) => ({
                url: "target",
                method: "POST",
                body: target,
            })
        })
    })
})

export const { useAddTargetMutation } = targetApi;
export default targetApi;