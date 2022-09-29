import React, { Component } from 'react';
import ProgressRing from './progress-ring';
import TS_ZAP from '../entities/ts-zap';
import validator from '../utils/validator';
import $ from 'jquery';
import { connect } from 'react-redux';
import { startScanProgress, endScanProgress, concatScanInfosDisplay, updateScanProgressDisplay, resetScanDisplay } from '../store/slice/scanSlice';
import { AxiosError } from 'axios';

const mapStateToProps = state => {
    return {
        isStartScanProgress: state.scan.isStartScanProgress,
    }
}

const mapDispatchToProps = {
    startScanProgress,
    endScanProgress,
    concatScanInfosDisplay,
    updateScanProgressDisplay,
    resetScanDisplay,
}

class ScanField extends Component {
    static UNKOWN_ERROR_MESS = "Unknown error"
    static EMPTY_URL_ERROR_MESS = "URL is empty!";
    static CANNOT_REQUEST_ERROR_MESS = "Cannot request session!";

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

    displayErrorMess(errorMess) {
        if (!validator.isString(errorMess)) {
            return;
        }
        $(this.ref_mess.current).addClass("error-message");
        this.ref_mess.current.innerText = errorMess;
    }

    async clickScanHandler() {
        if (this.state.isProcessing) {
            return;
        }

        this.toggleProcessing();

        const SpiderZAPScan = TS_ZAP.getIntance();
        const scan_url = this.ref_urlInput.current.value;
        if (validator.isEmptyString(scan_url)) {
            this.displayErrorMess(ScanField.EMPTY_URL_ERROR_MESS);
            this.toggleProcessing();
            return;
        }

        try {
            SpiderZAPScan.url = scan_url;
            SpiderZAPScan.config(2, SpiderZAPScan.recurse, SpiderZAPScan.contextName, SpiderZAPScan.subtreeOnly);
            await SpiderZAPScan.request()
                .then((res) => {
                    console.log("res: ", res);
                });
            SpiderZAPScan.connect();
            const eventSource = SpiderZAPScan.connectionSource();
            this.props.resetScanDisplay();
            this.props.startScanProgress();

            eventSource.onmessage = (event) => {
                console.log("onmessage: ", event);
                const data = JSON.parse(event.data);
                this.props.concatScanInfosDisplay({ listUrl: data.results });
                this.props.updateScanProgressDisplay({ scanProgress: data.scanProgress });

                if (data.scanProgress === 100) {
                    SpiderZAPScan.disconnect();
                    this.toggleProcessing();
                }
            }

            eventSource.onerror = (event) => {
                SpiderZAPScan.disconnect();

                console.log("onerror: ", event);
                const data = JSON.parse(event.data);
                this.displayErrorMess(data.message);
                SpiderZAPScan.disconnect();
                this.toggleProcessing();
            }
        } catch (error) {
            console.log("error: ", error);
            if (error instanceof AxiosError) {
                const errorData = error.response.data;
                if (!errorData || !errorData.scanStatus) {
                    this.displayErrorMess(ScanField.CANNOT_REQUEST_ERROR_MESS);
                } else {
                    this.displayErrorMess(errorData.message);
                }
            } else if (error instanceof TypeError) {

            }
            SpiderZAPScan.disconnect();
            this.toggleProcessing();
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(ScanField);