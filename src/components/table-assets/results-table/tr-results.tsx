import TS_ZAP from "../../../entities/ts-zap";
import ZAP from "../../../entities/zap";

export type TTABLEROW_Results_Props = {
    name: string;
    url: string;
    scanType: (typeof ZAP.fullName |
        typeof TS_ZAP.fullName)[];
}

function TABLEROW_Results({ name, url, scanType}: TTABLEROW_Results_Props) {
    return (
        <ul className="trow">
            <li className="name">
                {name}
            </li>
            <li className="target">
                {url}
            </li>
            <li className="scan-type">
                {scanType}
            </li>
            <li className="action">
                <div className="three-dot-button">
                    <div className="three-dot">
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default TABLEROW_Results;