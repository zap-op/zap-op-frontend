export default function TABLEROW_TS_ZAP({ number, url }) {
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