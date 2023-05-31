import { useStreamAjaxScanQuery, useStreamSpiderScanQuery } from "../store";
import {
	ScanType, //
	TAuthScanSession,
	TStatusResponse,
} from "../utils/types";

export const useScanStatus = (
	arg: TAuthScanSession,
	scanType: ScanType,
):
	| {
			progress: number;
			isScanning: boolean;
			error: TStatusResponse;
	  }
	| undefined => {
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
				progress: ajaxData ? ajaxData.progress : 0,
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
};
