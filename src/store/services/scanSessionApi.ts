import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL } from "../../utils/urlMgr";
import urlJoin from "url-join";
import { SCAN_SESSION_TAG } from "../../utils/settings";
import {
	TMgmtScanSessionsResponse,
	TScanSession, //
} from "../../utils/types";

const _URL = urlJoin(BaseURL, "management");

const scanSessionApi = createApi({
	reducerPath: "scanSessionApi",
	baseQuery: fetchBaseQuery({
		baseUrl: _URL,
		credentials: "include",
	}),
	tagTypes: [SCAN_SESSION_TAG],
	endpoints: (builder) => ({
		getScanSession: builder.query<TMgmtScanSessionsResponse, void>({
			query: () => ({
				url: "scanSessions",
				method: "GET",
			}),
			providesTags: [SCAN_SESSION_TAG],
		}),
	}),
});

export const { useGetScanSessionQuery } = scanSessionApi;
export default scanSessionApi;
