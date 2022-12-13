import { toast } from "react-hot-toast";
import { TTarget } from "../../../submodules/utility/model";
import MoreOptionsButton, { TOptionsItem } from "../../more-options-button/more-options-button";

export type TTABLEROW_Targets_Props = Omit<TTarget, "userId"> & {
    firstSeen: string;
    lastSeen: string;
}

const TABLEROW_Targets = (props: TTABLEROW_Targets_Props) => {
    const newScanOption : TOptionsItem = {
        name: "New scan",
        handle: () => {
            toast.error("Under development");
        }
    }
    const deleteOption: TOptionsItem = {
        name: "Delete",
        handle: () => {

        }
    }
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
                <MoreOptionsButton listOptions={[newScanOption, deleteOption]} />
            </li>
        </ul>
    )
}

export default TABLEROW_Targets;