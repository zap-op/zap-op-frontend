import { useEffect } from "react";
import { clearScanConfig, useDispatch, useSelector } from "../../../store";
import SpiderConfig from "./SpiderConfig";
import AjaxConfig from "./AjaxConfig";
import PassiveConfig from "./PassiveConfig";
import ActiveConfig from "./ActiveConfig";

const ScanConfigBoard = () => {
	const dispatch = useDispatch();
	const scanOption = useSelector((state) => state.target.scanOption);

	useEffect(() => {
		dispatch(clearScanConfig());
	}, []);

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
						<SpiderConfig />
						{(scanOption.ajax || scanOption.passive.checked || scanOption.active.checked) && ( //
							<div className="hr"></div>
						)}
					</>
				)}
				{scanOption.ajax && (
					<>
						<AjaxConfig />
						{(scanOption.passive.checked || scanOption.active.checked) && ( //
							<div className="hr"></div>
						)}
					</>
				)}
				{scanOption.passive.checked && (
					<>
						<PassiveConfig />
						{scanOption.active.checked && ( //
							<div className="hr"></div>
						)}
					</>
				)}
				{scanOption.active.checked && <ActiveConfig />}
			</div>
		</div>
	);
};

export default ScanConfigBoard;
