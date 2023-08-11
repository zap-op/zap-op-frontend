import { useEffect } from "react";
import { updateScanConfig, useDispatch, useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";
import ConfigNode from "./ConfigNode";

const AjaxConfig = () => {
	const dispatch = useDispatch();
	const scanConfig = useSelector((state) => state.target.scanConfig);

	useEffect(() => {
		console.log("ajax", scanConfig.ajax);
	}, [scanConfig.ajax]);

	return (
		<div className="ajax config-container">
			<h4 className="title">ZAP Ajax Spider Configure</h4>
			<div className="list-config-container">
				<ConfigNode
					id={`${ScanType.ZAP_AJAX}-subtree-only`}
					title="Subtree Only"
					type="checkbox"
					additionalInfor="Default value is false."
					infor="Indicating whether or not the crawl should be constrained to a specific path."
					handleChangeValue={(event) => {
						dispatch(
							updateScanConfig({
								...scanConfig,
								ajax: {
									...scanConfig.ajax,
									subtreeOnly: event.target.checked,
								},
							}),
						);
					}}
				/>
				<ConfigNode
					id={`${ScanType.ZAP_AJAX}-max-crawl-depth`}
					title="Max Crawl Depth"
					type="number"
					defaultValue={5}
					min={0}
					additionalInfor="Recommended value is 5. (minimum value is 0)"
					infor="The maximum depth that the crawler should explore. (0 means unlimited depth)"
					handleChangeValue={(event) => {
						dispatch(
							updateScanConfig({
								...scanConfig,
								ajax: {
									...scanConfig.ajax,
									maxCrawlDepth: parseInt(event.target.value),
								},
							}),
						);
					}}
				/>
				<ConfigNode
					id={`${ScanType.ZAP_AJAX}-max-duration`}
					title="Max Duration"
					type="number"
					defaultValue={5}
					min={0}
					additionalInfor="Recommended value is 5. (minimum value is 0)"
					infor="The maximum amount of time that the AJAX Spider is allowed to run. (0 means unlimited running time)"
					handleChangeValue={(event) => {
						dispatch(
							updateScanConfig({
								...scanConfig,
								ajax: {
									...scanConfig.ajax,
									maxDuration: parseInt(event.target.value),
								},
							}),
						);
					}}
				/>
			</div>
		</div>
	);
};

export default AjaxConfig;
