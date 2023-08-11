import { updateScanOption, useDispatch, useSelector } from "../../../store";
import { ScanType } from "../../../utils/types";

const SpiderOption = () => {
	const dispatch = useDispatch();
	const scanOption = useSelector((state) => state.target.scanOption);

	return (
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
	);
};

export default SpiderOption;
