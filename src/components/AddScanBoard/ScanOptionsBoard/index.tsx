import { updateScanOption, useDispatch, useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";

const ScanOptionsBoard = () => {
	const dispatch = useDispatch();
	const scanOption = useSelector((state) => state.target.scanOption);

	return (
		<div className="scan-options-board-container">
			<h1 className="title">Select Options</h1>
			<label htmlFor={ScanType.ZAP_SPIDER}>
				<input
					type="checkbox"
					id={ScanType.ZAP_SPIDER}
					onChange={(event) =>
						dispatch(
							updateScanOption({
								...scanOption,
								spider: event.target.checked,
							}),
						)
					}
					defaultChecked={scanOption.spider}
				/>
				<div className="content-container">
					<h5 className="title">ZAP Spider</h5>
					<div className="description">Discover all resources (URLs) on your web application.</div>
				</div>
			</label>
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
										ajax: event.target.checked,
										spider: !event.target.checked,
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
										ajax: event.target.checked,
										spider: !event.target.checked,
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
		</div>
	);
};

export default ScanOptionsBoard;
