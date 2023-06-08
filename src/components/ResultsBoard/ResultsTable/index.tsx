import moment from "moment";
import { useMemo } from "react";
import { _assertCast } from "../../../utils/helpers";
import {
	TObject, //
	ScanType,
	ScanState,
	TMgmtScanSessionsResponse,
} from "../../../utils/types";
import {
	useStreamAjaxScanQuery, //
	useStreamSpiderScanQuery,
} from "../../../store";

type TResultsTableProps = {
	listScanResult: TMgmtScanSessionsResponse;
};

const ResultsTable = ({ listScanResult }: TResultsTableProps) => {
	return (
		<div className="results-table-container table-container">
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
			<div className="table-scroll-wrap">
				<div className="table-body-container">
					{listScanResult.map((item) => {
						const scanType = item.__t;
						if (Object.values(ScanType).includes(scanType as ScanType)) {
							_assertCast<ScanType>(scanType);
							switch (scanType) {
								case ScanType.ZAP_SPIDER:
									return (
										<SpiderItemRow
											key={item._id.toString()}
											id={item._id}
											scanId={item.scanId}
											name={item.targetPop.name}
											url={item.targetPop.target}
											type={scanType}
											state={item.status.state}
											createdAt={item.createdAt}
											updatedAt={item.updatedAt}
										/>
									);
								case ScanType.ZAP_AJAX:
									return (
										<AjaxItemRow
											key={item._id.toString()}
											id={item._id}
											scanId={item.scanId}
											name={item.targetPop.name}
											url={item.targetPop.target}
											type={scanType}
											state={item.status.state}
											createdAt={item.createdAt}
											updatedAt={item.updatedAt}
										/>
									);
									break;
							}
						}
						return <></>;
					})}
				</div>
			</div>
		</div>
	);
};

export default ResultsTable;

type TItemRow = {
	id: TObject["_id"];
	scanId: string;
	name: string;
	url: string;
	type: ScanType;
	createdAt: string;
	updatedAt: string;
	state: ScanState;
};

const SpiderItemRow = ({
	id, //
	scanId,
	name,
	url,
	type,
	createdAt,
	updatedAt,
	state,
}: TItemRow) => {
	const displayCreateAt = useMemo(() => moment(createdAt).fromNow(), [createdAt]);
	const displayUpdateAt = useMemo(() => moment(updatedAt).fromNow(), [updatedAt]);

	const scanStatus = useStreamSpiderScanQuery({
		scanSession: id,
		scanId,
		scanState: state,
	});

	return (
		<div className="trow-container">
			<ul className="trow">
				<li className="name">{name}</li>
				<li className="target">
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer">
						{url}
					</a>
				</li>
				<li className="type">{type}</li>
				<li className="state">{state}</li>
				<li className="progress">{scanStatus && scanStatus.data && scanStatus.data.progress}</li>
				<li className="first-seen">{displayCreateAt}</li>
				<li className="last-seen">{displayUpdateAt}</li>
			</ul>
		</div>
	);
};

const AjaxItemRow = ({
	id, //
	scanId,
	name,
	url,
	type,
	createdAt,
	updatedAt,
	state,
}: TItemRow) => {
	const displayCreateAt = useMemo(() => moment(createdAt).fromNow(), [createdAt]);
	const displayUpdateAt = useMemo(() => moment(updatedAt).fromNow(), [updatedAt]);

	const scanStatus = useStreamAjaxScanQuery({
		scanSession: id,
		scanId,
		scanState: state,
	});

	return (
		<div className="trow-container">
			<ul className="trow">
				<li className="name">{name}</li>
				<li className="target">
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer">
						{url}
					</a>
				</li>
				<li className="type">{type}</li>
				<li className="state">{state}</li>
				<li className="progress">{scanStatus && scanStatus.data && scanStatus.data.progress}</li>
				<li className="first-seen">{displayCreateAt}</li>
				<li className="last-seen">{displayUpdateAt}</li>
			</ul>
		</div>
	);
};
