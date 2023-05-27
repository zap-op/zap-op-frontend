import { PropsWithChildren, useRef, useState } from "react";
import Describable from "../../toolkits/Describable";

type TResultsTableProps = {};

const ResultsTable = (props: PropsWithChildren<TResultsTableProps>) => {

	return (
		<div className="results-table-container table-container">
			<div className="table-scroll-wrap">
				<div className="table-head-container">
					<ul className="thead">
						<li className="dropdown"></li>
						<li className="name">Name</li>
						<li className="target">Target</li>
						<li className="scan-types">Scan types</li>
						<li className="action"></li>
					</ul>
				</div>
				<div className="table-body-container">{props.children}</div>
			</div>
		</div>
	);
};

export default ResultsTable;

type TItemRow = {
	name: string;
	url: string;
	listScanType: ("OWASP ZAP" | "Traditonal Spider ZAP")[];
};

const ItemRow = (props: TItemRow) => {
	const [isOpeningSubContent, setIsOpeningSubContent] = useState<boolean>(false);

	const ref_dropdownInput = useRef<HTMLInputElement>(null);

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
					<SubItemRow
						scanType="OWASP ZAP"
						state={`SUCCEEDED`}
						progress={100}
						listExportResultType={["PDF", "XML"]}
						createdSince={"1 day ago"}
					/>
					<SubItemRow
						scanType="OWASP ZAP"
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

type TSubItemRow = {
	scanType: "OWASP ZAP" | "Traditonal Spider ZAP";
	state: string;
	progress: number;
	listExportResultType: string[];
	createdSince: string;
};

const SubItemRow = (props: TSubItemRow) => {
	return (
		<ul className="sub-trow">
			<Describable dataTitle="type">
				<li className="scan-type-name">{props.scanType}</li>
			</Describable>
			<Describable dataTitle="state">
				<li className="state">{props.state}</li>
			</Describable>
			<Describable dataTitle="progress">
				<li className="progress">{props.progress}</li>
			</Describable>
			<li className="result-types">
				{props.listExportResultType.map((item) => {
					return (
						<Describable
							dataTitle={`${item} result`}
							key={item}>
							<span
								key={item}
								className="result-type-item">
								{item}
							</span>
						</Describable>
					);
				})}
			</li>
			<li className="created-since">{props.createdSince}</li>
		</ul>
	);
};
