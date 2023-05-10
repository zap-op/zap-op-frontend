import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProgressRing from "./progress-ring";
import { RootState } from "../../store/store";
import { useLazyScanQuery } from "../../services/scanApi";
import { _assertCast, isFetchBaseQueryErrorType } from "../../utils/helpers";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type TScanFieldProps = {
	title?: string;
	typeScan: string;
};

const ScanField = (props: TScanFieldProps) => {
	const isScanProgressing = useSelector((state: RootState) => state.scan.isScanProgressing);
	const scanError = useSelector((state: RootState) => state.scan.scanError);

	const [errorStatus, setErrorStatus] = useState<string>();
	const [url, setUrl] = useState<string>("");

	const [scan, { error }] = useLazyScanQuery();

	useEffect(() => {
		if (error && isFetchBaseQueryErrorType(error)) {
			_assertCast<FetchBaseQueryError>(error);
			if (error.status === "FETCH_ERROR") {
				setErrorStatus(error.error);
			}
		}
	}, [error]);

	useEffect(() => {
		if (scanError) {
			setErrorStatus(scanError.msg);
		}
	}, [scanError]);

	const handleClickScan = async () => {
		if (isScanProgressing) {
			return;
		}

		scan({
			url,
		});
	};

	return (
		<div className="scan-field-container">
			<h4>{props.title}</h4>
			<div className="field-container">
				<input
					type="text"
					placeholder="Enter a URL, IP address, or hostname..."
					onChange={(event) => setUrl(event.target.value)}
				/>
				<div
					className="scan-button button primary-button"
					onClick={handleClickScan}>
					{isScanProgressing ? <ProgressRing state={ProgressRing.PROCESSING} /> : "Scan"}
				</div>
			</div>
			{!!errorStatus && <div className={`message error-message primary-error-message`}>{errorStatus}</div>}
		</div>
	);
};

export default ScanField;
