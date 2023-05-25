import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ScanType } from "../utils/settings";
import { TStatusResponse } from "../utils/types";
import { _assertCast, isFetchBaseQueryErrorType } from "../utils/helpers";
import {
	useSelector, //
	useSpiderScanMutation,
} from "../store";

export const useDigestTargetsWithOptions = () => {
	const { listSelectedTarget, listSelectedScanOption } = useSelector((state) => state.target);
	const [spiderScan, { error: spiderError, originalArgs: spiderOriginalArgs }] = useSpiderScanMutation();

	useEffect(() => {
		if (spiderError && isFetchBaseQueryErrorType(spiderError)) {
			_assertCast<FetchBaseQueryError>(spiderError);
			const msg = (spiderError.data as any).msg;
			console.log("spiderOriginalArgs", spiderOriginalArgs);
			toast.error(`Fail to start ${"qwe"} spider with ${msg}`);
		}
	}, [spiderError]);

	const digest = () => {
		if (listSelectedTarget.length == 0 || listSelectedScanOption.length == 0) {
			// setGlobalError({
			// 	statusCode: NaN,
			// 	msg: "Targets or Options are empty!",
			// });
			return;
		}
		listSelectedTarget.forEach((target) =>
			listSelectedScanOption.forEach((optionItem) => {
				switch (optionItem) {
					case ScanType.NMAP_TCP:
						break;
					case ScanType.NMAP_UDP:
						break;
					case ScanType.ZAP_SPIDER:
						spiderScan({
							_id: target._id,
							scanConfig: {},
						});
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
	};

	return {
		digest, //
	};
};
