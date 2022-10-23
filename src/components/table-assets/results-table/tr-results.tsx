import TS_ZAP from "../../../entities/ts-zap";
import ZAP from "../../../entities/zap";

export type TTABLEROW_Results_Props = {
    name: string;
    url: string;
    scanType: (typeof ZAP.fullName |
        typeof TS_ZAP.fullName)[];
}

function TABLEROW_Results({ name, url, scanType }: TTABLEROW_Results_Props) {
    return (
        <ul className="trow">
            <li className="dropdown">
                <label className="dropdown-button button">
                    <input type="checkbox" className="checkbox-input" />
                    <div className="arrow">
                    </div>
                </label>
            </li>
            <li className="name">
                {name}
            </li>
            <li className="target">
                {url}
            </li>
            <li className="scan-types">
                {scanType.map((item) => {
                    return <span className="scan-type-item">
                        {item}
                    </span>
                })}
            </li>
            <li className="action">

            </li>
        </ul>
    )
}

export default TABLEROW_Results;