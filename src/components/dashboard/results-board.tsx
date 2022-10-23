import { Component, ReactNode } from "react";
import TABLEROW_Results, { TTABLEROW_Results_Props } from "../table-assets/results-table/tr-results";
import ResultsTable from "../tables/results-table";

type TResultsBoardProps = {
    listResult: TTABLEROW_Results_Props[];
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
                    <ResultsTable tableBody={this.props.listResult.map((item, index) => {
                        return <TABLEROW_Results key={index} name={item.name} url={item.url} scanType={item.scanType} />
                    })
                    } />
                </div>
            </div>
        )
    }
}

export default ResultsBoard;