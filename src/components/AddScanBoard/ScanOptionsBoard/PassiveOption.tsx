import { updateScanOption, useDispatch, useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";

const PassiveOption = () => {
	const dispatch = useDispatch();
	const scanOption = useSelector((state) => state.target.scanOption);

	return (
		<>
			<label htmlFor={ScanType.ZAP_PASSIVE}>
				<input
					type="checkbox"
					id={ScanType.ZAP_PASSIVE}
					onChange={(event) =>
						dispatch(
							updateScanOption({
								...scanOption,
								passive: {
									...scanOption.passive,
									checked: event.target.checked,
								},
							}),
						)
					}
					defaultChecked={scanOption.passive.checked}
				/>
				<div className="content-container">
					<h5 className="title">ZAP Passive</h5>
					<div className="description">Passive check your web application for cross-domain configuration, insecure cookies, vulnerable JS dependencies, and more vulnerabilities.</div>
				</div>
			</label>
			<div className="sub-content-container">
				<label htmlFor={`sub-${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_SPIDER}`}>
					<input
						type="radio"
						id={`sub-${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_SPIDER}`}
						name={`sub-${ScanType.ZAP_PASSIVE}`}
						onChange={(event) => {
							dispatch(
								updateScanOption({
									...scanOption,
									passive: {
										...scanOption.passive,
										spider: event.target.checked,
										ajax: !event.target.checked,
									},
								}),
							);
						}}
						defaultChecked={scanOption.passive.spider}
					/>
					<div className="content-container">
						<span className="title">Explore with ZAP Spider (default)</span>
					</div>
				</label>
				<label htmlFor={`sub-${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_AJAX}`}>
					<input
						type="radio"
						id={`sub-${ScanType.ZAP_PASSIVE}-${ScanType.ZAP_AJAX}`}
						name={`sub-${ScanType.ZAP_PASSIVE}`}
						onChange={(event) =>
							dispatch(
								updateScanOption({
									...scanOption,
									passive: {
										...scanOption.passive,
										spider: !event.target.checked,
										ajax: event.target.checked,
									},
								}),
							)
						}
						defaultChecked={scanOption.passive.ajax}
					/>
					<div className="content-container">
						<span className="title">Explore with ZAP Ajax Spider</span>
					</div>
				</label>
			</div>
		</>
	);
};

export default PassiveOption;
