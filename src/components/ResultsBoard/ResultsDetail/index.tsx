import moment from "moment";
import { useEffect, useMemo } from "react";
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
import Describable from "../../toolkits/Describable";
import { useLocation } from "react-router-dom";

const ResultsDetail = () => {
	const location = useLocation();
	useEffect(() => {
		console.log("location", location);
		console.log("location.pathname", location.pathname);
	}, []);

	return <div>hehe</div>;
};

export default ResultsDetail;
