import moment from "moment";
import { useMemo } from "react";
import { _assertCast } from "../../../utils/helpers";
import {
	TObject, //
	ScanType,
	ScanState,
} from "../../../utils/types";
import {
	useGetScanSessionQuery,
	useStreamActiveScanQuery, //
	useStreamAjaxScanQuery,
	useStreamSpiderScanQuery,
} from "../../../store";
import Describable from "../../toolkits/Describable";
import { Link } from "react-router-dom";

const ResultsTable = () => {
	const { data: listScanSession } = useGetScanSessionQuery(undefined, {
		refetchOnFocus: true,
		refetchOnReconnect: true,
		refetchOnMountOrArgChange: true,
	});
	return (
		<div className="results-table-container table-container">
			<ul className="thead">
				<li className="name">Name</li>
				<li className="target">Target</li>
				<li className="type">Type</li>
				<li className="state">State</li>
				<li className="progress">Progress</li>
				<li className="first-seen">Create at</li>
				<li className="last-seen">Update at</li>
			</ul>
			<div className="table-body-container table-scroll-wrap">
				{listScanSession &&
					listScanSession.map((item) => {
						const scanType = item.__t;
						const strId = item._id.toString();
						const objId = item._id;
						if (Object.values(ScanType).includes(scanType as ScanType)) {
							_assertCast<ScanType>(scanType);
							switch (scanType) {
								case ScanType.ZAP_SPIDER:
									return (
										<Link
											to={strId}
											key={strId}>
											<SpiderItemRow
												sessionId={objId}
												zapScanId={item.zapScanId}
												name={item.targetPop.name}
												url={item.targetPop.target}
												type={scanType}
												state={item.status.state}
												createdAt={item.createdAt}
												updatedAt={item.updatedAt}
											/>
										</Link>
									);
								case ScanType.ZAP_AJAX:
									return (
										<Link
											to={strId}
											key={strId}>
											<AjaxItemRow
												sessionId={objId}
												zapClientId={item.zapClientId}
												zapScanId={item.zapScanId}
												name={item.targetPop.name}
												url={item.targetPop.target}
												type={scanType}
												state={item.status.state}
												createdAt={item.createdAt}
												updatedAt={item.updatedAt}
											/>
										</Link>
									);
								case ScanType.ZAP_PASSIVE:
									return (
										<Link
											to={strId}
											key={strId}>
											<PassiveItemRow
												sessionId={objId}
												zapClientId={item.zapClientId}
												zapScanId={item.zapScanId}
												name={item.targetPop.name}
												url={item.targetPop.target}
												type={scanType}
												state={item.status.state}
												createdAt={item.createdAt}
												updatedAt={item.updatedAt}
											/>
										</Link>
									);
								case ScanType.ZAP_ACTIVE:
									return (
										<Link
											to={strId}
											key={strId}>
											<ActiveItemRow
												sessionId={objId}
												zapClientId={item.zapClientId}
												zapScanId={item.zapScanId}
												name={item.targetPop.name}
												url={item.targetPop.target}
												type={scanType}
												state={item.status.state}
												createdAt={item.createdAt}
												updatedAt={item.updatedAt}
											/>
										</Link>
									);
							}
						}
						return <></>;
					})}
			</div>
		</div>
	);
};

export default ResultsTable;

type TItemRow = {
	sessionId: TObject["_id"];
	zapClientId: string;
	zapScanId: string;
	name: string;
	url: string;
	type: ScanType;
	createdAt: string;
	updatedAt: string;
	state: ScanState;
};

const SpiderItemRow = ({
	sessionId, //
	zapScanId,
	name,
	url,
	type,
	createdAt,
	updatedAt,
	state,
}: Omit<TItemRow, "zapClientId">) => {
	const displayCreateAt = useMemo(() => moment(createdAt).fromNow(), [createdAt]);
	const displayUpdateAt = useMemo(() => moment(updatedAt).fromNow(), [updatedAt]);

	const scanStatus = useStreamSpiderScanQuery({
		_id: sessionId,
		zapScanId,
		scanState: state,
	});

	return (
		<ul className="trow">
			<li className="name">{name}</li>
			<li className="target">
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer">
					<Describable dataTitle={url}>{url}</Describable>
				</a>
			</li>
			<li className="type">{type}</li>
			<li className="state">{state}</li>
			<li className="progress">{scanStatus && scanStatus.data && scanStatus.data.progress}</li>
			<li className="first-seen">{displayCreateAt}</li>
			<li className="last-seen">{displayUpdateAt}</li>
		</ul>
	);
};

const AjaxItemRow = ({
	sessionId, //
	zapClientId,
	zapScanId,
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
		_id: sessionId,
		zapClientId,
		zapScanId,
		scanState: state,
	});

	return (
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
	);
};

const PassiveItemRow = ({
	sessionId, //
	zapClientId,
	zapScanId,
	name,
	url,
	type,
	createdAt,
	updatedAt,
	state,
}: TItemRow) => {
	const displayCreateAt = useMemo(() => moment(createdAt).fromNow(), [createdAt]);
	const displayUpdateAt = useMemo(() => moment(updatedAt).fromNow(), [updatedAt]);

	const scanStatus = undefined;
	// useStreamActiveScanQuery({
	// 	_id: sessionId,
	// 	zapClientId,
	// 	zapScanId,
	// 	scanState: state,
	// });

	return (
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
			<li className="progress">{scanStatus && "" /*scanStatus.data && scanStatus.data.progress*/}</li>
			<li className="first-seen">{displayCreateAt}</li>
			<li className="last-seen">{displayUpdateAt}</li>
		</ul>
	);
};

const ActiveItemRow = ({
	sessionId, //
	zapClientId,
	zapScanId,
	name,
	url,
	type,
	createdAt,
	updatedAt,
	state,
}: TItemRow) => {
	const displayCreateAt = useMemo(() => moment(createdAt).fromNow(), [createdAt]);
	const displayUpdateAt = useMemo(() => moment(updatedAt).fromNow(), [updatedAt]);

	const scanStatus = useStreamActiveScanQuery({
		_id: sessionId,
		zapClientId,
		zapScanId,
		scanState: state,
	});

	return (
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
	);
};
