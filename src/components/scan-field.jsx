import React, { Component } from 'react';
import ProgressRing from './progress-ring';
import TS_ZAP from '../entities/ts-zap';
import validator from '../utils/validator';
import $ from 'jquery';
import { connect } from 'react-redux';
import { concatScanInfosDisplay, clearScanInfosDisplay } from '../store/slice/scanSlice';

class ScanField extends Component {
    static INVALID_URL_ERROR_MESS = "Invalid URL!";
    static EMPTY_URL_ERROR_MESS = "URL is empty!";

    constructor(props) {
        super(props);
        this.clickScanHandler = this.clickScanHandler.bind(this);
        this.ref_mess = React.createRef();
        this.ref_urlInput = React.createRef();
        this.state = {
            isProcessing: false
        }
    }

    toggleProcessing() {
        this.setState(prevState => ({
            isProcessing: !prevState.isProcessing
        }));
    }

    async clickScanHandler() {
        this.toggleProcessing();
        const SpiderZAPScan = TS_ZAP.getIntance();
        const scan_url = this.ref_urlInput.current.value;

        if (!validator.isEmptyString(scan_url)) {
            $(this.ref_mess.current).toggleClass("error-message");
            this.ref_mess.current.innerText = ScanField.EMPTY_URL_ERROR_MESS;
            this.toggleProcessing();
            return;
        }
        SpiderZAPScan.url = scan_url;
        SpiderZAPScan.config(2, SpiderZAPScan.recurse, SpiderZAPScan.contextName, SpiderZAPScan.subtreeOnly);
        try {
            await SpiderZAPScan.request()
                .then((res) => {
                    console.log(res);
                });
            SpiderZAPScan.connect();
            const eventSource = SpiderZAPScan.connectionSource();
            this.props.clearScanInfosDisplay();
            eventSource.onmessage = (event) => {
                console.log(event);
                const data = JSON.parse(event.data);
                this.props.concatScanInfosDisplay({listUrl: data.results});
            }
        } catch (error) {
            console.log(error);
            // $(this.ref_mess.current).toggleClass("error-message");
            // this.ref_mess.current.innerText = ScanField.EMPTY_URL_ERROR_MESS;
        }
        this.toggleProcessing();
    }

    render() {
        return (
            <div className="scan-field-container">
                <h4>
                    {this.props.title}
                </h4>
                <div className="field-container">
                    <input type="text" placeholder='Enter a URL, IP address, or hostname...' ref={this.ref_urlInput} />
                    <div className="scan-button button primary-button" href="" onClick={this.clickScanHandler}>
                        {this.state.isProcessing ? <ProgressRing /> : "Scan"}
                    </div>
                </div>
                <div className="message" ref={this.ref_mess}>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    concatScanInfosDisplay,
    clearScanInfosDisplay,
}

export default connect(null, mapDispatchToProps)(ScanField);