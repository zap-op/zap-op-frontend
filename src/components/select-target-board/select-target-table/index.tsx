import { PropsWithChildren } from "react";
import TABLEROW_SelectTarget, { TSelectTargetItemProps } from "./tr-select-target";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type TSelectTargetTableProps = {
	listChild: Omit<TSelectTargetItemProps, "isChecked">[];
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
					{listChild.map((item) => (
						<TABLEROW_SelectTarget
							{...item}
							key={item._id.toString()}
							isChecked={listSelectedTarget.includes(item._id)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default SelectTargetTable;
