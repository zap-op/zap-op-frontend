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
	TZapAjaxFullResultsGETResponse,
	TZapAjaxFullResultGETRequest,
	TZapSpiderFullResultsGETResponse,
	TZapActiveRequest,
	TZapActiveResponse,
	TZapActiveFullResultsGETResponse,
	TZapActiveFullResultGETRequest,
	TZapPassiveFullResultsGETResponse,
	TZapPassiveFullResultGETRequest,
	TZapPassiveRequest,
	TZapPassiveResponse,
	TZapPassiveStreamStatusRaw,
	TZapAjaxStreamStatus,
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
						isScanning: false,
						progress: NaN,
						data: [],
						error: {
							statusCode: NaN,
							msg: "",
						},
					},
				};
			},
			async onCacheEntryAdded({ _id: sessionId, zapScanId, scanState }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
				await cacheDataLoaded;
				if (scanState !== ScanState.PROCESSING) {
					return;
				}
				updateCachedData((draft) => {
					draft.progress = 0;
					draft.isScanning = true;
				});
				const eventSource = new EventSource(urlJoin(_URL, `spider?scanSession=${sessionId}&zapScanId=${zapScanId}`), {
					withCredentials: true,
				});
				try {
					eventSource.addEventListener("status", (event: MessageEvent) => {
						const status = JSON.parse(event.data).status * 1;
						updateCachedData((draft) => {
							draft.progress = status;
						});

						if (status === 100) {
							eventSource.close();
							updateCachedData((draft) => {
								draft.isScanning = false;
							});
							dispatch(scanSessionApi.util.invalidateTags([SCAN_SESSION_TAG]));
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
		getSpiderFullResult: builder.query<TZapSpiderFullResultsGETResponse, TZapAjaxFullResultGETRequest>({
			query: ({ _id: sessionId }) => ({
				url: `spider/fullResults?scanSession=${sessionId}`,
				method: "GET",
			}),
		}),
		ajaxScan: builder.mutation<TZapAjaxResponse<TPOST>, TZapAjaxRequest<TPOST>>({
			query: (arg) => ({
				url: "ajax",
				method: "POST",
				body: arg,
			}),
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
						isScanning: false,
						progress: "",
						error: {
							statusCode: NaN,
							msg: "",
						},
					},
				};
			},
			async onCacheEntryAdded({ _id: sessionId, zapClientId, scanState }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
				await cacheDataLoaded;
				if (scanState !== ScanState.PROCESSING) {
					return;
				}
				updateCachedData((draft) => {
					draft.progress = "running";
					draft.isScanning = true;
				});
				const eventSource = new EventSource(urlJoin(_URL, `ajax?scanSession=${sessionId}&zapClientId=${zapClientId}`), {
					withCredentials: true,
				});
				try {
					eventSource.addEventListener("status", (event: MessageEvent) => {
						const status = JSON.parse(event.data).status as TZapAjaxStreamStatus;
						if (status === "running") {
							return;
						}
						updateCachedData((draft) => {
							draft.progress = status;
							draft.isScanning = false;
						});
						dispatch(scanSessionApi.util.invalidateTags([SCAN_SESSION_TAG]));
						eventSource.close();
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
		getAjaxFullResult: builder.query<TZapAjaxFullResultsGETResponse, TZapAjaxFullResultGETRequest>({
			query: ({ _id: sessionId }) => ({
				url: `ajax/fullResults?scanSession=${sessionId}`,
				method: "GET",
			}),
		}),
		passiveScan: builder.mutation<TZapPassiveResponse<TPOST>, TZapPassiveRequest<TPOST>>({
			query: (arg) => ({
				url: "passive",
				method: "POST",
				body: arg,
			}),
		}),
		streamPassiveScan: builder.query<TZapPassiveResponse<TGET>, TZapPassiveRequest<TGET> & { scanState: ScanState }>({
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
						isScanning: false,
						progress: "",
						error: {
							statusCode: NaN,
							msg: "",
						},
					},
				};
			},
			async onCacheEntryAdded({ _id: sessionId, zapClientId, scanState }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
				await cacheDataLoaded;
				if (scanState !== ScanState.PROCESSING) {
					return;
				}
				updateCachedData((draft) => {
					draft.progress = "running";
					draft.isScanning = true;
				});
				const eventSource = new EventSource(urlJoin(_URL, `passive?scanSession=${sessionId}&zapClientId=${zapClientId}`), {
					withCredentials: true,
				});
				try {
					eventSource.addEventListener("status", (event: MessageEvent) => {
						const eventData = JSON.parse(event.data) as TZapPassiveStreamStatusRaw;
						const status = eventData.status;
						if (status !== "explored") {
							return;
						}
						const recordsToScanInt = parseInt(eventData.recordsToScan || "1");
						if (recordsToScanInt !== 0) {
							return;
						}
						updateCachedData((draft) => {
							draft.progress = "stopped";
							draft.isScanning = false;
						});
						dispatch(scanSessionApi.util.invalidateTags([SCAN_SESSION_TAG]));
						eventSource.close();
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
		getPassiveFullResult: builder.query<TZapPassiveFullResultsGETResponse, TZapPassiveFullResultGETRequest>({
			query: ({ _id: sessionId }) => ({
				url: `passive/fullResults?scanSession=${sessionId}`,
				method: "GET",
			}),
		}),
		activeScan: builder.mutation<TZapActiveResponse<TPOST>, TZapActiveRequest<TPOST>>({
			query: (arg) => ({
				url: "active",
				method: "POST",
				body: arg,
			}),
		}),
		streamActiveScan: builder.query<TZapActiveResponse<TGET>, TZapActiveRequest<TGET> & { scanState: ScanState }>({
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
						progress: NaN,
						error: {
							statusCode: NaN,
							msg: "",
						},
					},
				};
			},
			async onCacheEntryAdded({ _id: sessionId, zapClientId, scanState }, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }) {
				await cacheDataLoaded;
				if (scanState !== ScanState.PROCESSING) {
					return;
				}
				updateCachedData((draft) => {
					draft.progress = 0;
					draft.isScanning = true;
				});
				const eventSource = new EventSource(urlJoin(_URL, `active?scanSession=${sessionId}&zapClientId=${zapClientId}`), {
					withCredentials: true,
				});
				try {
					eventSource.addEventListener("status", (event: MessageEvent) => {
						const status = JSON.parse(event.data).status * 1;
						updateCachedData((draft) => {
							draft.progress = status;
						});

						if (status === 100) {
							eventSource.close();
							updateCachedData((draft) => {
								draft.isScanning = false;
							});
							dispatch(scanSessionApi.util.invalidateTags([SCAN_SESSION_TAG]));
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
		getActiveFullResult: builder.query<TZapActiveFullResultsGETResponse, TZapActiveFullResultGETRequest>({
			query: ({ _id: sessionId }) => ({
				url: `active/fullResults?scanSession=${sessionId}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useSpiderScanMutation, //
	useStreamSpiderScanQuery,
	useGetSpiderFullResultQuery,
	useAjaxScanMutation,
	useStreamAjaxScanQuery,
	useGetAjaxFullResultQuery,
	usePassiveScanMutation,
	useStreamPassiveScanQuery,
	useGetPassiveFullResultQuery,
	useActiveScanMutation,
	useStreamActiveScanQuery,
	useGetActiveFullResultQuery,
} = authScanApi;
export default authScanApi;
