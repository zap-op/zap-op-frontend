import { PropsWithChildren } from "react";
import TABLEROW_SelectTarget, { TSelectTargetItem } from "./tr-select-target";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type TSelectTargetTableProps = {
	listChild: TSelectTargetItem[];
};

const SelectTargetTable = ({ listChild }: PropsWithChildren<TSelectTargetTableProps>) => {
	const listSelectedTarget = useSelector((state: RootState) => state.target.listSelectedTarget);

	return (
		<div className="select-target-table-container table-container">
			<div className="table-scroll-wrap">
				<div className="table-head-container">
					<ul className="thead">
						<li className="selected">Select</li>
						<li className="name">Name</li>
						<li className="target">Target</li>
						<li className="tag">Tag</li>
					</ul>
				</div>
				<div className="table-body-container">
					{listChild.map((item) => {
						const id = item._id.toString();
						return (
							<TABLEROW_SelectTarget
								{...item}
								key={id}
								defaultChecked={listSelectedTarget.includes(item._id)}
								id={id}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SelectTargetTable;
