import { ListScanOption } from "../../../utils/settings";
import ScanOptionItem, { TScanOptionItem } from "./ScanOptionItem";
import { useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";

const injectDisable = [
	ScanType.NMAP_TCP, //
	ScanType.NMAP_UDP,
	ScanType.ZAP_ACTIVE,
	ScanType.ZAP_PASSIVE,
];

const ListScanOptionItem: Omit<TScanOptionItem, "defaultChecked">[] = ListScanOption.map((item) => ({
	...item,
	isDisable: injectDisable.includes(item.id),
}));

const ScanOptionsBoard = () => {
	const listSelectedScanOption = useSelector((state) => state.target.listSelectedScanOption);

	return (
		<div className="scan-options-board-container">
			{ListScanOptionItem.map((item) => (
				<div className="scan-option-item-wrapper">
					<ScanOptionItem
						{...item}
						key={item.id}
						defaultChecked={listSelectedScanOption.includes(item.id)}
					/>
				</div>
			))}
		</div>
	);
};

export default ScanOptionsBoard;
