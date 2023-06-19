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
} from "../store";
import { SCAN_SESSION_TAG } from "../utils/settings";

export const useDigestTargetsWithOptions = () => {
	const dispatch = useDispatch();
	const { listSelectedTarget, listSelectedScanOption } = useSelector((state) => state.target);

	const [spiderScan] = useSpiderScanMutation();
	const [ajaxScan] = useAjaxScanMutation();
	const [activeScan] = useActiveScanMutation();

	const digest = async () => {
		if (listSelectedTarget.length == 0 || listSelectedScanOption.length == 0) {
			toast.error("Targets or Options are empty!");
			return;
		}
		listSelectedTarget.forEach((target) => {
			listSelectedScanOption.forEach(async (scanType) => {
				const optionName = getScanOptionTitleByID(scanType);
				const toastId = toast.loading(`Initializing ${optionName} for ${target.name}`);
				switch (scanType) {
					case ScanType.ZAP_SPIDER:
						await spiderScan({
							_id: target._id,
							scanConfig: {},
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
						return;
					case ScanType.ZAP_AJAX:
						await ajaxScan({
							_id: target._id,
							scanConfig: {},
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
						return;
					case ScanType.ZAP_ACTIVE:
						await activeScan({
							_id: target._id,
							exploreType: "spider",
							scanConfig: {},
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
						return;
					case ScanType.ZAP_PASSIVE:
						return;
					default:
						return;
				}
			});
		});
		dispatch(clearScanOption());
		dispatch(clearSelectTarget());
	};

	return {
		digest, //
	};
};
