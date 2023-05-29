import Describable from "../../toolkits/Describable";
import { ScanState, TMgmtScanSessionsResponse, TObject } from "../../../utils/types";
import { useMemo } from "react";
import moment from "moment";

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
							id={item._id}
							name={item.targetPop.name}
							url={item.targetPop.target}
							type={item.__t}
							state={item.status.state}
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
	id: TObject["_id"];
	name: string;
	url: string;
	type: string;
	createdAt: string;
	updatedAt: string;
	state: ScanState;
};

const ItemRow = ({
	name, //
	url,
	type,
	createdAt,
	updatedAt,
	state,
}: TItemRow) => {
	const displayCreateAt = moment(createdAt).fromNow();
	const displayUpdateAt = moment(updatedAt).fromNow();

	return (
		<div className="trow-container">
			<ul className="trow">
				<li className="name">{name}</li>
				<li className="target">{url}</li>
				<li className="type">{type}</li>
				<li className="state">{state}</li>
				<li className="progress">{state === ScanState.PROCESSING && state}</li>
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
