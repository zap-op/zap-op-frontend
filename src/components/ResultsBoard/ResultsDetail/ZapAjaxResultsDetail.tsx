import {
	useEffect, //
	useMemo,
	useState,
} from "react";
import toast from "react-hot-toast";
import moment from "moment";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { _assertCast, getScanOptionTitleByID } from "../../../utils/helpers";
import {
	ScanType, //
	TZapAjaxScanConfig,
	TAjaxScanSessionWithTarget,
	TGeneralScanSessionWithTarget,
} from "../../../utils/types";
import { useGetAjaxFullResultQuery } from "../../../store";
import MoreOptionsButton, { TOptionItem } from "../../Buttons/MoreOptionsButton";
import { generateResultDetailDocument } from "../pdfExporter";
import ZapAjaxFullResultTable from "./ZapAjaxFullResultTable";

const ZapAjaxResultsDetail = (scanSessionWithTargetProps: TGeneralScanSessionWithTarget) => {
	//to do lấy status ra success hay fail
	_assertCast<TAjaxScanSessionWithTarget>(scanSessionWithTargetProps);
	const {
		_id, //
		__t,
		createdAt,
		updatedAt,
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
	} = useGetAjaxFullResultQuery({
		_id,
	});
	const { fullResults } = { ...scanFullResult };

	const exportPdf: TOptionItem = {
		name: "Export to PDF",
		handle: () => {
			const toastId = toast.loading("");
			const doc = new jsPDF();

			if (!fullResults) {
				return;
			}
			generateResultDetailDocument(doc, ScanType.ZAP_AJAX, scanSessionWithTargetProps, fullResults);
			doc.save("report.pdf");
			toast.success(`Succeed export ${id} to PDF`, {
				id: toastId,
			});
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
			<ul className="session-info-container">
				<li className="session">
					Scan Session
					<span>{id}</span>
				</li>
				<li className="type">
					Type
					<span>{scanOptionTitle}</span>
				</li>
				<ZapAjaxConfig scanConfig={scanConfig} />
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
			{fullResults ? (
				<ZapAjaxFullResultTable
					inScope={fullResults.inScope}
					outOfScope={fullResults.outOfScope}
					errors={fullResults.errors}
				/>
			) : (
				isError && <h2 className="message error-message">Some thing went wrong</h2>
			)}
		</div>
	);
};

export default ZapAjaxResultsDetail;

const ZapAjaxConfig = ({
	scanConfig: {
		inScope, //
		contextName,
		subtreeOnly,
	},
}: TZapAjaxScanConfig) => (
	<ul className="config-container">
		<li>
			In Scope
			<span>{`${inScope}`}</span>
		</li>
		<li>
			Context Name
			<span>{`${contextName}`}</span>
		</li>
		<li>
			Subtree Only
			<span>{`${subtreeOnly}`}</span>
		</li>
	</ul>
);
