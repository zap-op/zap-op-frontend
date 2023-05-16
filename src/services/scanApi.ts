import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseURL } from "../utils/urlMgr";
import { SCAN_STATUS, TStatusResponse } from "../submodules/utility/status";
import urlJoin from "url-join";
import { _assertCast } from "../utils/helpers";
import { setTrial } from "../store/slice/scanSlice";
import { RootState } from "../store/store";
import { ScanType } from "../utils/settings";
import { TScanSession, TZapSpiderScanSession } from "../submodules/utility/model";
import { ObjectId } from "bson";

type TErrorInjected = {
	error: TStatusResponse;
};

type TSpiderTrialRequest = TScanSession["url"];

type TSpiderTrialResponse = {
	data: string[];
	isScanning: boolean;
	progress: number;
};

type TSpiderRequest = Pick<TScanSession, "url"> & TZapSpiderScanSession;

type TSpiderResponse = {
	scanSession: ObjectId;
	scanId: string;
	scanStatus: TStatusResponse;
};

const _URL = urlJoin(BaseURL, "scan");

const scanApi = createApi({
	reducerPath: "scanApi",
	baseQuery: fetchBaseQuery({
		baseUrl: _URL,
	}),
	endpoints: (builder) => ({
		trialScan: builder.query<TSpiderTrialResponse & TErrorInjected, TSpiderTrialRequest>({
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
			async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded }) {
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
		spiderScan: builder.mutation<TSpiderResponse, TSpiderRequest>({
			query: (arg) => ({
				url: "target",
				method: "POST",
				body: arg,
			}),
		}),
		digestTargetsWithOptions: builder.mutation<{ error: TStatusResponse }, void>({
			queryFn: (_, { getState }, {}, fetchWithBaseQuery) => {
				const targetState = (getState() as RootState).target;
				const { listSelectedTarget, listSelectedScanOption } = targetState;
				if (listSelectedTarget.length == 0 || listSelectedScanOption.length == 0) {
					return {
						error: {
							status: "FETCH_ERROR",
							error: "Targets or Options are empty!",
						},
					};
				}

				listSelectedTarget.forEach((targetItem) =>
					listSelectedScanOption.forEach((optionItem) => {
						switch (optionItem) {
							case ScanType.NMAP_TCP:
								break;
							case ScanType.NMAP_UDP:
								break;
							case ScanType.ZAP_SPIDER:
								scanApi.endpoints.trialScan.initiate;
								break;
							case ScanType.ZAP_AJAX:
								break;
							case ScanType.ZAP_ACTIVE:
								break;
							case ScanType.ZAP_PASSIVE:
								break;
							default:
								break;
						}
					}),
				);

				return {
					data: {
						error: {
							statusCode: NaN,
							msg: "",
						},
					},
				};
			},
		}),
	}),
});

export const {
	useTrialScanQuery, //
	useLazyTrialScanQuery,
	useDigestTargetsWithOptionsMutation,
	useSpiderScanMutation,
} = scanApi;
export default scanApi;
