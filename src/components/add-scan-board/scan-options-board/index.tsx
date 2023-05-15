import { ListScanOption, ScanType } from "../../../utils/settings";
import ScanOptionItem, { TScanOptionItem } from "./scan-option-item";

const injectDisable = [ScanType.NMAP_TCP, ScanType.NMAP_UDP, ScanType.ZAP_ACTIVE, ScanType.ZAP_PASSIVE];
const ListScanOptionItem: TScanOptionItem[] = ListScanOption.map((item) => ({
	...item,
	isDisable: injectDisable.includes(item.id),
}));

const ScanOptionsBoard = () => {
	return (
		<div className="scan-options-board-container">
			{ListScanOptionItem.map((item) => (
				<div className="scan-option-item-wrapper">
					<ScanOptionItem {...item} />
				</div>
			))}
		</div>
	);
};

ScanOptionsBoard.NAME = "scan-options-board";
export default ScanOptionsBoard;
