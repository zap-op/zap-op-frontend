import { toast } from "react-hot-toast";
import { useMoveToTrashTargetMutation } from "../../../services/targetApi";
import { TTarget } from "../../../submodules/utility/model";
import { TStatusResponse } from "../../../submodules/utility/status";
import MoreOptionsButton, { TOptionsItem } from "../../more-options-button/more-options-button";

export type TTABLEROW_Targets_Props = Omit<TTarget, "userId">

const TABLEROW_Targets = (props: TTABLEROW_Targets_Props) => {
    const newScanOption: TOptionsItem = {
        name: "New scan",
        handle: () => {
            toast.error("Under development");
        }
    }
    const [moveToTrashTarget] = useMoveToTrashTargetMutation();
    const deleteOption: TOptionsItem = {
        name: "Delete",
        handle: () => {
            const toastId = toast.loading("Moving target to trash");
            if (!props._id) {
                toast.error("Something went wrong")
                return;
            }
            moveToTrashTarget(props._id)
                .unwrap()
                .then((result) => {
                    if (result.statusCode > 0) {
                        toast.success(result.msg, {
                            id: toastId,
                        });
                    } else {
                        toast.error(result.msg, {
                            id: toastId,
                        });
                    }
                })
                .catch((error) => {
                    if (!error.data) {
                        toast.error("Something went wrong", {
                            id: toastId,
                        });
                        return;
                    }
                    toast.error((error.data as TStatusResponse).msg, {
                        id: toastId,
                    });
                })
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
                {props.createdAt}
            </li>
            <li className="last-seen">
                {props.updatedAt}
            </li>
            <li className="action">
                <MoreOptionsButton listOptions={[newScanOption, deleteOption]} />
            </li>
        </ul>
    )
}

export default TABLEROW_Targets;