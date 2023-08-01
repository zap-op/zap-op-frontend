import {
	useEffect, //
	useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { _assertCast } from "../../../utils/helpers";
import {
	ScanType, //
	TGeneralScanSessionWithTarget,
} from "../../../utils/types";
import { scanSessionApi, useDispatch } from "../../../store";
import ZapSpiderResultsDetail from "./ZapSpiderResultsDetail";
import ZapAjaxResultsDetail from "./ZapAjaxResultsDetail";
import ZapPassiveResultsDetail from "./ZapPassiveResultsDetail";
import ZapActiveResultsDetail from "./ZapActiveResultsDetail";

type TResultsDetailParams = {
	resultId: string;
};

const ResultsDetail = () => {
	const {
		data: scanSessionApiData, //
		isUninitialized,
		isSuccess,
		isError,
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

	const [sessionInfo, setSessionInfo] = useState<TGeneralScanSessionWithTarget>();

	useEffect(() => {
		if (isSuccess && scanSessionApiData && scanSessionApiData.length != 0) {
			const scanSessionDataFounded = scanSessionApiData.find((item) => item._id.toString() === resultId);
			if (!scanSessionDataFounded) {
				return;
			}
			setSessionInfo({
				...scanSessionDataFounded,
			});
		}
	}, [isSuccess]);

	const ResultsDetail = () => {
		if (!sessionInfo) {
			return <></>;
		}
		switch (sessionInfo.__t as ScanType) {
			case ScanType.ZAP_SPIDER:
				return <ZapSpiderResultsDetail {...sessionInfo} />;
			case ScanType.ZAP_AJAX:
				return <ZapAjaxResultsDetail {...sessionInfo} />;
			case ScanType.ZAP_PASSIVE:
				return <ZapPassiveResultsDetail {...sessionInfo} />;
			case ScanType.ZAP_ACTIVE:
				return <ZapActiveResultsDetail {...sessionInfo} />;
			default:
				return <></>;
		}
	};

	return (
		<>
			{sessionInfo ? (
				<ResultsDetail />
			) : (
				<div className="result-detail-container">
					<div className="action-container">
						<Link
							to="../"
							className="go-previous link-button button secondary-button"
							draggable={false}>
							Back
						</Link>
					</div>
					{isError && <h2 className="message error-message">Some thing went wrong</h2>}
				</div>
			)}
		</>
	);
};

export default ResultsDetail;
