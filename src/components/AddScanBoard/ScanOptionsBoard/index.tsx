import { ListScanOption } from "../../../utils/settings";
import ScanOptionItem, { TScanOptionItem } from "./ScanOptionItem";
import { useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";

const injectDisable: ScanType[] = [];

const ListScanOptionItem: Omit<TScanOptionItem, "defaultChecked">[] = ListScanOption.map((item) => ({
	...item,
	isDisable: injectDisable.length === 0 ? false : injectDisable.includes(item.id),
}));

const ScanOptionsBoard = () => {
	const listSelectedScanOption = useSelector((state) => state.target.listSelectedScanOption);

	return (
		<div className="scan-options-board-container">
			{ListScanOptionItem.map((item) => (
				<div
					className="scan-option-item-wrapper"
					key={item.id}>
					<ScanOptionItem
						{...item}
						defaultChecked={listSelectedScanOption.includes(item.id)}
					/>
				</div>
			))}
		</div>
	);
};

export default ScanOptionsBoard;
