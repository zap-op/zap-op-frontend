import { Outlet } from "react-router-dom";
import ResultsTable from "./ResultsTable";
import ResultsDetail from "./ResultsDetail";

const ResultsBoard = () => {
	return (
		<div className="results-board-container">
			<div className="results-board_results-table-container">
				<Outlet />
			</div>
		</div>
	);
};

export default ResultsBoard;
export {
	ResultsTable, //
	ResultsDetail,
};
