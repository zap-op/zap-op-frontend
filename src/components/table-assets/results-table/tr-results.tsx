import TS_ZAP from "../../../entities/ts-zap";
import ZAP from "../../../entities/zap";
import SUB_TABLEROW_Results from "./sub-tr-results";

export type TTABLEROW_Results_Props = {
    name: string;
    url: string;
    listScanType: (typeof ZAP.fullName |
        typeof TS_ZAP.fullName)[];
}

function TABLEROW_Results({ name, url, listScanType }: TTABLEROW_Results_Props) {
    return (
        <div className="trow-container">
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
                    {listScanType.map((item) => {
                        return <span className="scan-type-item">
                            {item}
                        </span>
                    })}
                </li>
                <li className="action">

                </li>
            </ul>
            <div className="sub-trow-container">
            </div>
        </div>
    )
}

export default TABLEROW_Results;