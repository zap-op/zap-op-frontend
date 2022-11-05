export type TTABLEROW_Targets_Props = {
    name: string;
    url: string;
    tag: string;
    firstSeen: string;
    lastSeen: string;
}

function TABLEROW_Targets({ name, url, tag, firstSeen, lastSeen }: TTABLEROW_Targets_Props) {
    return (
        <ul className="trow">
            <li className="name">
                {name}
            </li>
            <li className="target">
                {url}
            </li>
            <li className="tag">
                {tag}
            </li>
            <li className="first-seen">
                {firstSeen}
            </li>
            <li className="last-seen">
                {lastSeen}
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

export default TABLEROW_Targets;