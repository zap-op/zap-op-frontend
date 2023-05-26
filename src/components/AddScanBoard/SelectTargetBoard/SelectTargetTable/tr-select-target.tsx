import { ChangeEvent } from "react";
import { TTargetModel } from "../../../../utils/types";
import { TInput } from "../../../../utils/componentGenericTypes";
import {
	useDispatch, //
	addSelectTarget,
	removeSelectTarget,
} from "../../../../store";

export type TSelectTargetItem = Pick<TTargetModel, "_id" | "name" | "target" | "tag">;

type TSelectTargetItemProps = TSelectTargetItem &
	TInput & {
		defaultChecked: boolean;
	};

const SelectTargetItem = ({ _id, id, name, target, tag, defaultChecked }: TSelectTargetItemProps) => {
	const dispatch = useDispatch();

	const handleCheckBoxOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			dispatch(
				addSelectTarget({
					_id,
					name,
				}),
			);
			return;
		}
		dispatch(
			removeSelectTarget({
				_id,
				name,
			}),
		);
	};

	return (
		<ul className="trow">
			<label htmlFor={id}>
				<li className="selected">
					<div className="selection-container">
						<input
							className="target-selector"
							type="checkbox"
							name="select-row"
							id={id}
							defaultChecked={defaultChecked}
							onChange={handleCheckBoxOnChange}
						/>
					</div>
				</li>
				<li className="name">{name}</li>
				<li className="target">{target}</li>
				<li className="tag">{tag}</li>
			</label>
		</ul>
	);
};

export default SelectTargetItem;
