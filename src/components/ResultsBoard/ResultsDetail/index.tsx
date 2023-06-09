import moment from "moment";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { _assertCast } from "../../../utils/helpers";
import {
	TObject, //
	ScanType,
	ScanState,
	TMgmtScanSessionsResponse,
} from "../../../utils/types";
import {
	scanSessionApi,
	useSelector,
	useStreamAjaxScanQuery, //
	useStreamSpiderScanQuery,
} from "../../../store";
import Describable from "../../toolkits/Describable";
import { Link, useLocation, useParams } from "react-router-dom";
import MoreOptionsButton, { TOptionItem } from "../../Buttons/MoreOptionsButton";

type TResultsDetailParams = {
	resultId: string;
};

const ResultsDetail = () => {
	const location = useLocation();
	const { resultId } = useParams<TResultsDetailParams>();
	const { data: scanSessionApiData } = scanSessionApi.endpoints.getScanSession.useQueryState();
	useEffect(() => {
		console.log("location", location);
		console.log("location.pathname", location.pathname);
		console.log("resultId", resultId);
		console.log("scanSessionApiData", scanSessionApiData);
	}, []);

	const exportPdf: TOptionItem = {
		name: "Export to PDF",
		handle: () => {
			toast.error("Under development");
		},
	};

	const handleBack = () => {};

	return (
		<div className="result-detail-container">
			<div className="action-container">
				<Link
					to=""
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
		</div>
	);
};

export default ResultsDetail;
