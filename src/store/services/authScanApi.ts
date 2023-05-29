import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import urlJoin from "url-join";
import { BaseURL } from "../../utils/urlMgr";
import { _assertCast } from "../../utils/helpers";
import {
	TPOST, //
	TZapSpiderRequest,
	TZapSpiderResponse,
} from "../../utils/types";
import { SCAN_SESSION_TAG } from "../../utils/settings";
import scanSessionApi from "./scanSessionApi";

const _URL = urlJoin(BaseURL, "scan", "zap");

const authScanApi = createApi({
	reducerPath: "authScanApi",
	baseQuery: fetchBaseQuery({
		baseUrl: _URL,
		credentials: "include",
	}),
	endpoints: (builder) => ({
		spiderScan: builder.mutation<TZapSpiderResponse<TPOST>, TZapSpiderRequest<TPOST>>({
			query: (arg) => ({
				url: "spider",
				method: "POST",
				body: arg,
			}),
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				await queryFulfilled;
				dispatch(scanSessionApi.util.invalidateTags([SCAN_SESSION_TAG]));
			},
		}),
		streamSpiderScan: builder.query<any, { scanSession: string; scanId: string }>({
			queryFn: (arg, {}) => {
				if (!arg) {
					return {
						error: {
							status: "FETCH_ERROR",
							error: "URL is empty!",
						},
					};
				}
				return {
					data: {
						isScanning: true,
						progress: 0,
						data: [],
						error: {
							statusCode: NaN,
							msg: "",
						},
					},
				};
			},

			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
				const eventSource = new EventSource(urlJoin(_URL, `spider?scanSession=${arg.scanSession}&scanId=${arg.scanId}`), {
					withCredentials: true,
				});
				try {
					await cacheDataLoaded;
					eventSource.onerror = (event: Event) => {
						console.log("onerror: ", event);
						eventSource.close();
					};
				} catch (error) {}
				await cacheEntryRemoved;
			},
		}),
	}),
});

export const {
	useSpiderScanMutation, //
	useLazyStreamSpiderScanQuery,
} = authScanApi;
export default authScanApi;
