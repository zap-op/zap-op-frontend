import { createRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProgressRing from '../../progress-ring/progress-ring';
import { setStatusScanProgress, updateScanProgressDisplay, resetScanDisplay } from '../../../store/slice/scanSlice';
import store, { RootState } from '../../../store/store';
import TRIAL_TS_ZAP from '../../../entities/trial-ts-zap';
import { SCAN_STATUS } from '../../../submodules/utility/status';
import { useGetResultsByOffsetMutation } from '../../../services/scanApi';

type TScanFieldProps = {
    title: string;
    typeScan: string;
}

const ScanField = (props: TScanFieldProps) => {
    const isScanProgressing = useSelector((state: RootState) => state.scan.isScanProgressing);

    const [getResultsByOffset] = useGetResultsByOffsetMutation();

    const dispatch = useDispatch();

    const [errorMess, setErrorMess] = useState<string|undefined>(undefined);

    const ref_urlInput = createRef<HTMLInputElement>();

    const handleClickScan = async () => {
        if (isScanProgressing) {
            return;
        }

        setErrorMess(undefined);
        dispatch(resetScanDisplay());
        dispatch(setStatusScanProgress({ status: true }));

        const scan_url = ref_urlInput.current!.value;
        if (!scan_url) {
            setErrorMess(ScanField.EMPTY_URL_ERROR_MESS)
            dispatch(setStatusScanProgress({ status: false }))
            return;
        }
        const TrialSpiderZAPScan = TRIAL_TS_ZAP.getIntance();
        TrialSpiderZAPScan.url = scan_url;
        TrialSpiderZAPScan.connect();
        const eventSource = TrialSpiderZAPScan.connectionSource();

        let id: string;
        eventSource.addEventListener("id", (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            id = data.id;
            if (!id) {
                setErrorMess(SCAN_STATUS.INVALID_ID.msg);
                dispatch(setStatusScanProgress({ status: false }));
            }
        });

        eventSource.addEventListener("status", (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            dispatch(updateScanProgressDisplay({
                scanProgress: data.status,
            }));
            // const offset = store.getState().scan.scanInfosDisplay.length;
            getResultsByOffset({
                id: id,
                offset: 0,
            }).catch((error) => {
                console.log(error);
            })

            if (data.status === "100") {
                TrialSpiderZAPScan.disconnect();
                dispatch(setStatusScanProgress({ status: false }));
                return;
            }
        });

        eventSource.onerror = (event: Event) => {
            console.log("onerror: ", event);
            if (event instanceof MessageEvent) {
                const data = JSON.parse(event.data);
                setErrorMess(data.msg);
            } else {
                setErrorMess(SCAN_STATUS.ZAP_INTERNAL_ERROR.msg);
            }
            TrialSpiderZAPScan.disconnect();
            dispatch(setStatusScanProgress({ status: false }));
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
                    {isScanProgressing ? <ProgressRing state={ProgressRing.PROCESSING} /> : "Scan"}
                </div>
            </div>
            {errorMess
                ?
                <div className={`message error-message primary-error-message`}>
                    {errorMess}
                </div>
                :
                <></>
            }
        </div>
    );
}

ScanField.UNKOWN_ERROR_MESS = "Unknown error"
ScanField.EMPTY_URL_ERROR_MESS = "URL is empty!";
ScanField.CANNOT_REQUEST_ERROR_MESS = "Cannot request session!";

export default ScanField;