import { useStreamSpiderScanQuery } from "../store";
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
			const { data } = useStreamSpiderScanQuery(arg);
			return {
				progress: data ? data.progress : 0,
				isScanning: data ? data.isScanning : false,
				error: data
					? data.error
					: {
							statusCode: NaN,
							msg: "",
					  },
			};

		default:
			return undefined;
	}
};
