import { THandleChangeValue, TInput } from "../../../../utils/componentGenericTypes";

export type TScanOptionItem = TInput &
	THandleChangeValue & {
		title: string;
		description: string;
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
					onChange={props.handleChangeValue}
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
