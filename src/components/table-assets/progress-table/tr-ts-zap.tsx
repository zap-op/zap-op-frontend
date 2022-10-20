type TTABLEROW_TS_ZAP_Props = {
    number: number;
    url: string;
}

function TABLEROW_TS_ZAP({ number, url }: TTABLEROW_TS_ZAP_Props) {
    return (
        <ul className="tr-ts-zap">
            <li className="no">
                {number}
            </li>
            <li className="url">
                {url}
            </li>
        </ul>
    )
}

export default TABLEROW_TS_ZAP;