import { updateScanOption, useDispatch, useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";

const AjaxOption = () => {
	const dispatch = useDispatch();
	const scanOption = useSelector((state) => state.target.scanOption);

	return (
		<label htmlFor={ScanType.ZAP_AJAX}>
			<input
				type="checkbox"
				id={ScanType.ZAP_AJAX}
				onChange={(event) =>
					dispatch(
						updateScanOption({
							...scanOption,
							ajax: event.target.checked,
						}),
					)
				}
				defaultChecked={scanOption.ajax}
			/>
			<div className="content-container">
				<h5 className="title">ZAP Ajax Spider</h5>
				<div className="description">Crawler of AJAX rich sites called Crawljax.</div>
			</div>
		</label>
	);
};

export default AjaxOption;
