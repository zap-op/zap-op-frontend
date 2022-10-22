import { Component, ReactNode } from "react";
import ResultsTable from "../tables/results-table";

type TResultsBoardProps = {
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
                    <ResultsTable tableBody={[<></>]}/>
                </div>
            </div>
        )
    }
}

export default ResultsBoard;