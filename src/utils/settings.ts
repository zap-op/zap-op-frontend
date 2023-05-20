export const TARGET_TAG = "TARGET"
export const TRIAL_SCAN_TAG = "TRIAL_SCAN"

// SCAN
export enum ScanType {
	NMAP_TCP = "nmap-tcp",
	NMAP_UDP = "nmap-udp",
	ZAP_SPIDER = "zap-spider",
	ZAP_AJAX = "zap-ajax",
	ZAP_ACTIVE = "zap-active",
	ZAP_PASSIVE = "zap-passive",
}

export type TScanOption = {
	id: ScanType;
	title: string;
	description: string;
};

export const ListScanOption: TScanOption[] = [
	{
		id: ScanType.NMAP_TCP,
		title: "Nmap TCP Port Scan",
		description: "Discover open ports on your servers with a complete TCP port scan.",
	},
	{
		id: ScanType.NMAP_UDP,
		title: "Nmap UDP Port Scan",
		description: "Discover open ports of common UDP services.",
	},
	{
		id: ScanType.ZAP_SPIDER,
		title: "OWASP ZAP Spider",
		description: "Discover all resources (URLs) on your web application.",
	},
	{
		id: ScanType.ZAP_AJAX,
		title: "OWASP ZAP Ajax Spider",
		description: "Crawler of AJAX rich sites called Crawljax.",
	},
	{
		id: ScanType.ZAP_ACTIVE,
		title: "OWASP ZAP Active",
		description: "Active test your web application for SQL injection, remote command execution, XSS, and more.",
	},
	{
		id: ScanType.ZAP_PASSIVE,
		title: "OWASP ZAP Passive",
		description: "Passive check your web application for cross-domain configuration, insecure cookies, vulnerable JS dependencies, and more vulnerabilities.",
	},
];

export const ListIDScanOption: ScanType[] = ListScanOption.map((item) => item.id);
