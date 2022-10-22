import { Component } from 'react';

type TResultsTableProps = {
    tableBody: JSX.Element[];
}

class ResultsTable extends Component<TResultsTableProps> {
    constructor(props: TResultsTableProps) {
        super(props);
    }

    override render() {
        return (
            <div className="results-table-container table-container">
                <div className="table-scroll-wrap">
                    <div className="table-head-container">
                        <ul className="thead">
                            <li className="dropdown">
                                
                            </li>
                            <li className="name">
                                Name
                            </li>
                            <li className="target">
                                Target
                            </li>
                            <li className="scan-type">
                                Scan types
                            </li>
                            <li className="action">
                                
                            </li>
                        </ul>
                    </div>
                    <div className="table-body-container">
                        {this.props.tableBody}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultsTable;