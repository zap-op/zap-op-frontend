import { createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProgressRing from '../../progress-ring/progress-ring';
import TS_ZAP from '../../../entities/ts-zap';
import { startScanProgress, endScanProgress, concatScanInfosDisplay, updateScanProgressDisplay, resetScanDisplay } from '../../../store/slice/scanSlice';
import { AxiosError } from 'axios';
import { RootState } from '../../../store/store';

type TScanFieldProps = {
    title: string;
    typeScan: string;
}

const ScanField = (props: TScanFieldProps) => {
    const isStartScanProgress = useSelector((state: RootState) => state.scan.isStartScanProgress);
    const scanProgressDisplay = useSelector((state: RootState) => state.scan.scanProgressDisplay);

    const dispatch = useDispatch();

    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [errorMess, setErrorMess] = useState<string | null>(null);

    const ref_urlInput = createRef<HTMLInputElement>();

    const toggleProcessing = () => {
        setIsProcessing(!isProcessing);
    }

    const handleClickScan = async () => {
        if (isProcessing) {
            return;
        }

        setErrorMess(null);
        toggleProcessing();

        const SpiderZAPScan = TS_ZAP.getIntance();
        const scan_url = ref_urlInput.current!.value;
        if (!scan_url) {
            setErrorMess(ScanField.EMPTY_URL_ERROR_MESS)
            toggleProcessing();
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
            dispatch(resetScanDisplay());
            dispatch(startScanProgress());

            eventSource.onmessage = (event: MessageEvent) => {
                console.log("onmessage: ", event);
                const data = JSON.parse(event.data);
                dispatch(concatScanInfosDisplay({
                    listUrl: data.results
                }));
                dispatch(updateScanProgressDisplay({
                    scanProgress: data.scanProgress
                }));

                if (data.scanProgress === 100) {
                    SpiderZAPScan.disconnect();
                    toggleProcessing();
                }
            }
            eventSource.onerror = (event: Event) => {
                SpiderZAPScan.disconnect();

                console.log("onerror: ", event);
                if (event instanceof MessageEvent) {
                    const data = JSON.parse(event.data);
                    setErrorMess(data.msg);
                }
                toggleProcessing();
                if (scanProgressDisplay === 0) {
                    dispatch(endScanProgress());
                }
            }
        } catch (error) {
            console.log("error: ", error);
            if (error instanceof AxiosError) {
                const errorData: {
                    statusCode: number;
                    msg: string
                } | undefined = error.response?.data;
                if (!errorData || !errorData.statusCode) {
                    setErrorMess(ScanField.CANNOT_REQUEST_ERROR_MESS);
                } else {
                    setErrorMess(errorData.msg);
                }
            } else if (error instanceof TypeError) {

            }
            SpiderZAPScan.disconnect();
            toggleProcessing();
            if (scanProgressDisplay === 0) {
                dispatch(endScanProgress());
            }
        }
    }

    return (
        <div className="scan-field-container">
            <h4>
                {props.title}
            </h4>
            <div className="field-container">
                <input type="text" placeholder='Enter a URL, IP address, or hostname...' ref={ref_urlInput} />
                <div className="scan-button button primary-button" onClick={handleClickScan}>
                    {isProcessing ? <ProgressRing state={ProgressRing.PROCESSING} /> : "Scan"}
                </div>
            </div>
            <div className={`message error-message ${errorMess ? "" : "hidden"}`}>
                {errorMess ? errorMess : <></>}
            </div>
        </div>
    );
}

ScanField.UNKOWN_ERROR_MESS = "Unknown error"
ScanField.EMPTY_URL_ERROR_MESS = "URL is empty!";
ScanField.CANNOT_REQUEST_ERROR_MESS = "Cannot request session!";

export default ScanField;