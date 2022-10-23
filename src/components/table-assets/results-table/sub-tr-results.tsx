import TS_ZAP from "../../../entities/ts-zap";
import ZAP from "../../../entities/zap";

export type TSUB_TABLEROW_Results_Props = {
    scanType: typeof ZAP.fullName |
    typeof TS_ZAP.fullName;
    state: string;
    progress: number;
    listExportResultType: string[];
    createdSince: string;
}

function SUB_TABLEROW_Results({ scanType, state, progress, listExportResultType, createdSince }: TSUB_TABLEROW_Results_Props) {
    return (
        <ul className="sub-trow">
            <li className="scan-type-name">
                {scanType}
            </li>
            <li className="state">
                {state}
            </li>
            <li className="progress">
                {progress}
            </li>
            <li className="result-types">
                {listExportResultType.map((item) => {
                    return <span key={item} className="result-type-item">
                        {item}
                    </span>
                })}
            </li>
            <li className="created-since">
                {createdSince}
            </li>
        </ul>
    )
}

export default SUB_TABLEROW_Results;