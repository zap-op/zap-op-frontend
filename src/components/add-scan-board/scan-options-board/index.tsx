import { useState } from "react";
import ScanOptionItem, { TScanOptionItem } from "./scan-option-item";

const ScanOptionsBoard = () => {
	const [isSelectNmapTCP, setIsSelectNmapTCP] = useState<boolean>(false);
	const [isSelectNmapUDP, setIsSelectNmapUDP] = useState<boolean>(false);
	const [isSelectZAPSpider, setIsSelectZAPSpider] = useState<boolean>(false);
	const [isSelectZAPAjax, setIsSelectZAPAjax] = useState<boolean>(false);
	const [isSelectZAPPassive, setIsSelectZAPPassive] = useState<boolean>(false);
	const [isSelectZAPActive, setIsSelectZAPActive] = useState<boolean>(false);

	const listScanOptionItem: TScanOptionItem[] = [
		{
			id: "nmap-tcp",
			title: "Nmap TCP Port Scan",
			description: "Discover open ports on your servers with a complete TCP port scan.",
			handleChangeValue: setIsSelectNmapTCP,
			isDisable: true,
		},
		{
			id: "nmap-udp",
			title: "Nmap UDP Port Scan",
			description: "Discover open ports of common UDP services.",
			handleChangeValue: setIsSelectNmapUDP,
			isDisable: true,
		},
		{
			id: "zap-spider",
			title: "OWASP ZAP Spider",
			description: "Discover all resources (URLs) on your web application.",
			handleChangeValue: setIsSelectZAPSpider,
		},
		{
			id: "zap-ajax",
			title: "OWASP ZAP Ajax Spider",
			description: "Crawler of AJAX rich sites called Crawljax.",
			handleChangeValue: setIsSelectZAPAjax,
		},
		{
			id: "zap-active",
			title: "OWASP ZAP Active",
			description: "Active test your web application for SQL injection, remote command execution, XSS, and more.",
			handleChangeValue: setIsSelectZAPAjax,
			isDisable: true,
		},
		{
			id: "zap-passive",
			title: "OWASP ZAP Passive",
			description: "Passive check your web application for cross-domain configuration, insecure cookies, vulnerable JS dependencies, and more vulnerabilities.",
			handleChangeValue: setIsSelectZAPAjax,
			isDisable: true,
		},
	];

	return (
		<div className="scan-options-board-container">
			{listScanOptionItem.map((item) => (
				<div className="scan-option-item-wrapper">
					<ScanOptionItem {...item} />
				</div>
			))}
		</div>
	);
};

ScanOptionsBoard.NAME = "scan-options-board";
export default ScanOptionsBoard;
