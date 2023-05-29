import { useEffect, useState } from "react";
import ProgressRing from "./ProgressRing";
import { trialScanApi, useDispatch, useLazyTrialScanQuery, useSelector } from "../../store";
import { _assertCast, isFetchBaseQueryErrorType } from "../../utils/helpers";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type TScanFieldProps = {
	title?: string;
	typeScan: string;
};

const ScanField = (props: TScanFieldProps) => {
	const { target: storeUrl } = useSelector((state) => state.scan.trial);
	const [url, setUrl] = useState<string>(storeUrl);
	const [errorStatus, setErrorStatus] = useState<string>();
	const dispatch = useDispatch();

	const [triggerTrialScan] = useLazyTrialScanQuery();
	const { data, error } = trialScanApi.endpoints.trialScan.useQueryState({
		target: storeUrl,
	});
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

		dispatch(trialScanApi.util.resetApiState());

		triggerTrialScan({
			target: url,
		});
	};

	return (
		<div className="scan-field-container">
			<h4>{props.title}</h4>
			<div className="field-container">
				<input
					type="text"
					placeholder="Enter a URL, IP address, or hostname..."
					value={url}
					disabled={isScanning}
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
