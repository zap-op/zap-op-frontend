import { useEffect } from "react";
import { updateScanConfig, useDispatch, useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";
import ConfigNode from "./ConfigNode";

const SpiderConfig = () => {
	const dispatch = useDispatch();
	const scanConfig = useSelector((state) => state.target.scanConfig);

	useEffect(() => {
		console.log("spider", scanConfig.spider);
	}, [scanConfig.spider]);

	return (
		<div className="spider config-container">
			<h4 className="title">ZAP Spider Configure</h4>
			<div className="list-config-container">
				<ConfigNode
					id={`${ScanType.ZAP_SPIDER}-max-children`}
					title="Max Children"
					type="number"
					additionalInfor="Default value is 0. (minimum value is 0)"
					defaultValue={0}
					min={0}
					infor="Limits the number of children that will be crawled at every node in the tree. (0 means no limit)"
					handleChangeValue={(event) => {
						dispatch(
							updateScanConfig({
								...scanConfig,
								spider: {
									...scanConfig.spider,
									maxChildren: parseInt(event.target.value),
								},
							}),
						);
					}}
				/>
				<ConfigNode
					id={`${ScanType.ZAP_SPIDER}-recurse`}
					title="Recurse"
					type="checkbox"
					additionalInfor="Default value is true."
					checked
					infor="Prevent the spider from seeding recursively."
					handleChangeValue={(event) => {
						dispatch(
							updateScanConfig({
								...scanConfig,
								spider: {
									...scanConfig.spider,
									recurse: event.target.checked,
								},
							}),
						);
					}}
				/>
				<ConfigNode
					id={`${ScanType.ZAP_SPIDER}-subtree-only`}
					title="Subtree Only"
					type="checkbox"
					additionalInfor="Default value is false."
					infor="Allows to restrict the spider under a site's subtree."
					handleChangeValue={(event) => {
						dispatch(
							updateScanConfig({
								...scanConfig,
								spider: {
									...scanConfig.spider,
									subtreeOnly: event.target.checked,
								},
							}),
						);
					}}
				/>
			</div>
		</div>
	);
};

export default SpiderConfig;
