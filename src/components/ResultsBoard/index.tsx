import { useEffect } from "react";
import ResultsTable from "./ResultsTable";
import {
	scanSessionApi, //
	useGetScanSessionQuery,
} from "../../store";

const ResultsBoard = () => {
	const { data: listScanSession } = useGetScanSessionQuery(undefined, {
		refetchOnFocus: true,
		refetchOnReconnect: true,
		refetchOnMountOrArgChange: true,
	});

	return (
		<div className="results-board-container">
			<div className="results-board_results-table-container">
				<ResultsTable listScanResult={listScanSession ? listScanSession : []} />
			</div>
		</div>
	);
};

export default ResultsBoard;
