import { Component, ReactNode } from "react";
import TABLEROW_Results, { TTABLEROW_ResultsProps } from "../../tables/results-table/tr-results";
import ResultsTable from "../../tables/results-table/results-table";

type TResultsBoardProps = {
    listResult: TTABLEROW_ResultsProps[];
}

type TResultsBoardState = {

}

class ResultsBoard extends Component<TResultsBoardProps, TResultsBoardState> {
    constructor(props: TResultsBoardProps) {
        super(props);
    }

    override render(): ReactNode {
        return (
            <div className="results-board-container">
                <div className="results-board_results-table-container">
                    <ResultsTable>
                        {this.props.listResult.map((item, index) => {
                            return <TABLEROW_Results key={index} name={item.name} url={item.url} listScanType={item.listScanType} />
                        })}
                    </ResultsTable>
                </div>
            </div>
        )
    }
}

export default ResultsBoard;