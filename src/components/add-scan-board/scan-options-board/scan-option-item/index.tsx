import { ChangeEvent } from "react";
import { TScanOption } from "../../../../utils/settings";
import { useDispatch } from "react-redux";
import { addScanOption, removeScanOption } from "../../../../store/slice/targetSlice";

export type TScanOptionItem = TScanOption & {
	isDisable?: boolean;
	defaultChecked: boolean;
};

const ScanOptionItem = ({ id, title, description, isDisable, defaultChecked }: TScanOptionItem) => {
	const dispatch = useDispatch();

	const handleCheckBoxOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			dispatch(addScanOption(id));
			return;
		}
		dispatch(removeScanOption(id));
	};

	return (
		<div className="scan-option-item-container">
			<label htmlFor={id}>
				<input
					type="checkbox"
					id={id}
					disabled={!!isDisable}
					onChange={handleCheckBoxOnChange}
					defaultChecked={defaultChecked}
				/>
				<div className="content-container">
					<h5 className="title">{title}</h5>
					<div className="description">{description}</div>
				</div>
			</label>
		</div>
	);
};
export default ScanOptionItem;
