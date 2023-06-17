import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { _assertCast, getScanOptionTitleByID } from "../../../utils/helpers";
import {
	TObject, //
	ScanType,
	ScanState,
	TMgmtScanSessionsResponse,
	ExtractArrayItemType,
	TZapSpiderScanConfig,
	TZapAjaxScanConfig,
	TScanSession,
	TAuthScanSession,
	TZapAjaxFullResultGETRequest,
} from "../../../utils/types";
import {
	scanSessionApi,
	useGetAjaxFullResultQuery,
	useSelector,
	useStreamAjaxScanQuery, //
	useStreamSpiderScanQuery,
} from "../../../store";
import Describable from "../../toolkits/Describable";
import { Link, useLocation, useParams } from "react-router-dom";
import MoreOptionsButton, { TOptionItem } from "../../Buttons/MoreOptionsButton";
import ProgressTable from "../../ProgressTable";

type TResultsDetailParams = {
	resultId: string;
};

const ResultsDetail = () => {
	const { resultId } = useParams<TResultsDetailParams>();
	const { data: scanSessionApiData } = scanSessionApi.endpoints.getScanSession.useQueryState();
	const [sessionInfo, setSessionInfo] = useState<ExtractArrayItemType<TMgmtScanSessionsResponse>>();
	const {
		__t, //
		_id,
		zapScanId,
		zapClientId,
		status,
		targetPop,
		createdAt,
		updatedAt,
	} = { ...sessionInfo };
	const {
		target, //
		name: targetName,
		tag: listTargetTag,
	} = { ...targetPop };
	const {
		state, //
		message,
	} = { ...status };

	const id = useMemo(() => {
		return _id?.toString();
	}, [_id]);

	const type = useMemo(() => {
		if (!__t) {
			return "";
		}
		_assertCast<ScanType>(__t);
		return getScanOptionTitleByID(__t);
	}, [__t]);

	const displayCreateAt = useMemo(() => moment(createdAt).fromNow(), [createdAt]);
	const displayUpdateAt = useMemo(() => moment(updatedAt).fromNow(), [updatedAt]);

	useEffect(() => {
		if (scanSessionApiData && scanSessionApiData.length !== 0) {
			const scanSessionDataFounded = scanSessionApiData.find((item) => item._id.toString() === resultId);
			if (!scanSessionDataFounded) {
				return;
			}
			setSessionInfo({
				...scanSessionDataFounded,
			});
		}
	}, []);

	useEffect(() => {
		console.log("sessionInfo", sessionInfo);
	}, [sessionInfo]);

	const exportPdf: TOptionItem = {
		name: "Export to PDF",
		handle: () => {
			toast.error("Under development");
		},
	};

	return (
		<div className="result-detail-container">
			<div className="action-container">
				<Link
					to="../"
					className="go-previous link-button button secondary-button"
					draggable={false}>
					Back
				</Link>
				<MoreOptionsButton
					listOptions={[exportPdf]}
					style={{
						isIsolate: true,
					}}
				/>
			</div>
			{sessionInfo ? (
				<>
					<ul className="target-info-container">
						<li className="session">
							Scan Session
							<span>{id}</span>
						</li>
						<li className="type">
							Type
							<span>{type}</span>
						</li>
						{/* {<ZapSpiderConfig scanConfig={sessionInfo["scanConfig"] as TZapSpiderScanConfig["scanConfig"]} />} */}
						<li className="target-name">
							Target Name
							<span>{targetName}</span>
						</li>
						<li className="target">
							Target
							<span>
								<a
									href={target}
									target="_blank"
									rel="noopener noreferrer">
									{target}
								</a>
							</span>
						</li>
						<li className="tag">
							Tags
							<span>
								{listTargetTag?.map((item) => (
									<span
										key={item}
										className="tag-item">
										{item}
									</span>
								))}
							</span>
						</li>
						<li className="first-seen">
							Update At
							<span>{displayUpdateAt}</span>
						</li>
						<li className="last-seen">
							Create At
							<span>{displayCreateAt}</span>
						</li>
					</ul>
					{__t === ScanType.ZAP_SPIDER ? ( //
						<ZapSpiderFullResultTable />
					) : __t === ScanType.ZAP_AJAX ? (
						_id && <ZapAjaxFullResultTable _id={_id} />
					) : (
						<></>
					)}
				</>
			) : (
				<h2 className="message error-message">Some thing went wrong</h2>
			)}
		</div>
	);
};

export default ResultsDetail;

const ZapSpiderFullResultTable = () => {
	return <></>;
};

const ZapSpiderConfig = ({ scanConfig }: TZapSpiderScanConfig) => {
	const {
		recurse, //
		contextName,
		maxChildren,
		subtreeOnly,
	} = { ...scanConfig };
	return (
		<ul className="zap-spider-config-container">
			<li>
				Recurse
				<span>{recurse}</span>
			</li>
			<li>
				Context Name
				<span>{contextName}</span>
			</li>
			<li>
				Max Children
				<span>{maxChildren}</span>
			</li>
			<li>
				Subtree Only
				<span>{subtreeOnly}</span>
			</li>
		</ul>
	);
};

const ZapAjaxConfig = ({ scanConfig }: TZapAjaxScanConfig) => {
	const {
		inScope, //
		contextName,
		subtreeOnly,
	} = { ...scanConfig };

	return (
		<ul className="zap-ajax-config-container">
			<li>
				In Scope
				<span>{inScope}</span>
			</li>
			<li>
				Context Name
				<span>{contextName}</span>
			</li>
			<li>
				Subtree Only
				<span>{subtreeOnly}</span>
			</li>
		</ul>
	);
};

const ZapAjaxFullResultTable = ({ _id }: TZapAjaxFullResultGETRequest) => {
	const result = useGetAjaxFullResultQuery({
		_id,
	});

	useEffect(() => {
		console.log("result", result);
	}, [result]);
	return <></>;
};
