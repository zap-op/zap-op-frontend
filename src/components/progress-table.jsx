import React, { Component } from 'react';
import ProgressRing from './progress-ring';

class ProgressTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="progress-table-container">
                <div className="table-head-container">
                    {this.props.tableHead}
                </div>
                <div className="table-body-container">
                    {this.props.tableBody}
                </div>
            </div>
        );
    }
}

export default ProgressTable;