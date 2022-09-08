import React, { Component } from 'react';
import ProgressRing from './progress-ring';
import TS_ZAP from '../entities/ts-zap';

class ScanField extends Component {
    constructor(props) {
        super(props);
        this.clickScanHandler = this.clickScanHandler.bind(this);
        this.state = {
            isProcessing: false
        }
    }

    clickScanHandler() {

    }

    render() {
        return (
            <div className="scan-field-container">
                <h4>
                    {this.props.title}
                </h4>
                <div className="field-container">
                    <input type="text" placeholder='Enter a URL, IP address, or hostname...' />
                    <div className="scan-button button" href="" onClick={this.clickScanHandler}>
                        {this.state.isProcessing ? <ProgressRing /> : "Scan"}
                    </div>
                </div>
            </div>
        );
    }
}

export default ScanField;