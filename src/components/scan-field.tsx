import { Component, createRef } from 'react';
import ProgressRing from './progress-ring';
import TS_ZAP from '../entities/ts-zap';
import { connect } from 'react-redux';
import { startScanProgress, endScanProgress, concatScanInfosDisplay, updateScanProgressDisplay, resetScanDisplay } from '../store/slice/scanSlice';
import { AxiosError } from 'axios';
import { RootState } from '../store/store';

const mapStateToProps = (state: RootState) => {
    return {
        isStartScanProgress: state.scan.isStartScanProgress,
        scanProgressDisplay: state.scan.scanProgressDisplay,
    }
}

const mapDispatchToProps = {
    startScanProgress,
    endScanProgress,
    concatScanInfosDisplay,
    updateScanProgressDisplay,
    resetScanDisplay,
}

type TmapStateToProps = ReturnType<typeof mapStateToProps>;
type TmapDispatchToProps = typeof mapDispatchToProps;

type TScanFieldProps =
    TmapStateToProps &
    TmapDispatchToProps & {
        title: string;
        typeScan: string;
    }

type TScanFieldState = {
    isProcessing: boolean;
    errorMess: string | null;
}

class ScanField extends Component<TScanFieldProps, TScanFieldState> {
    static readonly UNKOWN_ERROR_MESS = "Unknown error"
    static readonly EMPTY_URL_ERROR_MESS = "URL is empty!";
    static readonly CANNOT_REQUEST_ERROR_MESS = "Cannot request session!";

    private ref_urlInput: React.RefObject<HTMLInputElement>;

    constructor(props: TScanFieldProps) {
        super(props);
        this.handleClickScan = this.handleClickScan.bind(this);
        this.ref_urlInput = createRef<HTMLInputElement>();
        this.state = {
            isProcessing: false,
            errorMess: null,
        }
    }

    toggleProcessing() {
        this.setState(prevState => ({
            isProcessing: !prevState.isProcessing
        }));
    }

    displayErrorMess(errorMess: string) {
        this.setState({
            errorMess: errorMess,
        })
    }

    hideErrorMess() {
        this.setState({
            errorMess: null,
        })
    }

    async handleClickScan() {
        if (this.state.isProcessing) {
            return;
        }

        this.hideErrorMess();
        this.toggleProcessing();

        const SpiderZAPScan = TS_ZAP.getIntance();
        const scan_url = this.ref_urlInput.current!.value;
        if (!scan_url) {
            this.displayErrorMess(ScanField.EMPTY_URL_ERROR_MESS);
            this.toggleProcessing();
            return;
        }

        try {
            SpiderZAPScan.url = scan_url;
            SpiderZAPScan.maxChildren = 2;
            const scanSession = await SpiderZAPScan.request()
                .then((res) => {
                    console.log("res: ", res);
                    return res.data.scanSession;
                });
            SpiderZAPScan.connect(scanSession);
            const eventSource = SpiderZAPScan.connectionSource();
            this.props.resetScanDisplay();
            this.props.startScanProgress();

            eventSource.onmessage = (event: MessageEvent) => {
                console.log("onmessage: ", event);
                const data = JSON.parse(event.data);
                this.props.concatScanInfosDisplay({ listUrl: data.results });
                this.props.updateScanProgressDisplay({ scanProgress: data.scanProgress });

                if (data.scanProgress === 100) {
                    SpiderZAPScan.disconnect();
                    this.toggleProcessing();
                }
            }
            eventSource.onerror = (event: Event) => {
                SpiderZAPScan.disconnect();

                console.log("onerror: ", event);
                if (event instanceof MessageEvent) {
                    const data = JSON.parse(event.data);
                    this.displayErrorMess(data.message);
                }
                SpiderZAPScan.disconnect();
                this.toggleProcessing();
                if (this.props.scanProgressDisplay === 0) {
                    this.props.endScanProgress();
                }
            }
        } catch (error) {
            console.log("error: ", error);
            if (error instanceof AxiosError) {
                const errorData: {
                    scanStatus: number;
                    message: string
                } | undefined = error.response?.data;
                if (!errorData || !errorData.scanStatus) {
                    this.displayErrorMess(ScanField.CANNOT_REQUEST_ERROR_MESS);
                } else {
                    this.displayErrorMess(errorData.message);
                }
            } else if (error instanceof TypeError) {

            }
            SpiderZAPScan.disconnect();
            this.toggleProcessing();
            if (this.props.scanProgressDisplay === 0) {
                this.props.endScanProgress();
            }
        }
    }

    override render() {
        return (
            <div className="scan-field-container">
                <h4>
                    {this.props.title}
                </h4>
                <div className="field-container">
                    <input type="text" placeholder='Enter a URL, IP address, or hostname...' ref={this.ref_urlInput} />
                    <div className="scan-button button primary-button" onClick={this.handleClickScan}>
                        {this.state.isProcessing ? <ProgressRing state={ProgressRing.PROCESSING} /> : "Scan"}
                    </div>
                </div>
                <div className={`message error-message ${this.state.errorMess ? "" : "hidden"}`}>
                    {this.state.errorMess ? this.state.errorMess : <></>}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanField);