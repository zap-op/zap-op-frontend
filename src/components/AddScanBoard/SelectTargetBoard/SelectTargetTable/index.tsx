import { PropsWithChildren } from "react";
import { ChangeEvent } from "react";
import { TTargetModel } from "../../../../utils/types";
import { TInput } from "../../../../utils/componentGenericTypes";
import {
	useSelector, //
	useDispatch,
	addSelectTarget,
	removeSelectTarget,
} from "../../../../store";
import Describable from "../../../toolkits/Describable";

type TSelectTargetTableProps = {
	listChild: TSelectTargetItem[];
	heightScrollWrap: string;
};

const SelectTargetTable = ({
	listChild, //
	heightScrollWrap,
}: PropsWithChildren<TSelectTargetTableProps>) => {
	const listSelectedTarget = useSelector((state) => state.target.listSelectedTarget);

	return (
		<div className="select-target-table-container table-container">
			<div className="table-head-container">
				<ul className="thead">
					<li className="selected">Select</li>
					<li className="name">Name</li>
					<li className="target">Target</li>
					<li className="tag">Tag</li>
				</ul>
			</div>
			<div
				className="table-body-container table-scroll-wrap"
				style={{
					maxHeight: heightScrollWrap,
				}}>
				{listChild.map((item) => {
					const id = item._id.toString();
					return (
						<ItemRow
							{...item}
							key={id}
							defaultChecked={listSelectedTarget.some((browsItem) => browsItem._id == item._id)}
							id={id}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default SelectTargetTable;

type TSelectTargetItem = Pick<TTargetModel, "_id" | "name" | "target" | "tag">;

type TItemRow = TSelectTargetItem &
	TInput & {
		defaultChecked: boolean;
	};

const ItemRow = ({ _id, id, name, target, tag, defaultChecked }: TItemRow) => {
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
				<li className="target">
					<Describable dataTitle={target}>
						<a
							href={target}
							target="_blank"
							rel="noopener noreferrer">
							{target}
						</a>
					</Describable>
				</li>
				<li className="tag">
					{tag?.map((item) => (
						<span
							key={item}
							className="tag-item">
							{item}
						</span>
					))}
				</li>
			</label>
		</ul>
	);
};
