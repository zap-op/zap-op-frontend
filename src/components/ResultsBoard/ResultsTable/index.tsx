import Describable from "../../toolkits/Describable";
import { TMgmtScanSessionsResponse } from "../../../utils/types";
import { useMemo } from "react";

type TResultsTableProps = {
	listScanResult: TMgmtScanSessionsResponse;
};

const ResultsTable = ({ listScanResult }: TResultsTableProps) => {
	return (
		<div className="results-table-container table-container">
			<div className="table-scroll-wrap">
				<div className="table-head-container">
					<ul className="thead">
						<li className="name">Name</li>
						<li className="target">Target</li>
						<li className="type">Type</li>
						<li className="state">State</li>
						<li className="progress">Progress</li>
						<li className="first-seen">Create at</li>
						<li className="last-seen">Update at</li>
					</ul>
				</div>
				<div className="table-body-container">
					{listScanResult.map((item) => (
						<ItemRow
							key={item._id.toString()}
							name={item.targetPop.name}
							url={item.targetPop.target}
							type={item.__t}
							state={""}
							progress={100}
							createdAt={item.createdAt}
							updatedAt={item.updatedAt}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ResultsTable;

type TItemRow = {
	name: string;
	url: string;
	type: string;
	createdAt: string;
	updatedAt: string;
	state: string;
	progress: number;
};

const ItemRow = ({
	name, //
	url,
	type,
	createdAt,
	updatedAt,
	state,
	progress,
}: TItemRow) => {
	const displayCreateAt = useMemo(() => new Date(createdAt).toLocaleDateString(), [createdAt]);
	const displayUpdateAt = useMemo(() => new Date(updatedAt).toLocaleDateString(), [updatedAt]);

	return (
		<div className="trow-container">
			<ul className="trow">
				<li className="name">{name}</li>
				<li className="target">{url}</li>
				<li className="type">{type}</li>
				<li className="state">{state}</li>
				{state}
				<li className="progress">{progress}</li>
				<li className="first-seen">{displayCreateAt}</li>
				<li className="last-seen">{displayUpdateAt}</li>
			</ul>
		</div>
	);
};

type TSubItemRow = {
	scanType: "OWASP ZAP" | "Traditonal Spider ZAP";
	state: string;
	progress: number;
	listExportResultType: string[];
	createdSince: string;
};

const SubItemRow = (props: TSubItemRow) => {
	return (
		<ul className="sub-trow">
			<Describable dataTitle="type">
				<li className="scan-type-name">{props.scanType}</li>
			</Describable>
			<Describable dataTitle="state">
				<li className="state">{props.state}</li>
			</Describable>
			<Describable dataTitle="progress">
				<li className="progress">{props.progress}</li>
			</Describable>
			<li className="result-types">
				{props.listExportResultType.map((item) => {
					return (
						<Describable
							dataTitle={`${item} result`}
							key={item}>
							<span
								key={item}
								className="result-type-item">
								{item}
							</span>
						</Describable>
					);
				})}
			</li>
			<li className="created-since">{props.createdSince}</li>
		</ul>
	);
};
