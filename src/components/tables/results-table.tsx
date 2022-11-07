import { Component, PropsWithChildren } from 'react';

type TResultsTableProps = {
}

class ResultsTable extends Component<PropsWithChildren<TResultsTableProps>> {
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
                            <li className="scan-types">
                                Scan types
                            </li>
                            <li className="action">

                            </li>
                        </ul>
                    </div>
                    <div className="table-body-container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultsTable;