import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL } from "../utils/urlMgr";
import urlJoin from "url-join";

const _URL = urlJoin(BaseURL, "scan");

const scanApi = createApi({
	reducerPath: "scanApi",
	baseQuery: fetchBaseQuery({
		baseUrl: _URL,
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
