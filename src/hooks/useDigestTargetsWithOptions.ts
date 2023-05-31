import { toast } from "react-hot-toast";
import { _assertCast } from "../utils/helpers";
import { ScanType } from "../utils/types";
import {
	useSelector, //
	clearScanOption,
	clearSelectTarget,
	useSpiderScanMutation,
	useDispatch,
	useAjaxScanMutation,
} from "../store";

export const useDigestTargetsWithOptions = () => {
	const dispatch = useDispatch();
	const { listSelectedTarget, listSelectedScanOption } = useSelector((state) => state.target);

	const [spiderScan] = useSpiderScanMutation();
	const [ajaxScan] = useAjaxScanMutation();

	const digest = async () => {
		if (listSelectedTarget.length == 0 || listSelectedScanOption.length == 0) {
			toast.error("Targets or Options are empty!");
			return;
		}
		listSelectedTarget.forEach((target) => {
			listSelectedScanOption.forEach((optionItem) => {
				switch (optionItem) {
					case ScanType.NMAP_TCP:
						break;
					case ScanType.NMAP_UDP:
						break;
					case ScanType.ZAP_SPIDER:
						spiderScan({
							_id: target._id,
							scanConfig: {},
						})
							.unwrap()
							.catch((error) => {
								const msg = error.data.msg;
								toast.error(`Fail to start ${target.name} spider with ${msg}`);
							});
						break;
					case ScanType.ZAP_AJAX:
						ajaxScan({
							_id: target._id,
							scanConfig: {},
						})
							.unwrap()
							.catch((error) => {
								const msg = error.data.msg;
								toast.error(`Fail to start ${target.name} spider with ${msg}`);
							});
						break;
					case ScanType.ZAP_ACTIVE:
						break;
					case ScanType.ZAP_PASSIVE:
						break;
					default:
						break;
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
