import ResultsTable from "./results-table";
import TABLEROW_Results, { TTABLEROW_ResultsProps } from "./results-table/tr-results";

type TResultsBoardProps = {
    listResult: TTABLEROW_ResultsProps[];
}

const ResultsBoard = (props:TResultsBoardProps) => {
    return (
        <div className="results-board-container">
            <div className="results-board_results-table-container">
                <ResultsTable>
                    {props.listResult.map((item, index) => {
                        return <TABLEROW_Results key={index} name={item.name} url={item.url} listScanType={item.listScanType} />
                    })}
                </ResultsTable>
            </div>
        </div>
    )
}

export default ResultsBoard;