import { useDispatch, useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";
import ConfigNode from "./ConfigNode";

const ScanConfigBoard = () => {
	const dispatch = useDispatch();
	const scanOption = useSelector((state) => state.target.scanOption);
	const scanConfig = useSelector((state) => state.target.scanConfig);

	return (
		<div className="scan-config-board-container">
			<h1 className="title">Configure Options</h1>
			<div
				className="table-scroll-wrap"
				style={{
					maxHeight: "55vh",
				}}>
				{scanOption.spider && (
					<>
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
								/>
								<ConfigNode
									id={`${ScanType.ZAP_SPIDER}-recurse`}
									title="Recurse"
									type="checkbox"
									additionalInfor="Default value is true."
									checked
									infor="Prevent the spider from seeding recursively."
								/>
								<ConfigNode
									id={`${ScanType.ZAP_SPIDER}-subtree-only`}
									title="Subtree Only"
									type="checkbox"
									additionalInfor="Default value is false."
									infor="Allows to restrict the spider under a site's subtree."
								/>
							</div>
						</div>
						{(scanOption.ajax || scanOption.passive.checked || scanOption.active.checked) && ( //
							<div className="hr"></div>
						)}
					</>
				)}
				{scanOption.ajax && (
					<>
						<div className="ajax config-container">
							<h4 className="title">ZAP Ajax Spider Configure</h4>
							<div className="list-config-container">
								<ConfigNode
									id={`${ScanType.ZAP_AJAX}-in-scope`}
									title="In Scope"
									type="checkbox"
									additionalInfor="Default value is false."
									infor="Indicating whether or not the scan should be restricted to 'inScope' only resources."
								/>
								<ConfigNode
									id={`${ScanType.ZAP_AJAX}-subtree-only`}
									title="Subtree Only"
									type="checkbox"
									additionalInfor="Default value is false."
									infor="Indicating whether or not the crawl should be constrained to a specific path."
								/>
								<ConfigNode
									id={`${ScanType.ZAP_AJAX}-max-crawl-depth`}
									title="Max Crawl Depth"
									type="number"
									defaultValue={5}
									min={0}
									additionalInfor="Recommended value is 5. (minimum value is 0)"
									infor="The maximum depth that the crawler should explore. (0 means unlimited depth)"
								/>
								<ConfigNode
									id={`${ScanType.ZAP_AJAX}-max-duration`}
									title="Max Duration"
									type="number"
									defaultValue={5}
									min={0}
									additionalInfor="Recommended value is 5. (minimum value is 0)"
									infor="The maximum amount of time that the AJAX Spider is allowed to run. (0 means unlimited running time)"
								/>
							</div>
						</div>
						{(scanOption.passive.checked || scanOption.active.checked) && ( //
							<div className="hr"></div>
						)}
					</>
				)}
				{scanOption.passive.checked && (
					<>
						<div className="passive config-container">
							<h4 className="title">
								ZAP Passive Configure
								{scanOption.passive.spider ? ( //
									<span>Explore with ZAP Spider</span>
								) : scanOption.passive.ajax ? (
									<span>Explore with ZAP Ajax Spider</span>
								) : (
									<></>
								)}
							</h4>
							<div className="passive config-container">
								{scanOption.passive.spider ? (
									<div className="list-config-container">
										<ConfigNode
											id={`${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_SPIDER}-max-children`}
											title="Max Children"
											type="number"
											additionalInfor="Default value is 0. (minimum value is 0)"
											defaultValue={0}
											min={0}
											infor="Limits the number of children that will be crawled at every node in the tree."
										/>
										<ConfigNode
											id={`${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_SPIDER}-recurse`}
											title="Recurse"
											type="checkbox"
											additionalInfor="Default value is true."
											checked
											infor="Prevent the spider from seeding recursively."
										/>
										<ConfigNode
											id={`${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_SPIDER}-subtree-only`}
											title="Subtree Only"
											type="checkbox"
											additionalInfor="Default value is false."
											infor="Allows to restrict the spider under a site's subtree."
										/>
									</div>
								) : (
									scanOption.passive.ajax && (
										<div className="list-config-container">
											<ConfigNode
												id={`${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_AJAX}-in-scope`}
												title="In Scope"
												type="checkbox"
												additionalInfor="Default value is false."
												infor="Indicating whether or not the scan should be restricted to 'inScope' only resources."
											/>
											<ConfigNode
												id={`${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_AJAX}-subtree-only`}
												title="Subtree Only"
												type="checkbox"
												additionalInfor="Default value is false."
												infor="Indicating whether or not the crawl should be constrained to a specific path."
											/>
											<ConfigNode
												id={`${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_AJAX}-max-crawl-depth`}
												title="Max Crawl Depth"
												type="number"
												defaultValue={5}
												min={0}
												additionalInfor="Recommended value is 5. (minimum value is 0)"
												infor="The maximum depth that the crawler should explore. (0 means unlimited depth)"
											/>
											<ConfigNode
												id={`${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_AJAX}-max-duration`}
												title="Max Duration"
												type="number"
												defaultValue={5}
												min={0}
												additionalInfor="Recommended value is 5. (minimum value is 0)"
												infor="The maximum amount of time that the AJAX Spider is allowed to run. (0 means unlimited running time)"
											/>
										</div>
									)
								)}
							</div>
						</div>
						{scanOption.active.checked && ( //
							<div className="hr"></div>
						)}
					</>
				)}
				{scanOption.active.checked && (
					<div className="active config-container">
						<h4 className="title">
							ZAP Active
							{scanOption.passive.spider ? ( //
								<span>Explore with ZAP Spider</span>
							) : scanOption.passive.ajax ? (
								<span>Explore with ZAP Ajax Spider</span>
							) : (
								<></>
							)}
						</h4>
						<div className="active config-container">
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
									/>
									<ConfigNode
										id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_SPIDER}-recurse`}
										title="Recurse"
										type="checkbox"
										additionalInfor="Default value is true."
										checked
										infor="Prevent the spider from seeding recursively."
									/>
									<ConfigNode
										id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_SPIDER}-subtree-only`}
										title="Subtree Only"
										type="checkbox"
										additionalInfor="Default value is false."
										infor="Allows to restrict the spider under a site's subtree."
									/>
								</div>
							) : (
								scanOption.active.ajax && (
									<div className="list-config-container">
										<ConfigNode
											id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_AJAX}-in-scope`}
											title="In Scope"
											type="checkbox"
											additionalInfor="Default value is false."
											infor="Indicating whether or not the scan should be restricted to 'inScope' only resources."
										/>
										<ConfigNode
											id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_AJAX}-subtree-only`}
											title="Subtree Only"
											type="checkbox"
											additionalInfor="Default value is false."
											infor="Indicating whether or not the crawl should be constrained to a specific path."
										/>
										<ConfigNode
											id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_AJAX}-max-crawl-depth`}
											title="Max Crawl Depth"
											type="number"
											defaultValue={5}
											min={0}
											additionalInfor="Recommended value is 5. (minimum value is 0)"
											infor="The maximum depth that the crawler should explore. (0 means unlimited depth)"
										/>
										<ConfigNode
											id={`${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_AJAX}-max-duration`}
											title="Max Duration"
											type="number"
											defaultValue={5}
											min={0}
											additionalInfor="Recommended value is 5. (minimum value is 0)"
											infor="The maximum amount of time that the AJAX Spider is allowed to run. (0 means unlimited running time)"
										/>
									</div>
								)
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ScanConfigBoard;
