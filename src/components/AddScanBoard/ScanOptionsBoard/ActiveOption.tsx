import { updateScanOption, useDispatch, useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";

const ActiveOption = () => {
	const dispatch = useDispatch();
	const scanOption = useSelector((state) => state.target.scanOption);

	return (
		<>
			<label htmlFor={ScanType.ZAP_ACTIVE}>
				<input
					type="checkbox"
					id={ScanType.ZAP_ACTIVE}
					onChange={(event) =>
						dispatch(
							updateScanOption({
								...scanOption,
								active: {
									...scanOption.active,
									checked: event.target.checked,
								},
							}),
						)
					}
					defaultChecked={scanOption.active.checked}
				/>
				<div className="content-container">
					<h5 className="title">ZAP Active</h5>
					<div className="description">Active test your web application for SQL injection, remote command execution, XSS, and more.</div>
				</div>
			</label>
			<div className="sub-content-container">
				<label htmlFor={`sub-${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_SPIDER}`}>
					<input
						type="radio"
						id={`sub-${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_SPIDER}`}
						name={`sub-${ScanType.ZAP_ACTIVE}`}
						onChange={(event) =>
							dispatch(
								updateScanOption({
									...scanOption,
									active: {
										...scanOption.active,
										spider: event.target.checked,
										ajax: !event.target.checked,
									},
								}),
							)
						}
						defaultChecked={scanOption.active.spider}
					/>
					<div className="content-container">
						<span className="title">Explore with ZAP Spider (default)</span>
					</div>
				</label>
				<label htmlFor={`sub-${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_AJAX}`}>
					<input
						type="radio"
						id={`sub-${ScanType.ZAP_ACTIVE}-${ScanType.ZAP_AJAX}`}
						name={`sub-${ScanType.ZAP_ACTIVE}`}
						onChange={(event) =>
							dispatch(
								updateScanOption({
									...scanOption,
									active: {
										...scanOption.active,
										spider: !event.target.checked,
										ajax: event.target.checked,
									},
								}),
							)
						}
						defaultChecked={scanOption.active.ajax}
					/>
					<div className="content-container">
						<span className="title">Explore with ZAP Ajax Spider</span>
					</div>
				</label>
			</div>
		</>
	);
};

export default ActiveOption;
