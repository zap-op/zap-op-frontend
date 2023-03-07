import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import scanSlice from "../store/slice/scanSlice";
import api from "./api";

const scanApi = createApi({
	reducerPath: `${scanSlice.name}Api`,
	baseQuery: fetchBaseQuery({
		baseUrl: api.defaults.baseURL + "/scan",
	}),
	endpoints: (builder) => ({
		getResultsByOffset: builder.mutation<string[], { id: string; offset: number }>({
			query: (arg) => {
				const { id, offset } = arg;
				return {
					url: `trial/results?id=${id}&offset=${offset}`,
					method: "GET",
				};
			},
		}),
	}),
});

export const { useGetResultsByOffsetMutation } = scanApi;
export default scanApi;
