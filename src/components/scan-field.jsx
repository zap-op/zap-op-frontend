import React, { Component } from 'react';
import ProgressRing from './progress-ring';
import connect from '../adapters/sockets/connect';

class ScanField extends Component {
<<<<<<< HEAD
=======
    constructor(props) {
        super(props);
        this.clickScanHandler = this.clickScanHandler.bind(this);
        this.state = {
            isProcessing: false
        }
    }

    clickScanHandler() {

    }

>>>>>>> d765d42 (ZO-33 Update style, logic Scan Field and Progress Ring component)
    render() {
        return (
            <div className="scan-field-container">
                <h4>
                    {this.props.title}
                </h4>
                <div className="field-container">
                    <input type="text" placeholder='Enter a URL, IP address, or hostname...' />
<<<<<<< HEAD
                    <a className="scan-button button" href="">Scan</a>
=======
                    <a className="scan-button button" href="" onClick={this.clickScanHandler}>
                        {this.state.isProcessing ? <ProgressRing/> : "Scan"}
                    </a>
>>>>>>> d765d42 (ZO-33 Update style, logic Scan Field and Progress Ring component)
                </div>
            </div>
        );
    }
}

export default ScanField;