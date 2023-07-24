import { ScanType } from "./types";

export const SCAN_SESSION_TAG = "SCAN_SESSION";
export const TARGET_TAG = "TARGET";
export const TRIAL_SCAN_TAG = "TRIAL_SCAN";

export type TScanOption = {
	id: ScanType;
	title: string;
};

export const ListScanOption: TScanOption[] = [
	{
		id: ScanType.ZAP_SPIDER,
		title: "OWASP ZAP Spider",
	},
	{
		id: ScanType.ZAP_AJAX,
		title: "OWASP ZAP Ajax",
	},
	{
		id: ScanType.ZAP_ACTIVE,
		title: "OWASP ZAP Active",
	},
	{
		id: ScanType.ZAP_PASSIVE,
		title: "OWASP ZAP Passive",
	},
];
