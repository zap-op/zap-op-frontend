import { Component } from 'react';

type TTargetsTableProps = {
    tableBody: JSX.Element[];
}

class TargetsTable extends Component<TTargetsTableProps> {
    constructor(props: TTargetsTableProps) {
        super(props);
    }

    override render() {
        return (
            <div className="targets-table-container table-container">
                <div className="table-scroll-wrap">
                    <div className="table-head-container">
                        <ul className="thead">
                            <li className="name">
                                Name
                            </li>
                            <li className="target">
                                Target
                            </li>
                            <li className="tag">
                                Tag
                            </li>
                            <li className="first-seen">
                                First seen
                            </li>
                            <li className="last-seen">
                                Last seen
                            </li>
                            <li className="action">
                                Actions
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

export default TargetsTable;