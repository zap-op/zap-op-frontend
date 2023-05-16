import { useEffect, useState } from "react";
import ProgressRing from "./progress-ring";
import scanApi, { useLazyTrialScanQuery } from "../../services/scanApi";
import { _assertCast, isFetchBaseQueryErrorType } from "../../utils/helpers";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type TScanFieldProps = {
	title?: string;
	typeScan: string;
};

const ScanField = (props: TScanFieldProps) => {
	const [errorStatus, setErrorStatus] = useState<string>();
	const [url, setUrl] = useState<string>("");

	const [triggerTrialScan] = useLazyTrialScanQuery();
	const { data, error } = scanApi.endpoints.trialScan.useQueryState(url);
	const { error: responseError, isScanning } = { ...data };

	useEffect(() => {
		if (error && isFetchBaseQueryErrorType(error)) {
			_assertCast<FetchBaseQueryError>(error);
			if (error.status === "FETCH_ERROR") {
				setErrorStatus(error.error);
			}
		}
	}, [error]);

	useEffect(() => {
		if (responseError) {
			setErrorStatus(responseError.msg);
		}
	}, [responseError]);

	const handleClickScan = async () => {
		if (isScanning) {
			return;
		}

		triggerTrialScan(url);
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
					{isScanning ? <ProgressRing state={ProgressRing.PROCESSING} /> : "Scan"}
				</div>
			</div>
			{!!errorStatus && <div className={`message error-message primary-error-message`}>{errorStatus}</div>}
		</div>
	);
};

export default ScanField;
