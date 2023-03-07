import { createRef, useState } from "react";
import TS_ZAP from "../../../entities/ts-zap";
import ZAP from "../../../entities/zap";
import SUB_TABLEROW_Results from "./sub-tr-results";

export type TTABLEROW_ResultsProps = {
	name: string;
	url: string;
	listScanType: (typeof ZAP.fullName | typeof TS_ZAP.fullName)[];
};

const TABLEROW_Results = (props: TTABLEROW_ResultsProps) => {
	const [isOpeningSubContent, setIsOpeningSubContent] = useState<boolean>(false);

	const ref_dropdownInput = createRef<HTMLInputElement>();

	const updateIsOpeningSubContentState = () => {
		setIsOpeningSubContent(ref_dropdownInput.current?.checked ? true : false);
	};

	const handleDropdownButton = () => {
		updateIsOpeningSubContentState();
	};

	return (
		<div className="trow-container">
			<ul className="trow">
				<li className="dropdown">
					<label
						className="dropdown-button button"
						onClick={handleDropdownButton}>
						<input
							type="checkbox"
							className="checkbox-input"
							ref={ref_dropdownInput}
						/>
						<div className="arrow"></div>
					</label>
				</li>
				<li className="name">{props.name}</li>
				<li className="target">{props.url}</li>
				<li className="scan-types">
					{props.listScanType.map((item) => {
						return (
							<span
								key={item}
								className="scan-type-item">
								{item}
							</span>
						);
					})}
				</li>
				<li className="action"></li>
			</ul>
			<div className={`sub-trow-container ${isOpeningSubContent ? "is-opening" : ""}`}>
				<div className="sub-trow-wrap">
					<SUB_TABLEROW_Results
						scanType={ZAP.fullName}
						state={`SUCCEEDED`}
						progress={100}
						listExportResultType={["PDF", "XML"]}
						createdSince={"1 day ago"}
					/>
					<SUB_TABLEROW_Results
						scanType={ZAP.fullName}
						state={`SUCCEEDED`}
						progress={100}
						listExportResultType={["PDF", "XML"]}
						createdSince={"1 day ago"}
					/>
				</div>
			</div>
		</div>
	);
};

export default TABLEROW_Results;
