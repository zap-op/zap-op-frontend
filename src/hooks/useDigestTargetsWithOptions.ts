import { toast } from "react-hot-toast";
import { _assertCast, getScanOptionTitleByID } from "../utils/helpers";
import { ScanType } from "../utils/types";
import {
	useSelector, //
	clearScanOption,
	clearSelectTarget,
	useSpiderScanMutation,
	useDispatch,
	useAjaxScanMutation,
	scanSessionApi,
	useActiveScanMutation,
	usePassiveScanMutation,
	clearScanConfig,
} from "../store";
import { SCAN_SESSION_TAG } from "../utils/settings";

export const useDigestTargetsWithOptions = () => {
	const dispatch = useDispatch();
	const {
		listSelectedTarget, //
		scanOption,
		scanConfig,
	} = useSelector((state) => state.target);

	const [spiderScan] = useSpiderScanMutation();
	const [ajaxScan] = useAjaxScanMutation();
	const [activeScan] = useActiveScanMutation();
	const [passiveScan] = usePassiveScanMutation();

	const digest = async () => {
		if (listSelectedTarget.length == 0) {
			toast.error("Targets are empty!");
			return;
		}
		listSelectedTarget.forEach((target) => {
			if (scanOption.spider) {
				const optionName = getScanOptionTitleByID(ScanType.ZAP_SPIDER);
				const toastId = toast.loading(`Initializing ${optionName} for ${target.name}`);
				spiderScan({
					_id: target._id,
					scanConfig: scanConfig.spider,
				})
					.unwrap()
					.then((response) => {
						if (response.statusCode > 0) {
							toast.success(`Succeed to initialize ${optionName} for ${target.name}`, {
								id: toastId,
							});
						} else {
							toast.error(`Fail to  initialize ${optionName} for ${target.name} with ${response.msg}`, {
								id: toastId,
							});
						}
					})
					.catch((error) => {
						const msg = error.data.msg;
						toast.error(`Fail to initialize ${optionName} for ${target.name} with ${msg}`, {
							id: toastId,
						});
					})
					.finally(() => {
						dispatch(scanSessionApi.util.invalidateTags([SCAN_SESSION_TAG]));
					});
			}
			if (scanOption.ajax) {
				const optionName = getScanOptionTitleByID(ScanType.ZAP_AJAX);
				const toastId = toast.loading(`Initializing ${optionName} for ${target.name}`);
				ajaxScan({
					_id: target._id,
					scanConfig: scanConfig.ajax,
				})
					.unwrap()
					.then((response) => {
						if (response.statusCode > 0) {
							toast.success(`Succeed to initialize ${optionName} for ${target.name}`, {
								id: toastId,
							});
						} else {
							toast.error(`Fail to  initialize ${optionName} for ${target.name} with ${response.msg}`, {
								id: toastId,
							});
						}
					})
					.catch((error) => {
						const msg = error.data.msg;
						toast.error(`Fail to  initialize ${optionName} for ${target.name} with ${msg}`, {
							id: toastId,
						});
					})
					.finally(() => {
						dispatch(scanSessionApi.util.invalidateTags([SCAN_SESSION_TAG]));
					});
			}
			if (scanOption.passive.checked) {
				const optionName = getScanOptionTitleByID(ScanType.ZAP_PASSIVE);
				const toastId = toast.loading(`Initializing ${optionName} for ${target.name}`);
				passiveScan({
					_id: target._id,
					exploreType: scanOption.passive.spider ? "spider" : "ajax",
					spiderConfig: scanConfig.passive.spiderConfig,
					ajaxConfig: scanConfig.passive.ajaxConfig,
				})
					.unwrap()
					.then((response) => {
						if (response.statusCode > 0) {
							toast.success(`Succeed to initialize ${optionName} for ${target.name}`, {
								id: toastId,
							});
						} else {
							toast.error(`Fail to  initialize ${optionName} for ${target.name} with ${response.msg}`, {
								id: toastId,
							});
						}
					})
					.catch((error) => {
						const msg = error.data.msg;
						toast.error(`Fail to  initialize ${optionName} for ${target.name} with ${msg}`, {
							id: toastId,
						});
					})
					.finally(() => {
						dispatch(scanSessionApi.util.invalidateTags([SCAN_SESSION_TAG]));
					});
			}
			if (scanOption.active.checked) {
				const optionName = getScanOptionTitleByID(ScanType.ZAP_ACTIVE);
				const toastId = toast.loading(`Initializing ${optionName} for ${target.name}`);
				activeScan({
					_id: target._id,
					exploreType: scanOption.active.spider ? "spider" : "ajax",
					scanConfig: scanConfig.active.scanConfig,
					spiderConfig: scanConfig.active.spiderConfig,
					ajaxConfig: scanConfig.active.ajaxConfig,
				})
					.unwrap()
					.then((response) => {
						if (response.statusCode > 0) {
							toast.success(`Succeed to initialize ${optionName} for ${target.name}`, {
								id: toastId,
							});
						} else {
							toast.error(`Fail to  initialize ${optionName} for ${target.name} with ${response.msg}`, {
								id: toastId,
							});
						}
					})
					.catch((error) => {
						const msg = error.data.msg;
						toast.error(`Fail to  initialize ${optionName} for ${target.name} with ${msg}`, {
							id: toastId,
						});
					})
					.finally(() => {
						dispatch(scanSessionApi.util.invalidateTags([SCAN_SESSION_TAG]));
					});
			}
		});
		dispatch(clearScanOption());
		dispatch(clearSelectTarget());
		dispatch(clearScanConfig());
	};

	return {
		digest, //
	};
};
