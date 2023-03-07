import TS_ZAP from "../../../entities/ts-zap";
import ZAP from "../../../entities/zap";
import Describable from "../../toolkits/describable/describable";

export type TSUB_TABLEROW_ResultsProps = {
	scanType: typeof ZAP.fullName | typeof TS_ZAP.fullName;
	state: string;
	progress: number;
	listExportResultType: string[];
	createdSince: string;
};

const SUB_TABLEROW_Results = (props: TSUB_TABLEROW_ResultsProps) => {
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

export default SUB_TABLEROW_Results;
