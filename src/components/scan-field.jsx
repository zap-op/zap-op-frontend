import React, { Component } from 'react';

class ScanField extends Component {
    constructor(props) {
        super(props);
        this.clickScanHandler = this.clickScanHandler.bind(this);
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
                    <a className="scan-button button" href="" onClick={this.clickScanHandler}>Scan</a>
                </div>
            </div>
        );
    }
}

export default ScanField;