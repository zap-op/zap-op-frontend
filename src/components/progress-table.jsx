import React, { Component } from 'react';
import ProgressRing from './progress-ring';

class ProgressTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        {/* <ProgressRing status={ProgressRing.COMPLETE}/> */ }
        return (

            < div className="progress-table-container" >
                <div className="view-options-container">
                    <label className="auto-scroll toggle-button" for="auto-scoll-checkbox">
                        <input type="checkbox" className="checkbox-input" id="auto-scoll-checkbox" />
                        <span className="toggle-track">
                            <span className="toggle-indicator">
                                <span className="check-mark">
                                    <svg viewBox="0 0 24 24" id="ghq-svg-check" role="presentation" aria-hidden="true">
                                        <path
                                            d="M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z">
                                        </path>
                                    </svg>
                                </span>
                            </span>
                        </span>
                    </label>
                </div>
                <div className="table-container">
                    <div className="table-scroll-wrap">
                        <div className="table-head-container">
                            {this.props.tableHead}
                        </div>
                        <div className="table-body-container">
                            {this.props.tableBody}
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default ProgressTable;