import TS_ZAP from "../../../entities/ts-zap";
import ZAP from "../../../entities/zap";
import Describable from "../../toolkits/describable";

export type TSUB_TABLEROW_ResultsProps = {
    scanType: typeof ZAP.fullName |
    typeof TS_ZAP.fullName;
    state: string;
    progress: number;
    listExportResultType: string[];
    createdSince: string;
}

function SUB_TABLEROW_Results({ scanType, state, progress, listExportResultType, createdSince }: TSUB_TABLEROW_ResultsProps) {
    return (
        <ul className="sub-trow">
            <Describable dataTitle="type">
                <li className="scan-type-name">
                    {scanType}
                </li>
            </Describable>
            <Describable dataTitle="state">
                <li className="state">
                    {state}
                </li>
            </Describable>
            <Describable dataTitle="progress">
                <li className="progress">
                    {progress}
                </li>
            </Describable>
            <li className="result-types">
                {listExportResultType.map((item) => {
                    return <Describable dataTitle={`${item} result`}>
                        <span key={item} className="result-type-item">
                            {item}
                        </span>
                    </Describable>
                })}
            </li>
            <li className="created-since">
                {createdSince}
            </li>
        </ul>
    )
}

export default SUB_TABLEROW_Results;