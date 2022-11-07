import { Component, PropsWithChildren } from 'react';

type TAddScanTableProps = {
}

class AddScanTable extends Component<PropsWithChildren<TAddScanTableProps>> {
    constructor(props: TAddScanTableProps) {
        super(props);
    }

    override render() {
        return (
            <div className="add-scan-table-container table-container">
                <div className="table-scroll-wrap">
                    <div className="table-head-container">
                        <ul className="thead">
                            <li className="selected">
                                Select
                            </li>
                            <li className="name">
                                Name
                            </li>
                            <li className="target">
                                Target
                            </li>
                            <li className="tag">
                                Tag
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

export default AddScanTable;