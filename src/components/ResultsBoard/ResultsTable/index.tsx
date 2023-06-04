import moment from "moment";
import { useScanStatus } from "../../../hooks";
import { _assertCast } from "../../../utils/helpers";
import {
	TObject, //
	ScanType,
	ScanState,
	TMgmtScanSessionsResponse,
} from "../../../utils/types";

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
					{listScanResult.map((item) => {
						const scanType = item.__t;
						if (Object.values(ScanType).includes(scanType as ScanType)) {
							_assertCast<ScanType>(scanType);
							return (
								<ItemRow
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

const ItemRow = ({
	id, //
	scanId,
	name,
	url,
	type,
	createdAt,
	updatedAt,
	state,
}: TItemRow) => {
	const displayCreateAt = moment(createdAt).fromNow();
	const displayUpdateAt = moment(updatedAt).fromNow();

	if (state === ScanState.PROCESSING) {
		let scanStatus = undefined;
		switch (type) {
			case ScanType.ZAP_SPIDER:
				scanStatus = useScanStatus<ScanType.ZAP_SPIDER>(
					{
						scanSession: id,
						scanId,
					},
					type,
				);
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
							<li className="progress">{scanStatus && scanStatus.progress}</li>
							<li className="first-seen">{displayCreateAt}</li>
							<li className="last-seen">{displayUpdateAt}</li>
						</ul>
					</div>
				);
			case ScanType.ZAP_AJAX:
				scanStatus = useScanStatus<ScanType.ZAP_AJAX>(
					{
						scanSession: id,
						scanId,
					},
					type,
				);
				scanStatus.progress;
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
							<li className="progress">{scanStatus && scanStatus.progress}</li>
							<li className="first-seen">{displayCreateAt}</li>
							<li className="last-seen">{displayUpdateAt}</li>
						</ul>
					</div>
				);
			default:
				return <></>;
		}
	}
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
				<li className="progress"></li>
				<li className="first-seen">{displayCreateAt}</li>
				<li className="last-seen">{displayUpdateAt}</li>
			</ul>
		</div>
	);
};
