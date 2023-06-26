import {
	useEffect, //
	useMemo,
	useState,
} from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { _assertCast, getScanOptionTitleByID } from "../../../utils/helpers";
import {
	ScanType, //
	TMgmtScanSessionsResponse,
	ExtractArrayItemType,
	TZapSpiderScanConfig,
	TZapAjaxScanConfig,
	TZapActiveScanFullResults,
	TZapPassiveScanFullResults,
	TZapSpiderScanFullResults,
	TZapAjaxScanFullResults,
} from "../../../utils/types";
import { scanSessionApi, useDispatch } from "../../../store";
import MoreOptionsButton, { TOptionItem } from "../../Buttons/MoreOptionsButton";
import { generateResultDetailDocument } from "../pdfExporter";
import ZapSpiderFullResultTable from "./ZapSpiderFullResultTable";
import ZapAjaxFullResultTable from "./ZapAjaxResultTable";
import ZapPassiveFullResultTable from "./ZapPassiveFullResultTable";
import ZapActiveFullResultTable from "./ZapActiveFullResultTable";

type TResultsDetailParams = {
	resultId: string;
};

const ResultsDetail = () => {
	const {
		data: scanSessionApiData, //
		isUninitialized,
		isSuccess,
	} = scanSessionApi.endpoints.getScanSession.useQueryState();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isUninitialized) {
			dispatch(
				scanSessionApi.util.prefetch("getScanSession", undefined, {
					force: true,
				}),
			);
		}
	}, []);

	const { resultId } = useParams<TResultsDetailParams>();

	const [sessionInfo, setSessionInfo] = useState<ExtractArrayItemType<TMgmtScanSessionsResponse>>();
	console.log("sessionInfo", sessionInfo);
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

	const id = useMemo(() => {
		return _id?.toString();
	}, [_id]);

	const type = useMemo(() => {
		if (!__t) {
			return "";
		}
		return getScanOptionTitleByID(__t as ScanType);
	}, [__t]);

	const displayCreateAt = useMemo(() => moment(createdAt).fromNow(), [createdAt]);
	const displayUpdateAt = useMemo(() => moment(updatedAt).fromNow(), [updatedAt]);

	useEffect(() => {
		if (isSuccess && scanSessionApiData && scanSessionApiData.length !== 0) {
			const scanSessionDataFounded = scanSessionApiData.find((item) => item._id.toString() === resultId);
			if (!scanSessionDataFounded) {
				return;
			}
			setSessionInfo({
				...scanSessionDataFounded,
			});
		}
	}, [isSuccess]);

	const [spiderFullResult, setSpiderFullResult] = useState<TZapSpiderScanFullResults["fullResults"]>();
	const [ajaxFullResult, setAjaxFullResult] = useState<TZapAjaxScanFullResults["fullResults"]>();
	const [passiveFullResult, setPassiveFullResult] = useState<TZapPassiveScanFullResults["fullResults"]>();
	const [activeFullResult, setActiveFullResult] = useState<TZapActiveScanFullResults["fullResults"]>();

	const exportPdf: TOptionItem = {
		name: "Export to PDF",
		handle: () => {
			// const toastId = toast.loading("")
			const doc = new jsPDF();
			if (!sessionInfo) {
				return;
			}

			switch (__t as ScanType) {
				case ScanType.ZAP_SPIDER:
					if (!spiderFullResult) {
						return;
					}
					generateResultDetailDocument(doc, ScanType.ZAP_SPIDER, sessionInfo, spiderFullResult);
					break;
				case ScanType.ZAP_AJAX:
					if (!ajaxFullResult) {
						return;
					}
					generateResultDetailDocument(doc, ScanType.ZAP_AJAX, sessionInfo, ajaxFullResult);
					break;
				case ScanType.ZAP_PASSIVE:
					if (!passiveFullResult) {
						return;
					}
					generateResultDetailDocument(doc, ScanType.ZAP_PASSIVE, sessionInfo, passiveFullResult);
					break;
				case ScanType.ZAP_ACTIVE:
					if (!activeFullResult) {
						return;
					}
					generateResultDetailDocument(doc, ScanType.ZAP_ACTIVE, sessionInfo, activeFullResult);
					break;
				default:
					break;
			}

			doc.save("report.pdf");
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
					<ul className="session-info-container">
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
						_id && (
							<ZapSpiderFullResultTable
								_id={_id}
								liftUpDataCallback={setSpiderFullResult}
							/>
						)
					) : __t === ScanType.ZAP_AJAX ? (
						_id && (
							<ZapAjaxFullResultTable
								_id={_id}
								liftUpDataCallback={setAjaxFullResult}
							/>
						)
					) : __t === ScanType.ZAP_PASSIVE ? (
						_id && (
							<ZapPassiveFullResultTable
								_id={_id}
								liftUpDataCallback={setPassiveFullResult}
							/>
						)
					) : __t === ScanType.ZAP_ACTIVE ? (
						_id && (
							<ZapActiveFullResultTable
								_id={_id}
								liftUpDataCallback={setActiveFullResult}
							/>
						)
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
