import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL } from "../utils/urlMgr";
import { SCAN_STATUS, TStatusResponse } from "../submodules/utility/status";
import urlJoin from "url-join";
import { _assertCast } from "../utils/helpers";
import { setTrial } from "../store/slice/scanSlice";

const _URL = urlJoin(BaseURL, "scan");

const scanApi = createApi({
	reducerPath: "scanApi",
	baseQuery: fetchBaseQuery({
		baseUrl: _URL,
	}),
	endpoints: (builder) => ({
		trialScan: builder.query<{ data: string[]; error: TStatusResponse; isScanning: boolean; progress: number }, string>({
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
			onQueryStarted: (arg, { updateCachedData, dispatch }) => {
				updateCachedData((draft) => {
					draft.isScanning = true;
				});
				dispatch(
					setTrial({
						url: arg,
					}),
				);
			},
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded}) {
				await cacheDataLoaded;
				const eventSource = new EventSource(urlJoin(_URL, `trial?url=${arg}`));
				let id: string;
				eventSource.addEventListener("id", (event: MessageEvent) => {
					id = JSON.parse(event.data).id;

					if (!id) {
						eventSource.close();
						updateCachedData((draft) => {
							draft.isScanning = false;
						});
					}
				});

				eventSource.addEventListener("status", (event: MessageEvent) => {
					const status = JSON.parse(event.data).status * 1;

					updateCachedData((draft) => {
						draft.progress = status;
					});

					fetch(urlJoin(_URL, `trial/results?id=${id}&offset=0`))
						.then((result) => result.json())
						.then((resData) => {
							_assertCast<string[]>(resData);
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
					eventSource.close();
					updateCachedData((draft) => {
						draft.isScanning = false;
					});
				};
			},
		}),
	}),
});

export const { useLazyTrialScanQuery } = scanApi;
export default scanApi;
