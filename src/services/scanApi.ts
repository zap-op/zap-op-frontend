import { FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL } from "../utils/urlMgr";
import { SCAN_STATUS, TStatusResponse } from "../submodules/utility/status";
import urlJoin from "url-join";
import { resetScanDisplay, setScanError, setStatusScanProgress, updateScanProgressDisplay } from "../store/slice/scanSlice";

const _URL = urlJoin(BaseURL, "scan");

const scanApi = createApi({
	reducerPath: "scanApi",
	baseQuery: fetchBaseQuery({
		baseUrl: _URL,
	}),
	endpoints: (builder) => ({
		getResultsByOffset: builder.query<string[], { id: string; offset: number }>({
			query: (arg) => {
				const { id, offset } = arg;
				return {
					url: `trial/results?id=${id}&offset=${offset}`,
					method: "GET",
				};
			},
		}),
		scan: builder.query<void, { url: string }>({
			queryFn: (arg, { dispatch }) => {
				if (!arg.url) {
					dispatch(
						setStatusScanProgress({
							status: false,
						}),
					);
					return {
						error: {
							status: "FETCH_ERROR",
							error: "URL is empty!",
						} as FetchBaseQueryError,
					};
				}
				return {
					data: undefined,
				};
			},
			onQueryStarted: (_, { dispatch }) => {
				dispatch(resetScanDisplay());
				dispatch(
					setStatusScanProgress({
						status: true,
					}),
				);
			},
			async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded, cacheEntryRemoved }) {
				const eventSource = new EventSource(urlJoin(_URL, `trial?url=${arg.url}`));

				await cacheDataLoaded;
				let id: string;
				eventSource.addEventListener("id", (event: MessageEvent) => {
					const data = JSON.parse(event.data);
					id = data.id;
					if (!id) {
						dispatch(
							setScanError({
								scanError: data as TStatusResponse,
							}),
						);
						dispatch(
							setStatusScanProgress({
								status: false,
							}),
						);
					}
				});

				eventSource.addEventListener("status", (event: MessageEvent) => {
					const data = JSON.parse(event.data);
					dispatch(
						updateScanProgressDisplay({
							scanProgress: data.status,
						}),
					);
					dispatch(
						scanApi.util.prefetch(
							"getResultsByOffset",
							{
								id,
								offset: 0,
							},
							{
								force: true,
							},
						),
					);

					if (data.status === "100") {
						eventSource.close();
						dispatch(
							setStatusScanProgress({
								status: false,
							}),
						);
						return;
					}
				});

				eventSource.onerror = (event: Event) => {
					console.log("onerror: ", event);
					if (event instanceof MessageEvent) {
						const data = JSON.parse(event.data);
						console.log(data.msg);
						dispatch(
							setScanError({
								scanError: data as TStatusResponse,
							}),
						);
					} else {
						console.log(SCAN_STATUS.ZAP_INTERNAL_ERROR);
						dispatch(
							setScanError({
								scanError: SCAN_STATUS.ZAP_INTERNAL_ERROR,
							}),
						);
					}
					eventSource.close();
					dispatch(setStatusScanProgress({ status: false }));
				};

				await cacheEntryRemoved;
				eventSource.close();
			},
		}),
	}),
});

export const { useLazyGetResultsByOffsetQuery, useLazyScanQuery } = scanApi;
export default scanApi;
