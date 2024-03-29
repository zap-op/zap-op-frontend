import { useMemo } from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { _assertCast, getScanOptionTitleByID } from "../../../utils/helpers";
import {
	ScanType, //
	TActiveScanSessionWithTarget,
	TGeneralScanSessionWithTarget,
	TZapActiveScanConfig,
} from "../../../utils/types";
import { useGetActiveFullResultQuery } from "../../../store";
import MoreOptionsButton, { TOptionItem } from "../../Buttons/MoreOptionsButton";
import ZapActiveFullResultTable from "./ZapActiveFullResultTable";
import { generateResultDetailDocument } from "../pdfExporter";

const ZapActiveResultsDetail = (scanSessionWithTargetProps: TGeneralScanSessionWithTarget) => {
	//to do lấy status ra success hay fail
	_assertCast<TActiveScanSessionWithTarget>(scanSessionWithTargetProps);
	const {
		_id, //
		__t,
		createdAt,
		updatedAt,
		exploreType,
		ajaxConfig,
		spiderConfig,
		scanConfig,
		targetPop: {
			target, //
			name: targetName,
			tag: listTargetTag,
		},
	} = { ...scanSessionWithTargetProps };
	const id = useMemo(() => {
		return _id?.toString();
	}, [_id]);
	const scanOptionTitle = useMemo(() => {
		if (!__t) {
			return "";
		}
		return getScanOptionTitleByID(__t as ScanType);
	}, [__t]);
	const displayCreateAt = useMemo(() => moment(createdAt).fromNow(), [createdAt]);
	const displayUpdateAt = useMemo(() => moment(updatedAt).fromNow(), [updatedAt]);

	const {
		data: scanFullResult, //
		isError,
	} = useGetActiveFullResultQuery({
		_id,
	});
	const { fullResults } = { ...scanFullResult };

	const exportPdf: TOptionItem = {
		name: "Export to PDF",
		handle: () => {
			toast.promise(
				new Promise<void>((resolve, reject) => {
					try {
						const doc = new jsPDF();

						if (!fullResults) {
							reject();
							return;
						}
						generateResultDetailDocument(
							doc,
							ScanType.ZAP_ACTIVE,
							scanSessionWithTargetProps,
							{
								exploreType,
								spiderConfig,
								ajaxConfig,
								scanConfig,
							},
							fullResults,
						);
						doc.save(`OWASP-ZAP-Active_${targetName}_${id}_report.pdf`);
						resolve();
					} catch (error) {
						console.log("error", error);
						reject();
					}
				}),
				{
					loading: `Exporting PDF file for ZAP Active of ${targetName}`,
					success: `Succeed export ${id} to PDF`,
					error: `Error export ${id} to PDF`,
				},
			);
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
					id="active-results-detail-more-option"
					listOptions={[exportPdf]}
					style={{
						isIsolate: true,
					}}
				/>
			</div>
			<ul className="session-info-container">
				<li className="session">
					Scan Session
					<span>{id}</span>
				</li>
				<li className="type">
					Type
					<span>{scanOptionTitle}</span>
				</li>
				<ZapActiveConfig
					exploreType={exploreType}
					ajaxConfig={ajaxConfig}
					spiderConfig={spiderConfig}
					scanConfig={scanConfig}
				/>
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
			{fullResults ? (
				<ZapActiveFullResultTable
					alerts={fullResults.alerts}
					alertsByRisk={fullResults.alertsByRisk}
				/>
			) : (
				isError && <h2 className="message error-message">Some thing went wrong</h2>
			)}
		</div>
	);
};

export default ZapActiveResultsDetail;

const ZapActiveConfig = ({
	exploreType, //
	ajaxConfig,
	spiderConfig,
	scanConfig,
}: TZapActiveScanConfig) => {
	const displayExploreType = useMemo(() => {
		if (exploreType == "spider") {
			return getScanOptionTitleByID(ScanType.ZAP_SPIDER);
		}
		return getScanOptionTitleByID(ScanType.ZAP_AJAX);
	}, []);

	return (
		<>
			<li>
				Explore Type
				<span>{displayExploreType}</span>
			</li>
			<ul className="config-container">
				{exploreType === "ajax" && ajaxConfig && (
					<>
						<li>
							In Scope
							<span>{`${ajaxConfig.inScope}`}</span>
						</li>
						<li>
							Context Name
							<span>{`${ajaxConfig.contextName}`}</span>
						</li>
						<li>
							Subtree Only
							<span>{`${ajaxConfig.subtreeOnly}`}</span>
						</li>
						<li>
							Max Crawl Depth
							<span>{`${ajaxConfig.maxCrawlDepth}`}</span>
						</li>
						<li>
							Max Duration
							<span>{`${ajaxConfig.maxDuration}`}</span>
						</li>
					</>
				)}
				{exploreType === "spider" && spiderConfig && (
					<>
						<li>
							Recurse
							<span>{`${spiderConfig.recurse}`}</span>
						</li>
						<li>
							Context Name
							<span>{`${spiderConfig.contextName}`}</span>
						</li>
						<li>
							Max Children
							<span>{`${spiderConfig.maxChildren}`}</span>
						</li>
						<li>
							Subtree Only
							<span>{`${spiderConfig.subtreeOnly}`}</span>
						</li>
					</>
				)}
			</ul>
		</>
	);
};
