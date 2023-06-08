import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import urlJoin from "url-join";
import { BaseURL } from "../../utils/urlMgr";
import { _assertCast } from "../../utils/helpers";
import { SCAN_SESSION_TAG } from "../../utils/settings";
import scanSessionApi from "./scanSessionApi";
import {
	TGET, //
	TPOST,
	SCAN_STATUS,
	TZapAjaxRequest,
	TStatusResponse,
	TZapAjaxResponse,
	TZapSpiderRequest,
	TZapSpiderResponse,
	TZapSpiderResultsGETResponse,
	TZapAjaxGETResponse,
	ScanState,
} from "../../utils/types";

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
		streamSpiderScan: builder.query<TZapSpiderResponse<TGET>, TZapSpiderRequest<TGET> & { scanState: ScanState }>({
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
			async onCacheEntryAdded({ scanSession, scanId, scanState }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
				const eventSource = new EventSource(urlJoin(_URL, `spider?scanSession=${scanSession}&scanId=${scanId}`), {
					withCredentials: true,
				});
				try {
					await cacheDataLoaded;
					eventSource.addEventListener("status", (event: MessageEvent) => {
						const status = JSON.parse(event.data).status * 1;

						updateCachedData((draft) => {
							draft.progress = status;
						});

						fetch(urlJoin(_URL, `spider/results?id=${scanId}&offset=0`), {
							credentials: "include",
						})
							.then((result) => result.json())
							.then((resData) => {
								_assertCast<TZapSpiderResultsGETResponse>(resData);
								updateCachedData(({ data }) => {
									const nonDuplicateData = resData.filter((item) => !data.includes(item));
									data.push(...nonDuplicateData);
								});
							})
							.catch((error) => console.log(error));

						if (status === 100) {
							eventSource.close();
							updateCachedData((draft) => {
								draft.isScanning = false;
							});
						}
					});

					eventSource.onerror = (event: Event) => {
						console.log("onerror: ", event);
						if (event instanceof MessageEvent) {
							const data = JSON.parse(event.data) as TStatusResponse;
							updateCachedData((draft) => {
								draft.error = data;
							});
						} else {
							updateCachedData((draft) => {
								draft.error = SCAN_STATUS.ZAP_INTERNAL_ERROR;
							});
						}
						updateCachedData((draft) => {
							draft.isScanning = false;
						});
						eventSource.close();
					};
				} catch (error) {}
				await cacheEntryRemoved;
			},
		}),
		ajaxScan: builder.mutation<TZapAjaxResponse<TPOST>, TZapAjaxRequest<TPOST>>({
			query: (arg) => ({
				url: "ajax",
				method: "POST",
				body: arg,
			}),
			onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
				await queryFulfilled;
				dispatch(scanSessionApi.util.invalidateTags([SCAN_SESSION_TAG]));
			},
		}),
		streamAjaxScan: builder.query<TZapAjaxResponse<TGET>, TZapAjaxRequest<TGET> & { scanState: ScanState }>({
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
						progress: "initializing",
						data: [],
						error: {
							statusCode: NaN,
							msg: "",
						},
					},
				};
			},
			async onCacheEntryAdded({ scanSession, scanId, scanState }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
				await cacheDataLoaded;
				const eventSource = new EventSource(urlJoin(_URL, `ajax?scanSession=${scanSession}&zapClientId=${scanId}`), {
					withCredentials: true,
				});
				try {
					eventSource.addEventListener("status", (event: MessageEvent) => {
						const status:TZapAjaxGETResponse["progress"] = JSON.parse(event.data).status;
						updateCachedData((draft) => {
							draft.progress = status;
						});

						// fetch(urlJoin(_URL, `ajax/results?id=${scanId}&offset=0`), {
						// 	credentials: "include",
						// })
						// 	.then((result) => result.json())
						// 	.then((resData) => {
						// 		_assertCast<TZapSpiderResultsGETResponse>(resData);
						// 		updateCachedData(({ data }) => {
						// 			const nonDuplicateData = resData.filter((item) => !data.includes(item));
						// 			data.push(...nonDuplicateData);
						// 		});
						// 	})
						// 	.catch((error) => console.log(error));

						if (status === "stopped") {
							eventSource.close();
							updateCachedData((draft) => {
								draft.isScanning = false;
							});
						}
					});

					eventSource.onerror = (event: Event) => {
						console.log("onerror: ", event);
						if (event instanceof MessageEvent) {
							const data = JSON.parse(event.data) as TStatusResponse;
							updateCachedData((draft) => {
								draft.error = data;
							});
						} else {
							updateCachedData((draft) => {
								draft.error = SCAN_STATUS.ZAP_INTERNAL_ERROR;
							});
						}
						updateCachedData((draft) => {
							draft.isScanning = false;
						});
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
	useStreamSpiderScanQuery,
	useAjaxScanMutation,
	useStreamAjaxScanQuery,
} = authScanApi;
export default authScanApi;
