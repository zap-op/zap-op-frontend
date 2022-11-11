import { Component, PropsWithChildren, ReactNode } from 'react';

type TSelectTargetTableProps = {
}

class SelectTargetTable extends Component<PropsWithChildren<TSelectTargetTableProps>> {
    constructor(props: TSelectTargetTableProps) {
        super(props);
    }

    override render(): ReactNode {
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

export default SelectTargetTable;