import { useStreamAjaxScanQuery, useStreamSpiderScanQuery } from "../store";
import {
	TGET, //
	ScanType,
	TAuthScanSession,
	TZapAjaxResponse,
	TZapSpiderResponse,
} from "../utils/types";

export type TUseScanStatus = undefined;

function useScanStatus<T extends ScanType.ZAP_SPIDER>(arg: TAuthScanSession, scanType: ScanType.ZAP_SPIDER): TZapSpiderResponse<TGET>;
function useScanStatus<T extends ScanType.ZAP_AJAX>(arg: TAuthScanSession, scanType: ScanType.ZAP_AJAX): TZapAjaxResponse<TGET>;
function useScanStatus<T extends Exclude<ScanType, ScanType.ZAP_SPIDER | ScanType.ZAP_AJAX>>(arg: TAuthScanSession, scanType: ScanType): undefined;
function useScanStatus(arg: TAuthScanSession, scanType: ScanType) {
	switch (scanType) {
		case ScanType.ZAP_SPIDER:
			const { data: spiderData } = useStreamSpiderScanQuery(arg);
			return {
				progress: spiderData ? spiderData.progress : 0,
				isScanning: spiderData ? spiderData.isScanning : false,
				error: spiderData
					? spiderData.error
					: {
							statusCode: NaN,
							msg: "",
					  },
			};
		case ScanType.ZAP_AJAX:
			const { data: ajaxData } = useStreamAjaxScanQuery(arg);
			return {
				progress: ajaxData ? ajaxData.progress : "initializing",
				isScanning: ajaxData ? ajaxData.isScanning : false,
				error: ajaxData
					? ajaxData.error
					: {
							statusCode: NaN,
							msg: "",
					  },
			};
		default:
			return undefined;
	}
}
export { useScanStatus };
