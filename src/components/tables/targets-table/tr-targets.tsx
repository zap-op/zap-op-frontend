import { TTarget } from "../../../submodules/utility/model";

export type TTABLEROW_Targets_Props = Omit<TTarget, "userId"> & {
    firstSeen: string;
    lastSeen: string;
}

const TABLEROW_Targets = (props: TTABLEROW_Targets_Props) => {
    return (
        <ul className="trow">
            <li className="name">
                {props.name}
            </li>
            <li className="target">
                {props.target}
            </li>
            <li className="tag">
                {props.tag}
            </li>
            <li className="first-seen">
                {props.firstSeen}
            </li>
            <li className="last-seen">
                {props.lastSeen}
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