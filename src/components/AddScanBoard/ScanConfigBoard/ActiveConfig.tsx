import { useEffect } from "react";
import { updateScanConfig, useDispatch, useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";
import ConfigNode from "./ConfigNode";

const ActiveConfig = () => {
	const dispatch = useDispatch();
	const scanOption = useSelector((state) => state.target.scanOption);
	const scanConfig = useSelector((state) => state.target.scanConfig);

	useEffect(() => {
		console.log("active.spiderConfig", scanConfig.active.spiderConfig);
	}, [scanConfig.active.spiderConfig]);

	useEffect(() => {
		console.log("active.ajaxConfig", scanConfig.active.ajaxConfig);
	}, [scanConfig.active.ajaxConfig]);

	return (
		<div className="active config-container">
			<h4 className="title">
				ZAP Active
				{scanOption.active.spider ? ( //
					<span>Explore with ZAP Spider</span>
				) : scanOption.active.ajax ? (
					<span>Explore with ZAP Ajax Spider</span>
				) : (
					<></>
				)}
			</h4>
			{scanOption.active.spider ? (
				<div className="list-config-container">
					<ConfigNode
						id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_SPIDER}-max-children`}
						title="Max Children"
						type="number"
						additionalInfor="Default value is 0. (minimum value is 0)"
						defaultValue={0}
						min={0}
						infor="Limits the number of children that will be crawled at every node in the tree."
						handleChangeValue={(event) => {
							dispatch(
								updateScanConfig({
									...scanConfig,
									active: {
										...scanConfig.active,
										spiderConfig: {
											...scanConfig.active.spiderConfig,
											maxChildren: parseInt(event.target.value),
										},
									},
								}),
							);
						}}
					/>
					<ConfigNode
						id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_SPIDER}-recurse`}
						title="Recurse"
						type="checkbox"
						additionalInfor="Default value is true."
						checked
						infor="Prevent the spider from seeding recursively."
						handleChangeValue={(event) => {
							dispatch(
								updateScanConfig({
									...scanConfig,
									active: {
										...scanConfig.active,
										spiderConfig: {
											...scanConfig.active.spiderConfig,
											recurse: event.target.checked,
										},
									},
								}),
							);
						}}
					/>
					<ConfigNode
						id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_SPIDER}-subtree-only`}
						title="Subtree Only"
						type="checkbox"
						additionalInfor="Default value is false."
						infor="Allows to restrict the spider under a site's subtree."
						handleChangeValue={(event) => {
							dispatch(
								updateScanConfig({
									...scanConfig,
									active: {
										...scanConfig.active,
										spiderConfig: {
											...scanConfig.active.spiderConfig,
											subtreeOnly: event.target.checked,
										},
									},
								}),
							);
						}}
					/>
				</div>
			) : (
				scanOption.active.ajax && (
					<div className="list-config-container">
						<ConfigNode
							id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_AJAX}-subtree-only`}
							title="Subtree Only"
							type="checkbox"
							additionalInfor="Default value is false."
							infor="Indicating whether or not the crawl should be constrained to a specific path."
							handleChangeValue={(event) => {
								dispatch(
									updateScanConfig({
										...scanConfig,
										active: {
											...scanConfig.active,
											ajaxConfig: {
												...scanConfig.active.ajaxConfig,
												subtreeOnly: event.target.checked,
											},
										},
									}),
								);
							}}
						/>
						<ConfigNode
							id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_AJAX}-max-crawl-depth`}
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
										active: {
											...scanConfig.active,
											ajaxConfig: {
												...scanConfig.active.ajaxConfig,
												maxCrawlDepth: parseInt(event.target.value),
											},
										},
									}),
								);
							}}
						/>
						<ConfigNode
							id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_AJAX}-max-duration`}
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
										active: {
											...scanConfig.active,
											ajaxConfig: {
												...scanConfig.active.ajaxConfig,
												maxDuration: parseInt(event.target.value),
											},
										},
									}),
								);
							}}
						/>
					</div>
				)
			)}
		</div>
	);
};

export default ActiveConfig;
