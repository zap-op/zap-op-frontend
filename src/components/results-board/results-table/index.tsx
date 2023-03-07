import { PropsWithChildren } from "react";

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
