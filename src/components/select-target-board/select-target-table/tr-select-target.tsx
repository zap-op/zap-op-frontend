import { ChangeEvent } from "react";
import { TTarget } from "../../../submodules/utility/model";
import { useDispatch } from "react-redux";
import { addSelectTarget, removeSelectTarget } from "../../../store/slice/targetSlice";
import { TInput } from "../../../utils/componentGenericTypes";

export type TSelectTargetItem = Pick<TTarget, "_id" | "name" | "target" | "tag">;

type TSelectTargetItemProps = TSelectTargetItem &
	TInput & {
		defaultChecked: boolean;
	};

const SelectTargetItem = ({ _id, name, target, tag, defaultChecked }: TSelectTargetItemProps) => {
	const dispatch = useDispatch();

	const id = _id.toString();

	const handleCheckBoxOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			dispatch(addSelectTarget(_id));
			return;
		}
		dispatch(removeSelectTarget(_id));
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
