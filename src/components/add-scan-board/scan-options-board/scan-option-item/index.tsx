import { TScanOption } from "../../../../utils/settings";

export type TScanOptionItem = TScanOption & {
	isDisable?: boolean;
};
const ScanOptionItem = (props: TScanOptionItem) => {
	return (
		<div className="scan-option-item-container">
			<label htmlFor={props.id}>
				<input
					type="checkbox"
					id={props.id}
					disabled={!!props.isDisable}
				/>
				<div className="content-container">
					<h5 className="title">{props.title}</h5>
					<div className="description">{props.description}</div>
				</div>
			</label>
		</div>
	);
};
export default ScanOptionItem;
