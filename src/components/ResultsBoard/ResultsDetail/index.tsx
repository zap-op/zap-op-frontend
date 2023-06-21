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
	TZapActiveFullResultGETRequest,
	RiskLevel,
	TAlertsByRisk,
	TAlertDetail,
	TZapPassiveFullResultGETRequest,
} from "../../../utils/types";
import {
	scanSessionApi,
	useGetActiveFullResultQuery,
	useGetAjaxFullResultQuery,
	useGetPassiveFullResultQuery,
	useSelector,
	useStreamAjaxScanQuery, //
	useStreamSpiderScanQuery,
} from "../../../store";
import Describable from "../../toolkits/Describable";
import { Link, useLocation, useParams } from "react-router-dom";
import MoreOptionsButton, { TOptionItem } from "../../Buttons/MoreOptionsButton";
import ProgressTable from "../../ProgressTable";
import PartBoard from "../../PartBoard";

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
						<ZapSpiderFullResultTable />
					) : __t === ScanType.ZAP_AJAX ? (
						_id && <ZapAjaxFullResultTable _id={_id} />
					) : __t === ScanType.ZAP_ACTIVE ? (
						_id && <ZapActiveFullResultTable _id={_id} />
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

const ZapPassiveFullResultTable = ({ _id }: TZapPassiveFullResultGETRequest) => {
	// const result = useGetPassiveFullResultQuery({
	// 	_id,
	// });
	return <></>;
};

const ZapActiveFullResultTable = ({ _id }: TZapActiveFullResultGETRequest) => {
	const result = useGetActiveFullResultQuery({
		_id,
	});
	const {
		alerts, //
		alertsByRisk,
	} = { ...result.data?.fullResults };

	return (
		<>
			{alerts && alertsByRisk && (
				<AlertsDetailBoards
					alerts={alerts}
					alertsByRisk={alertsByRisk}
					extendClassName="active table-scroll-wrap"
				/>
			)}
		</>
	);
};

type TAlertsDetailBoards = {
	alertsByRisk: TAlertsByRisk;
	alerts: TAlertDetail[];
	extendClassName?: string;
};

const AlertsDetailBoards = ({
	alerts, //
	alertsByRisk,
	extendClassName,
}: TAlertsDetailBoards) => {
	return (
		<div className={`alerts-detail-boards-container ${extendClassName && extendClassName}`}>
			<PartBoard
				title="Alerts Summary"
				extendClassName="summary-alerts-container">
				<div className="table-container">
					<ul className="thead">
						<li className="risk-level">Risk Level</li>
						<li className="alerts-total">Alert Total</li>
					</ul>
					<ul className="trow">
						<li className="risk-level risk-high-style">High</li>
						<li className="alerts-total">{alertsByRisk.High?.length}</li>
					</ul>
					<ul className="trow">
						<li className="risk-level risk-medium-style">Medium</li>
						<li className="alerts-total">{alertsByRisk.Medium?.length}</li>
					</ul>
					<ul className="trow">
						<li className="risk-level risk-low-style">Low</li>
						<li className="alerts-total">{alertsByRisk.Low?.length}</li>
					</ul>
					<ul className="trow">
						<li className="risk-level risk-informational-style">Informational</li>
						<li className="alerts-total">{alertsByRisk.Informational?.length}</li>
					</ul>
				</div>
			</PartBoard>
			<PartBoard
				title="Alerts Information"
				extendClassName="alerts-information-container">
				<div className="table-container">
					<ul className="thead">
						<li className="alert-name">Risk Name</li>
						<li className="risk-level">Risk Level</li>
						<li className="alerts-total">Instances Total</li>
					</ul>
					{Object.entries(alertsByRisk)
						.reverse()
						.map(([key, value]) =>
							value.map((item, index) => (
								<ul
									className="trow"
									key={index}>
									<li className="alert-name">
										<a href={`#${item.key}`}>{item.key}</a>
									</li>
									<li
										className={`risk-level ${
											key === RiskLevel.HIGH //
												? "risk-high-style"
												: key === RiskLevel.MEDIUM
												? "risk-medium-style"
												: key === RiskLevel.LOW
												? "risk-low-style"
												: "risk-informational-style"
										}`}>
										{key}
									</li>
									<li className="alerts-total">{item.value.length}</li>
								</ul>
							)),
						)}
				</div>
			</PartBoard>
			<PartBoard
				title="Alerts Detail"
				extendClassName="alerts-detail-container">
				{Object.entries(alertsByRisk)
					.reverse()
					.map(([key, valueRiskArray]) =>
						valueRiskArray.map((risk, index) => {
							const pioneerAlertDetail = alerts[parseInt(risk.value[0].id)];
							const listReference = pioneerAlertDetail.reference.split("\n");
							const listTagRecord = pioneerAlertDetail.tags;
							const CWEIDHref = `https://cwe.mitre.org/data/definitions/${pioneerAlertDetail.cweid}.html`;
							const pluginIdHref = `https://www.zaproxy.org/docs/alerts/${pioneerAlertDetail.pluginId}/`;
							return (
								<div
									key={index}
									id={risk.key}
									className="detail-block table-container">
									<ul
										className={`thead ${
											key === RiskLevel.HIGH //
												? "risk-high-style"
												: key === RiskLevel.MEDIUM
												? "risk-medium-style"
												: key === RiskLevel.LOW
												? "risk-low-style"
												: "risk-informational-style"
										}`}>
										<li className="label">{key}</li>
										<li className="detail">{risk.key}</li>
									</ul>
									<ul className="trow">
										<li className="label">Description</li>
										<li className="detail">{pioneerAlertDetail.description}</li>
									</ul>
									<ul className="trow">
										<li className="label">Instance</li>
										<li className="detail">{risk.value.length}</li>
									</ul>
									{risk.value.map((instance, index) => {
										const alertDetail = alerts[parseInt(instance.id)];
										const instanceUrl = instance.url;
										return (
											<div
												key={index}
												className="instance detail-block table-container">
												<span className="instance-index">{index}</span>
												<ul className="trow">
													<li className="label">Target</li>
													<li className="detail">
														<Describable dataTitle={instanceUrl}>
															<a
																href={instanceUrl}
																target="_blank"
																rel="noopener noreferrer">
																{instanceUrl}
															</a>
														</Describable>
													</li>
												</ul>
												<ul className="trow">
													<li className="label">Method</li>
													<li className="detail">{alertDetail.method}</li>
												</ul>
												<ul className="trow">
													<li className="label">Parameter</li>
													<li className="detail">{instance.param}</li>
												</ul>
												<ul className="trow">
													<li className="label">Attack</li>
													<li className="detail">{alertDetail.attack}</li>
												</ul>
												<ul className="trow">
													<li className="label">Evidence</li>
													<li className="detail">{alertDetail.evidence}</li>
												</ul>
											</div>
										);
									})}
									<ul className="trow">
										<li className="label">Solution</li>
										<li className="detail">{pioneerAlertDetail.solution}</li>
									</ul>
									<ul className="trow references">
										<li className="label">References</li>
										<li className="detail">
											{listReference.map((item, index) => (
												<a
													key={index}
													href={item}
													target="_blank"
													rel="noopener noreferrer"
													className="reference">
													{item}
												</a>
											))}
										</li>
									</ul>
									<ul className="trow tags">
										<li className="label">Tags</li>
										<li className="detail">
											{listTagRecord &&
												Object.entries(listTagRecord).map(([tag, tagRef]) => (
													<Describable
														key={tag}
														dataTitle={tagRef}>
														<a
															href={tagRef}
															target="_blank"
															rel="noopener noreferrer"
															className="tag">
															{tag}
														</a>
													</Describable>
												))}
										</li>
									</ul>
									<ul className="trow">
										<li className="label">CWE ID - Common Weakness Enumeration ID</li>
										<li className="detail">
											<Describable dataTitle={CWEIDHref}>
												<a
													href={CWEIDHref}
													target="_blank"
													rel="noopener noreferrer">
													{pioneerAlertDetail.cweid}
												</a>
											</Describable>
										</li>
									</ul>
									<ul className="trow">
										<li className="label">WASC ID - Web Application Security Consortium ID</li>
										<li className="detail">{pioneerAlertDetail.wascid}</li>
									</ul>
									<ul className="trow">
										<li className="label">Plugin ID</li>
										<li className="detail">
											<Describable dataTitle={pluginIdHref}>
												<a
													href={pluginIdHref}
													target="_blank"
													rel="noopener noreferrer">
													{pioneerAlertDetail.pluginId}
												</a>
											</Describable>
										</li>
									</ul>
								</div>
							);
						}),
					)}
			</PartBoard>
		</div>
	);
};
